import { RimEffectMaterial } from "./RimEffectMaterial";
export class OuterGlowMaterial extends RimEffectMaterial {
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
