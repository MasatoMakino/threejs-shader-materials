"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLSLChunk = void 0;
var three_1 = require("three");
/**
 * ShaderChunkに登録を行うGLSLのコード片を格納するクラス。
 * GLSLコードの共有化を目的とする。
 */
var GLSLChunk = /** @class */ (function () {
    function GLSLChunk() {
    }
    /**
     * ShaderChunkに登録する名前。
     */
    GLSLChunk.getChunkName = function () {
        return "";
    };
    /**
     * ShaderChunkに登録するGLSLコード。
     */
    GLSLChunk.getChunk = function () {
        return "";
    };
    /**
     * Chunkに関連する定数Defineを格納したオブジェクトを取得する。
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.defines
     */
    GLSLChunk.getDefines = function () {
        return {};
    };
    /**
     * ShaderChunkにGLSLコードを登録する。
     */
    GLSLChunk.registerChunk = function () {
        if (three_1.ShaderChunk && three_1.ShaderChunk[this.getChunkName()] == null) {
            three_1.ShaderChunk[this.getChunkName()] = this.getChunk();
        }
    };
    /**
     * Chunkに関連する共有変数Uniformsを格納したオブジェクトを取得する。
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.uniforms
     */
    GLSLChunk.getUniform = function () {
        return {};
    };
    return GLSLChunk;
}());
exports.GLSLChunk = GLSLChunk;
