"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBMDissolveMaterial = void 0;
const three_1 = require("three");
const three_2 = require("three");
const ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
const TilingFBMChunk_1 = require("../chunk/TilingFBMChunk");
const ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
const FBMDissolveMaterial_frag_glsl_1 = __importDefault(require("./FBMDissolveMaterial.frag.glsl"));
class FBMDissolveMaterial extends ShaderPhongMaterial_1.ShaderPhongMaterial {
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
        super((0, ShaderPhongMaterial_vert_glsl_1.default)(), (0, FBMDissolveMaterial_frag_glsl_1.default)(), parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            TilingFBMChunk_1.TilingFBMChunk.getUniform(),
            {
                progress: { value: 0.0 },
                edgeWeight: { value: 0.1 },
                edgeColor: { value: new three_2.Color(1.0, 1.0, 1.0) }
            }
        ]);
    }
    initChunks() {
        super.initChunks();
        TilingFBMChunk_1.TilingFBMChunk.registerChunk();
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        super.initDefines();
        this.defines = Object.assign({}, TilingFBMChunk_1.TilingFBMChunk.getDefines(), this.defines);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
    }
}
exports.FBMDissolveMaterial = FBMDissolveMaterial;
