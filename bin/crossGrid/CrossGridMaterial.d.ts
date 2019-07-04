import { ShaderMaterialParameters } from "three";
import { WavyGridMaterial } from "../WavyGridMaterial";
/**
 * 十字線を正方形グリッドの中心に描画するマテリアル。
 */
export declare class CrossGridMaterial extends WavyGridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    gridWeight: number;
    radius: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
}
//# sourceMappingURL=CrossGridMaterial.d.ts.map