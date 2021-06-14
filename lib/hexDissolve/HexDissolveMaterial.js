"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexDissolveMaterial = void 0;
const three_1 = require("three");
const HexDissolveMaterial_frag_glsl_1 = __importDefault(require("./HexDissolveMaterial.frag.glsl"));
const index_1 = require("../index");
const GridMaterial_1 = require("../GridMaterial");
const three_2 = require("three");
/**
 * 六角形グリッドマテリアル
 */
class HexDissolveMaterial extends GridMaterial_1.GridMaterial {
    /**
     * ディゾルブの進行度を指定する。
     * 1.0でディゾルブ完了となる。
     */
    get progress() {
        return this.uniforms.progress.value;
    }
    set progress(value) {
        this.uniforms.progress.value = value;
    }
    /**
     * ディゾルブの開始ずれを指定する。
     * 最後にディゾルブが始まるグリッドが、progressのどの値で開始されるかを意味する。
     * ex)
     * delay = 0.8の時、最後のグリッドはprogress = 0.8 ~ 1.0でディゾルブする。
     */
    get delay() {
        return this.uniforms.delay.value;
    }
    set delay(value) {
        this.uniforms.delay.value = value;
    }
    get isAscending() {
        return this.uniforms.isAscending.value;
    }
    set isAscending(value) {
        this.uniforms.isAscending.value = value;
    }
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
    get gridEmissive() {
        return this.uniforms.gridEmissive.value;
    }
    set gridEmissive(value) {
        this.uniforms.gridEmissive.value = value;
    }
    /**
     * ディゾルブ中に表示されるグローラインの太さ
     * 数値はグリッド線の太さの倍率、2.0ならグローアウトラインはディゾルブラインの倍の太さになる。
     *
     * 注意 : isReversed = true かつgridEmissiveWeightが2.0以下の場合、グロー線が消えなくなる。
     * 反転させる場合は、2.0以上を指定すること。
     */
    get gridEmissiveWeight() {
        return this.uniforms.gridEmissiveWeight.value;
    }
    set gridEmissiveWeight(value) {
        this.uniforms.gridEmissiveWeight.value = value;
    }
    constructor(parameters) {
        super(null, HexDissolveMaterial_frag_glsl_1.default(), parameters);
    }
    initUniforms() {
        this.uniforms = three_1.UniformsUtils.merge([
            GridMaterial_1.GridMaterial.getBasicUniforms(),
            {
                progress: { value: 0.0 },
                delay: { value: 0.8 },
                gridWeight: { value: 0.0 },
                isAscending: { value: true },
                gridEmissive: { value: new three_2.Color(0x000000) },
                gridEmissiveWeight: { value: 2.5 }
            }
        ]);
    }
    initChunks() {
        super.initChunks();
        index_1.HexGridChunk.registerChunk();
    }
}
exports.HexDissolveMaterial = HexDissolveMaterial;
