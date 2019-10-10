import { ShaderMaterialParameters, Color } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { IAnimatable } from "../chunk/AnimationChunk";
export declare class SkyCloudMaterial extends ShaderPhongMaterial implements IAnimatable {
    scale: number;
    private animationID;
    private lastAnimatedTimestamp;
    addTime(delta: number): void;
    isAnimate: boolean;
    /**
     * 波の速度
     * 0.5にすると1の半分の速度になる。
     * マイナスを指定すると、波の進行方向が反転する。
     */
    speed: number;
    skyColor: Color;
    cloudVolume: number;
    cloudBottomVolume: number;
    cloudBottomSaturation: number;
    cloudTransformSpeed: number;
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