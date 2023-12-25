"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directions = exports.WavyAnimationChunk = void 0;
const AnimationChunk_1 = require("./AnimationChunk");
const GLSLChunk_1 = require("./GLSLChunk");
const three_1 = require("three");
/**
 * IWaveAnimatableインターフェースで定義されたアニメーションを実装するためのGLSLチャンク。
 * 実行にはグリッドid値が必要。idはvec2。
 * 結果はdiffuseColor.aに反映される。
 */
class WavyAnimationChunk extends AnimationChunk_1.AnimationChunk {
    static registerChunk() {
        super.registerChunk();
        WavyAnimationFragmentChunk.registerChunk();
        WavyAnimationUniformChunk.registerChunk();
    }
    static getUniform() {
        return three_1.UniformsUtils.merge([
            super.getUniform(),
            {
                raisedBottom: { value: 0.05 },
                waveFrequency: { value: 0.2 },
                wavePow: { value: 4.0 },
                direction: { value: Directions.vertical },
            },
        ]);
    }
}
exports.WavyAnimationChunk = WavyAnimationChunk;
class WavyAnimationFragmentChunk extends GLSLChunk_1.GLSLChunk {
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
class WavyAnimationUniformChunk extends GLSLChunk_1.GLSLChunk {
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
var Directions;
(function (Directions) {
    Directions[Directions["vertical"] = 4] = "vertical";
    Directions[Directions["horizontal"] = 3] = "horizontal";
    /**
     * id値(0,0)を中心に同心円状に波及する。
     */
    Directions[Directions["radial"] = 5] = "radial";
})(Directions || (exports.Directions = Directions = {}));
