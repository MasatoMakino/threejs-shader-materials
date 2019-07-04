import { IUniform } from "three";
import { GLSLChunk } from "./GLSLChunk";
/**
 * 時間経過によりアニメーションするマテリアルのインターフェース。
 *
 * - アニメーションスピードspeed
 * - アニメーション再生/停止フラグisAnimate
 *
 * のそれぞれの変数にアクセスできることを保証する。
 */
export interface IAnimatable {
    uniforms: {
        [uniform: string]: IUniform;
    };
    /**
     * 経過時間を追加する。uniformのtimeにはdelta * speedの値が加算される。speedに負の値を設定すると、アニメーションの進行方向は反転する。
     * @param delta 前回アニメーション実行時からの差分時間 単位 : 秒
     */
    addTime(delta: number): void;
    speed: number;
    isAnimate: boolean;
}
/**
 * IAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * uniformのtime値を操作する。
 * time値によってどのように変化するかは実装するShaderによる。
 */
export declare class AnimationChunk extends GLSLChunk {
    static registerChunk(): void;
    static getUniform(): {
        time: {
            value: number;
        };
        isAnimate: {
            value: boolean;
        };
    };
    static addTime(self: IAnimatable, delta: number): void;
}
//# sourceMappingURL=AnimationChunk.d.ts.map