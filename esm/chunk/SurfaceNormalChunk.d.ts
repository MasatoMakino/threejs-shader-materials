import { GLSLChunk } from "./GLSLChunk.js";
export declare class SurfaceNormalChunk extends GLSLChunk {
    static registerChunk(): void;
    static getDefines(): Object;
    static getUniform(): any;
}
export declare class SurfaceNormalVaryingChunk extends GLSLChunk {
    protected static getChunkName(): string;
    protected static getChunk(): string;
}
export declare class SurfaceNormalVertexChunk extends GLSLChunk {
    protected static getChunkName(): string;
    protected static getChunk(): string;
}
//# sourceMappingURL=SurfaceNormalChunk.d.ts.map