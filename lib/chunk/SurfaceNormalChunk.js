"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurfaceNormalVertexChunk = exports.SurfaceNormalVaryingChunk = exports.SurfaceNormalChunk = void 0;
const GLSLChunk_1 = require("./GLSLChunk");
class SurfaceNormalChunk extends GLSLChunk_1.GLSLChunk {
    static registerChunk() {
        SurfaceNormalVaryingChunk.registerChunk();
        SurfaceNormalVertexChunk.registerChunk();
    }
    static getDefines() {
        return {
            USE_SURFACE_NORMAL: false,
        };
    }
    static getUniform() {
        return {};
    }
}
exports.SurfaceNormalChunk = SurfaceNormalChunk;
class SurfaceNormalVaryingChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "surface_normal_varying_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
    #ifdef USE_SURFACE_NORMAL
      varying vec3 surfaceNormal;
    #endif
    `;
    }
}
exports.SurfaceNormalVaryingChunk = SurfaceNormalVaryingChunk;
class SurfaceNormalVertexChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "surface_normal_vertex_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
    #ifdef USE_SURFACE_NORMAL
      surfaceNormal = normalize( transformedNormal );
    #endif
    `;
    }
}
exports.SurfaceNormalVertexChunk = SurfaceNormalVertexChunk;
