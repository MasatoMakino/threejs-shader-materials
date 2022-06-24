import { IRepeatablePattern, RepeatPatternChunk } from "./RepeatPatternChunk";
import { IUniform, Texture } from "three";
/**
 * Maskテクスチャを設定可能なマテリアル用のインターフェース
 * - maskTexture変数
 *
 * にアクセス可能なことを保証する。
 */
export interface IMaskable extends IRepeatablePattern {
    uniforms: {
        [uniform: string]: IUniform;
    };
    maskTexture: Texture;
}
/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
export declare class MaskMapChunk extends RepeatPatternChunk {
    static registerChunk(): void;
    static getUniform(): any;
    static getMaskTexture(_self: IMaskable): Texture;
    static setMaskTexture(_self: IMaskable, val: Texture): void;
}
//# sourceMappingURL=MaskMapChunk.d.ts.map