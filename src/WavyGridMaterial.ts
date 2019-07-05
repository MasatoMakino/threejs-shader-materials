import { Texture, UniformsUtils } from "three";
import { ShaderMaterialParameters } from "three";
import { ShaderPhongMaterial } from "./ShaderPhongMaterial";
import {
  Directions,
  IWavyAnimatable,
  WavyAnimationChunk
} from "./chunk/WavyAnimationChunk";
import { IMaskable, MaskMapChunk } from "./chunk/MaskMapChunk";
import { IReversible, ReversibleChunk } from "./chunk/ReversibleChunk";
import { AnimationChunk } from "./chunk/AnimationChunk";

/**
 * グリッド状に分割され、Wavyアニメーションを行うマテリアル。
 */
export class WavyGridMaterial extends ShaderPhongMaterial
  implements IWavyAnimatable, IReversible, IMaskable {
  protected animationID: number;
  protected lastAnimatedTimestamp: number;

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
    if (this.isAnimate) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
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

  protected initChunks(): void {
    super.initChunks();
    WavyAnimationChunk.registerChunk();
    MaskMapChunk.registerChunk();
    ReversibleChunk.registerChunk();
  }

  public static getBasicUniforms(): any {
    return UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      ReversibleChunk.getUniform(),
      WavyAnimationChunk.getUniform(),
      MaskMapChunk.getUniform()
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
    if (parameters.transparent == null) {
      this.transparent = true;
    }
    this.isAnimate = this.isAnimate; //reset and start requestAnimationFrame()
  }

  protected startAnimation(): void {
    if (this.animationID != null) return;
    this.animationID = requestAnimationFrame(timestamp => {
      this.onRequestAnimationFrame(timestamp);
    });
  }

  protected stopAnimation(): void {
    this.lastAnimatedTimestamp = null;
    if (this.animationID == null) return;
    cancelAnimationFrame(this.animationID);
    this.animationID = null;
  }

  protected onRequestAnimationFrame(timestamp: number) {
    if (this.lastAnimatedTimestamp != null) {
      const delta = (timestamp - this.lastAnimatedTimestamp) / 1000;
      this.addTime(delta);
    }

    this.lastAnimatedTimestamp = timestamp;
    this.animationID = requestAnimationFrame(timestamp => {
      this.onRequestAnimationFrame(timestamp);
    });
  }
}
