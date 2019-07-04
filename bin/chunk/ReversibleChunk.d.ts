import { GLSLChunk } from "./GLSLChunk";
/**
 * 反転可能なマテリアル用のインターフェース。
 * 反転フラグにアクセス可能なことを保証する。
 */
export interface IReversible {
    isReversed: boolean;
}
export declare class ReversibleChunk extends GLSLChunk {
    static registerChunk(): void;
    static getUniform(): any;
}
//# sourceMappingURL=ReversibleChunk.d.ts.map