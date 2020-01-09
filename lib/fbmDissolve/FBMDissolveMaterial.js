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
var three_2 = require("three");
var ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
var TilingFBMChunk_1 = require("../chunk/TilingFBMChunk");
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("../ShaderPhongMaterial.vert.glsl"));
var FBMDissolveMaterial_frag_glsl_1 = __importDefault(require("./FBMDissolveMaterial.frag.glsl"));
var FBMDissolveMaterial = /** @class */ (function (_super) {
    __extends(FBMDissolveMaterial, _super);
    /**
     *
     * @param parameters
     */
    function FBMDissolveMaterial(parameters) {
        return _super.call(this, ShaderPhongMaterial_vert_glsl_1.default(), FBMDissolveMaterial_frag_glsl_1.default(), parameters) || this;
    }
    Object.defineProperty(FBMDissolveMaterial.prototype, "tiles", {
        get: function () {
            return this.uniforms.tiles.value;
        },
        set: function (value) {
            this.uniforms.tiles.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FBMDissolveMaterial.prototype, "hashLoop", {
        get: function () {
            return this.uniforms.hashLoop.value;
        },
        set: function (value) {
            this.uniforms.hashLoop.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FBMDissolveMaterial.prototype, "amp", {
        get: function () {
            return this.uniforms.amp.value;
        },
        set: function (value) {
            this.uniforms.amp.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FBMDissolveMaterial.prototype, "progress", {
        get: function () {
            return this.uniforms.progress.value;
        },
        set: function (value) {
            this.uniforms.progress.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FBMDissolveMaterial.prototype, "edgeWeight", {
        get: function () {
            return this.uniforms.edgeWeight.value;
        },
        set: function (value) {
            this.uniforms.edgeWeight.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FBMDissolveMaterial.prototype, "edgeColor", {
        get: function () {
            return this.uniforms.edgeColor.value;
        },
        set: function (value) {
            this.uniforms.edgeColor.value = value;
        },
        enumerable: true,
        configurable: true
    });
    FBMDissolveMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial_1.ShaderPhongMaterial.getBasicUniforms(),
            TilingFBMChunk_1.TilingFBMChunk.getUniform(),
            {
                progress: { value: 0.0 },
                edgeWeight: { value: 0.1 },
                edgeColor: { value: new three_2.Color(1.0, 1.0, 1.0) }
            }
        ]);
    };
    FBMDissolveMaterial.prototype.initChunks = function () {
        _super.prototype.initChunks.call(this);
        TilingFBMChunk_1.TilingFBMChunk.registerChunk();
    };
    /**
     * definesを初期化する。
     */
    FBMDissolveMaterial.prototype.initDefines = function () {
        _super.prototype.initDefines.call(this);
        this.defines = Object.assign({}, TilingFBMChunk_1.TilingFBMChunk.getDefines(), this.defines);
    };
    FBMDissolveMaterial.prototype.initDefaultSetting = function (parameters) {
        _super.prototype.initDefaultSetting.call(this, parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
    };
    return FBMDissolveMaterial;
}(ShaderPhongMaterial_1.ShaderPhongMaterial));
exports.FBMDissolveMaterial = FBMDissolveMaterial;
