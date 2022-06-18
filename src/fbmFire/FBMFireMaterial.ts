import { RAFTicker, RAFTickerEventType } from "@masatomakino/raf-ticker";
import { ShaderMaterialParameters, UniformsUtils } from "three";
import { AnimationChunk, IAnimatable } from "../chunk";
import { ITiledFBM, TilingFBMChunk } from "../chunk";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";

import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import FragmentShader from "./FBMFireMaterial.frag.glsl";

export class FBMFireMaterial extends ShaderPhongMaterial
  implements ITiledFBM, IAnimatable {
  get tiles(): number {
    return this.uniforms.tiles.value;
  }
  set tiles(value: number) {
    this.uniforms.tiles.value = value;
  }
  get hashLoop(): number {
    return this.uniforms.hashLoop.value;
  }
  set hashLoop(value: number) {
    this.uniforms.hashLoop.value = value;
  }
  get amp(): number {
    return this.uniforms.amp.value;
  }
  set amp(value: number) {
    this.uniforms.amp.value = value;
  }

  /*
   * IAnimatable implements
   */
  addTime(delta: number): void {
    AnimationChunk.addTime(this, delta);
  }

  /**
   * アニメーションを行うか否か。
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

  get strength(): number {
    return this.uniforms.strength.value;
  }
  set strength(value: number) {
    this.uniforms.strength.value = value;
  }
  get bloom(): number {
    return this.uniforms.bloom.value;
  }
  set bloom(value: number) {
    this.uniforms.bloom.value = value;
  }

  get transformSpeed(): number {
    return this.uniforms.transformSpeed.value;
  }
  set transformSpeed(value: number) {
    this.uniforms.transformSpeed.value = value;
  }

  get rimPow(): number {
    return this.uniforms.rimPow.value;
  }
  set rimPow(value: number) {
    this.uniforms.rimPow.value = value;
  }

  get rimStrength(): number {
    return this.uniforms.rimStrength.value;
  }
  set rimStrength(value: number) {
    this.uniforms.rimStrength.value = value;
  }

  /**
   *
   * @param parameters
   */
  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), FragmentShader(), parameters);
    this.isAnimate = this.isAnimate; //reset and start animation
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      TilingFBMChunk.getUniform(),
      AnimationChunk.getUniform(),
      {
        strength: { value: 0.45 },
        bloom: { value: 0.1 },
        rimStrength: { value: 1.0 },
        rimPow: { value: 1.0 },
      },
    ]);
  }

  protected initChunks(): void {
    super.initChunks();
    TilingFBMChunk.registerChunk();
    AnimationChunk.registerChunk();
  }

  protected initDefines(): void {
    super.initDefines();
    this.defines = Object.assign({}, TilingFBMChunk.getDefines(), this.defines);
    this.defines.USE_SURFACE_NORMAL = true;
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
