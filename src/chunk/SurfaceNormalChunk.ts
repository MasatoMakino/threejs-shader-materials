import { GLSLChunk } from "./GLSLChunk";

export class SurfaceNormalChunk extends GLSLChunk {
  public static registerChunk(): void {
    SurfaceNormalVaryingChunk.registerChunk();
    SurfaceNormalVertexChunk.registerChunk();
  }

  public static getDefines(): Object {
    return {
      USE_SURFACE_NORMAL: false,
    };
  }

  public static getUniform(): any {
    return {};
  }
}

export class SurfaceNormalVaryingChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "surface_normal_varying_chunk";
  }

  protected static getChunk(): string {
    return /* GLSL */ `
    #ifdef USE_SURFACE_NORMAL
      varying vec3 surfaceNormal;
    #endif
    `;
  }
}

export class SurfaceNormalVertexChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "surface_normal_vertex_chunk";
  }

  protected static getChunk(): string {
    return /* GLSL */ `
    #ifdef USE_SURFACE_NORMAL
      surfaceNormal = normalize( transformedNormal );
    #endif
    `;
  }
}
