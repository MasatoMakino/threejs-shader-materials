import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  InterleavedBufferAttribute,
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

/**
 * 法線によって描画を切り分けるEdgesGeometryの習作
 *
 * 未解決の問題点 :
 * 1. SphereGeometryのように、閉じていない（切れ目のある）ジオメトリでは、正常に境界線が描画できない。
 *   mergeVertices関数が期待通りに動作していない？
 * 2. 複数のジオメトリをマージした場合、描画が正常に行われない。
 */
export class RimEdgesGeometry extends BufferGeometry {
  constructor(geometry: BufferGeometry = null, thresholdAngle: number = 1) {
    super();

    // buffer
    const vertices: number[] = [];
    const control0: number[] = [];
    const control1: number[] = [];
    const direction: number[] = [];
    const collapse: number[] = [];

    // prepare source geometry
    const geometry2 = RimEdgesGeometry.margeGeometry(geometry);

    const indexedPositions = RimEdgesGeometry.convertAttributeToVector3Array(
      geometry2.attributes.position as BufferAttribute
    );
    const faceNormalInfos: FaceNormalInfo[] =
      RimEdgesGeometry.getFaceNormalInfo(geometry2);
    const edgeData: Map<string, EdgeData> =
      RimEdgesGeometry.extractEdgeDataMap(faceNormalInfos);

    // generate vertices
    const v3 = new Vector3();
    const n = new Vector3();
    const n1 = new Vector3();
    const n2 = new Vector3();
    const d = new Vector3();

    const thresholdDot = Math.cos(MathUtils.DEG2RAD * thresholdAngle);
    for (let key in edgeData) {
      const edge = edgeData[key];

      if (edge.face2 == null) {
        continue;
      }

      // an edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.
      if (
        // edge.face2 == null ||
        faceNormalInfos[edge.face1].normal.dot(
          faceNormalInfos[edge.face2].normal
        ) <= thresholdDot
      ) {
        const vertex1 = indexedPositions[edge.index1];
        const vertex2 = indexedPositions[edge.index2];

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
        direction.push(d.x, d.y, d.z);

        n2.copy(faceNormalInfos[edge.face2].normal);
        n2.crossVectors(n, n2);

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
    this.setAttribute(
      "position",
      new Float32BufferAttribute(vertices, 3, false)
    );
    this.setAttribute(
      "control0",
      new Float32BufferAttribute(control0, 3, false)
    );
    this.setAttribute(
      "control1",
      new Float32BufferAttribute(control1, 3, false)
    );
    this.setAttribute(
      "direction",
      new Float32BufferAttribute(direction, 3, false)
    );
    this.setAttribute(
      "collapse",
      new Float32BufferAttribute(collapse, 1, false)
    );
  }

  private static margeGeometry(geometry: BufferGeometry): BufferGeometry {
    const geometry2 = mergeVertices(geometry.clone());
    geometry2.computeVertexNormals();
    return geometry2;
  }

  /**
   *
   * @param attribute
   * @private
   */
  private static convertAttributeToVector3Array(
    attribute: BufferAttribute
  ): Vector3[] {
    const array = [];
    for (let s = 0; s < attribute.array.length; s++) {
      array.push(
        new Vector3(
          attribute.array[s * 3],
          attribute.array[s * 3 + 1],
          attribute.array[s * 3 + 2]
        )
      );
    }
    return array;
  }

  /**
   * Get normals from BufferGeometry
   *
   * @param geometry
   * @private
   */
  private static getFaceNormalInfo(geometry: BufferGeometry): FaceNormalInfo[] {
    const index = geometry.index;
    const faceCount = index.count / 3;
    const sourceVertices = geometry.attributes.position as BufferAttribute;

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

    return faceNormalInfos;
  }

  private static extractEdgeDataMap(
    faceNormalInfos: FaceNormalInfo[]
  ): Map<string, EdgeData> {
    const keys = ["a", "b", "c"];
    const edgeData: Map<string, EdgeData> = new Map<string, EdgeData>();

    for (let i = 0; i < faceNormalInfos.length; i++) {
      const faceNormalInfo = faceNormalInfos[i];

      for (let j = 0; j < keys.length; j++) {
        const edge1 = faceNormalInfo[keys[j]];
        const edge2 = faceNormalInfo[keys[(j + 1) % 3]];
        const hash = `${edge1}_${edge2}`;
        const reverseHash = `${edge2}_${edge1}`;

        if (reverseHash in edgeData) {
          edgeData[reverseHash].face2 = i;
        } else {
          edgeData[hash] = {
            index1: edge1,
            index2: edge2,
            face1: i,
            face2: null,
          };
        }
      }
    }

    return edgeData;
  }
}
