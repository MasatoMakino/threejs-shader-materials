import { Common } from "./Common";
import * as dat from "dat.gui";
import {
  Color,
  Fog,
  Mesh,
  PlaneBufferGeometry,
  PointLight,
  PointLightHelper,
  TextureLoader,
  RepeatWrapping
} from "three";
import { CommonGUI } from "./CommonGUI";
import { SwirlMaterial } from "../bin";
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
    const mat = this.initObject(scene);

    ThreeTicker.addEventListener(ThreeTickerEventType.tick, e => {
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

    const geo = new PlaneBufferGeometry(20, 20);

    const mat = new SwirlMaterial({
      fog: scene.fog !== undefined
    });
    mat.color = new Color(0x00aaff);
    mat.swirlRotation = Math.PI * 2 * 3;
    mat.radius = 1.4142 / 2;
    mat.speed = 0.1;
    mat.transparent = true;

    const loader = new TextureLoader();
    mat.alphaMap = loader.load("./textures/waternormals.jpg");

    const mesh = new Mesh(geo, mat);
    scene.add(mesh);

    return mat;
  }

  initGUI(mat) {
    const gui = new dat.GUI();
    CommonGUI.initMaterialGUI(gui, mat);
    this.initGUIMaterial(gui, mat);
    CommonGUI.initAnimationGUI(gui, mat);
  }

  initGUIMaterial(gui, mat) {
    const folder = gui.addFolder("Swirl");

    const prop = {
      centerX: mat.center.x,
      centerY: mat.center.y
    };
    const onChangeCenter = () => {
      mat.center.x = prop.centerX;
      mat.center.y = prop.centerY;
    };

    folder.add(mat, "uvRotation", 0.0, Math.PI * 2).step(0.01);
    folder.add(mat, "swirlRotation", 0.0, Math.PI * 2 * 6).step(0.01);
    folder.add(mat, "radius", 0.0, 1.4142 / 2).step(0.01);

    folder
      .add(prop, "centerX", 0.0, 1.0)
      .step(0.01)
      .onChange(onChangeCenter);
    folder
      .add(prop, "centerY", 0.0, 1.0)
      .step(0.01)
      .onChange(onChangeCenter);

    folder.open();
  }
}

window.onload = () => {
  const study = new Study();
};
