import { IUniform } from "three";
import { GLSLChunk } from "./GLSLChunk";
/**
 * マテリアル用インターフェース
 */
export interface IAnimatable {
    uniforms: {
        [uniform: string]: IUniform;
    };
    addTime(delta: number): void;
    speed: number;
    isAnimate: boolean;
}
/**
 * IAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * uniformのtime値を操作する。
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