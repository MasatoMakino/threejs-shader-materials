import { ShaderMaterialParameters } from "three";
import { WavyGridMaterial } from "../WavyGridMaterial";
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