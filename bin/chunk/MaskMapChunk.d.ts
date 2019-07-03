import { Texture, IUniform } from "three";
import { IRepeatablePattern, RepeatPatternChunk } from "./RepeatPatternChunk";
export interface IMaskable extends IRepeatablePattern {
    uniforms: {
        [uniform: string]: IUniform;
    };
    maskTexture: Texture;
}
/**
 * Grid内のマスク値を利用するテクスチャ用Chunk。
 * 実行にはgridのid値、division、divisionScaleXが必要。
 */
export declare class MaskMapChunk extends RepeatPatternChunk {
    static registerChunk(): void;
    static getUniform(): any;
    static getMaskTexture(_self: IMaskable): Texture;
    static setMaskTexture(_self: IMaskable, val: Texture): void;
}
//# sourceMappingURL=MaskMapChunk.d.ts.map