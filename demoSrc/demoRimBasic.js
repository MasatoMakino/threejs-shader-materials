import { Common } from "./Common";
import {
  BoxGeometry,
  Color, CylinderBufferGeometry,
  Fog,
  Mesh,
  PlaneBufferGeometry,
  PointLight,
  PointLightHelper,
  TorusGeometry,
} from "three";
import { RAFTicker, RAFTickerEventType } from "@masatomakino/raf-ticker";
import { RimBasicMaterial } from "..";
import GUI from "lil-gui";
import { CommonGUI } from "./CommonGUI";

export class Study {
  constructor() {
    const W = 1280;
    const H = 640;

    const scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);

    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H);
    Common.initControl(camera, renderer);
    Common.initHelper(scene);

    const mat = this.initObject(scene);
    RAFTicker.on(RAFTickerEventType.tick, (e) => {
      renderer.render(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const cubeGeo = new BoxGeometry( 20, 20 , 20);
    const cylinderGeo = new CylinderBufferGeometry( 6, 6, 20, 32);
    const torusGeo = new TorusGeometry(12, 6, 32, 32);

    const mat = new RimBasicMaterial({
      fog: scene.fog !== undefined,
    });

    mat.uniformOpacity = 0.65;
    mat.color = new Color(0x003311);
    mat.rimColor = new Color(0x334400);
    mat.insideColor = new Color(0x000000);
    mat.rimPow = 2.0;
    mat.insidePow = 6.0;
    mat.insideStrength = 0.5;
    mat.transparent = true;

    const cubeMesh = new Mesh(cubeGeo, mat);
    cubeMesh.position.x = -40;
    const torusMesh = new Mesh(torusGeo, mat);
    const cylinder = new Mesh( cylinderGeo, mat);
    cylinder.position.x = 40;
    scene.add(cubeMesh, torusMesh, cylinder);

    return mat;
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initBasicMaterialGUI(gui, mat);
    CommonGUI.initRimGUI(gui, mat);
  }
}

window.onload = () => {
  new Study();
};
