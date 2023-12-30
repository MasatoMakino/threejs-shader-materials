import { vertex } from "../ShaderPhongMaterial.glsl.js";
import { WavyGridMaterial } from "../WavyGridMaterial.js";
import { HexGridChunk } from "../chunk/index.js";
import { fragment } from "./HexGridMaterial.glsl.js";
import { UniformsUtils } from "three";
/**
 * 六角形グリッドマテリアル
 */
export class HexGridMaterial extends WavyGridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    get gridWeight() {
        return this.uniforms.gridWeight.value;
    }
    set gridWeight(value) {
        this.uniforms.gridWeight.value = value;
    }
    constructor(parameters) {
        super(vertex, fragment, parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 },
            },
        ]);
    }
    initChunks() {
        super.initChunks();
        HexGridChunk.registerChunk();
    }
}
