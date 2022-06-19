import { ShaderMaterial, UniformsLib, UniformsUtils, } from "three";
import FragmentShader from "./ShaderBasicMaterial.frag.glsl";
import VertexShader from "./ShaderBasicMaterial.vert.glsl";
/**
 * MeshBasicMaterialに準じたShaderMaterial
 */
export class ShaderBasicMaterial extends ShaderMaterial {
    constructor(vertexShader, fragmentShader, parameters) {
        super(parameters);
        this._opacity = 1.0;
        this.uniforms = ShaderBasicMaterial.getBasicUniforms();
        this.vertexShader = vertexShader !== null && vertexShader !== void 0 ? vertexShader : VertexShader();
        this.fragmentShader = fragmentShader !== null && fragmentShader !== void 0 ? fragmentShader : FragmentShader();
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
        var _a;
        this._opacity = value;
        if ((_a = this.uniforms) === null || _a === void 0 ? void 0 : _a.opacity) {
            this.uniforms.opacity.value = value;
        }
    }
}
