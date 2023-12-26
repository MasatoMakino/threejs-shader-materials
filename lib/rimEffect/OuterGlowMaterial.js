"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterGlowMaterial = void 0;
const RimEffectMaterial_1 = require("./RimEffectMaterial");
/**
 * モデルの外周を発光させるマテリアル。
 * 縁の発光と膨張を掛け合わせて、元のモデルの周辺を発光させる。
 */
class OuterGlowMaterial extends RimEffectMaterial_1.RimEffectMaterial {
    get expansionStrength() {
        return this.uniforms.expansionStrength.value;
    }
    set expansionStrength(value) {
        this.uniforms.expansionStrength.value = value;
    }
    initDefines() {
        super.initDefines();
        this.defines.USE_LIGHT = false;
        this.defines.USE_EXPANSION = true;
    }
}
exports.OuterGlowMaterial = OuterGlowMaterial;
