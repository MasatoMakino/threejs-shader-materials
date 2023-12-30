import { IExpandable, ShaderPhongMaterial } from "../index.js";
import { ShaderMaterialParameters } from "three";
export declare class ExpansionMaterial extends ShaderPhongMaterial implements IExpandable {
    get expansionStrength(): number;
    set expansionStrength(value: number);
    constructor(parameters?: ShaderMaterialParameters);
    protected initDefines(): void;
}
//# sourceMappingURL=ExpansionMaterial.d.ts.map