import { ShaderMaterialParameters } from "three";
import { GridMaterial } from "../GridMaterial";
/**
 * 六角形グリッドマテリアル
 */
export declare class HexDissolveMaterial extends GridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    progress: number;
    delay: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
}
//# sourceMappingURL=HexDissolveMaterial.d.ts.map