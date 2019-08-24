/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
import { ShaderPhongMaterial } from "../index";
import { Vector3, ShaderMaterialParameters } from "three";
export declare class SolidClippingMaterial extends ShaderPhongMaterial {
    cutSectionColor: Vector3;
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=SolidClippingMaterial.d.ts.map