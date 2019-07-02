/**
 * MaskMapをハーフトーン分解するマテリアル
 */

import { ShaderMaterialParameters, UniformsUtils } from "three";

import FragmentShader from "./HalftoneGridMaterial.frag.glsl";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import { WavyGridMaterial } from "../WavyGridMaterial";

export class HalftoneGridMaterial extends WavyGridMaterial {
  get radius(): number {
    return this.uniforms.radius.value;
  }
  set radius(value: number) {
    this.uniforms.radius.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader, FragmentShader, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      WavyGridMaterial.getBasicUniforms(),
      {
        radius: { value: 0.75 }
      }
    ]);
  }
}
