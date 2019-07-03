/**
 * MaskMapをハーフトーン分解するマテリアル
 */
import { ShaderMaterialParameters } from "three";
import { WavyGridMaterial } from "../WavyGridMaterial";
export declare class HalftoneGridMaterial extends WavyGridMaterial {
    radius: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=HalftoneGridMaterial.d.ts.map