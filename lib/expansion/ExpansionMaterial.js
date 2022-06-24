"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpansionMaterial = void 0;
const __1 = require("..");
class ExpansionMaterial extends __1.ShaderPhongMaterial {
    get expansionStrength() {
        return this.uniforms.expansionStrength.value;
    }
    set expansionStrength(value) {
        this.uniforms.expansionStrength.value = value;
    }
    constructor(parameters) {
        super(null, null, parameters);
    }
    initDefines() {
        super.initDefines();
        this.defines.USE_EXPANSION = true;
    }
}
exports.ExpansionMaterial = ExpansionMaterial;
