import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
import { Color } from "three";
export declare class RimEffectMaterial extends ShaderPhongMaterial {
    strength: number;
    rimColor: Color;
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=RimEffectMaterial.d.ts.map