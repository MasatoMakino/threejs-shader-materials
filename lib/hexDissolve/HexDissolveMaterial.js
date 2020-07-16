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
exports.HexDissolveMaterial = void 0;
var three_1 = require("three");
var HexDissolveMaterial_frag_glsl_1 = __importDefault(require("./HexDissolveMaterial.frag.glsl"));
var index_1 = require("../index");
var GridMaterial_1 = require("../GridMaterial");
var three_2 = require("three");
/**
 * 六角形グリッドマテリアル
 */
var HexDissolveMaterial = /** @class */ (function (_super) {
    __extends(HexDissolveMaterial, _super);
    function HexDissolveMaterial(parameters) {
        return _super.call(this, null, HexDissolveMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(HexDissolveMaterial.prototype, "progress", {
        /**
         * ディゾルブの進行度を指定する。
         * 1.0でディゾルブ完了となる。
         */
        get: function () {
            return this.uniforms.progress.value;
        },
        set: function (value) {
            this.uniforms.progress.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HexDissolveMaterial.prototype, "delay", {
        /**
         * ディゾルブの開始ずれを指定する。
         * 最後にディゾルブが始まるグリッドが、progressのどの値で開始されるかを意味する。
         * ex)
         * delay = 0.8の時、最後のグリッドはprogress = 0.8 ~ 1.0でディゾルブする。
         */
        get: function () {
            return this.uniforms.delay.value;
        },
        set: function (value) {
            this.uniforms.delay.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HexDissolveMaterial.prototype, "isAscending", {
        get: function () {
            return this.uniforms.isAscending.value;
        },
        set: function (value) {
            this.uniforms.isAscending.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HexDissolveMaterial.prototype, "gridWeight", {
        /**
         * グリッド線の太さ
         * 0.0で線なし、0.5でグリッド面なしになる。
         */
        get: function () {
            return this.uniforms.gridWeight.value;
        },
        set: function (value) {
            this.uniforms.gridWeight.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HexDissolveMaterial.prototype, "gridEmissive", {
        get: function () {
            return this.uniforms.gridEmissive.value;
        },
        set: function (value) {
            this.uniforms.gridEmissive.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HexDissolveMaterial.prototype, "gridEmissiveWeight", {
        /**
         * ディゾルブ中に表示されるグローラインの太さ
         * 数値はグリッド線の太さの倍率、2.0ならグローアウトラインはディゾルブラインの倍の太さになる。
         *
         * 注意 : isReversed = true かつgridEmissiveWeightが2.0以下の場合、グロー線が消えなくなる。
         * 反転させる場合は、2.0以上を指定すること。
         */
        get: function () {
            return this.uniforms.gridEmissiveWeight.value;
        },
        set: function (value) {
            this.uniforms.gridEmissiveWeight.value = value;
        },
        enumerable: false,
        configurable: true
    });
    HexDissolveMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            GridMaterial_1.GridMaterial.getBasicUniforms(),
            {
                progress: { value: 0.0 },
                delay: { value: 0.8 },
                gridWeight: { value: 0.0 },
                isAscending: { value: true },
                gridEmissive: { value: new three_2.Color(0x000000) },
                gridEmissiveWeight: { value: 2.5 }
            }
        ]);
    };
    HexDissolveMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        index_1.HexGridChunk.registerChunk();
    };
    return HexDissolveMaterial;
}(GridMaterial_1.GridMaterial));
exports.HexDissolveMaterial = HexDissolveMaterial;
