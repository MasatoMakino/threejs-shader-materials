import { ShaderChunk } from "three";
/**
 * ShaderChunkに登録を行うGLSLのコード片を格納するクラス。
 * GLSLコードの共有化を目的とする。
 */
export class GLSLChunk {
    /**
     * ShaderChunkに登録する名前。
     */
    static getChunkName() {
        return "";
    }
    /**
     * ShaderChunkに登録するGLSLコード。
     */
    static getChunk() {
        return "";
    }
    /**
     * Chunkに関連する定数Defineを格納したオブジェクトを取得する。
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.defines
     */
    static getDefines() {
        return {};
    }
    /**
     * ShaderChunkにGLSLコードを登録する。
     */
    static registerChunk() {
        if (ShaderChunk && ShaderChunk[this.getChunkName()] == null) {
            ShaderChunk[this.getChunkName()] = this.getChunk();
        }
    }
    /**
     * Chunkに関連する共有変数Uniformsを格納したオブジェクトを取得する。
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.uniforms
     */
    static getUniform() {
        return {};
    }
}
