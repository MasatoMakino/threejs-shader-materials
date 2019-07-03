import { GLSLChunk } from "./GLSLChunk";
export interface IReversible {
    isReversed: boolean;
}
export declare class ReversibleChunk extends GLSLChunk {
    static registerChunk(): void;
    static getUniform(): any;
}
//# sourceMappingURL=ReversibleChunk.d.ts.map