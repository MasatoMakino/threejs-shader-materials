import { ShaderMaterialParameters, UniformsUtils } from "three";
import FragmentShader from "./HexDissolveMaterial.frag.glsl";
import { HexGridChunk } from "../index";
import { GridMaterial } from "../GridMaterial";

/**
 * 六角形グリッドマテリアル
 */
export class HexDissolveMaterial extends GridMaterial {
  /**
   * ディゾルブの進行度を指定する。
   * 1.0でディゾルブ完了となる。
   */
  get progress(): number {
    return this.uniforms.progress.value;
  }
  set progress(value: number) {
    this.uniforms.progress.value = value;
  }

  /**
   * ディゾルブの開始ずれを指定する。
   * 最後にディゾルブが始まるグリッドが、progressのどの値で開始されるかを意味する。
   * ex)
   * delay = 0.8の時、最後のグリッドはprogress = 0.8 ~ 1.0でディゾルブする。
   */
  get delay(): number {
    return this.uniforms.delay.value;
  }
  set delay(value: number) {
    this.uniforms.delay.value = value;
  }

  /**
   * グリッド線の太さ
   * 0.0で線なし、0.5でグリッド面なしになる。
   */
  get gridWeight(): number {
    return this.uniforms.gridWeight.value;
  }
  set gridWeight(value: number) {
    this.uniforms.gridWeight.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, FragmentShader(), parameters);
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      GridMaterial.getBasicUniforms(),
      {
        progress: { value: 0.0 },
        delay: { value: 0.8 },
        gridWeight: { value: 0.0 }
      }
    ]);
  }

  protected initChunks(): void {
    super.initChunks();
    HexGridChunk.registerChunk();
  }
}
