import { ShaderBasicMaterial } from "..";
import { Color, ShaderMaterialParameters } from "three";
export declare class RimBasicMaterial extends ShaderBasicMaterial {
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
    constructor(param: ShaderMaterialParameters);
    static getRimUniforms(): {
        [uniform: string]: import("three").IUniform<any>;
    };
    initDefines(): void;
}
//# sourceMappingURL=RimBasicMaterial.d.ts.map