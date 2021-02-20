import {
  Color,
  Fog,
  Mesh,
  PointLight,
  PointLightHelper,
  TorusGeometry
} from "three";
import { Common } from "./Common";
import { ExpansionMaterial } from "../lib/expansion/ExpansionMaterial";
import * as dat from "dat.gui";
import { CommonGUI } from "./CommonGUI";
import { RAFTicker, RAFTickerEventType } from "raf-ticker";

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
    RAFTicker.addEventListener(RAFTickerEventType.tick, e => {
      renderer.render(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const spot = new PointLight(0x00ffff, 3, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const seg = 32;
    const geo = new TorusGeometry(10, 4, seg, seg);
    const geoExp = new TorusGeometry(10, 4, seg, seg);

    const mat = new ExpansionMaterial({
      fog: scene.fog !== undefined
    });
    mat.color = new Color(0xff0000);

    const mesh = new Mesh(geo, mat);
    const meshExp = new Mesh(geoExp, mat);
    mesh.position.x = -25;
    meshExp.position.x = 25;
    scene.add(mesh);
    scene.add(meshExp);

    return mat;
  }

  initGUI(mat) {
    const gui = new dat.GUI();
    CommonGUI.initMaterialGUI(gui, mat);
    CommonGUI.initExpansionGUI(gui, mat);
  }
}

window.onload = () => {
  const study = new Study();
};
