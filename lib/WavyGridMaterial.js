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
exports.WavyGridMaterial = void 0;
var raf_ticker_1 = require("raf-ticker");
var three_1 = require("three");
var AnimationChunk_1 = require("./chunk/AnimationChunk");
var MaskMapChunk_1 = require("./chunk/MaskMapChunk");
var ReversibleChunk_1 = require("./chunk/ReversibleChunk");
var WavyAnimationChunk_1 = require("./chunk/WavyAnimationChunk");
var GridMaterial_1 = require("./GridMaterial");
/**
 * グリッド状に分割され、Wavyアニメーションを行うマテリアル。
 */
var WavyGridMaterial = /** @class */ (function (_super) {
    __extends(WavyGridMaterial, _super);
    function WavyGridMaterial(vertexShader, fragmentShader, parameters) {
        var _this = _super.call(this, vertexShader, fragmentShader, parameters) || this;
        /**
         * 波の速度
         * 0.5にすると1の半分の速度になる。
         * マイナスを指定すると、波の進行方向が反転する。
         */
        _this.speed = -0.5;
        /*
         * IAnimatable implements
         */
        _this.animationListener = function (e) {
            _this.addTime(e.delta / 1000);
        };
        _this.isAnimate = _this.isAnimate; //reset and start animation
        return _this;
    }
    WavyGridMaterial.prototype.addTime = function (delta) {
        AnimationChunk_1.AnimationChunk.addTime(this, delta);
    };
    Object.defineProperty(WavyGridMaterial.prototype, "isAnimate", {
        /**
         * 波アニメーションを行うか否か。
         */
        get: function () {
            return this.uniforms.isAnimate.value;
        },
        set: function (value) {
            this.uniforms.isAnimate.value = value;
            if (this.isAnimate) {
                this.startAnimation();
            }
            else {
                this.stopAnimation();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WavyGridMaterial.prototype, "waveFrequency", {
        /**
         * 波の振幅
         * 1の場合、幅1ヘックス
         * 0.5の場合、幅2ヘックスになる
         */
        get: function () {
            return this.uniforms.waveFrequency.value;
        },
        set: function (value) {
            this.uniforms.waveFrequency.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WavyGridMaterial.prototype, "wavePow", {
        get: function () {
            return this.uniforms.wavePow.value;
        },
        set: function (value) {
            this.uniforms.wavePow.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WavyGridMaterial.prototype, "raisedBottom", {
        /**
         * 明るさの底上げ
         */
        get: function () {
            return this.uniforms.raisedBottom.value;
        },
        set: function (value) {
            this.uniforms.raisedBottom.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WavyGridMaterial.prototype, "direction", {
        /**
         * 波が発生する方角
         */
        get: function () {
            return this.uniforms.direction.value;
        },
        set: function (value) {
            this.uniforms.direction.value = value;
        },
        enumerable: false,
        configurable: true
    });
    WavyGridMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        WavyAnimationChunk_1.WavyAnimationChunk.registerChunk();
    };
    WavyGridMaterial.getBasicUniforms = function () {
        return three_1.UniformsUtils.merge([
            _super.getBasicUniforms.call(this),
            ReversibleChunk_1.ReversibleChunk.getUniform(),
            WavyAnimationChunk_1.WavyAnimationChunk.getUniform(),
            MaskMapChunk_1.MaskMapChunk.getUniform(),
        ]);
    };
    WavyGridMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
    };
    WavyGridMaterial.prototype.startAnimation = function () {
        raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    WavyGridMaterial.prototype.stopAnimation = function () {
        raf_ticker_1.RAFTicker.off(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    return WavyGridMaterial;
}(GridMaterial_1.GridMaterial));
exports.WavyGridMaterial = WavyGridMaterial;
