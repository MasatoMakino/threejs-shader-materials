import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import { WavyGridMaterial } from "../WavyGridMaterial";
import { HexGridChunk } from "../chunk";
import FragmentShader from "./HexGridMaterial.frag.glsl";
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
        super(VertexShader(), FragmentShader(), parameters);
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
