import { IAnimatable, ITiledFBM, ShaderPhongMaterial } from "../index.js";
import { Color, ShaderMaterialParameters } from "three";
/**
 * FBMノイズによるジオメトリの膨張でディゾルブを行うマテリアル。
 * 爆発しながら消滅するような表現になる。
 * 膨張の進行度合いはprogressで制御する。
 */
export declare class ExpansionDissolveMaterial extends ShaderPhongMaterial implements ITiledFBM, IAnimatable {
    speed: number;
    addTime(delta: number): void;
    get isAnimate(): boolean;
    set isAnimate(value: boolean);
    get tiles(): number;
    set tiles(value: number);
    get hashLoop(): number;
    set hashLoop(value: number);
    get amp(): number;
    set amp(value: number);
    get scaleMax(): number;
    set scaleMax(value: number);
    get time(): number;
    set time(value: number);
    get progress(): number;
    set progress(value: number);
    get dissolveColor(): Color;
    set dissolveColor(value: Color);
    get dissolveOutColor(): Color;
    set dissolveOutColor(value: Color);
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
    protected initDefines(): void;
    private animationListener;
    protected startAnimation(): void;
    protected stopAnimation(): void;
}
//# sourceMappingURL=ExpansionDissolveMaterial.d.ts.map