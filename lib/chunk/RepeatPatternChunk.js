"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatPatternChunk = void 0;
const GLSLChunk_1 = require("./GLSLChunk");
class RepeatPatternChunk extends GLSLChunk_1.GLSLChunk {
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
exports.RepeatPatternChunk = RepeatPatternChunk;
class RepeatPatternUniformChunk extends GLSLChunk_1.GLSLChunk {
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
class RepeatPatternFragmentChunk extends GLSLChunk_1.GLSLChunk {
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
