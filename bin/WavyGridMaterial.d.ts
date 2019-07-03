import { Texture } from "three";
import { ShaderPhongMaterial } from "./ShaderPhongMaterial";
import { Directions, IWavyAnimatable } from "./chunk/WavyAnimationChunk";
import { IMaskable } from "./chunk/MaskMapChunk";
import { IReversible } from "./chunk/ReversibleChunk";
import { ShaderMaterialParameters } from "three";
export declare class WavyGridMaterial extends ShaderPhongMaterial implements IWavyAnimatable, IReversible, IMaskable {
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
    division: number;
    divisionScaleX: number;
    isReversed: boolean;
    /**
     * 明るさの底上げ
     */
    raisedBottom: number;
    /**
     * 波の振幅
     * 1の場合、幅1ヘックス
     * 0.5の場合、幅2ヘックスになる
     */
    waveFrequency: number;
    wavePow: number;
    /**
     * 波が発生する方角
     */
    direction: Directions;
    maskTexture: Texture;
    protected initChunks(): void;
    static getBasicUniforms(): any;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=WavyGridMaterial.d.ts.map