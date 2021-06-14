"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpansionVertexChunk = exports.ExpansionUniformChunk = exports.ExpansionChunk = void 0;
const GLSLChunk_1 = require("./GLSLChunk");
class ExpansionChunk extends GLSLChunk_1.GLSLChunk {
    static registerChunk() {
        ExpansionUniformChunk.registerChunk();
        ExpansionVertexChunk.registerChunk();
    }
    static getDefines() {
        return {
            USE_EXPANSION: false
        };
    }
    static getUniform() {
        return {
            expansionStrength: {
                value: 0.0
            }
        };
    }
}
exports.ExpansionChunk = ExpansionChunk;
class ExpansionUniformChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "expansion_uniform_chunk";
    }
    static getChunk() {
        return `
    #ifdef USE_EXPANSION
      uniform float expansionStrength;
    #endif
    `;
    }
}
exports.ExpansionUniformChunk = ExpansionUniformChunk;
class ExpansionVertexChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "expansion_vertex_chunk";
    }
    static getChunk() {
        return `
    #ifdef USE_EXPANSION
      transformed += normal * expansionStrength;
    #endif
    `;
    }
}
exports.ExpansionVertexChunk = ExpansionVertexChunk;
