import { TextureLoader } from "three";
import { Directions } from "../bin";

export class CommonGUI {
  static initColorGUI(folder, mat, propName = "color") {
    const prop = {};
    const targetColor = mat[propName];
    prop[propName] = targetColor.getHex();
    folder.addColor(prop, propName).onChange(val => {
      targetColor.setHex(val);
    });
    return prop;
  }

  static initMaterialGUI(gui, mat) {
    const folder = gui.addFolder("Material");
    this.initColorGUI(folder, mat);
    folder.add(mat, "transparent");
    folder.add(mat, "opacity", 0.0, 1.0);
    folder.open();
  }

  static initWavyMaterialGUI(gui, mat) {
    this.initMaterialGUI(gui, mat);

    const prop = {
      mask: "",
      alphaMap: ""
    };

    const folder = gui.addFolder("WavyGridMaterial");

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
