import { HexDissolveMaterial } from "..";
import { Common } from "./Common";
import { CommonGUI } from "./CommonGUI";
import { RAFTicker } from "@masatomakino/raf-ticker";
import GUI from "lil-gui";
import {
  Color,
  Fog,
  Mesh,
  PointLight,
  PointLightHelper,
  SphereGeometry,
} from "three";

export class StudyHexGrid {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    const mat = this.initObject(scene);
    RAFTicker.on("tick", (e) => {
      renderer.render(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 1, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const geo = new SphereGeometry(10, 64, 64);

    const mat = new HexDissolveMaterial({
      fog: scene.fog !== undefined,
    });
    mat.color = new Color(0x444444);
    mat.delay = 0.8;
    mat.gridEmissive = new Color(0x99ff99);
    const mesh = new Mesh(geo, mat);
    scene.add(mesh);

    return mat;
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initGridMaterialGUI(gui, mat);
    this.initGUIMaterial(gui, mat);
  }

  initGUIMaterial(gui, mat) {
    const folder = gui.addFolder("HexDissolveMaterial");
    folder.add(mat, "progress", 0.0, 1.0).step(0.01);
    folder.add(mat, "delay", 0.0, 1.0).step(0.01);
    folder.add(mat, "gridWeight", 0.0, 0.5).step(0.01);
    folder.add(mat, "isAscending");
    CommonGUI.initColorGUI(folder, mat, "gridEmissive");
    folder.add(mat, "gridEmissiveWeight", 0.0, 3.0).step(0.01);
    folder.open();
  }
}

window.onload = () => {
  const study = new StudyHexGrid();
};
