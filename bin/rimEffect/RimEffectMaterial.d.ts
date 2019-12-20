import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
import { Color } from "three";
export declare class RimEffectMaterial extends ShaderPhongMaterial {
    get rimPow(): number;
    set rimPow(value: number);
    get rimStrength(): number;
    set rimStrength(value: number);
    get rimColor(): Color;
    set rimColor(value: Color);
    get insidePow(): number;
    set insidePow(value: number);
    get insideStrength(): number;
    set insideStrength(value: number);
    get insideColor(): Color;
    set insideColor(value: Color);
    /**
     *
     * @param parameters
     */
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initDefines(): void;
}
//# sourceMappingURL=RimEffectMaterial.d.ts.map