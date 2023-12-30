import { vertex, fragment } from "./ShaderBasicMaterial.glsl.js";
import { SurfaceNormalChunk } from "./chunk/index.js";
import { ShaderMaterial, UniformsLib, UniformsUtils, } from "three";
/**
 * MeshBasicMaterialに準じたShaderMaterial
 */
export class ShaderBasicMaterial extends ShaderMaterial {
    /**
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    constructor(vertexShader, fragmentShader, parameters) {
        super(parameters);
        this._opacity = 1.0;
        this.uniforms = ShaderBasicMaterial.getBasicUniforms();
        this.vertexShader = vertexShader ?? vertex;
        this.fragmentShader = fragmentShader ?? fragment;
        SurfaceNormalChunk.registerChunk();
        this.initDefines();
        this.uniformOpacity = this._opacity;
    }
    /**
     * このMaterialに必要なuniformsを生成する。
     *
     * @see https://github.com/mrdoob/three.js/blob/0c26bb4bb8220126447c8373154ac045588441de/src/renderers/shaders/ShaderLib.js#L11
     */
    static getBasicUniforms() {
        return UniformsUtils.merge([
            UniformsLib.common,
            UniformsLib.specularmap,
            UniformsLib.envmap,
            UniformsLib.aomap,
            UniformsLib.lightmap,
            UniformsLib.fog,
        ]);
    }
    get color() {
        return this.uniforms.diffuse.value;
    }
    set color(value) {
        this.uniforms.diffuse.value = value;
    }
    get uniformOpacity() {
        return this._opacity;
    }
    set uniformOpacity(value) {
        this._opacity = value;
        if (this.uniforms?.opacity) {
            this.uniforms.opacity.value = value;
        }
    }
    initDefines() {
        this.defines = Object.assign({}, SurfaceNormalChunk.getDefines(), this.defines);
    }
}
