"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReversibleChunk = void 0;
const GLSLChunk_1 = require("./GLSLChunk");
class ReversibleChunk extends GLSLChunk_1.GLSLChunk {
    static registerChunk() {
        ReversibleUniformChunk.registerChunk();
    }
    static getUniform() {
        return {
            isReversed: { value: false },
        };
    }
}
exports.ReversibleChunk = ReversibleChunk;
class ReversibleUniformChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "reversible_uniform_chunk";
    }
    static getChunk() {
        return `
      uniform bool isReversed;
    `;
    }
}
