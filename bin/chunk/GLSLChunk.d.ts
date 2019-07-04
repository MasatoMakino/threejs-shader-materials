/**
 * ShaderChunkに登録を行うGLSLのコード片を格納するクラス。
 * GLSLコードの共有化を目的とする。
 */
export declare class GLSLChunk {
    /**
     * ShaderChunkに登録する名前。
     */
    protected static getChunkName(): string;
    /**
     * ShaderChunkに登録するGLSLコード。
     */
    protected static getChunk(): string;
    /**
     * Chunkに関連する定数Defineを格納したオブジェクトを取得する。
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.defines
     */
    static getDefines(): Object;
    /**
     * ShaderChunkにGLSLコードを登録する。
     */
    static registerChunk(): void;
    /**
     * Chunkに関連する共有変数Uniformsを格納したオブジェクトを取得する。
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial.uniforms
     */
    static getUniform(): any;
}
//# sourceMappingURL=GLSLChunk.d.ts.map