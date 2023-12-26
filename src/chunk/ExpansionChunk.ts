import { GLSLChunk } from "./GLSLChunk";
import { IUniform } from "three";

export interface IExpandable {
  uniforms: { [uniform: string]: IUniform };
  expansionStrength: number;
}

export class ExpansionChunk extends GLSLChunk {
  public static registerChunk(): void {
    ExpansionUniformChunk.registerChunk();
    ExpansionVertexChunk.registerChunk();
  }

  public static getDefines(): Object {
    return {
      USE_EXPANSION: false,
    };
  }

  public static getUniform(): { [uniform: string]: IUniform } {
    return {
      expansionStrength: {
        value: 0.0,
      },
    };
  }
}

export class ExpansionUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "__expansion_uniform_chunk";
  }

  protected static getChunk(): string {
    return /* GLSL */ `
    #ifdef USE_EXPANSION
      uniform float expansionStrength;
    #endif
    `;
  }
}

export class ExpansionVertexChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "__expansion_vertex_chunk";
  }

  protected static getChunk(): string {
    return `
    #ifdef USE_EXPANSION
      transformed += normal * expansionStrength;
    #endif
    `;
  }
}
