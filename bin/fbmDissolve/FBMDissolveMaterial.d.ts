import { ShaderMaterialParameters } from "three";
import { Color } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ITiledFBM } from "../chunk/TilingFBMChunk";
export declare class FBMDissolveMaterial extends ShaderPhongMaterial implements ITiledFBM {
    tiles: number;
    hashLoop: number;
    amp: number;
    progress: number;
    edgeWeight: number;
    edgeColor: Color;
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