import { IAnimatable, AnimationChunk } from "./AnimationChunk";
/**
 * マテリアル用インターフェース
 */
export interface IWavyAnimatable extends IAnimatable {
    raisedBottom: number;
    waveFrequency: number;
    wavePow: number;
    direction: Directions;
}
/**
 * IWaveAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * 実行にはグリッドid値が必要。idはvec2。
 * 結果はdiffuseColor.aに反映される。
 */
export declare class WavyAnimationChunk extends AnimationChunk {
    static registerChunk(): void;
    static getUniform(): any;
}
export declare enum Directions {
    vertical = 4,
    horizontal = 3,
    radial = 5
}
//# sourceMappingURL=WavyAnimationChunk.d.ts.map