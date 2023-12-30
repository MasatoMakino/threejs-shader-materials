import { ShaderPhongMaterial } from "../index.js";
export class ExpansionMaterial extends ShaderPhongMaterial {
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
