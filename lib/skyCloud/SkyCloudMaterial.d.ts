import {Color, ShaderMaterialParameters} from "three";
import {IAnimatable} from "../chunk/AnimationChunk";
import {ShaderPhongMaterial} from "../ShaderPhongMaterial";

export declare class SkyCloudMaterial extends ShaderPhongMaterial implements IAnimatable {
    get scale(): number;
    set scale(value: number);
    private animationID;
    private lastAnimatedTimestamp;
    addTime(delta: number): void;
    get isAnimate(): boolean;
    set isAnimate(value: boolean);
    /**
     * 波の速度
     * 0.5にすると1の半分の速度になる。
     * マイナスを指定すると、波の進行方向が反転する。
     */
    speed: number;
    get skyColor(): Color;
    set skyColor(value: Color);
    get cloudVolume(): number;
    set cloudVolume(value: number);
    get cloudBottomVolume(): number;
    set cloudBottomVolume(value: number);
    get cloudBottomSaturation(): number;
    set cloudBottomSaturation(value: number);
    get cloudTransformSpeed(): number;
    set cloudTransformSpeed(value: number);
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initChunks(): void;
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=SkyCloudMaterial.d.ts.map