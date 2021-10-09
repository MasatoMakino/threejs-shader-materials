"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexGridMaterial = void 0;
const three_1 = require("three");
const WavyGridMaterial_1 = require("../WavyGridMaterial");
const HexGridMaterial_frag_glsl_1 = __importDefault(require("./HexGridMaterial.frag.glsl"));
const ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
const HexGridChunk_1 = require("../chunk/HexGridChunk");
/**
 * 六角形グリッドマテリアル
 */
class HexGridMaterial extends WavyGridMaterial_1.WavyGridMaterial {
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
        super((0, ShaderPhongMaterial_vert_glsl_1.default)(), (0, HexGridMaterial_frag_glsl_1.default)(), parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 }
            }
        ]);
    }
    initChunks() {
        super.initChunks();
        HexGridChunk_1.HexGridChunk.registerChunk();
    }
}
exports.HexGridMaterial = HexGridMaterial;
