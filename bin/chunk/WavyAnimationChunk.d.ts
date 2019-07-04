import { IAnimatable, AnimationChunk } from "./AnimationChunk";
/**
 * Wavyアニメーションマテリアルのインターフェース。
 * - アニメーションの波長
 * - アニメーションの変化の深さ
 * - 波及する方向
 *
 * にアクセスできることを保証する。
 */
export interface IWavyAnimatable extends IAnimatable {
    raisedBottom: number;
    waveFrequency: number;
    wavePow: number;
    direction: Directions;
}
/**
 * IWaveAnimatableインターフェースで定義されたアニメーションを実装するためのGLSLチャンク。
 * 実行にはグリッドid値が必要。idはvec2。
 * 結果はdiffuseColor.aに反映される。
 */
export declare class WavyAnimationChunk extends AnimationChunk {
    static registerChunk(): void;
    static getUniform(): any;
}
/**
 * Wavyアニメーションの波及方向を示すenum。
 */
export declare enum Directions {
    vertical = 4,
    horizontal = 3,
    /**
     * id値(0,0)を中心に同心円状に波及する。
     */
    radial = 5
}
//# sourceMappingURL=WavyAnimationChunk.d.ts.map