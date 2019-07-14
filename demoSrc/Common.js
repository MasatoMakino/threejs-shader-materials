import {
  AmbientLight,
  AxesHelper,
  Color,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Directions } from "../bin";

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

  static initWavyMaterialGUI(gui, mat) {
    const prop = {
      color: mat.color.getHex(),
      mask: "",
      alphaMap: ""
    };

    const folder = gui.addFolder("WavyGridMaterial");
    folder.addColor(prop, "color").onChange(val => {
      mat.color.setHex(val);
    });

    folder.add(mat, "isReversed");
    folder.add(mat, "division", 2.0, 256.0).step(1);
    folder.add(mat, "divisionScaleX", 0.0, 4.0).step(1);

    folder
      .add(prop, "mask", {
        none: "",
        earth: "./textures/landmask.png"
      })
      .onChange(val => {
        if (val === "") {
          mat.maskTexture = null;
        } else {
          mat.maskTexture = new TextureLoader().load(val);
        }
      });

    folder
      .add(prop, "alphaMap", {
        none: "",
        earth: "./textures/landmask.png"
      })
      .onChange(val => {
        if (val === "") {
          mat.alphaMap = null;
        } else {
          mat.alphaMap = new TextureLoader().load(val);
        }
      });

    folder.add(mat, "opacity", 0.0, 1.0);
    folder.open();

    const animationFolder = folder.addFolder("WavyAnimation");
    animationFolder.add(mat, "isAnimate");
    animationFolder.add(mat, "speed", -2, 2);
    animationFolder.add(mat, "waveFrequency", 0.0, 1.0);
    animationFolder.add(mat, "wavePow", 0.0, 4.0);
    animationFolder.add(mat, "direction", {
      horizontal: Directions.horizontal,
      vertical: Directions.vertical,
      radial: Directions.radial
    });
    animationFolder.add(mat, "raisedBottom", 0.0, 1.0);
    animationFolder.open();
  }
}
