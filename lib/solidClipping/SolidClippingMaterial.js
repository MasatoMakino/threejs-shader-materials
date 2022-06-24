"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolidClippingMaterial = void 0;
/**
 * ライトに影響を受けない、ソリッドな切断面をもつマテリアル
 */
const __1 = require("..");
const SolidClippingMaterial_frag_glsl_1 = __importDefault(require("./SolidClippingMaterial.frag.glsl"));
const three_1 = require("three");
class SolidClippingMaterial extends __1.ShaderPhongMaterial {
    get cutSectionColor() {
        return this.uniforms.cutSectionColor.value;
    }
    set cutSectionColor(value) {
        this.uniforms.cutSectionColor.value = value;
    }
    constructor(parameters) {
        super(null, (0, SolidClippingMaterial_frag_glsl_1.default)(), parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            __1.ShaderPhongMaterial.getBasicUniforms(),
            {
                cutSectionColor: { value: new three_1.Color(1.0, 1.0, 1.0) },
            },
        ]);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        this.clipping = true;
        this.side = three_1.DoubleSide;
    }
}
exports.SolidClippingMaterial = SolidClippingMaterial;
