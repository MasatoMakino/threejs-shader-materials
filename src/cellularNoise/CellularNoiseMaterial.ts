import { ShaderPhongMaterial, IAnimatable, AnimationChunk } from "../index";
import { ShaderMaterialParameters, UniformsUtils } from "three";
import FragmentShader from "./CellularNoiseMaterial.frag.glsl";
import { RAFTicker, RAFTickerEventType } from "raf-ticker";

export class CellularNoiseMaterial extends ShaderPhongMaterial
  implements IAnimatable {
  /*
   * implements IAnimatable
   */
  speed: number = -0.02;

  addTime(delta: number): void {
    if (this.isAnimate) {
      AnimationChunk.addTime(this, delta);
    }
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

  get grid(): number {
    return this.uniforms.grid.value;
  }
  set grid(value: number) {
    this.uniforms.grid.value = value;
  }

  get divisionScaleX(): number {
    return this.uniforms.divisionScaleX.value;
  }
  set divisionScaleX(value: number) {
    this.uniforms.divisionScaleX.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, FragmentShader(), parameters);
    this.isAnimate = this.isAnimate;
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
        grid: { value: 3.0 },
        divisionScaleX: { value: 1.0 }
      }
    ]);
  }
  /*
   * IAnimatable implements
   */
  private animationListener = e => {
    this.addTime(e.delta / 1000);
  };

  protected startAnimation() {
    RAFTicker.addEventListener(
      RAFTickerEventType.onBeforeTick,
      this.animationListener
    );
  }

  protected stopAnimation(): void {
    RAFTicker.removeEventListener(
      RAFTickerEventType.onBeforeTick,
      this.animationListener
    );
  }
}
