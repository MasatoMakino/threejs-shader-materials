import { GLSLChunk } from "./GLSLChunk";
export interface ITiledFBM {
    tiles: number;
    hashLoop: number;
    amp: number;
}
export declare class TilingFBMChunk extends GLSLChunk {
    static registerChunk(): void;
    static getUniform(): any;
    static getDefines(): Object;
}
//# sourceMappingURL=TilingFBMChunk.d.ts.map