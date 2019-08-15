import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
import { Color } from "three";
export declare class RimEffectMaterial extends ShaderPhongMaterial {
    rimPow: number;
    rimStrength: number;
    rimColor: Color;
    insidePow: number;
    insideStrength: number;
    insideColor: Color;
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initDefines(): void;
}
//# sourceMappingURL=RimEffectMaterial.d.ts.map