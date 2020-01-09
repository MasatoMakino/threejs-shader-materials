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
/**
 * IAnimatableインターフェースで定義されたアニメーションを実行するGLSLチャンク。
 * uniformのtime値を操作する。
 * time値によってどのように変化するかは実装するShaderによる。
 */
var AnimationChunk = /** @class */ (function (_super) {
    __extends(AnimationChunk, _super);
    function AnimationChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationChunk.registerChunk = function () {
        TimeAnimationUniformChunk.registerChunk();
    };
    AnimationChunk.getUniform = function () {
        return {
            time: { value: 0.0 },
            isAnimate: { value: true }
        };
    };
    AnimationChunk.addTime = function (self, delta) {
        self.uniforms.time.value += delta * self.speed;
    };
    return AnimationChunk;
}(GLSLChunk_1.GLSLChunk));
exports.AnimationChunk = AnimationChunk;
var TimeAnimationUniformChunk = /** @class */ (function (_super) {
    __extends(TimeAnimationUniformChunk, _super);
    function TimeAnimationUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeAnimationUniformChunk.getChunkName = function () {
        return "time_animation_uniform_chunk";
    };
    TimeAnimationUniformChunk.getChunk = function () {
        return "\n    uniform float time;\n    uniform bool isAnimate;\n    ";
    };
    return TimeAnimationUniformChunk;
}(GLSLChunk_1.GLSLChunk));
