import { IExpandable } from "../chunk/";
import { RimEffectMaterial } from "./RimEffectMaterial";

export class OuterGlowMaterial
  extends RimEffectMaterial
  implements IExpandable
{
  get expansionStrength(): number {
    return this.uniforms.expansionStrength.value;
  }
  set expansionStrength(value: number) {
    this.uniforms.expansionStrength.value = value;
  }

  protected initDefines(): void {
    super.initDefines();
    this.defines.USE_LIGHT = false;
    this.defines.USE_EXPANSION = true;
  }
}
