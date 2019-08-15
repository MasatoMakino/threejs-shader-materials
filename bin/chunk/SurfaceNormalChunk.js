import { GLSLChunk } from "./GLSLChunk";
export class SurfaceNormalChunk extends GLSLChunk {
    static registerChunk() {
        SurfaceNormalVaryingChunk.registerChunk();
        SurfaceNormalVertexChunk.registerChunk();
    }
    static getDefines() {
        return {
            USE_SURFACE_NORMAL: false
        };
    }
    static getUniform() {
        return {};
    }
}
export class SurfaceNormalVaryingChunk extends GLSLChunk {
    static getChunkName() {
        return "surface_normal_varying_chunk";
    }
    static getChunk() {
        return `
    #ifdef USE_SURFACE_NORMAL
      varying vec3 surfaceNormal;
    #endif
    `;
    }
}
export class SurfaceNormalVertexChunk extends GLSLChunk {
    static getChunkName() {
        return "surface_normal_vertex_chunk";
    }
    static getChunk() {
        return `
    #ifdef USE_SURFACE_NORMAL
      surfaceNormal = normalize( transformedNormal );
    #endif
    `;
    }
}
