import * as dat from "dat.gui";
import { Common } from "./Common";
import {
  Color,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SphereBufferGeometry
} from "three";
import { Sky } from "three/examples/jsm/objects/Sky";
import { SkyCloudMaterial } from "../bin";

export class StudyHexGrid {
  constructor() {
    const W = 1024;
    const H = 768;

    const scene = Common.initScene();
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H, 20000);
    const renderer = Common.initRenderer(W, H);
    const control = Common.initControl(camera, renderer);
    Common.initHelper(scene);

    const gui = new dat.GUI();

    this.initSky(scene, gui);

    const mat = this.initObject(scene);
    Common.render(control, renderer, scene, camera);

    this.initGUI(gui, mat);
  }

  initObject(scene) {
    const size = 40000;
    const geo = new PlaneGeometry(size, size);
    const mat = new SkyCloudMaterial({
      fog: scene.fog !== undefined
    });
    const mesh = new Mesh(geo, mat);
    mesh.position.y = 800;
    mesh.rotation.x = Math.PI / 2;

    mat.scale = 24.0;
    mat.skyColor = new Color(0x1155aa);
    mat.cloudVolume = 4.0;
    scene.add(mesh);

    return mat;
  }

  initSky(scene, gui) {
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

    const effectController = {
      turbidity: 10,
      rayleigh: 0.15,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      luminance: 1,
      inclination: 0.07, // elevation / inclination
      azimuth: 0.25, // Facing front,
      sun: !true
    };

    var distance = 400000;

    function guiChanged() {
      const uniforms = sky.material.uniforms;
      uniforms["turbidity"].value = effectController.turbidity;
      uniforms["rayleigh"].value = effectController.rayleigh;
      uniforms["luminance"].value = effectController.luminance;
      uniforms["mieCoefficient"].value = effectController.mieCoefficient;
      uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
      const theta = Math.PI * (effectController.inclination - 0.5);
      const phi = 2 * Math.PI * (effectController.azimuth - 0.5);
      sunSphere.position.x = distance * Math.cos(phi);
      sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
      sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);
      sunSphere.visible = effectController.sun;
      uniforms["sunPosition"].value.copy(sunSphere.position);
    }
    guiChanged();

    const folder = gui.addFolder("Sky");
    folder
      .add(effectController, "turbidity", 1.0, 20.0, 0.1)
      .onChange(guiChanged);
    folder
      .add(effectController, "rayleigh", 0.0, 4, 0.001)
      .onChange(guiChanged);
    folder
      .add(effectController, "mieCoefficient", 0.0, 0.1, 0.001)
      .onChange(guiChanged);
    folder
      .add(effectController, "mieDirectionalG", 0.0, 1, 0.001)
      .onChange(guiChanged);
    folder.add(effectController, "luminance", 0.0, 2).onChange(guiChanged);
    folder
      .add(effectController, "inclination", 0, 1, 0.0001)
      .onChange(guiChanged);
    folder.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);
    folder.add(effectController, "sun").onChange(guiChanged);
    folder.open();
  }

  initGUI(gui, mat) {
    this.initGUIMaterial(gui, mat);
    this.initGUISkyAnimation(gui, mat);
    this.initGUISkyColor(gui, mat);
  }

  initGUIMaterial(gui, mat) {
    const folder = gui.addFolder("SkyCloudMaterial");

    folder.add(mat, "opacity", 0.0, 1.0).step(0.01);
    folder.add(mat, "scale", 0.1, 128).step(0.1);
    folder.add(mat, "cloudVolume", 1.0, 128.0);

    folder.open();
  }

  initGUISkyAnimation(gui, mat) {
    const folder = gui.addFolder("SkyCloudMaterial - Animation");

    folder.add(mat, "isAnimate");
    folder.add(mat, "speed", -2.0, 2.0);
    folder.add(mat, "cloudTransformSpeed", 0.0, 20.0);

    folder.open();
  }

  initGUISkyColor(gui, mat) {
    const folder = gui.addFolder("SkyCloudMaterial - Color");
    const prop = {
      color: mat.color.getHex(),
      skyColor: mat.skyColor.getHex()
    };
    folder.addColor(prop, "color").onChange(val => {
      mat.color.setHex(val);
    });
    folder.addColor(prop, "skyColor").onChange(val => {
      mat.skyColor.setHex(val);
    });
    folder.add(mat, "cloudBottomVolume", 0.0, 0.3).step(0.01);
    folder.add(mat, "cloudBottomSaturation", 0.0, 0.7).step(0.01);

    folder.open();
  }
}

window.onload = () => {
  const study = new StudyHexGrid();
};
