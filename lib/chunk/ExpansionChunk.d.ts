import { GLSLChunk } from "./GLSLChunk";
import { IUniform } from "three";
export interface IExpandable {
    uniforms: {
        [uniform: string]: IUniform;
    };
    expansionStrength: number;
}
export declare class ExpansionChunk extends GLSLChunk {
    static registerChunk(): void;
    static getDefines(): Object;
    static getUniform(): {
        [uniform: string]: IUniform;
    };
}
export declare class ExpansionUniformChunk extends GLSLChunk {
    protected static getChunkName(): string;
    protected static getChunk(): string;
}
export declare class ExpansionVertexChunk extends GLSLChunk {
    protected static getChunkName(): string;
    protected static getChunk(): string;
}
//# sourceMappingURL=ExpansionChunk.d.ts.map