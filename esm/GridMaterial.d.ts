import { ShaderPhongMaterial } from "./ShaderPhongMaterial.js";
import { IMaskable, IReversible } from "./chunk/index.js";
import { Texture } from "three";
/**
 * グリッド状に分割されたマテリアル。
 */
export declare abstract class GridMaterial extends ShaderPhongMaterial implements IReversible, IMaskable {
    get division(): number;
    set division(value: number);
    get divisionScaleX(): number;
    set divisionScaleX(value: number);
    get isReversed(): boolean;
    set isReversed(value: boolean);
    get maskTexture(): Texture;
    set maskTexture(val: Texture);
    protected initChunks(): void;
    static getBasicUniforms(): any;
}
//# sourceMappingURL=GridMaterial.d.ts.map