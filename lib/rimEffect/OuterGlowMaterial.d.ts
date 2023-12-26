import { IExpandable } from "../chunk/";
import { RimEffectMaterial } from "./RimEffectMaterial";
/**
 * モデルの外周を発光させるマテリアル。
 * 縁の発光と膨張を掛け合わせて、元のモデルの周辺を発光させる。
 */
export declare class OuterGlowMaterial extends RimEffectMaterial implements IExpandable {
    get expansionStrength(): number;
    set expansionStrength(value: number);
    protected initDefines(): void;
}
//# sourceMappingURL=OuterGlowMaterial.d.ts.map