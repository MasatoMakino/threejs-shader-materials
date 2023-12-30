/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
import { ShaderPhongMaterial } from "../index.js";
import { ShaderMaterialParameters, Vector3 } from "three";
export declare class SolidClippingMaterial extends ShaderPhongMaterial {
    get cutSectionColor(): Vector3;
    set cutSectionColor(value: Vector3);
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=SolidClippingMaterial.d.ts.map