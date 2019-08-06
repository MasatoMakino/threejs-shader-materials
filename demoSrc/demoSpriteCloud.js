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

export class Study {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    scene.fog = new Fog(0x44ffff, 80, 160);
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H, 0x44ffff);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    this.initObject(scene);
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
    mat.color = new Color(0x999999);
    const loader = new TextureLoader();
    mat.map = loader.load("./textures/cloud.png");

    mat.skyColor = new Color(0x0000ff);
    mat.bottomStrength = 2.0;

    mat.rimColor = new Color(0xffffff);
    mat.rimStrength = 0.5;

    const sprite = new Sprite(mat);
    sprite.scale.set(30, 30, 1.0);
    sprite.position.x = 0;

    scene.add(sprite);
  }
}

window.onload = () => {
  const study = new Study();
};
