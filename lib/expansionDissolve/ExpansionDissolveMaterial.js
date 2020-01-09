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
var three_1 = require("three");
var index_1 = require("../index");
var index_2 = require("../index");
var ExpansionDissolveMaterial_vert_glsl_1 = __importDefault(require("./ExpansionDissolveMaterial.vert.glsl"));
var ExpansionDissolveMaterial_frag_glsl_1 = __importDefault(require("./ExpansionDissolveMaterial.frag.glsl"));
var index_3 = require("../index");
var raf_ticker_1 = require("raf-ticker");
/**
 * FBMノイズによるジオメトリの膨張でディゾルブを行うマテリアル。
 * 爆発しながら消滅するような表現になる。
 * 膨張の進行度合いはprogressで制御する。
 */
var ExpansionDissolveMaterial = /** @class */ (function (_super) {
    __extends(ExpansionDissolveMaterial, _super);
    /**
     *
     * @param parameters
     */
    function ExpansionDissolveMaterial(parameters) {
        var _this = _super.call(this, ExpansionDissolveMaterial_vert_glsl_1.default(), ExpansionDissolveMaterial_frag_glsl_1.default(), parameters) || this;
        // IAnimatable //
        _this.speed = -0.5;
        /*
         * IAnimatable implements
         */
        _this.animationListener = function (e) {
            _this.addTime(e.delta / 1000);
        };
        _this.isAnimate = _this.isAnimate;
        return _this;
    }
    ExpansionDissolveMaterial.prototype.addTime = function (delta) {
        if (this.isAnimate) {
            index_3.AnimationChunk.addTime(this, delta);
        }
    };
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "isAnimate", {
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
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "tiles", {
        // ITiledFBM //
        get: function () {
            return this.uniforms.tiles.value;
        },
        set: function (value) {
            this.uniforms.tiles.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "hashLoop", {
        get: function () {
            return this.uniforms.hashLoop.value;
        },
        set: function (value) {
            this.uniforms.hashLoop.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "amp", {
        get: function () {
            return this.uniforms.amp.value;
        },
        set: function (value) {
            this.uniforms.amp.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "scaleMax", {
        get: function () {
            return this.uniforms.scaleMax.value;
        },
        set: function (value) {
            this.uniforms.scaleMax.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "time", {
        get: function () {
            return this.uniforms.time.value;
        },
        set: function (value) {
            this.uniforms.time.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "progress", {
        get: function () {
            return this.uniforms.progress.value;
        },
        set: function (value) {
            this.uniforms.progress.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "dissolveColor", {
        get: function () {
            return this.uniforms.dissolveColor.value;
        },
        set: function (value) {
            this.uniforms.dissolveColor.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpansionDissolveMaterial.prototype, "dissolveOutColor", {
        get: function () {
            return this.uniforms.dissolveOutColor.value;
        },
        set: function (value) {
            this.uniforms.dissolveOutColor.value = value;
        },
        enumerable: true,
        configurable: true
    });
    ExpansionDissolveMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            index_1.ShaderPhongMaterial.getBasicUniforms(),
            index_2.TilingFBMChunk.getUniform(),
            index_3.AnimationChunk.getUniform(),
            {
                scaleMax: { value: 20.0 },
                progress: { value: 0.0 },
                dissolveColor: { value: new three_1.Color(1.0, 1.0, 1.0) },
                dissolveOutColor: { value: new three_1.Color(0.0, 0.0, 0.0) }
            }
        ]);
    };
    ExpansionDissolveMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        index_2.TilingFBMChunk.registerChunk();
    };
    ExpansionDissolveMaterial.prototype.initDefines = function () {
        _super.prototype.initDefines.call(this);
        this.defines = Object.assign(this.defines, index_2.TilingFBMChunk.getDefines());
        this.defines.USE_EXPANSION = true;
    };
    ExpansionDissolveMaterial.prototype.startAnimation = function () {
        raf_ticker_1.RAFTicker.addEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    ExpansionDissolveMaterial.prototype.stopAnimation = function () {
        raf_ticker_1.RAFTicker.removeEventListener(raf_ticker_1.RAFTickerEventType.onBeforeTick, this.animationListener);
    };
    return ExpansionDissolveMaterial;
}(index_1.ShaderPhongMaterial));
exports.ExpansionDissolveMaterial = ExpansionDissolveMaterial;
