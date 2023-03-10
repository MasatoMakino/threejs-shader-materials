import { ContourMaterial } from "..";
import { Common } from "./Common";
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
    const renderer = Common.initRenderer(W, H);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    this.initObject(scene);
    RAFTicker.on("tick", (e) => {
      renderer.render(scene, camera);
    });
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 3, 0, 2);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const geo = new TorusGeometry(10, 4, 32, 32);

    const mat = new ContourMaterial({
      opacity: 0.75,
      fog: scene.fog !== undefined,
    });
    mat.loadMap("./textures/contour_glow.png", geo);
    mat.startGlow();
    mat.emissive = new Color(0xffff00);

    const mesh = new Mesh(geo, mat);
    scene.add(mesh);
  }
}

window.onload = () => {
  const study = new StudyContourMap();
};
