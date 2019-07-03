import { GLSLChunk } from "./GLSLChunk";
export interface IRepeatablePattern {
    division: number;
    divisionScaleX: number;
}
export declare class RepeatPatternChunk extends GLSLChunk {
    static registerChunk(): void;
    static getUniform(): any;
}
//# sourceMappingURL=RepeatPatternChunk.d.ts.map