import { ShaderChunk } from "three";

/**
 * ShaderChunkに登録を行うGLSLのコード片を格納するクラス。
 * GLSLコードの共有化を目的とする。
 *
 * 注意 : Materialクラスのコード共有化はMaterialInterfaceChunkで行うのでこのクラスとは関係がない。
 */
export class GLSLChunk {
  protected static getChunkName(): string {
    return "";
  }
  protected static getChunk(): string {
    return "";
  }

  public static getDefines(): Object {
    return {};
  }

  public static add(): void {
    if (ShaderChunk && ShaderChunk[this.getChunkName()] == null) {
      ShaderChunk[this.getChunkName()] = this.getChunk();
    }
  }
}
