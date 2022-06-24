import { GLSLChunk } from "./GLSLChunk";
export class ExpansionChunk extends GLSLChunk {
    static registerChunk() {
        ExpansionUniformChunk.registerChunk();
        ExpansionVertexChunk.registerChunk();
    }
    static getDefines() {
        return {
            USE_EXPANSION: false,
        };
    }
    static getUniform() {
        return {
            expansionStrength: {
                value: 0.0,
            },
        };
    }
}
export class ExpansionUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "__expansion_uniform_chunk";
    }
    static getChunk() {
        return `
    #ifdef USE_EXPANSION
      uniform float expansionStrength;
    #endif
    `;
    }
}
export class ExpansionVertexChunk extends GLSLChunk {
    static getChunkName() {
        return "__expansion_vertex_chunk";
    }
    static getChunk() {
        return `
    #ifdef USE_EXPANSION
      transformed += normal * expansionStrength;
    #endif
    `;
    }
}
