import { GLSLChunk } from "./GLSLChunk";
import { UniformsUtils } from "three";
import { AnimationChunk } from "./AnimationChunk";
/**
 * IWaveAnimatableインターフェースで定義されたアニメーションを実装するためのGLSLチャンク。
 * 実行にはグリッドid値が必要。idはvec2。
 * 結果はdiffuseColor.aに反映される。
 */
export class WavyAnimationChunk extends AnimationChunk {
    static registerChunk() {
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
    static getChunkName() {
        return "wavy_animation_fragment_chunk";
    }
    static getChunk() {
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
    static getChunkName() {
        return "wavy_animation_uniform_chunk";
    }
    static getChunk() {
        return `
    uniform float raisedBottom;
    uniform float waveFrequency;
    uniform float wavePow;
    uniform int direction;
    `;
    }
}
/**
 * Wavyアニメーションの波及方向を示すenum。
 */
export var Directions;
(function (Directions) {
    Directions[Directions["vertical"] = 4] = "vertical";
    Directions[Directions["horizontal"] = 3] = "horizontal";
    /**
     * id値(0,0)を中心に同心円状に波及する。
     */
    Directions[Directions["radial"] = 5] = "radial";
})(Directions || (Directions = {}));
