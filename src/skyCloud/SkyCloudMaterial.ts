import { ShaderPhongMaterial } from "../ShaderPhongMaterial.js";
import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { AnimationChunk, IAnimatable } from "../chunk/index.js";
import { fragment } from "./SkyCloudMaterial.glsl.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { Color, ShaderMaterialParameters, UniformsUtils } from "three";

export class SkyCloudMaterial
  extends ShaderPhongMaterial
  implements IAnimatable
{
  get scale(): number {
    return this.uniforms.scale.value;
  }
  set scale(value: number) {
    this.uniforms.scale.value = value;
  }

  /*
   * implements IAnimatable
   */
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
    super(vertex, fragment, parameters);
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
