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
    // const spot = new PointLight(0xffffff, 30_000);
    // spot.position.set(10, 20, 30);
    // scene.add(spot);
    // const helper = new PointLightHelper(spot);
    // scene.add(helper);

    const geo = new TorusGeometry(10, 4, 32, 32);

    const mat = new ContourNodeMaterial({
      opacity: 0.75,
      fog: scene.fog !== undefined,
    });
    mat.color = new Color(0xff0000);
    // mat.emissive = new Color(0xffff00);

    const mesh = new Mesh(geo, mat);
    scene.add(mesh);
  }
}

window.onload = () => {
  const study = new StudyContourMap();
};
