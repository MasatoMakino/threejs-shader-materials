import { ShaderMaterialParameters, UniformsUtils, Color } from "three";

import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { AnimationChunk, IAnimatable } from "../chunk/AnimationChunk";

import FragmentShader from "./SkyCloudMaterial.frag.glsl";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";

export class SkyCloudMaterial extends ShaderPhongMaterial
  implements IAnimatable {
  get scale(): number {
    return this.uniforms.scale.value;
  }
  set scale(value: number) {
    this.uniforms.scale.value = value;
  }

  /*
   * implements IAnimatable
   */
  private animationID: number;
  private lastAnimatedTimestamp: number;

  addTime(delta: number): void {
    AnimationChunk.addTime(this, delta);
  }

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
  speed: number = -0.02;

  get skyColor(): Color {
    return this.uniforms.skyColor.value;
  }
  set skyColor(value: Color) {
    this.uniforms.skyColor.value = value;
  }

  get cloudVolume(): number {
    return this.uniforms.cloudVolume.value;
  }
  set cloudVolume(value: number) {
    this.uniforms.cloudVolume.value = value;
  }

  get cloudBottomVolume(): number {
    return this.uniforms.cloudBottomVolume.value;
  }
  set cloudBottomVolume(value: number) {
    this.uniforms.cloudBottomVolume.value = value;
  }

  get cloudBottomSaturation(): number {
    return this.uniforms.cloudBottomSaturation.value;
  }
  set cloudBottomSaturation(value: number) {
    this.uniforms.cloudBottomSaturation.value = value;
  }

  get cloudTransformSpeed(): number {
    return this.uniforms.cloudTransformSpeed.value;
  }
  set cloudTransformSpeed(value: number) {
    this.uniforms.cloudTransformSpeed.value = value;
  }
  /**
   *
   * @param parameters
   */
  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), FragmentShader(), parameters);
  }

  protected initChunks(): void {
    super.initChunks();
    AnimationChunk.registerChunk();
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      AnimationChunk.getUniform(),
      {
        scale: { value: 3.0 },
        cloudTransformSpeed: { value: 0.15 },
        cloudVolume: { value: 16.0 },

        cloudBottomVolume: { value: 0.08 },
        cloudBottomSaturation: { value: 0.5 },

        skyColor: { value: new Color(0.101961, 0.619608, 0.666667) }
      }
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);

    if (parameters.transparent == null) {
      this.transparent = true;
    } else {
      this.transparent = parameters.transparent;
    }

    this.isAnimate = this.isAnimate; //reset and start requestAnimationFrame()
  }

  /*
   * implements IAnimatable
   */
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

  /*
   * TODO requestAnimationFrameの多重実行はパフォーマンスに悪影響を与える。
   * ref https://jsperf.com/single-raf-draw-calls-vs-multiple-raf-draw-calls
   * Object.onBeforeRenderなどを利用してcallを一本化できないか検討する。
   */

  protected onRequestAnimationFrame(timestamp: number) {
    if (this.lastAnimatedTimestamp != null) {
      const delta = (timestamp - this.lastAnimatedTimestamp) / 1000;
      this.addTime(delta);
    }

    this.lastAnimatedTimestamp = timestamp;
    this.animationID = requestAnimationFrame(t => {
      this.onRequestAnimationFrame(t);
    });
  }
}
