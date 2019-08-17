import { UniformsUtils, ShaderMaterialParameters, Color } from "three";
import { ShaderPhongMaterial } from "../index";
import { ITiledFBM, TilingFBMChunk } from "../index";

import VertexShader from "./ExpansionDissolveMaterial.vert.glsl";
import FragmentShader from "./ExpansionDissolveMaterial.frag.glsl";
import { IAnimatable, AnimationChunk } from "../index";

/**
 * FBMノイズによるジオメトリの膨張でディゾルブを行うマテリアル。
 * 爆発しながら消滅するような表現になる。
 * 膨張の進行度合いはprogressで制御する。
 */
export class ExpansionDissolveMaterial extends ShaderPhongMaterial
  implements ITiledFBM, IAnimatable {
  // IAnimatable //
  speed: number = -0.5;
  addTime(delta: number): void {
    if (this.isAnimate) {
      AnimationChunk.addTime(this, delta);
    }
  }
  public isAnimate = true;

  // ITiledFBM //
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

  get scaleMax(): number {
    return this.uniforms.scaleMax.value;
  }
  set scaleMax(value: number) {
    this.uniforms.scaleMax.value = value;
  }

  get time(): number {
    return this.uniforms.time.value;
  }
  set time(value: number) {
    this.uniforms.time.value = value;
  }

  get progress(): number {
    return this.uniforms.progress.value;
  }
  set progress(value: number) {
    this.uniforms.progress.value = value;
  }

  get dissolveColor(): Color {
    return this.uniforms.dissolveColor.value;
  }
  set dissolveColor(value: Color) {
    this.uniforms.dissolveColor.value = value;
  }
  get dissolveOutColor(): Color {
    return this.uniforms.dissolveOutColor.value;
  }
  set dissolveOutColor(value: Color) {
    this.uniforms.dissolveOutColor.value = value;
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
      {
        scaleMax: { value: 20.0 },
        time: { value: 0.0 },
        progress: { value: 0.0 },
        dissolveColor: { value: new Color(1.0, 1.0, 1.0) },
        dissolveOutColor: { value: new Color(0.0, 0.0, 0.0) }
      }
    ]);
  }

  protected initChunks(): void {
    super.initChunks();
    TilingFBMChunk.registerChunk();
  }

  protected initDefines(): void {
    super.initDefines();
    this.defines = Object.assign(this.defines, TilingFBMChunk.getDefines());
    this.defines.USE_EXPANSION = true;
  }
}
