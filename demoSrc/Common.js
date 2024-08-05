import { CommonGUI } from "./CommonGUI.js";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AxesHelper,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  REVISION,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import WebGPURenderer from "three/src/renderers/webgpu/WebGPURenderer.js";

export class Common {
  static initScene() {
    const scene = new Scene();
    return scene;
  }

  static initLight(scene) {
    const ambientLight = new AmbientLight(0xffffff, Math.PI);
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

  static initRenderer(W, H, color = 0x000000, antialias = true, isGPU = false) {
    const convertRGBToHex = (rgb) => {
      const hex = rgb.toString(16);
      return "#" + hex.padStart(6, "0");
    };

    const getRenderer = () => {
      if (isGPU) {
        return new WebGPURenderer({
          antialias: antialias,
        });
      }
      return new WebGLRenderer({
        antialias: antialias,
      });
    };
    const renderer = getRenderer();
    renderer.setClearColor(new Color(color));
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.backgroundColor = convertRGBToHex(color);
    document.body.appendChild(renderer.domElement);
    console.log("three.js revision: ", REVISION);
    return renderer;
  }

  static initHelper(scene) {
    const axesHelper = new AxesHelper(30);
    scene.add(axesHelper);
  }

  static initSky(scene, gui, renderer) {
    renderer.toneMapping = ACESFilmicToneMapping;

    const sunSphere = new Mesh(
      new SphereGeometry(20000, 16, 8),
      new MeshBasicMaterial({ color: 0xffffff }),
    );
    sunSphere.position.y = -700000;
    sunSphere.visible = false;
    scene.add(sunSphere);

    const sky = new Sky();
    sky.scale.setScalar(45000);
    scene.add(sky);

    CommonGUI.initSkyGUI(gui, sky, sunSphere, renderer);
  }
}
