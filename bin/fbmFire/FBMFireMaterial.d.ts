import { ShaderMaterialParameters } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ITiledFBM } from "../chunk/TilingFBMChunk";
import { IAnimatable } from "../chunk/AnimationChunk";
export declare class FBMFireMaterial extends ShaderPhongMaterial implements ITiledFBM, IAnimatable {
    tiles: number;
    hashLoop: number;
    amp: number;
    protected animationID: number;
    protected lastAnimatedTimestamp: number;
    addTime(delta: number): void;
    /**
     * アニメーションを行うか否か。
     */
    isAnimate: boolean;
    /**
     * 波の速度
     * 0.5にすると1の半分の速度になる。
     * マイナスを指定すると、波の進行方向が反転する。
     */
    speed: number;
    strength: number;
    bloom: number;
    transformSpeed: number;
    rimPow: number;
    rimStrength: number;
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
    protected initDefines(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
    protected startAnimation(): void;
    protected stopAnimation(): void;
    protected onRequestAnimationFrame(timestamp: number): void;
}
//# sourceMappingURL=FBMFireMaterial.d.ts.map