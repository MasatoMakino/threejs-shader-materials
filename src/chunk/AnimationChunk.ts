import { IUniform } from "three";
import { GLSLChunk } from "./GLSLChunk";

/**
 * マテリアル用インターフェース
 */
export interface IAnimatable {
  uniforms: { [uniform: string]: IUniform };
  addTime(delta: number): void;
  speed: number;
  isAnimate: boolean;
}

/**
 * IAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * uniformのtime値を操作する。
 */
export class AnimationChunk extends GLSLChunk {
  public static registerChunk(): void {
    TimeAnimationUniformChunk.registerChunk();
  }

  public static getUniform() {
    return {
      time: { value: 0.0 },
      isAnimate: { value: true }
    };
  }

  public static addTime(self: IAnimatable, delta: number): void {
    self.uniforms.time.value += delta * self.speed;
  }
}

class TimeAnimationUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "time_animation_uniform_chunk";
  }

  protected static getChunk(): string {
    return `
    uniform float time;
    uniform bool isAnimate;
    `;
  }
}
