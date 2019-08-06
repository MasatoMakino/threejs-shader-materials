import {
  AmbientLight,
  AxesHelper,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Sky } from "three/examples/jsm/objects/Sky";
import { CommonGUI } from "./CommonGUI";

export class Common {
  static initScene() {
    const scene = new Scene();
    return scene;
  }

  static initLight(scene) {
    const ambientLight = new AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    return ambientLight;
  }

  static initCamera(scene, W, H, far = 400) {
    const camera = new PerspectiveCamera(45, W / H, 1, far);
    camera.position.set(0, 0, 100);
    camera.updateMatrixWorld(false);
    scene.add(camera);
    return camera;
  }

  static initControl(camera, render) {
    let domElement;
    if (render != null) {
      domElement = render.domElement;
    }
    const control = new OrbitControls(camera, domElement);
    control.update();
    return control;
  }

  static initRenderer(
    W,
    H,
    color = 0x000000,
    id = "webgl-canvas",
    antialias = true
  ) {
    const element = document.getElementById(id);
    element.style.zIndex = 0;
    element.style.position = "absolute";
    const renderer = new WebGLRenderer({
      canvas: element,
      antialias: antialias
    });
    renderer.setClearColor(new Color(color));
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
  }

  static initHelper(scene) {
    const axesHelper = new AxesHelper(30);
    scene.add(axesHelper);
  }

  static initSky(scene, gui) {
    const sunSphere = new Mesh(
      new SphereBufferGeometry(20000, 16, 8),
      new MeshBasicMaterial({ color: 0xffffff })
    );
    sunSphere.position.y = -700000;
    sunSphere.visible = false;
    scene.add(sunSphere);

    const sky = new Sky();
    sky.scale.setScalar(45000);
    scene.add(sky);

    CommonGUI.initSkyGUI(gui, sky, sunSphere);
  }

  static render(control, renderer, scene, camera, onBeforeRender) {
    const rendering = () => {
      if (onBeforeRender != null) {
        onBeforeRender();
      }
      control.update();
      renderer.render(scene, camera);
      requestAnimationFrame(rendering);
    };
    rendering();
  }
}
