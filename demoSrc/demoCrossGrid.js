import { CrossGridMaterial, Directions } from "../esm/index.js";
import { Common } from "./Common.js";
import { CommonGUI } from "./CommonGUI.js";
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

export class StudyCrossGrid {
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
    const spot = new PointLight(0xffffff, 7_000);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const geo = new SphereGeometry(10, 64, 64);

    const mat = new CrossGridMaterial({
      fog: scene.fog !== undefined,
    });
    mat.color = new Color(0xff6666);
    mat.direction = Directions.vertical;
    const mesh = new Mesh(geo, mat);
    scene.add(mesh);

    return mat;
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initWavyMaterialGUI(gui, mat);
    this.initGUIMaterial(gui, mat);
  }

  initGUIMaterial(gui, mat) {
    const folder = gui.addFolder("CrossGridMaterial");
    folder.add(mat, "gridWeight", 0.0, 0.5);
    folder.add(mat, "radius", 0.0, 0.5);
    folder.open();
  }
}

window.onload = () => {
  const study = new StudyCrossGrid();
};
