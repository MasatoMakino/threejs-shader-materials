/**
 * 地球儀用の緯度経度グリッド
 */

import { ShaderMaterialParameters, Texture, UniformsUtils } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";

import { AnimationChunk } from "../chunk/AnimationChunk";
import {
  Directions,
  IWavyAnimatable,
  WavyAnimationChunk
} from "../chunk/WavyAnimationChunk";
import { IReversible, ReversibleChunk } from "../chunk/ReversibleChunk";
import { IMaskable, MaskMapChunk } from "../chunk/MaskMapChunk";

import FragmentShader from "./CrossGridMaterial.frag.glsl";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";

export class CrossGridMaterial extends ShaderPhongMaterial
  implements IWavyAnimatable, IReversible, IMaskable {
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

  get isReversed(): boolean {
    return this.uniforms.isReversed.value;
  }
  set isReversed(value: boolean) {
    this.uniforms.isReversed.value = value;
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
  get gridWeight(): number {
    return this.uniforms.gridWeight.value;
  }
  set gridWeight(value: number) {
    this.uniforms.gridWeight.value = value;
  }

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

  get maskTexture(): Texture {
    return MaskMapChunk.getMaskTexture(this);
  }
  set maskTexture(val: Texture) {
    MaskMapChunk.setMaskTexture(this, val);
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader, FragmentShader, parameters);
  }

  protected initChunks(): void {
    super.initChunks();
    WavyAnimationChunk.registerChunk();
    MaskMapChunk.registerChunk();
    ReversibleChunk.registerChunk();
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      ReversibleChunk.getUniform(),
      WavyAnimationChunk.getUniform(),
      MaskMapChunk.getUniform(),
      {
        gridWeight: { value: 0.03 },
        radius: { value: 0.15 }
      }
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
    if (parameters.transparent == null) {
      this.transparent = true;
    }
  }
}
