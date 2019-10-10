import { ShaderMaterialParameters } from "three";
import { Directions, IWavyAnimatable } from "./chunk/WavyAnimationChunk";
import { GridMaterial } from "./GridMaterial";
/**
 * グリッド状に分割され、Wavyアニメーションを行うマテリアル。
 */
export declare abstract class WavyGridMaterial extends GridMaterial implements IWavyAnimatable {
    protected animationID: number;
    protected lastAnimatedTimestamp: number;
    addTime(delta: number): void;
    /**
     * 波アニメーションを行うか否か。
     */
    isAnimate: boolean;
    /**
     * 波の速度
     * 0.5にすると1の半分の速度になる。
     * マイナスを指定すると、波の進行方向が反転する。
     */
    speed: number;
    /**
     * 波の振幅
     * 1の場合、幅1ヘックス
     * 0.5の場合、幅2ヘックスになる
     */
    waveFrequency: number;
    wavePow: number;
    /**
     * 明るさの底上げ
     */
    raisedBottom: number;
    /**
     * 波が発生する方角
     */
    direction: Directions;
    constructor(vertexShader: string, fragmentShader: string, parameters?: ShaderMaterialParameters);
    protected initChunks(): void;
    static getBasicUniforms(): any;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=WavyGridMaterial.d.ts.map