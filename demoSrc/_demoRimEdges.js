import { Common } from "./Common";
import {
  BoxBufferGeometry,
  Color,
  CylinderGeometry,
  Fog,
  IcosahedronGeometry,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  TorusKnotGeometry,
} from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { RAFTicker, RAFTickerEventType } from "@masatomakino/raf-ticker";
import { RimEdgesGeometry, RimEdgesMaterial } from "..";
import GUI from "lil-gui";
import { CommonGUI } from "./CommonGUI";

export class Study {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);

    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H);
    Common.initControl(camera, renderer);
    Common.initHelper(scene);

    const mat = this.initObject(scene);
    RAFTicker.on(RAFTickerEventType.tick, () => {
      renderer.render(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const box = new BoxBufferGeometry(20, 20, 20);
    box.translate(-30, 0, 0);
    const sphere = new SphereGeometry(20);
    const icosahedron = new IcosahedronGeometry(20, 3);
    const cylinder = new CylinderGeometry(10, 5, 10);
    cylinder.translate(40, 0, 0);
    const torusKnot = new TorusKnotGeometry(20, 4);
    const geo = mergeBufferGeometries([sphere]);

    const edge = new RimEdgesGeometry(geo, 0.01);
    const mat = new RimEdgesMaterial({
      fog: scene.fog !== undefined,
    });

    const mesh = new Mesh(
      geo,
      new MeshBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.5,
      })
    );

    mat.color = new Color(0xffffff);
    mat.uniformOpacity = 1.0;
    mat.transparent = true;

    const seg = new LineSegments(edge, mat);
    scene.add(seg, mesh);
    seg.computeLineDistances();

    return mat;
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initBasicMaterialGUI(gui, mat);

    const folder = gui.addFolder("LineDashed");
    folder.add(mat, "scale", 1, 10, 0.1);
    folder.add(mat, "dashSize", 1, 10);
    folder.add(mat, "totalSize", 1, 10);
  }
}

window.onload = () => {
  new Study();
};
