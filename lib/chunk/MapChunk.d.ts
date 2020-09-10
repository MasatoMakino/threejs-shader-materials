import { IUniform, Texture } from "three";
import { GLSLChunk } from "./GLSLChunk";
/**
 * Maskテクスチャを設定可能なマテリアル用のインターフェース
 * - maskTexture変数
 *
 * にアクセス可能なことを保証する。
 */
export interface IMap {
    uniforms: {
        [uniform: string]: IUniform;
    };
    map: Texture;
}
/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
export declare class MapChunk extends GLSLChunk {
    static registerChunk(): void;
    static getUniform(): any;
    static getMap(_self: IMap): Texture;
    static setMap(_self: IMap, val: Texture): void;
}
//# sourceMappingURL=MapChunk.d.ts.map