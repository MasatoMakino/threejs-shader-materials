import { Common } from "./Common";
import { CommonGUI } from "./CommonGUI";
import GUI from "lil-gui";
import {
  Color,
  Fog,
  Mesh,
  PointLight,
  PointLightHelper,
  SphereGeometry,
} from "three";
import { Directions, HalftoneGridMaterial } from "..";
import { RAFTicker, RAFTickerEventType } from "@masatomakino/raf-ticker";

export class StudyHalftoneGrid {
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
    RAFTicker.addEventListener(RAFTickerEventType.tick, (e) => {
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

    const mat = new HalftoneGridMaterial({
      // side:DoubleSide,
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
    const folder = gui.addFolder("HalftoneMaterial");
    folder.add(mat, "radius", 0.0, 1.0);
    folder.open();
  }
}

window.onload = () => {
  const study = new StudyHalftoneGrid();
};
