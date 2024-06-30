import { ContourNodeMaterial } from "../esm/index.js";
import { Common } from "./Common.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import {
  Color,
  Fog,
  Mesh,
  PointLight,
  PointLightHelper,
  TorusGeometry,
} from "three";
import GUI from "lil-gui";
import { CommonGUI } from "./CommonGUI.js";

export class StudyContourMap {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H, 0x000000, true, true);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    this.initObject(scene);
    RAFTicker.on("tick", (e) => {
      renderer.renderAsync(scene, camera);
    });
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 30_000);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const geo = new TorusGeometry(10, 4, 32, 32);

    const mat = new ContourNodeMaterial({
      opacity: 0.75,
      fog: scene.fog !== undefined,
    });
    mat.color = new Color(0xff0000);

    const mesh = new Mesh(geo, mat);
    scene.add(mesh);

    this.initGUI(mat);
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initMaterialFolder(gui, mat, true);

    const prop = {
      scaleY: mat.scaleY.value,
      smoothMin: mat.smoothMin.value,
      smoothMax: mat.smoothMax.value,
    };
    const onUpdate = () => {
      mat.scaleY.value = prop.scaleY;
      mat.smoothMin.value = prop.smoothMin;
      mat.smoothMax.value = prop.smoothMax;
    };

    const folder = gui.addFolder("ContourNodeMaterial");
    folder.add(prop, "scaleY", 0.0, 4.0).onChange(onUpdate);
    folder.add(prop, "smoothMin", 0.0, 1.0).onChange(onUpdate);
    folder.add(prop, "smoothMax", 0.0, 1.0).onChange(onUpdate);
  }
}

window.onload = () => {
  const study = new StudyContourMap();
};
