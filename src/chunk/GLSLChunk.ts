import { ShaderChunk } from "three";

/**
 * ShaderChunkに登録を行うGLSLのコード片を格納するクラス。
 * GLSLコードの共有化を目的とする。
 */
export abstract class GLSLChunk {
  /**
   * ShaderChunkに登録する名前。
   */
  protected static getChunkName(): string {
    return "";
  }

  /**
   * ShaderChunkに登録するGLSLコード。
   */
  protected static getChunk(): string {
    return "";
  }

  /**
   * Chunkに関連する定数Defineを格納したオブジェクトを取得する。
   * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.defines
   */
  public static getDefines(): Object {
    return {};
  }

  /**
   * ShaderChunkにGLSLコードを登録する。
   */
  public static registerChunk(): void {
    if (ShaderChunk && ShaderChunk[this.getChunkName()] == null) {
      ShaderChunk[this.getChunkName()] = this.getChunk();
    }
  }

  /**
   * Chunkに関連する共有変数Uniformsを格納したオブジェクトを取得する。
   * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.uniforms
   */
  public static getUniform(): any {
    return {};
  }
}
