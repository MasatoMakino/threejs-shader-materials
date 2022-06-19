import { TextureLoader } from "three";
import { Directions } from "..";

export class CommonGUI {
  static initColorGUI(folder, mat, propName = "color") {
    const prop = {};
    const targetColor = mat[propName];
    prop[propName] = targetColor.getHex();
    folder.addColor(prop, propName).onChange((val) => {
      targetColor.setHex(val);
    });
    return prop;
  }

  static initBasicMaterialGUI(gui, mat, folderName = "Material") {
    const folder = gui.addFolder(folderName);
    this.initMaterialFolder(folder, mat);
    folder.open();
    return folder;
  }

  static initMaterialGUI(gui, mat, folderName = "Material") {
    const folder = this.initBasicMaterialGUI(gui, mat, folderName);
    this.initColorGUI(folder, mat, "emissive");
  }

  static initMaterialFolder(folder, mat) {
    this.initColorGUI(folder, mat);
    folder.add(mat, "transparent");
    folder.add(mat, "uniformOpacity", 0.0, 1.0);
  }

  static initSpriteMaterialGUI(gui, mat, folderName = "Material") {
    const folder = gui.addFolder(folderName);
    this.initMaterialFolder(folder, mat);
    folder.open();
  }

  static initGridMaterialGUI(gui, mat) {
    this.initMaterialGUI(gui, mat);

    const prop = {
      mask: "",
      alphaMap: "",
    };

    const folder = gui.addFolder("WavyGridMaterial");

    folder.add(mat, "isReversed");
    folder.add(mat, "division", 2.0, 256.0).step(1);
    folder.add(mat, "divisionScaleX", 0.0, 4.0).step(1);

    folder
      .add(prop, "mask", {
        none: "",
        earth: "./textures/landmask.png",
      })
      .onChange((val) => {
        if (val === "") {
          mat.maskTexture = null;
        } else {
          mat.maskTexture = new TextureLoader().load(val);
        }
      });

    folder
      .add(prop, "alphaMap", {
        none: "",
        earth: "./textures/landmask.png",
      })
      .onChange((val) => {
        if (val === "") {
          mat.alphaMap = null;
        } else {
          mat.alphaMap = new TextureLoader().load(val);
        }
      });

    folder.open();
    return folder;
  }

  static initWavyMaterialGUI(gui, mat) {
    const folder = this.initGridMaterialGUI(gui, mat);

    const animationFolder = folder.addFolder("WavyAnimation");
    animationFolder.add(mat, "isAnimate");
    animationFolder.add(mat, "speed", -2, 2);
    animationFolder.add(mat, "waveFrequency", 0.0, 1.0);
    animationFolder.add(mat, "wavePow", 0.0, 4.0);
    animationFolder.add(mat, "direction", {
      horizontal: Directions.horizontal,
      vertical: Directions.vertical,
      radial: Directions.radial,
    });
    animationFolder.add(mat, "raisedBottom", 0.0, 1.0);
    animationFolder.open();
  }

  static initAnimationGUI(gui, mat, folderName = "Animation") {
    const folder = gui.addFolder(folderName);
    folder.add(mat, "isAnimate");
    folder.add(mat, "speed", -2, 2);
    folder.open();
  }

  static initRimGUI(gui, mat, folderName = "Rim Effect Material") {
    const folder = gui.addFolder(folderName);
    CommonGUI.initColorGUI(folder, mat, "rimColor");
    folder.add(mat, "rimStrength", 0.0, 4.0).step(0.01);
    folder.add(mat, "rimPow", 0.0, 4.0).step(0.01);

    CommonGUI.initColorGUI(folder, mat, "insideColor");
    folder.add(mat, "insideStrength", 0.0, 4.0).step(0.01);
    folder.add(mat, "insidePow", 0.0, 8.0).step(0.01);
    folder.open();
  }

  static initExpansionGUI(gui, mat, folderName = "ExpansionMaterial") {
    const folder = gui.addFolder("ExpansionMaterial");
    const ampRange = 12.0;
    folder.add(mat, "expansionStrength", -ampRange, ampRange).step(0.01);
    folder.open();
  }

  static initFBMTilingGUI(gui, mat, folderName = "FBM Tiling") {
    const folder = gui.addFolder("FBM Tiling");
    folder.add(mat, "tiles", 1.0, 8.0).step(1.0);
    folder.add(mat, "hashLoop", 2.0, 16.0).step(1.0);
    folder.add(mat, "amp", 0.0, 2.0).step(0.01);
    folder.open();
  }

  static initSkyGUI(gui, sky, sunSphere, renderer) {
    const effectController = {
      turbidity: 10,
      rayleigh: 0.15,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      inclination: 0.07, // elevation / inclination
      azimuth: 0.25, // Facing front,
      exposure: 0.75,
    };

    const distance = 400000;

    function guiChanged() {
      const uniforms = sky.material.uniforms;
      uniforms["turbidity"].value = effectController.turbidity;
      uniforms["rayleigh"].value = effectController.rayleigh;
      uniforms["mieCoefficient"].value = effectController.mieCoefficient;
      uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
      const theta = Math.PI * (effectController.inclination - 0.5);
      const phi = 2 * Math.PI * (effectController.azimuth - 0.5);
      sunSphere.position.x = distance * Math.cos(phi);
      sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
      sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);
      uniforms["sunPosition"].value.copy(sunSphere.position);

      renderer.toneMappingExposure = effectController.exposure;
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
    folder
      .add(effectController, "inclination", 0, 1, 0.0001)
      .onChange(guiChanged);
    folder.add(effectController, "azimuth", 0, 1, 0.0001).onChange(guiChanged);
    folder.add(effectController, "exposure", 0, 1, 0.0001).onChange(guiChanged);
    folder.open();
  }
}
