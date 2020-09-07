"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBMFireMaterial = void 0;
var raf_ticker_1 = require("raf-ticker");
var three_1 = require("three");
var AnimationChunk_1 = require("../chunk/AnimationChunk");
var TilingFBMChunk_1 = require("../chunk/TilingFBMChunk");
var ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
var FBMFireMaterial_frag_glsl_1 = __importDefault(require("./FBMFireMaterial.frag.glsl"));
var FBMFireMaterial = /** @class */ (function (_super) {
    __extends(FBMFireMaterial, _super);
    /**
     *
     * @param parameters
     */
    function FBMFireMaterial(parameters) {
        var _this = _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), FBMFireMaterial_frag_glsl_1.default(), parameters) || this;
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
    Object.defineProperty(FBMFireMaterial.prototype, "tiles", {
        get: function () {
            return this.uniforms.tiles.value;
        },
        set: function (value) {
            this.uniforms.tiles.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FBMFireMaterial.prototype, "hashLoop", {
        get: function () {
            return this.uniforms.hashLoop.value;
        },
        set: function (value) {
            this.uniforms.hashLoop.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FBMFireMaterial.prototype, "amp", {
        get: function () {
            return this.uniforms.amp.value;
        },
        set: function (value) {
            this.uniforms.amp.value = value;
        },
        enumerable: false,
        configurable: true
    });
    /*
     * IAnimatable implements
     */
    FBMFireMaterial.prototype.addTime = function (delta) {
        AnimationChunk_1.AnimationChunk.addTime(this, delta);
    };
    Object.defineProperty(FBMFireMaterial.prototype, "isAnimate", {
        /**
         * アニメーションを行うか否か。
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
    Object.defineProperty(FBMFireMaterial.prototype, "strength", {
        get: function () {
            return this.uniforms.strength.value;
        },
        set: function (value) {
            this.uniforms.strength.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FBMFireMaterial.prototype, "bloom", {
        get: function () {
            return this.uniforms.bloom.value;
        },
        set: function (value) {
            this.uniforms.bloom.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FBMFireMaterial.prototype, "transformSpeed", {
        get: function () {
            return this.uniforms.transformSpeed.value;
        },
        set: function (value) {
            this.uniforms.transformSpeed.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FBMFireMaterial.prototype, "rimPow", {
        get: function () {
            return this.uniforms.rimPow.value;
        },
        set: function (value) {
            this.uniforms.rimPow.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FBMFireMaterial.prototype, "rimStrength", {
        get: function () {
            return this.uniforms.rimStrength.value;
        },
        set: function (value) {
            this.uniforms.rimStrength.value = value;
        },
        enumerable: false,
        configurable: true
    });
    FBMFireMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            TilingFBMChunk_1.TilingFBMChunk.getUniform(),
            AnimationChunk_1.AnimationChunk.getUniform(),
            {
                strength: { value: 0.45 },
                bloom: { value: 0.1 },
                rimStrength: { value: 1.0 },
                rimPow: { value: 1.0 },
            },
        ]);
    };
    FBMFireMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        TilingFBMChunk_1.TilingFBMChunk.registerChunk();
        AnimationChunk_1.AnimationChunk.registerChunk();
    };
    FBMFireMaterial.prototype.initDefines = function () {
        _super.prototype.initDefines.call(this);
        this.defines = Object.assign({}, TilingFBMChunk_1.TilingFBMChunk.getDefines(), this.defines);
        this.defines.USE_SURFACE_NORMAL = true;
    };
    FBMFireMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
    };
    FBMFireMaterial.prototype.startAnimation = function () {
        raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    FBMFireMaterial.prototype.stopAnimation = function () {
        raf_ticker_1.RAFTicker.off(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    return FBMFireMaterial;
}(ShaderPhongMaterial_1.ShaderPhongMaterial));
exports.FBMFireMaterial = FBMFireMaterial;
