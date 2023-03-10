import { GridMaterial } from "./GridMaterial";
import {
  AnimationChunk,
  Directions,
  IWavyAnimatable,
  MaskMapChunk,
  ReversibleChunk,
  WavyAnimationChunk,
} from "./chunk";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { ShaderMaterialParameters, UniformsUtils } from "three";

/**
 * グリッド状に分割され、Wavyアニメーションを行うマテリアル。
 */
export abstract class WavyGridMaterial
  extends GridMaterial
  implements IWavyAnimatable
{
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
   * 明るさの底上げ
   */
  get raisedBottom(): number {
    return this.uniforms.raisedBottom.value;
  }
  set raisedBottom(value: number) {
    this.uniforms.raisedBottom.value = value;
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

  constructor(
    vertexShader: string,
    fragmentShader: string,
    parameters?: ShaderMaterialParameters
  ) {
    super(vertexShader, fragmentShader, parameters);
    this.isAnimate = this.isAnimate; //reset and start animation
  }

  protected initChunks(): void {
    super.initChunks();
    WavyAnimationChunk.registerChunk();
  }

  public static getBasicUniforms(): any {
    return UniformsUtils.merge([
      super.getBasicUniforms(),
      ReversibleChunk.getUniform(),
      WavyAnimationChunk.getUniform(),
      MaskMapChunk.getUniform(),
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);
  }

  /*
   * IAnimatable implements
   */
  private animationListener = (e) => {
    this.addTime(e.delta / 1000);
  };

  protected startAnimation() {
    RAFTicker.on("onBeforeTick", this.animationListener);
  }

  protected stopAnimation(): void {
    RAFTicker.off("onBeforeTick", this.animationListener);
  }
}
