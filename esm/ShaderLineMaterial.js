import { ShaderChunk, ShaderMaterial, UniformsLib, UniformsUtils, } from "three";
export class ShaderLineMaterial extends ShaderMaterial {
    constructor(vertexShader, fragmentShader, parameters) {
        super(parameters);
        this._opacity = 1.0;
        this.vertexShader = vertexShader ?? ShaderChunk.linedashed_vert;
        this.fragmentShader = fragmentShader ?? ShaderChunk.linedashed_frag;
        this.uniforms = UniformsUtils.merge([
            UniformsLib.common,
            UniformsLib.lightmap,
            UniformsLib.fog,
            {
                scale: { value: 1.0 },
                dashSize: { value: 1.0 },
                totalSize: { value: 1.0 },
            },
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
    get scale() {
        return this.uniforms.scale.value;
    }
    set scale(value) {
        this.uniforms.scale.value = value;
    }
    get dashSize() {
        return this.uniforms.dashSize.value;
    }
    set dashSize(value) {
        this.uniforms.dashSize.value = value;
    }
    get totalSize() {
        return this.uniforms.totalSize.value;
    }
    set totalSize(value) {
        this.uniforms.totalSize.value = value;
    }
}
