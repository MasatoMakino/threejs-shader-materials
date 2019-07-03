/**
 * 地球儀用の緯度経度グリッド
 */
import { ShaderMaterialParameters } from "three";
import { WavyGridMaterial } from "../WavyGridMaterial";
export declare class SquareGridMaterial extends WavyGridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    gridWeight: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=SquareGridMaterial.d.ts.map