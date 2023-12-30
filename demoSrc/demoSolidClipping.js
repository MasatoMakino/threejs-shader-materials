import { SolidClippingMaterial } from "../esm/index.js";
import { Common } from "./Common.js";
import { CommonGUI } from "./CommonGUI.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import GUI from "lil-gui";
import {
  Color,
  Fog,
  Mesh,
  Plane,
  PlaneHelper,
  PointLight,
  PointLightHelper,
  TorusKnotGeometry,
  Vector3,
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
    renderer.localClippingEnabled = true;

    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);
    const mat = this.initObject(scene);
    const mesh = this.initMesh(mat, scene);

    RAFTicker.on("tick", (e) => {
      renderer.render(scene, camera);
    });
    RAFTicker.on("onBeforeTick", (e) => {
      mesh.forEach((m) => {
        m.rotation.x += e.delta / 500;
      });
    });

    this.initGUI(mat);
  }

  initObject(scene) {
    const spot = new PointLight(0xffffff, 7000);
    spot.position.set(10, 20, 30);
    scene.add(spot);
    const helper = new PointLightHelper(spot);
    scene.add(helper);

    const mat = new SolidClippingMaterial({
      fog: scene.fog !== undefined,
    });
    mat.color = new Color(0x003311);
    mat.cutSectionColor = new Color(0xaaff11);

    const plane = new Plane(new Vector3(0, 0, -1), 1.0);
    mat.clippingPlanes = [plane];

    const planeHelper = new PlaneHelper(plane, 60);
    scene.add(planeHelper);

    return mat;
  }

  initMesh(mat, scene) {
    const geo = new TorusKnotGeometry(10, 3, 100, 16);

    const mesh = new Mesh(geo, mat);
    mesh.position.x = 24;
    scene.add(mesh);

    const mesh2 = new Mesh(geo, mat);
    mesh2.position.x = -24;
    scene.add(mesh2);

    return [mesh, mesh2];
  }

  initGUI(mat) {
    const gui = new GUI();
    CommonGUI.initMaterialGUI(gui, mat);
    this.initCutSectionGUI(gui, mat);
  }

  initCutSectionGUI(gui, mat) {
    const folder = gui.addFolder("CutSectionColor");
    CommonGUI.initColorGUI(folder, mat, "cutSectionColor");
    folder.open();
  }
}

window.onload = () => {
  const study = new Study();
};
