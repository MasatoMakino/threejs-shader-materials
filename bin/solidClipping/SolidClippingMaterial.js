/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
import { ShaderPhongMaterial } from "../index";
import { UniformsUtils, Color } from "three";
import FragmentShader from "./SolidClippingMaterial.frag.glsl";
import { DoubleSide } from "three";
export class SolidClippingMaterial extends ShaderPhongMaterial {
    get cutSectionColor() {
        return this.uniforms.cutSectionColor.value;
    }
    set cutSectionColor(value) {
        this.uniforms.cutSectionColor.value = value;
    }
    constructor(parameters) {
        super(null, FragmentShader(), parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            {
                cutSectionColor: { value: new Color(1.0, 1.0, 1.0) }
            }
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        this.clipping = true;
        this.side = DoubleSide;
    }
}
