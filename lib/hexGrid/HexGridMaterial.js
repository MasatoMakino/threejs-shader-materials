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
var WavyGridMaterial_1 = require("../WavyGridMaterial");
var HexGridMaterial_frag_glsl_1 = __importDefault(require("./HexGridMaterial.frag.glsl"));
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
var HexGridChunk_1 = require("../chunk/HexGridChunk");
/**
 * 六角形グリッドマテリアル
 */
var HexGridMaterial = /** @class */ (function (_super) {
    __extends(HexGridMaterial, _super);
    function HexGridMaterial(parameters) {
        return _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), HexGridMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(HexGridMaterial.prototype, "gridWeight", {
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
        enumerable: true,
        configurable: true
    });
    HexGridMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            WavyGridMaterial_1.WavyGridMaterial.getBasicUniforms(),
            {
                gridWeight: { value: 0.03 }
            }
        ]);
    };
    HexGridMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        HexGridChunk_1.HexGridChunk.registerChunk();
    };
    return HexGridMaterial;
}(WavyGridMaterial_1.WavyGridMaterial));
exports.HexGridMaterial = HexGridMaterial;
