import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { WavyGridMaterial } from "../WavyGridMaterial.js";
import { fragment } from "./HalftoneGridMaterial.glsl.js";
import { ShaderMaterialParameters, UniformsUtils } from "three";

/**
 * MaskMapをハーフトーン分解するマテリアル
 */
export class HalftoneGridMaterial extends WavyGridMaterial {
  get radius(): number {
    return this.uniforms.radius.value;
  }
  set radius(value: number) {
    this.uniforms.radius.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(vertex, fragment, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      WavyGridMaterial.getBasicUniforms(),
      {
        radius: { value: 0.75 },
      },
    ]);
  }
}
