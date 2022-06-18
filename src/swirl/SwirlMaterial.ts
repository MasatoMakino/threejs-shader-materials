import { RAFTicker, RAFTickerEventType } from "@masatomakino/raf-ticker";
import {
  RepeatWrapping,
  ShaderMaterialParameters,
  Texture,
  UniformsUtils,
  Vector2,
} from "three";
import { AnimationChunk, IAnimatable, ShaderPhongMaterial } from "../index";
import FragmentShader from "./SwirlMaterial.frag.glsl";

export class SwirlMaterial extends ShaderPhongMaterial implements IAnimatable {
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

  protected onSetMap(val: Texture): void {
    super.onSetMap(val);
    this.setRepeat(val);
  }

  protected onSetAlphaMap(value: Texture): void {
    super.onSetAlphaMap(value);
    this.setRepeat(value);
  }

  /**
   * リピートモードは強制的にRepeatWrappingに
   * @param value
   */
  private setRepeat(value: Texture) {
    if (value) {
      value.wrapS = RepeatWrapping;
      value.wrapT = RepeatWrapping;
    }
  }

  get uvRotation(): number {
    return this.uniforms.uvRotation.value;
  }
  set uvRotation(value: number) {
    this.uniforms.uvRotation.value = value;
  }

  get swirlRotation(): number {
    return this.uniforms.swirlRotation.value;
  }
  set swirlRotation(value: number) {
    this.uniforms.swirlRotation.value = value;
  }

  get radius(): number {
    return this.uniforms.radius.value;
  }
  set radius(value: number) {
    this.uniforms.radius.value = value;
  }

  get center(): Vector2 {
    return this.uniforms.center.value;
  }
  set center(value: Vector2) {
    this.uniforms.center.value = value;
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
        uvRotation: { value: 0.0 },
        swirlRotation: { value: 3.14 },
        radius: { value: 0.5 },
        center: { value: new Vector2(0.5, 0.5) },
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
    RAFTicker.on(RAFTickerEventType.onBeforeTick, this.animationListener);
  }

  protected stopAnimation(): void {
    RAFTicker.off(RAFTickerEventType.onBeforeTick, this.animationListener);
  }
}
