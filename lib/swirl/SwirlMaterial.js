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
exports.SwirlMaterial = void 0;
var index_1 = require("../index");
var three_1 = require("three");
var SwirlMaterial_frag_glsl_1 = __importDefault(require("./SwirlMaterial.frag.glsl"));
var three_2 = require("three");
var raf_ticker_1 = require("raf-ticker");
var SwirlMaterial = /** @class */ (function (_super) {
    __extends(SwirlMaterial, _super);
    function SwirlMaterial(parameters) {
        var _this = _super.call(this, null, SwirlMaterial_frag_glsl_1.default(), parameters) || this;
        /*
         * implements IAnimatable
         */
        _this.speed = -0.02;
        /*
         * IAnimatable implements
         */
        _this.animationListener = function (e) {
            _this.addTime(e.delta / 1000);
        };
        _this.isAnimate = _this.isAnimate;
        return _this;
    }
    SwirlMaterial.prototype.addTime = function (delta) {
        if (this.isAnimate) {
            index_1.AnimationChunk.addTime(this, delta);
        }
    };
    Object.defineProperty(SwirlMaterial.prototype, "isAnimate", {
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
    SwirlMaterial.prototype.onSetMap = function (val) {
        _super.prototype.onSetMap.call(this, val);
        this.setRepeat(val);
    };
    SwirlMaterial.prototype.onSetAlphaMap = function (value) {
        _super.prototype.onSetAlphaMap.call(this, value);
        this.setRepeat(value);
    };
    /**
     * リピートモードは強制的にRepeatWrappingに
     * @param value
     */
    SwirlMaterial.prototype.setRepeat = function (value) {
        if (value) {
            value.wrapS = three_2.RepeatWrapping;
            value.wrapT = three_2.RepeatWrapping;
        }
    };
    Object.defineProperty(SwirlMaterial.prototype, "uvRotation", {
        get: function () {
            return this.uniforms.uvRotation.value;
        },
        set: function (value) {
            this.uniforms.uvRotation.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SwirlMaterial.prototype, "swirlRotation", {
        get: function () {
            return this.uniforms.swirlRotation.value;
        },
        set: function (value) {
            this.uniforms.swirlRotation.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SwirlMaterial.prototype, "radius", {
        get: function () {
            return this.uniforms.radius.value;
        },
        set: function (value) {
            this.uniforms.radius.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SwirlMaterial.prototype, "center", {
        get: function () {
            return this.uniforms.center.value;
        },
        set: function (value) {
            this.uniforms.center.value = value;
        },
        enumerable: false,
        configurable: true
    });
    SwirlMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        index_1.AnimationChunk.registerChunk();
    };
    SwirlMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            index_1.ShaderPhongMaterial.getBasicUniforms(),
            index_1.AnimationChunk.getUniform(),
            {
                uvRotation: { value: 0.0 },
                swirlRotation: { value: 3.14 },
                radius: { value: 0.5 },
                center: { value: new three_1.Vector2(0.5, 0.5) }
            }
        ]);
    };
    SwirlMaterial.prototype.startAnimation = function () {
        raf_ticker_1.RAFTicker.addEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    SwirlMaterial.prototype.stopAnimation = function () {
        raf_ticker_1.RAFTicker.removeEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    return SwirlMaterial;
}(index_1.ShaderPhongMaterial));
exports.SwirlMaterial = SwirlMaterial;
