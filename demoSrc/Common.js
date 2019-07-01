import {
  AmbientLight,
  AxesHelper,
  Color,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

  static initCamera(scene, W, H) {
    const camera = new PerspectiveCamera(45, W / H, 1, 400);
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
    const renderer = new WebGLRenderer({
      canvas: document.getElementById(id),
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
