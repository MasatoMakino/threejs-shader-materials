import {
  Color,
  Fog,
  PointLight,
  PointLightHelper,
  Sprite,
  TextureLoader
} from "three";
import { Common } from "./Common";
import { ShaderSpriteMaterial } from "../bin";
import { ThreeTicker, ThreeTickerEventType } from "threejs-ticker";

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
    this.initObject(scene);
    ThreeTicker.addEventListener(ThreeTickerEventType.tick, e => {
      renderer.render(scene, camera);
    });
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 3, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const mat = new ShaderSpriteMaterial(null, null, {
      fog: scene.fog !== undefined
    });
    mat.color = new Color(0xff0000);
    const loader = new TextureLoader();
    mat.map = loader.load("./textures/landmask.png");
    // mat.lights = true;

    const sprite = new Sprite(mat);
    sprite.scale.set(20, 20, 1.0);
    sprite.position.x = 30;

    scene.add(sprite);
  }
}

window.onload = () => {
  const study = new Study();
};
