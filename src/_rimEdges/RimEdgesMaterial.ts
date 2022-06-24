import { ShaderLineMaterial } from "..";
import * as glsl from "./RimEdgesMaterial.glsl";
import { ShaderMaterialParameters } from "three";

export class RimEdgesMaterial extends ShaderLineMaterial {
  constructor(param: ShaderMaterialParameters) {
    super(glsl.vertex, null, param);
  }
}
