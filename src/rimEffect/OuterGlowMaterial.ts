import { IExpandable } from "../chunk/";
import { RimEffectMaterial } from "./RimEffectMaterial";

/**
 * モデルの外周を発光させるマテリアル。
 * 縁の発光と膨張を掛け合わせて、元のモデルの周辺を発光させる。
 */
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
