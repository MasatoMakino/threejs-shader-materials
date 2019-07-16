import { ShaderMaterialParameters } from "three";
import { Color } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
export declare class FBMDissolveMaterial extends ShaderPhongMaterial {
    tiles: number;
    progress: number;
    edgeWeight: number;
    edgeColor: Color;
    hashLoop: number;
    amp: number;
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=FBMDissolveMaterial.d.ts.map