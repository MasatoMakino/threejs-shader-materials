"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderLineMaterial = void 0;
const three_1 = require("three");
class ShaderLineMaterial extends three_1.ShaderMaterial {
    constructor(vertexShader, fragmentShader, parameters) {
        super(parameters);
        this._opacity = 1.0;
        this.vertexShader = vertexShader !== null && vertexShader !== void 0 ? vertexShader : three_1.ShaderChunk.linedashed_vert;
        this.fragmentShader = fragmentShader !== null && fragmentShader !== void 0 ? fragmentShader : three_1.ShaderChunk.linedashed_frag;
        this.uniforms = three_1.UniformsUtils.merge([
            three_1.UniformsLib.common,
            three_1.UniformsLib.lightmap,
            three_1.UniformsLib.fog,
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
        var _a;
        this._opacity = value;
        if ((_a = this.uniforms) === null || _a === void 0 ? void 0 : _a.opacity) {
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
exports.ShaderLineMaterial = ShaderLineMaterial;
