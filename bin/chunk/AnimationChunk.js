import { GLSLChunk } from "./GLSLChunk";
/**
 * IAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * uniformのtime値を操作する。
 */
export class AnimationChunk extends GLSLChunk {
    static registerChunk() {
        TimeAnimationUniformChunk.registerChunk();
    }
    static getUniform() {
        return {
            time: { value: 0.0 },
            isAnimate: { value: true }
        };
    }
    static addTime(self, delta) {
        self.uniforms.time.value += delta * self.speed;
    }
}
class TimeAnimationUniformChunk extends GLSLChunk {
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
