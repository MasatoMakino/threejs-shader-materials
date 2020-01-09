import { GLSLChunk } from "./GLSLChunk";
/**
 * リピートするグリッドマテリアル用のインターフェース
 * - グリッドの分割数
 *
 * にアクセス可能なことを保証する。
 */
export interface IRepeatablePattern {
    division: number;
    divisionScaleX: number;
}
export declare class RepeatPatternChunk extends GLSLChunk {
    static registerChunk(): void;
    static getUniform(): any;
}
//# sourceMappingURL=RepeatPatternChunk.d.ts.map