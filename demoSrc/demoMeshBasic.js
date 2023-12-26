import { ShaderBasicMaterial } from "..";
import { Common } from "./Common";
import { CommonGUI } from "./CommonGUI";
import { RAFTicker } from "@masatomakino/raf-ticker";
import GUI from "lil-gui";
import { Color, Fog, Mesh, PlaneGeometry } from "three";

export class Study {
  constructor() {
    const W = 640;
    const H = 480;

    const scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);

    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H);
    Common.initControl(camera, renderer);
    Common.initHelper(scene);

    const mat = this.initObject(scene);
    RAFTicker.on("tick", (e) => {
      renderer.render(scene, camera);
    });
    this.initGUI(mat);
  }

  initObject(scene) {
    const geo = new PlaneGeometry(20, 20);
    const mat = new ShaderBasicMaterial(null, null, {
      fog: scene.fog !== undefined,
    });

    mat.color = new Color(0xffffff);
    mat.uniformOpacity = 1.0;
    mat.transparent = true;

    const mesh = new Mesh(geo, mat);
    scene.add(mesh);

    return mat;
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initBasicMaterialGUI(gui, mat);
  }
}

window.onload = () => {
  const study = new Study();
};
