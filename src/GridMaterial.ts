import { Texture, UniformsUtils, ShaderMaterialParameters } from "three";
import { ShaderPhongMaterial } from "./ShaderPhongMaterial";
import { IReversible, ReversibleChunk } from "./chunk/ReversibleChunk";
import { IMaskable, MaskMapChunk } from "./chunk/MaskMapChunk";

/**
 * グリッド状に分割されたマテリアル。
 */

export abstract class GridMaterial extends ShaderPhongMaterial
  implements IReversible, IMaskable {
  get division(): number {
    return this.uniforms.division.value;
  }
  set division(value: number) {
    this.uniforms.division.value = value;
  }

  get divisionScaleX(): number {
    return this.uniforms.divisionScaleX.value;
  }
  set divisionScaleX(value: number) {
    this.uniforms.divisionScaleX.value = value;
  }

  get isReversed(): boolean {
    return this.uniforms.isReversed.value;
  }
  set isReversed(value: boolean) {
    this.uniforms.isReversed.value = value;
  }

  get maskTexture(): Texture {
    return MaskMapChunk.getMaskTexture(this);
  }
  set maskTexture(val: Texture) {
    MaskMapChunk.setMaskTexture(this, val);
  }

  protected initChunks(): void {
    super.initChunks();
    MaskMapChunk.registerChunk();
    ReversibleChunk.registerChunk();
  }

  public static getBasicUniforms(): any {
    return UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      ReversibleChunk.getUniform(),
      MaskMapChunk.getUniform()
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
    if (parameters.transparent == null) {
      this.transparent = true;
    }
  }
}
