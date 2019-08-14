import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
import VertexShader from "./RimEffectMaterial.vert.glsl";
import FragmentShader from "./RimEffectMaterial.frag.glsl";
import { UniformsUtils } from "three";
import { Color } from "three";

export class RimEffectMaterial extends ShaderPhongMaterial {
  get rimPow(): number {
    return this.uniforms.rimPow.value;
  }
  set rimPow(value: number) {
    this.uniforms.rimPow.value = value;
  }

  get rimStrength(): number {
    return this.uniforms.rimStrength.value;
  }
  set rimStrength(value: number) {
    this.uniforms.rimStrength.value = value;
  }

  get rimColor(): Color {
    return this.uniforms.rimColor.value;
  }
  set rimColor(value: Color) {
    this.uniforms.rimColor.value = value;
  }

  /**
   *
   * @param parameters
   */
  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), FragmentShader(), parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      {
        rimColor: { value: new Color(1.0, 1.0, 1.0) },
        rimStrength: { value: 1.0 },
        rimPow: { value: 1.0 }
      }
    ]);
  }
}
