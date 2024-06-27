import { RimBasicNodeMaterial } from "../esm/index.js";
import { Common } from "./Common.js";
import { CommonGUI } from "./CommonGUI.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import GUI from "lil-gui";
import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  Fog,
  Mesh,
  TorusGeometry,
} from "three";

export class Study {
  constructor() {
    const W = 1280;
    const H = 640;

    const scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);

    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H, 0x000000, true, true);
    Common.initControl(camera, renderer);
    Common.initHelper(scene);

    const mat = this.initObject(scene);
    RAFTicker.on("tick", (e) => {
      renderer.renderAsync(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const cubeGeo = new BoxGeometry(20, 20, 20);
    const cylinderGeo = new CylinderGeometry(6, 6, 20, 32);
    const torusGeo = new TorusGeometry(12, 6, 32, 32);

    const mat = new RimBasicNodeMaterial({
      fog: scene.fog !== undefined,
    });

    mat.opacity = 0.65;
    mat.color = new Color(0x003311);
    mat.rimColor.value = new Color(0x334400);
    mat.insideColor.value = new Color(0x000000);
    mat.rimPow.value = 2.0;
    mat.insidePow.value = 6.0;
    mat.insideStrength.value = 0.5;
    mat.transparent = true;

    const cubeMesh = new Mesh(cubeGeo, mat);
    cubeMesh.position.x = -40;
    const torusMesh = new Mesh(torusGeo, mat);
    const cylinder = new Mesh(cylinderGeo, mat);
    cylinder.position.x = 40;
    scene.add(cubeMesh, torusMesh, cylinder);

    return mat;
  }

  initGUI(mat) {
    const gui = new GUI();

    CommonGUI.initMaterialFolder(gui, mat, true);

    const folder = gui.addFolder("rimBasicNodeMaterial");
    const rimSetting = {
      rimColor: mat.rimColor.value.getHex(),
      rimStrength: mat.rimStrength.value,
      rimPow: mat.rimPow.value,
      insideColor: mat.insideColor.value.getHex(),
      insideStrength: mat.insideStrength.value,
      insidePow: mat.insidePow.value,
    };
    const onUpdate = () => {
      mat.rimStrength.value = rimSetting.rimStrength;
      mat.rimPow.value = rimSetting.rimPow;
      mat.insideStrength.value = rimSetting.insideStrength;
      mat.insidePow.value = rimSetting.insidePow;
    };

    CommonGUI.initColorNodeGUI(folder, mat, "rimColor");
    folder
      .add(rimSetting, "rimStrength", 0.0, 4.0)
      .step(0.01)
      .onChange(onUpdate);
    folder.add(rimSetting, "rimPow", 0.0, 4.0).step(0.01).onChange(onUpdate);

    CommonGUI.initColorNodeGUI(folder, mat, "insideColor");
    folder
      .add(rimSetting, "insideStrength", 0.0, 4.0)
      .step(0.01)
      .onChange(onUpdate);
    folder.add(rimSetting, "insidePow", 0.0, 8.0).step(0.01).onChange(onUpdate);
  }
}

window.onload = () => {
  new Study();
};
