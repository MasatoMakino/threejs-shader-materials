/**
 * ShaderChunkに登録を行うGLSLのコード片を格納するクラス。
 * GLSLコードの共有化を目的とする。
 */
export declare class GLSLChunk {
    protected static getChunkName(): string;
    protected static getChunk(): string;
    static getDefines(): Object;
    static registerChunk(): void;
    static getUniform(): any;
}
//# sourceMappingURL=GLSLChunk.d.ts.map