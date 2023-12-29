"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBMDissolveMaterial = void 0;
const __1 = require("..");
const ShaderPhongMaterial_glsl_1 = require("../ShaderPhongMaterial.glsl");
const chunk_1 = require("../chunk");
const FBMDissolveMaterial_glsl_1 = require("./FBMDissolveMaterial.glsl");
const three_1 = require("three");
class FBMDissolveMaterial extends __1.ShaderPhongMaterial {
    get tiles() {
        return this.uniforms.tiles.value;
    }
    set tiles(value) {
        this.uniforms.tiles.value = value;
    }
    get hashLoop() {
        return this.uniforms.hashLoop.value;
    }
    set hashLoop(value) {
        this.uniforms.hashLoop.value = value;
    }
    get amp() {
        return this.uniforms.amp.value;
    }
    set amp(value) {
        this.uniforms.amp.value = value;
    }
    get progress() {
        return this.uniforms.progress.value;
    }
    set progress(value) {
        this.uniforms.progress.value = value;
    }
    get edgeWeight() {
        return this.uniforms.edgeWeight.value;
    }
    set edgeWeight(value) {
        this.uniforms.edgeWeight.value = value;
    }
    get edgeColor() {
        return this.uniforms.edgeColor.value;
    }
    set edgeColor(value) {
        this.uniforms.edgeColor.value = value;
    }
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(ShaderPhongMaterial_glsl_1.vertex, FBMDissolveMaterial_glsl_1.fragment, parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            __1.ShaderPhongMaterial.getBasicUniforms(),
            chunk_1.TilingFBMChunk.getUniform(),
            {
                progress: { value: 0.0 },
                edgeWeight: { value: 0.1 },
                edgeColor: { value: new three_1.Color(1.0, 1.0, 1.0) },
            },
        ]);
    }
    initChunks() {
        super.initChunks();
        chunk_1.TilingFBMChunk.registerChunk();
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        super.initDefines();
        this.defines = Object.assign({}, chunk_1.TilingFBMChunk.getDefines(), this.defines);
    }
}
exports.FBMDissolveMaterial = FBMDissolveMaterial;
