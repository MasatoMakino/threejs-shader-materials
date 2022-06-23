import { ShaderMaterialParameters } from "three";
import { ShaderLineMaterial } from "..";
import * as glsl from "./RimEdgesMaterial.glsl";

export class RimEdgesMaterial extends ShaderLineMaterial {
  constructor(param: ShaderMaterialParameters) {
    super(glsl.vertex, null, param);
  }
}
