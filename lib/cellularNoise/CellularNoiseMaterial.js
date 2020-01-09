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
var index_1 = require("../index");
var three_1 = require("three");
var CellularNoiseMaterial_frag_glsl_1 = __importDefault(require("./CellularNoiseMaterial.frag.glsl"));
var raf_ticker_1 = require("raf-ticker");
var CellularNoiseMaterial = /** @class */ (function (_super) {
    __extends(CellularNoiseMaterial, _super);
    function CellularNoiseMaterial(parameters) {
        var _this = _super.call(this, null, CellularNoiseMaterial_frag_glsl_1.default(), parameters) || this;
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
    CellularNoiseMaterial.prototype.addTime = function (delta) {
        if (this.isAnimate) {
            index_1.AnimationChunk.addTime(this, delta);
        }
    };
    Object.defineProperty(CellularNoiseMaterial.prototype, "isAnimate", {
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellularNoiseMaterial.prototype, "grid", {
        get: function () {
            return this.uniforms.grid.value;
        },
        set: function (value) {
            this.uniforms.grid.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellularNoiseMaterial.prototype, "divisionScaleX", {
        get: function () {
            return this.uniforms.divisionScaleX.value;
        },
        set: function (value) {
            this.uniforms.divisionScaleX.value = value;
        },
        enumerable: true,
        configurable: true
    });
    CellularNoiseMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        index_1.AnimationChunk.registerChunk();
    };
    CellularNoiseMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            index_1.ShaderPhongMaterial.getBasicUniforms(),
            index_1.AnimationChunk.getUniform(),
            {
                grid: { value: 3.0 },
                divisionScaleX: { value: 1.0 }
            }
        ]);
    };
    CellularNoiseMaterial.prototype.startAnimation = function () {
        raf_ticker_1.RAFTicker.addEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    CellularNoiseMaterial.prototype.stopAnimation = function () {
        raf_ticker_1.RAFTicker.removeEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    return CellularNoiseMaterial;
}(index_1.ShaderPhongMaterial));
exports.CellularNoiseMaterial = CellularNoiseMaterial;
