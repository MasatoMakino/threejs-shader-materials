import { FBMDissolveMaterial } from "..";
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

export class Study {
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
    const spot = new PointLight(0xffffff, 3_000);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const seg = 32;
    const geo = new SphereGeometry(30, seg, seg);

    const mat = new FBMDissolveMaterial({
      fog: scene.fog !== undefined,
    });
    mat.color = new Color(0x334466);
    mat.edgeColor = new Color(0x88ff77);
    mat.progress = 0.5;
    mat.tiles = 2;
    mat.edgeWeight = 0.2;
    const mesh = new Mesh(geo, mat);

    scene.add(mesh);

    return mat;
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initMaterialGUI(gui, mat);
    this.initGUIMaterial(gui, mat);
  }

  initGUIMaterial(gui, mat) {
    const folder = gui.addFolder("FBM Dissolve");

    folder.add(mat, "progress", 0.0, 1.0).step(0.01);
    folder.add(mat, "tiles", 1.0, 8.0).step(1.0);
    folder.add(mat, "edgeWeight", 0.0, 1.0).step(0.01);
    CommonGUI.initColorGUI(folder, mat, "edgeColor");
    folder.add(mat, "hashLoop", 1.0, 16.0).step(1.0);
    folder.add(mat, "amp", 0.0, 2.0).step(0.01);
    folder.open();
  }
}

window.onload = () => {
  const study = new Study();
};
