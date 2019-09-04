import { UniformsUtils } from "three";
import FragmentShader from "./HexDissolveMaterial.frag.glsl";
import { HexGridChunk } from "../index";
import { GridMaterial } from "../GridMaterial";
/**
 * 六角形グリッドマテリアル
 */
export class HexDissolveMaterial extends GridMaterial {
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    get progress() {
        return this.uniforms.progress.value;
    }
    set progress(value) {
        this.uniforms.progress.value = value;
    }
    get delay() {
        return this.uniforms.delay.value;
    }
    set delay(value) {
        this.uniforms.delay.value = value;
    }
    constructor(parameters) {
        super(null, FragmentShader(), parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            GridMaterial.getBasicUniforms(),
            {
                progress: { value: 0.0 },
                delay: { value: 0.8 }
            }
        ]);
    }
    initChunks() {
        super.initChunks();
        HexGridChunk.registerChunk();
    }
}
