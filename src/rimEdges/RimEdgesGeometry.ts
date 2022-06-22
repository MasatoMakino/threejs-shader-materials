import {
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Triangle,
  Vector3,
} from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils";

interface FaceNormalInfo {
  a?: number;
  b?: number;
  c?: number;
  normal?: Vector3;
}

interface EdgeData {
  index1: number;
  index2: number;
  face1: number;
  face2?: number;
}

export class RimEdgesGeometry extends BufferGeometry {
  constructor(geometry: BufferGeometry = null, thresholdAngle: number = 1) {
    super();

    // buffer
    const vertices: number[] = [];
    const control0: number[] = [];
    const control1: number[] = [];
    const direction: number[] = [];
    const collapse: number[] = [];

    const thresholdDot = Math.cos(MathUtils.DEG2RAD * thresholdAngle);

    const edgeData: Map<string, EdgeData> = new Map<string, EdgeData>();

    let key;
    const keys = ["a", "b", "c"];

    // prepare source geometry
    const geometry2a = geometry.clone();
    const ratio =
      geometry2a.attributes.position.array.length / geometry2a.index.count;
    const geometry2 = mergeVertices(geometry2a, ratio);
    geometry2.computeVertexNormals();

    const sourceVertices = geometry2.attributes.position;
    const sv = [];

    for (let s = 0; s < sourceVertices.array.length; s++) {
      sv.push(
        new Vector3(
          sourceVertices.array[s * 3],
          sourceVertices.array[s * 3 + 1],
          sourceVertices.array[s * 3 + 2]
        )
      );
    }

    const index = geometry2.index;
    const faceCount = index.count / 3;
    const faceNormalInfos: FaceNormalInfo[] = [];
    const _triangle = new Triangle();
    const a = new Vector3();
    const b = new Vector3();
    const c = new Vector3();
    for (let i = 0; i < faceCount; i++) {
      const aIndex = index.array[i * 3];
      const bIndex = index.array[i * 3 + 1];
      const cIndex = index.array[i * 3 + 2];

      a.fromBufferAttribute(sourceVertices, aIndex);
      b.fromBufferAttribute(sourceVertices, bIndex);
      c.fromBufferAttribute(sourceVertices, cIndex);
      _triangle.set(a, b, c);

      const faceNormalInfo = {
        a: aIndex,
        b: bIndex,
        c: cIndex,
        normal: _triangle.getNormal(new Vector3()),
      };
      faceNormalInfos.push(faceNormalInfo);
    }

    for (let i = 0; i < faceNormalInfos.length; i++) {
      const faceNormalInfo = faceNormalInfos[i];

      for (let j = 0; j < 3; j++) {
        const edge1 = faceNormalInfo[keys[j]];
        const edge2 = faceNormalInfo[keys[(j + 1) % 3]];
        const edgeMin = Math.min(edge1, edge2);
        const edgeMax = Math.max(edge1, edge2);

        key = edgeMin + "," + edgeMax;

        if (edgeData[key] === undefined) {
          edgeData[key] = {
            index1: edgeMin,
            index2: edgeMax,
            face1: i,
            face2: undefined,
          };
        } else {
          edgeData[key].face2 = i;
        }
      }
    }

    // generate vertices
    const v3 = new Vector3();
    const n = new Vector3();
    const n1 = new Vector3();
    const n2 = new Vector3();
    const d = new Vector3();

    for (key in edgeData) {
      const edge = edgeData[key];

      // an edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.
      if (
        edge.face2 === undefined ||
        faceNormalInfos[edge.face1].normal.dot(
          faceNormalInfos[edge.face2].normal
        ) <= thresholdDot
      ) {
        const vertex1 = sv[edge.index1];
        const vertex2 = sv[edge.index2];

        vertices.push(vertex1.x, vertex1.y, vertex1.z);
        vertices.push(vertex2.x, vertex2.y, vertex2.z);

        collapse.push(0, 1);

        d.subVectors(vertex2, vertex1);
        n.copy(d).normalize();
        direction.push(d.x, d.y, d.z);
        n1.copy(faceNormalInfos[edge.face1].normal);
        n1.crossVectors(n, n1);

        d.subVectors(vertex1, vertex2);
        n.copy(d).normalize();
        n2.copy(faceNormalInfos[edge.face2].normal);
        n2.crossVectors(n, n2);
        direction.push(d.x, d.y, d.z);

        v3.copy(vertex1).add(n1); // control0
        control0.push(v3.x, v3.y, v3.z);
        v3.copy(vertex1).add(n2); // control1
        control1.push(v3.x, v3.y, v3.z);

        v3.copy(vertex2).add(n1); // control0
        control0.push(v3.x, v3.y, v3.z);
        v3.copy(vertex2).add(n2); // control1
        control1.push(v3.x, v3.y, v3.z);
      }
    }

    // build geometry
    this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    this.setAttribute("control0", new Float32BufferAttribute(control0, 3));
    this.setAttribute("control1", new Float32BufferAttribute(control1, 3));
    this.setAttribute("direction", new Float32BufferAttribute(direction, 3));
    this.setAttribute("collapse", new Float32BufferAttribute(collapse, 1));
  }
}
