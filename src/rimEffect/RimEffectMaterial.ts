import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
import VertexShader from "./RimEffectMaterial.vert.glsl";
import FragmentShader from "./RimEffectMaterial.frag.glsl";
import { UniformsUtils } from "three";
import { Color } from "three";

export class RimEffectMaterial extends ShaderPhongMaterial {
  get strength(): number {
    return this.uniforms.strength.value;
  }
  set strength(value: number) {
    this.uniforms.strength.value = value;
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
        strength: { value: 1.0 }
      }
    ]);
  }
}
