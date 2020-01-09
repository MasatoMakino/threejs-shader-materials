import { ShaderMaterialParameters } from "three";
import { Color } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ITiledFBM } from "../chunk/TilingFBMChunk";
export declare class FBMDissolveMaterial extends ShaderPhongMaterial implements ITiledFBM {
    get tiles(): number;
    set tiles(value: number);
    get hashLoop(): number;
    set hashLoop(value: number);
    get amp(): number;
    set amp(value: number);
    get progress(): number;
    set progress(value: number);
    get edgeWeight(): number;
    set edgeWeight(value: number);
    get edgeColor(): Color;
    set edgeColor(value: Color);
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
    /**
     * definesを初期化する。
     */
    protected initDefines(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=FBMDissolveMaterial.d.ts.map