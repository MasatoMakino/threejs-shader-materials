import { GLSLChunk } from "./GLSLChunk";

/**
 * 反転可能なマテリアル用のインターフェース。
 * 反転フラグにアクセス可能なことを保証する。
 */
export interface IReversible {
  isReversed: boolean;
}

export class ReversibleChunk extends GLSLChunk {
  public static registerChunk(): void {
    ReversibleUniformChunk.registerChunk();
  }

  public static getUniform(): any {
    return {
      isReversed: { value: false },
    };
  }
}

class ReversibleUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "reversible_uniform_chunk";
  }

  protected static getChunk(): string {
    return /* GLSL */ `
      uniform bool isReversed;
    `;
  }
}
