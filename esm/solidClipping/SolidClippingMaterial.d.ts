/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
import { ShaderPhongMaterial } from "../index.js";
import { Color, ShaderMaterialParameters } from "three";
export declare class SolidClippingMaterial extends ShaderPhongMaterial {
    get cutSectionColor(): Color;
    set cutSectionColor(value: Color);
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=SolidClippingMaterial.d.ts.map