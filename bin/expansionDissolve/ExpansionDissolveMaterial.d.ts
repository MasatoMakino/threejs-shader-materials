import { ShaderMaterialParameters, Color } from "three";
import { ShaderPhongMaterial } from "../index";
import { ITiledFBM } from "../index";
import { IAnimatable } from "../index";
/**
 * FBMノイズによるジオメトリの膨張でディゾルブを行うマテリアル。
 * 爆発しながら消滅するような表現になる。
 * 膨張の進行度合いはprogressで制御する。
 */
export declare class ExpansionDissolveMaterial extends ShaderPhongMaterial implements ITiledFBM, IAnimatable {
    speed: number;
    addTime(delta: number): void;
    isAnimate: boolean;
    tiles: number;
    hashLoop: number;
    amp: number;
    scaleMax: number;
    time: number;
    progress: number;
    dissolveColor: Color;
    dissolveOutColor: Color;
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
    protected initDefines(): void;
}
//# sourceMappingURL=ExpansionDissolveMaterial.d.ts.map