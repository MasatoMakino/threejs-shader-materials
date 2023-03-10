import { ShaderLineMaterial } from "..";
import { Common } from "./Common";
import { CommonGUI } from "./CommonGUI";
import { RAFTicker } from "@masatomakino/raf-ticker";
import GUI from "lil-gui";
import { BoxGeometry, Color, EdgesGeometry, Fog, LineSegments } from "three";

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
    RAFTicker.on("tick", () => {
      renderer.render(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const edge = new EdgesGeometry(new BoxGeometry(20, 20, 20), 7);
    const mat = new ShaderLineMaterial(null, null, {
      fog: scene.fog !== undefined,
    });

    mat.color = new Color(0xffffff);
    mat.uniformOpacity = 1.0;
    mat.transparent = true;

    const seg = new LineSegments(edge, mat);
    scene.add(seg);
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
