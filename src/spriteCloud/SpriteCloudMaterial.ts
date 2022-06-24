import { ShaderSpriteMaterial } from "../ShaderSpriteMaterial";
import FragmentShader from "./SpriteCloudMaterial.frag.glsl";
import { Color, ShaderMaterialParameters, UniformsUtils } from "three";

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
        rimStrength: { value: 0.2 },
        bottomStrength: { value: 0.75 },
        rimColor: { value: new Color(0xffffff) },
        skyColor: { value: new Color(0xcccccc) },
        rimCenter: { value: 0.6 },
        rimRange: { value: 0.15 },
      },
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
  }

  get rimCenter(): number {
    return this.uniforms.rimCenter.value;
  }
  set rimCenter(value: number) {
    this.uniforms.rimCenter.value = value;
  }
  get rimRange(): number {
    return this.uniforms.rimRange.value;
  }
  set rimRange(value: number) {
    this.uniforms.rimRange.value = value;
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
