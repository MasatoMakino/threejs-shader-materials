/**
 * 地球儀用の緯度経度グリッド
 */

import { ShaderMaterialParameters, UniformsUtils, Texture } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { AnimationChunk } from "../chunk/AnimationChunk";
import {
  WavyAnimationChunk,
  Directions,
  IWavyAnimatable
} from "../chunk/WavyAnimationChunk";
import { IReversible, ReversibleChunk } from "../chunk/ReversibleChunk";
import { IMaskable, MaskMapChunk } from "../chunk/MaskMapChunk";

import FragmentShader from "./HalftoneGridMaterial.frag.glsl";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";

export class HalftoneGridMaterial extends ShaderPhongMaterial
  implements IWavyAnimatable, IMaskable {
  addTime(delta: number): void {
    AnimationChunk.addTime(this, delta);
  }

  /**
   * 波アニメーションを行うか否か。
   */
  get isAnimate(): boolean {
    return this.uniforms.isAnimate.value;
  }
  set isAnimate(value: boolean) {
    this.uniforms.isAnimate.value = value;
  }

  /**
   * 波の速度
   * 0.5にすると1の半分の速度になる。
   * マイナスを指定すると、波の進行方向が反転する。
   */
  speed: number = -0.5;

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

  /**
   * 明るさの底上げ
   */
  get raisedBottom(): number {
    return this.uniforms.raisedBottom.value;
  }
  set raisedBottom(value: number) {
    this.uniforms.raisedBottom.value = value;
  }

  /**
   * グリッド線の太さ
   * 0.0で線なし、0.5でグリッド面なしになる。
   */
  get radius(): number {
    return this.uniforms.radius.value;
  }
  set radius(value: number) {
    this.uniforms.radius.value = value;
  }

  /**
   * 波の振幅
   * 1の場合、幅1ヘックス
   * 0.5の場合、幅2ヘックスになる
   */
  get waveFrequency(): number {
    return this.uniforms.waveFrequency.value;
  }
  set waveFrequency(value: number) {
    this.uniforms.waveFrequency.value = value;
  }

  get wavePow(): number {
    return this.uniforms.wavePow.value;
  }
  set wavePow(value: number) {
    this.uniforms.wavePow.value = value;
  }

  /**
   * 波が発生する方角
   */
  get direction(): Directions {
    return this.uniforms.direction.value;
  }
  set direction(value: Directions) {
    this.uniforms.direction.value = value;
  }

  //IMaskable interface implements
  get maskTexture(): Texture {
    return this.uniforms.maskTexture.value;
  }
  set maskTexture(val: Texture) {
    this.uniforms.maskTexture.value = val;
    this.uniforms.hasMaskTexture.value = val != null;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader, FragmentShader, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      WavyAnimationChunk.getUniform(),
      MaskMapChunk.getUniform(),
      {
        radius: { value: 0.75 }
      }
    ]);
  }

  protected initChunks(): void {
    super.initChunks();
    WavyAnimationChunk.registerChunk();
    MaskMapChunk.registerChunk();
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
    if (parameters.transparent == null) {
      this.transparent = true;
    }
  }
}
