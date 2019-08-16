import { UniformsUtils, ShaderMaterialParameters } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ITiledFBM, TilingFBMChunk } from "../chunk/TilingFBMChunk";

import VertexShader from "./ExpansionDissolveMaterial.vert.glsl";

export class ExpansionDissolveMaterial extends ShaderPhongMaterial
  implements ITiledFBM {
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
  /**
   *
   * @param parameters
   */
  constructor(parameters?: ShaderMaterialParameters) {
    super(VertexShader(), null, parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      TilingFBMChunk.getUniform(),
      {
        scaleMax: { value: 10.0 },
        time: { value: 0.0 },
        progress: { value: 0.0 }
        // edgeWeight: { value: 0.1 },
        // edgeColor: { value: new Color(1.0, 1.0, 1.0) }
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
