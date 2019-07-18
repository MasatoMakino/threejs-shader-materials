import { Common } from "./Common";
import * as dat from "dat.gui";
import {
  Color,
  Fog,
  Mesh,
  PointLight,
  PointLightHelper,
  SphereGeometry
} from "three";
import { HalftoneGridMaterial } from "../bin/halftoneGrid/HalftoneGridMaterial";
import { Directions } from "../bin/chunk/WavyAnimationChunk";
import { FBMDissolveMaterial } from "../bin/fbmDissolve/FBMDissolveMaterial";
import { FBMFireMaterial } from "../bin/fbmFire/FBMFireMaterial";

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
    Common.render(control, renderer, scene, camera);

    this.initGUI(mat);
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 1, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const geo = new SphereGeometry(30, 32, 32);

    const mat = new FBMFireMaterial({
      fog: scene.fog !== undefined
    });
    mat.color = new Color(0xff00cc);
    mat.tiles = 1;
    mat.hashLoop = 5.0;
    mat.amp = 1.0;

    const mesh = new Mesh(geo, mat);
    mesh.scale.set(0.5, 1.0, 0.5);
    scene.add(mesh);

    return mat;
  }

  initGUI(mat) {
    const gui = new dat.GUI();
    this.initGUIBaseMaterial(gui, mat);
    this.initGUIMaterial(gui, mat);
    this.initGUIFireMaterial(gui, mat);
  }

  initGUIBaseMaterial(gui, mat) {
    const folder = gui.addFolder("Material");
    const prop = {
      color: mat.color.getHex()
    };
    folder.addColor(prop, "color").onChange(val => {
      mat.color.setHex(val);
    });
    folder.open();
  }

  initGUIMaterial(gui, mat) {
    const folder = gui.addFolder("FBM Tiling");
    folder.add(mat, "tiles", 1.0, 8.0).step(1.0);
    folder.add(mat, "hashLoop", 1.0, 16.0).step(1.0);
    folder.add(mat, "amp", 0.0, 2.0).step(0.01);
    folder.open();
  }

  initGUIFireMaterial(gui, mat) {
    const folder = gui.addFolder("FBM Animation");

    folder.add(mat, "strength", 0.0, 1.0).step(0.01);
    folder.add(mat, "bloom", 0.0, 1.0).step(0.01);
    folder.add(mat, "speed", -8.0, 8.0).step(0.01);
    folder.open();
  }
}

window.onload = () => {
  const study = new Study();
};
