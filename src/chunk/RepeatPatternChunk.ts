import { GLSLChunk } from "./GLSLChunk";

export interface IRepeatablePattern {
  division: number;
  divisionScaleX: number;
}

export class RepeatPatternChunk extends GLSLChunk {
  public static registerChunk(): void {
    RepeatPatternUniformChunk.registerChunk();
    RepeatPatternFragmentChunk.registerChunk();
  }

  static getUniform() {
    return {
      division: { value: 32.0 },
      divisionScaleX: { value: 1.0 }
    };
  }
}

class RepeatPatternUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "repeat_pattern_uniform_chunk";
  }

  protected static getChunk(): string {
    return `
      uniform float division;
      uniform float divisionScaleX;
    `;
  }
}

class RepeatPatternFragmentChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "repeat_pattern_fragment_chunk";
  }

  protected static getChunk(): string {
    return `
      vec2 uv =
        uvPosition
        * vec2( division * divisionScaleX, division);
    `;
  }
}
