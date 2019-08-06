import {
  Color,
  Fog,
  PointLight,
  PointLightHelper,
  Sprite,
  TextureLoader
} from "three";
import { Common } from "./Common";
import { SpriteCloudMaterial } from "../bin";
import * as dat from "dat.gui";
import { CommonGUI } from "./CommonGUI";

export class Study {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    scene.fog = new Fog(0x557799, 300, 600);
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    const mat = this.initObject(scene);

    const gui = new dat.GUI();
    Common.initSky(scene, gui);
    this.initGUI(gui, mat);

    Common.render(control, renderer, scene, camera);
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 3, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const mat = new SpriteCloudMaterial({
      fog: scene.fog !== undefined,
      transparent: true
    });
    mat.color = new Color(0xdddddd);
    const loader = new TextureLoader();
    mat.map = loader.load("./textures/cloud.png");

    mat.skyColor = new Color(0x99aabb);
    mat.bottomStrength = 0.7;

    mat.rimColor = new Color(0xffffff);

    const sprite = new Sprite(mat);
    sprite.scale.set(30, 30, 1.0);
    sprite.position.x = 0;

    scene.add(sprite);
    return mat;
  }

  initGUI(gui, mat) {
    CommonGUI.initMaterialGUI(gui, mat);

    const cloudGUI = gui.addFolder("SpriteCloud");
    CommonGUI.initColorGUI(cloudGUI, mat, "skyColor");
    cloudGUI.add(mat, "bottomStrength", 0.0, 5.0);
    CommonGUI.initColorGUI(cloudGUI, mat, "rimColor");
    cloudGUI.add(mat, "rimStrength", 0.0, 5.0);
    cloudGUI.add(mat, "rimCenter", 0.0, 1.0);
    cloudGUI.add(mat, "rimRange", 0.0, 1.0);

    cloudGUI.open();
  }
}

window.onload = () => {
  const study = new Study();
};
