import { OuterGlowMaterial } from "../esm/index.js";
import { Common } from "./Common.js";
import { CommonGUI } from "./CommonGUI.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import GUI from "lil-gui";
import {
  AdditiveBlending,
  Color,
  Fog,
  Mesh,
  MeshBasicMaterial,
  PointLight,
  PointLightHelper,
  TorusGeometry,
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
    const spot = new PointLight(0x00ffff, 3, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const seg = 32;
    const geo = new TorusGeometry(10, 4, seg, seg);

    const matBase = new MeshBasicMaterial({ color: 0xff0000 });

    const matGlow = new OuterGlowMaterial({
      fog: scene.fog !== undefined,
      transparent: false,
    });
    matGlow.color = new Color(0x000000);
    matGlow.rimStrength = 0.0;
    matGlow.expansionStrength = 1.3;
    matGlow.insidePow = 2.0;
    matGlow.insideStrength = 2.0;
    matGlow.insideColor = new Color(0x00ffff);
    matGlow.depthWrite = false;
    matGlow.blending = AdditiveBlending;

    const mesh = new Mesh(geo, matBase);
    const meshGlow = new Mesh(geo, matGlow);
    meshGlow.renderOrder = -1;

    mesh.position.x = -25;
    meshGlow.position.x = -25;

    scene.add(mesh);
    scene.add(meshGlow);

    return matGlow;
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initMaterialGUI(gui, mat);
    CommonGUI.initExpansionGUI(gui, mat);
    CommonGUI.initRimGUI(gui, mat);
  }
}

window.onload = () => {
  const study = new Study();
};
