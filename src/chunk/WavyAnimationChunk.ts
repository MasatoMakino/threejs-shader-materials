import { GLSLChunk } from "./GLSLChunk";
import { UniformsUtils } from "three";
import { IAnimatable, AnimationChunk } from "./AnimationChunk";

/**
 * マテリアル用インターフェース
 */
export interface IWavyAnimatable extends IAnimatable {
  raisedBottom: number;
  waveFrequency: number;
  wavePow: number;
  direction: Directions;
}

/**
 * IWaveAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * 実行にはグリッドid値が必要。idはvec2。
 * 結果はdiffuseColor.aに反映される。
 */
export class WavyAnimationChunk extends AnimationChunk {
  public static registerChunk(): void {
    super.registerChunk();
    WavyAnimationFragmentChunk.registerChunk();
    WavyAnimationUniformChunk.registerChunk();
  }

  static getUniform() {
    return UniformsUtils.merge([
      super.getUniform(),
      {
        raisedBottom: { value: 0.05 },
        waveFrequency: { value: 0.2 },
        wavePow: { value: 4.0 },
        direction: { value: Directions.vertical }
      }
    ]);
  }
}

class WavyAnimationFragmentChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "wavy_animation_fragment_chunk";
  }

  protected static getChunk(): string {
    return `
    float distance = id.y;
    if( direction == ${Directions.horizontal}){
      distance = id.x;
    }else if( direction == ${Directions.radial} ){
      distance = length(id.xy);
    }

    float wavy = isAnimate
      ? pow( sin( (distance * waveFrequency - time) ), wavePow) + raisedBottom
      : 1.0;
  
    diffuseColor.a *= wavy;
    `;
  }
}

class WavyAnimationUniformChunk extends GLSLChunk {
  protected static getChunkName(): string {
    return "wavy_animation_uniform_chunk";
  }

  protected static getChunk(): string {
    return `
    uniform float raisedBottom;
    uniform float waveFrequency;
    uniform float wavePow;
    uniform int direction;
    `;
  }
}

export enum Directions {
  vertical = 4,
  horizontal = 3,
  radial = 5
}
