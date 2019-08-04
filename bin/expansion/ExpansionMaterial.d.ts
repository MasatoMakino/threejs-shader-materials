import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { ShaderMaterialParameters } from "three";
export declare class ExpansionMaterial extends ShaderPhongMaterial {
    amp: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=ExpansionMaterial.d.ts.map