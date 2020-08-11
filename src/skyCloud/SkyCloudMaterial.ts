import { RAFTicker, RAFTickerEventType } from "raf-ticker";
import { Color, ShaderMaterialParameters, UniformsUtils } from "three";
import { AnimationChunk, IAnimatable } from "../chunk/AnimationChunk";

import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";

import FragmentShader from "./SkyCloudMaterial.frag.glsl";

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
    this.isAnimate = this.isAnimate; //reset and start animation
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

        skyColor: { value: new Color(0.101961, 0.619608, 0.666667) },
      },
    ]);
  }

  protected initDefaultSetting(parameters?: ShaderMaterialParameters): void {
    super.initDefaultSetting(parameters);

    if (parameters.transparent == null) {
      this.transparent = true;
    } else {
      this.transparent = parameters.transparent;
    }
  }

  /*
   * IAnimatable implements
   */
  private animationListener = (e) => {
    this.addTime(e.delta / 1000);
  };

  protected startAnimation() {
    RAFTicker.on(RAFTickerEventType.onBeforeTick, this.animationListener);
  }

  protected stopAnimation(): void {
    RAFTicker.off(RAFTickerEventType.onBeforeTick, this.animationListener);
  }
}
