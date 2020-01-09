import { Common } from "./Common";
import * as dat from "dat.gui";
import {
  Color,
  Mesh,
  PointLight,
  PointLightHelper,
  TorusGeometry
} from "three";
import { RimEffectMaterial } from "../lib/";
import { CommonGUI } from "./CommonGUI";
import { RAFTicker, RAFTickerEventType } from "raf-ticker";

export class Study {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    // scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    const mat = this.initObject(scene);
    RAFTicker.addEventListener(RAFTickerEventType.tick, e => {
      renderer.render(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 0.25, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const geo = new TorusGeometry(12, 6, 32, 32);

    const mat = new RimEffectMaterial({
      fog: scene.fog !== undefined
    });
    mat.transparent = true;
    mat.color = new Color(0x003311);
    mat.rimColor = new Color(0xaacc55);
    mat.insideColor = new Color(0x0077ff);
    mat.rimPow = 2.0;
    mat.insidePow = 6.0;
    mat.insideStrength = 0.5;

    const mesh = new Mesh(geo, mat);
    mesh.position.x = 24;
    scene.add(mesh);

    const mesh2 = new Mesh(geo, mat);
    mesh2.position.x = -24;
    scene.add(mesh2);

    return mat;
  }

  initGUI(mat) {
    const gui = new dat.GUI();
    CommonGUI.initMaterialGUI(gui, mat);
    CommonGUI.initRimGUI(gui, mat);
  }
}

window.onload = () => {
  const study = new Study();
};
