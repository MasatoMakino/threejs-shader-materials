import { ShaderChunk } from "three";
/**
 * ShaderChunkに登録を行うGLSLのコード片を格納するクラス。
 * GLSLコードの共有化を目的とする。
 */
export class GLSLChunk {
    static getChunkName() {
        return "";
    }
    static getChunk() {
        return "";
    }
    static getDefines() {
        return {};
    }
    static registerChunk() {
        if (ShaderChunk && ShaderChunk[this.getChunkName()] == null) {
            ShaderChunk[this.getChunkName()] = this.getChunk();
        }
    }
    static getUniform() {
        return {};
    }
}
