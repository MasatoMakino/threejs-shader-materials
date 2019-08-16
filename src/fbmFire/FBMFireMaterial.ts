import { ShaderMaterialParameters, UniformsUtils } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";

import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import FragmentShader from "./FBMFireMaterial.frag.glsl";
import { ITiledFBM, TilingFBMChunk } from "../chunk/TilingFBMChunk";
import { IAnimatable, AnimationChunk } from "../chunk/AnimationChunk";

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
  protected animationID: number;
  protected lastAnimatedTimestamp: number;

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
        rimPow: { value: 1.0 }
      }
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
    this.isAnimate = this.isAnimate; //reset and start requestAnimationFrame()
  }

  /*
   * IAnimatable implements
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
