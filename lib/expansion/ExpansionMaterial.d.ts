import { ShaderMaterialParameters } from "three";
import { IExpandable } from "..";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
export declare class ExpansionMaterial extends ShaderPhongMaterial implements IExpandable {
    get expansionStrength(): number;
    set expansionStrength(value: number);
    constructor(parameters?: ShaderMaterialParameters);
    protected initDefines(): void;
}
//# sourceMappingURL=ExpansionMaterial.d.ts.map