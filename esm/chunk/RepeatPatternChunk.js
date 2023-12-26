import { GLSLChunk } from "./GLSLChunk";
export class RepeatPatternChunk extends GLSLChunk {
    static registerChunk() {
        RepeatPatternUniformChunk.registerChunk();
        RepeatPatternFragmentChunk.registerChunk();
    }
    static getUniform() {
        return {
            division: { value: 32.0 },
            divisionScaleX: { value: 1.0 },
        };
    }
}
class RepeatPatternUniformChunk extends GLSLChunk {
    static getChunkName() {
        return "repeat_pattern_uniform_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
      uniform float division;
      uniform float divisionScaleX;
    `;
    }
}
class RepeatPatternFragmentChunk extends GLSLChunk {
    static getChunkName() {
        return "repeat_pattern_fragment_chunk";
    }
    static getChunk() {
        return /* GLSL */ `
      vec2 uv =
        uvPosition
        * vec2( division * divisionScaleX, division);
    `;
    }
}
