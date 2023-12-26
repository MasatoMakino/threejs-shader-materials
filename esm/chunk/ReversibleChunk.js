import { GLSLChunk } from "./GLSLChunk";
export class ReversibleChunk extends GLSLChunk {
    static registerChunk() {
        ReversibleUniformChunk.registerChunk();
    }
    static getUniform() {
        return {
            isReversed: { value: false },
        };
    }
}
class ReversibleUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "reversible_uniform_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
      uniform bool isReversed;
    `;
    }
}
