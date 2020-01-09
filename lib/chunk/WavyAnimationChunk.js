"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GLSLChunk_1 = require("./GLSLChunk");
var three_1 = require("three");
var AnimationChunk_1 = require("./AnimationChunk");
/**
 * IWaveAnimatableインターフェースで定義されたアニメーションを実装するためのGLSLチャンク。
 * 実行にはグリッドid値が必要。idはvec2。
 * 結果はdiffuseColor.aに反映される。
 */
var WavyAnimationChunk = /** @class */ (function (_super) {
    __extends(WavyAnimationChunk, _super);
    function WavyAnimationChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WavyAnimationChunk.registerChunk = function () {
        _super.registerChunk.call(this);
        WavyAnimationFragmentChunk.registerChunk();
        WavyAnimationUniformChunk.registerChunk();
    };
    WavyAnimationChunk.getUniform = function () {
        return three_1.UniformsUtils.merge([
            _super.getUniform.call(this),
            {
                raisedBottom: { value: 0.05 },
                waveFrequency: { value: 0.2 },
                wavePow: { value: 4.0 },
                direction: { value: Directions.vertical }
            }
        ]);
    };
    return WavyAnimationChunk;
}(AnimationChunk_1.AnimationChunk));
exports.WavyAnimationChunk = WavyAnimationChunk;
var WavyAnimationFragmentChunk = /** @class */ (function (_super) {
    __extends(WavyAnimationFragmentChunk, _super);
    function WavyAnimationFragmentChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WavyAnimationFragmentChunk.getChunkName = function () {
        return "wavy_animation_fragment_chunk";
    };
    WavyAnimationFragmentChunk.getChunk = function () {
        return "\n    float distance = id.y;\n    if( direction == " + Directions.horizontal + "){\n      distance = id.x;\n    }else if( direction == " + Directions.radial + " ){\n      distance = length(id.xy);\n    }\n\n    float wavy = isAnimate\n      ? pow( sin( (distance * waveFrequency - time) ), wavePow) + raisedBottom\n      : 1.0;\n  \n    diffuseColor.a *= wavy;\n    ";
    };
    return WavyAnimationFragmentChunk;
}(GLSLChunk_1.GLSLChunk));
var WavyAnimationUniformChunk = /** @class */ (function (_super) {
    __extends(WavyAnimationUniformChunk, _super);
    function WavyAnimationUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WavyAnimationUniformChunk.getChunkName = function () {
        return "wavy_animation_uniform_chunk";
    };
    WavyAnimationUniformChunk.getChunk = function () {
        return "\n    uniform float raisedBottom;\n    uniform float waveFrequency;\n    uniform float wavePow;\n    uniform int direction;\n    ";
    };
    return WavyAnimationUniformChunk;
}(GLSLChunk_1.GLSLChunk));
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
})(Directions = exports.Directions || (exports.Directions = {}));
