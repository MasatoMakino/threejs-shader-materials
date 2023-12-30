import { ShaderLineMaterial } from "../index.js";
import * as glsl from "./RimEdgesMaterial.glsl.js";
import { ShaderMaterialParameters } from "three";

export class RimEdgesMaterial extends ShaderLineMaterial {
  constructor(param: ShaderMaterialParameters) {
    super(glsl.vertex, null, param);
  }
}
