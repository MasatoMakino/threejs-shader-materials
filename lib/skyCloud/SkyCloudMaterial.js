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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyCloudMaterial = void 0;
var three_1 = require("three");
var ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
var AnimationChunk_1 = require("../chunk/AnimationChunk");
var SkyCloudMaterial_frag_glsl_1 = __importDefault(require("./SkyCloudMaterial.frag.glsl"));
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
var raf_ticker_1 = require("raf-ticker");
var SkyCloudMaterial = /** @class */ (function (_super) {
    __extends(SkyCloudMaterial, _super);
    /**
     *
     * @param parameters
     */
    function SkyCloudMaterial(parameters) {
        var _this = _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), SkyCloudMaterial_frag_glsl_1.default(), parameters) || this;
        /**
         * 波の速度
         * 0.5にすると1の半分の速度になる。
         * マイナスを指定すると、波の進行方向が反転する。
         */
        _this.speed = -0.02;
        /*
         * IAnimatable implements
         */
        _this.animationListener = function (e) {
            _this.addTime(e.delta / 1000);
        };
        _this.isAnimate = _this.isAnimate; //reset and start animation
        return _this;
    }
    Object.defineProperty(SkyCloudMaterial.prototype, "scale", {
        get: function () {
            return this.uniforms.scale.value;
        },
        set: function (value) {
            this.uniforms.scale.value = value;
        },
        enumerable: false,
        configurable: true
    });
    SkyCloudMaterial.prototype.addTime = function (delta) {
        AnimationChunk_1.AnimationChunk.addTime(this, delta);
    };
    Object.defineProperty(SkyCloudMaterial.prototype, "isAnimate", {
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
    Object.defineProperty(SkyCloudMaterial.prototype, "skyColor", {
        get: function () {
            return this.uniforms.skyColor.value;
        },
        set: function (value) {
            this.uniforms.skyColor.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkyCloudMaterial.prototype, "cloudVolume", {
        get: function () {
            return this.uniforms.cloudVolume.value;
        },
        set: function (value) {
            this.uniforms.cloudVolume.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkyCloudMaterial.prototype, "cloudBottomVolume", {
        get: function () {
            return this.uniforms.cloudBottomVolume.value;
        },
        set: function (value) {
            this.uniforms.cloudBottomVolume.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkyCloudMaterial.prototype, "cloudBottomSaturation", {
        get: function () {
            return this.uniforms.cloudBottomSaturation.value;
        },
        set: function (value) {
            this.uniforms.cloudBottomSaturation.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkyCloudMaterial.prototype, "cloudTransformSpeed", {
        get: function () {
            return this.uniforms.cloudTransformSpeed.value;
        },
        set: function (value) {
            this.uniforms.cloudTransformSpeed.value = value;
        },
        enumerable: false,
        configurable: true
    });
    SkyCloudMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        AnimationChunk_1.AnimationChunk.registerChunk();
    };
    SkyCloudMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            AnimationChunk_1.AnimationChunk.getUniform(),
            {
                scale: { value: 3.0 },
                cloudTransformSpeed: { value: 0.15 },
                cloudVolume: { value: 16.0 },
                cloudBottomVolume: { value: 0.08 },
                cloudBottomSaturation: { value: 0.5 },
                skyColor: { value: new three_1.Color(0.101961, 0.619608, 0.666667) }
            }
        ]);
    };
    SkyCloudMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
    };
    SkyCloudMaterial.prototype.startAnimation = function () {
        raf_ticker_1.RAFTicker.addEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    SkyCloudMaterial.prototype.stopAnimation = function () {
        raf_ticker_1.RAFTicker.removeEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    return SkyCloudMaterial;
}(ShaderPhongMaterial_1.ShaderPhongMaterial));
exports.SkyCloudMaterial = SkyCloudMaterial;
