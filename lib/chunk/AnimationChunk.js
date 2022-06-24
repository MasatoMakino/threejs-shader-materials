"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationChunk = void 0;
const GLSLChunk_1 = require("./GLSLChunk");
/**
 * IAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * uniformのtime値を操作する。
 * time値によってどのように変化するかは実装するShaderによる。
 */
class AnimationChunk extends GLSLChunk_1.GLSLChunk {
    static registerChunk() {
        TimeAnimationUniformChunk.registerChunk();
    }
    static getUniform() {
        return {
            time: { value: 0.0 },
            isAnimate: { value: true },
        };
    }
    static addTime(self, delta) {
        self.uniforms.time.value += delta * self.speed;
    }
}
exports.AnimationChunk = AnimationChunk;
class TimeAnimationUniformChunk extends GLSLChunk_1.GLSLChunk {
    static getChunkName() {
        return "time_animation_uniform_chunk";
    }
    static getChunk() {
        return `
    uniform float time;
    uniform bool isAnimate;
    `;
    }
}
