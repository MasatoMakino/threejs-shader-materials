/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
import { ShaderPhongMaterial } from "../index.js";
import { fragment } from "./SolidClippingMaterial.glsl.js";
import { Color, DoubleSide, UniformsUtils, } from "three";
export class SolidClippingMaterial extends ShaderPhongMaterial {
    get cutSectionColor() {
        return this.uniforms.cutSectionColor.value;
    }
    set cutSectionColor(value) {
        this.uniforms.cutSectionColor.value = value;
    }
    constructor(parameters) {
        super(null, fragment, parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            {
                cutSectionColor: { value: new Color(1.0, 1.0, 1.0) },
            },
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        this.clipping = true;
        this.side = DoubleSide;
    }
}
