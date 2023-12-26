import { GLSLChunk } from "./GLSLChunk";
import { IUniform } from "three";

/**
 * 時間経過によりアニメーションするマテリアルのインターフェース。
 *
 * - アニメーションスピードspeed
 * - アニメーション再生/停止フラグisAnimate
 *
 * のそれぞれの変数にアクセスできることを保証する。
 */
export interface IAnimatable {
  uniforms: { [uniform: string]: IUniform };

  /**
   * 経過時間を追加する。uniformのtimeにはdelta * speedの値が加算される。speedに負の値を設定すると、アニメーションの進行方向は反転する。
   * @param delta 前回アニメーション実行時からの差分時間 単位 : 秒
   */
  addTime(delta: number): void;
  speed: number;
  isAnimate: boolean;
}

/**
 * IAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * uniformのtime値を操作する。
 * time値によってどのように変化するかは実装するShaderによる。
 */
export class AnimationChunk extends GLSLChunk {
  public static registerChunk(): void {
    TimeAnimationUniformChunk.registerChunk();
  }

  public static getUniform() {
    return {
      time: { value: 0.0 },
      isAnimate: { value: true },
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
    return /* GLSL */ `
    uniform float time;
    uniform bool isAnimate;
    `;
  }
}
