import { WavyGridMaterial } from "../WavyGridMaterial.js";
import { ShaderMaterialParameters } from "three";
/**
 * MaskMapをハーフトーン分解するマテリアル
 */
export declare class HalftoneGridMaterial extends WavyGridMaterial {
    get radius(): number;
    set radius(value: number);
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=HalftoneGridMaterial.d.ts.map