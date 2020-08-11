import {ShaderMaterialParameters} from "three";
import {IAnimatable} from "../chunk/AnimationChunk";
import {ITiledFBM} from "../chunk/TilingFBMChunk";
import {ShaderPhongMaterial} from "../ShaderPhongMaterial";

export declare class FBMFireMaterial extends ShaderPhongMaterial implements ITiledFBM, IAnimatable {
    get tiles(): number;
    set tiles(value: number);
    get hashLoop(): number;
    set hashLoop(value: number);
    get amp(): number;
    set amp(value: number);
    addTime(delta: number): void;
    /**
     * アニメーションを行うか否か。
     */
    get isAnimate(): boolean;
    set isAnimate(value: boolean);
    /**
     * 波の速度
     * 0.5にすると1の半分の速度になる。
     * マイナスを指定すると、波の進行方向が反転する。
     */
    speed: number;
    get strength(): number;
    set strength(value: number);
    get bloom(): number;
    set bloom(value: number);
    get transformSpeed(): number;
    set transformSpeed(value: number);
    get rimPow(): number;
    set rimPow(value: number);
    get rimStrength(): number;
    set rimStrength(value: number);
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
    protected initDefines(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=FBMFireMaterial.d.ts.map