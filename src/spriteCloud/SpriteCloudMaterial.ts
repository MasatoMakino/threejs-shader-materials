import { ShaderMaterialParameters } from "three";
import { UniformsUtils } from "three";
import { Color } from "three";

import { ShaderSpriteMaterial } from "../ShaderSpriteMaterial";
import VertexShader from "../ShaderSpriteMaterial.vert.glsl";
import FragmentShader from "./SpriteCloudMaterial.frag.glsl";

export class SpriteCloudMaterial extends ShaderSpriteMaterial {
  constructor(parameters?: ShaderMaterialParameters) {
    super(null, FragmentShader(), parameters);
  }

  /**
   * uniformsを初期化する。
   */
  protected initUniforms(): void {
    super.initUniforms();
    this.uniforms = UniformsUtils.merge([
      this.uniforms,
      {
        rimStrength: { value: 1.0 },
        bottomStrength: { value: 1.0 },
        rimColor: { value: new Color(0xffffff) },
        skyColor: { value: new Color(0xcccccc) }
      }
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
  }

  get rimStrength(): number {
    return this.uniforms.rimStrength.value;
  }
  set rimStrength(value: number) {
    this.uniforms.rimStrength.value = value;
  }
  get bottomStrength(): number {
    return this.uniforms.bottomStrength.value;
  }
  set bottomStrength(value: number) {
    this.uniforms.bottomStrength.value = value;
  }

  get rimColor(): Color {
    return this.uniforms.rimColor.value;
  }
  set rimColor(value: Color) {
    this.uniforms.rimColor.value = value;
  }
  get skyColor(): Color {
    return this.uniforms.skyColor.value;
  }
  set skyColor(value: Color) {
    this.uniforms.skyColor.value = value;
  }
}
