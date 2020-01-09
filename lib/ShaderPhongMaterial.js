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
var MeshPhongChunk_1 = require("./chunk/MeshPhongChunk");
var SurfaceNormalChunk_1 = require("./chunk/SurfaceNormalChunk");
var ExpansionChunk_1 = require("./chunk/ExpansionChunk");
var MapChunk_1 = require("./chunk/MapChunk");
var ShaderPhongMaterial_vert_glsl_1 = __importDefault(require("./ShaderPhongMaterial.vert.glsl"));
var ShaderPhongMaterial_frag_glsl_1 = __importDefault(require("./ShaderPhongMaterial.frag.glsl"));
/**
 * MeshPhongMaterialに準じるShaderMaterialクラス。
 *
 * @see https://github.com/mrdoob/three.js/blob/76c64b23d422dcfb36a28353f45b1effa1f68c5a/src/renderers/shaders/ShaderLib.js#L53
 */
var ShaderPhongMaterial = /** @class */ (function (_super) {
    __extends(ShaderPhongMaterial, _super);
    /**
     * コンストラクタ。
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    function ShaderPhongMaterial(vertexShader, fragmentShader, parameters) {
        var _this = _super.call(this, parameters) || this;
        if (parameters == null)
            parameters = {};
        if (vertexShader == null) {
            vertexShader = ShaderPhongMaterial_vert_glsl_1.default();
        }
        if (fragmentShader == null) {
            fragmentShader = ShaderPhongMaterial_frag_glsl_1.default();
        }
        _this.initChunks();
        _this.initUniforms();
        _this.initDefines();
        _this.vertexShader = vertexShader;
        _this.fragmentShader = fragmentShader;
        _this.initDefaultSetting(parameters);
        return _this;
    }
    /**
     * このMaterialに必要なuniformsを生成する。
     */
    ShaderPhongMaterial.getBasicUniforms = function () {
        return three_1.UniformsUtils.merge([
            three_1.UniformsLib.common,
            three_1.UniformsLib.specularmap,
            three_1.UniformsLib.envmap,
            three_1.UniformsLib.aomap,
            three_1.UniformsLib.lightmap,
            three_1.UniformsLib.emissivemap,
            three_1.UniformsLib.bumpmap,
            three_1.UniformsLib.normalmap,
            three_1.UniformsLib.displacementmap,
            three_1.UniformsLib.gradientmap,
            three_1.UniformsLib.fog,
            three_1.UniformsLib.lights,
            {
                emissive: { value: new three_1.Color(0x000000) },
                specular: { value: new three_1.Color(0x111111) },
                shininess: { value: 30 },
                hasAlphaMap: { value: false }
            },
            SurfaceNormalChunk_1.SurfaceNormalChunk.getUniform(),
            ExpansionChunk_1.ExpansionChunk.getUniform(),
            MapChunk_1.MapChunk.getUniform()
        ]);
    };
    /**
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    ShaderPhongMaterial.prototype.initChunks = function () {
        MeshPhongChunk_1.MeshPhongChunk.registerChunk();
        SurfaceNormalChunk_1.SurfaceNormalChunk.registerChunk();
        ExpansionChunk_1.ExpansionChunk.registerChunk();
        MapChunk_1.MapChunk.registerChunk();
    };
    /**
     * uniformsを初期化する。
     */
    ShaderPhongMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            ExpansionChunk_1.ExpansionChunk.getUniform(),
            {}
        ]);
    };
    /**
     * definesを初期化する。
     */
    ShaderPhongMaterial.prototype.initDefines = function () {
        this.defines = Object.assign({}, MeshPhongChunk_1.MeshPhongChunk.getDefines(), SurfaceNormalChunk_1.SurfaceNormalChunk.getDefines(), ExpansionChunk_1.ExpansionChunk.getDefines(), this.defines);
    };
    /**
     * 1.オプションで指定されなかったパラメーター値を補完する。
     * 2.uniformsに代入する必要のあるパラメーターを明示的に代入する。
     *
     * @param parameters
     */
    ShaderPhongMaterial.prototype.initDefaultSetting = function (parameters) {
        this.opacity = this._opacity;
        this.lights = true; //FIXME シェーダーがエラーを起こすのでlights設定は強制でON
    };
    Object.defineProperty(ShaderPhongMaterial.prototype, "color", {
        /**
         * MeshPhongマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
         */
        get: function () {
            return this.uniforms.diffuse.value;
        },
        set: function (value) {
            this.uniforms.diffuse.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderPhongMaterial.prototype, "opacity", {
        /**
         * 透明度
         */
        get: function () {
            return this._opacity;
        },
        /**
         * opacityは基底クラスのMaterialのコンストラクタ内で明示的に1.0が代入される。
         * この段階でuniformsはundefinedなので、そのままでは初期化できない。
         * このsetterでは受け取った値をprivate変数に保存して、初期化後にuniformsに再代入する。
         * @param value
         */
        set: function (value) {
            this._opacity = value;
            if (this.uniforms && this.uniforms.opacity) {
                this.uniforms.opacity.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderPhongMaterial.prototype, "emissive", {
        get: function () {
            return this.uniforms.emissive.value;
        },
        set: function (value) {
            this.uniforms.emissive.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderPhongMaterial.prototype, "map", {
        get: function () {
            return MapChunk_1.MapChunk.getMap(this);
        },
        set: function (val) {
            MapChunk_1.MapChunk.setMap(this, val);
            this.onSetMap(val);
        },
        enumerable: true,
        configurable: true
    });
    ShaderPhongMaterial.prototype.onSetMap = function (val) { };
    Object.defineProperty(ShaderPhongMaterial.prototype, "alphaMap", {
        get: function () {
            return this.uniforms.alphaMap.value;
        },
        set: function (value) {
            this.uniforms.alphaMap.value = value;
            this.uniforms.hasAlphaMap.value = value != null;
            this.onSetAlphaMap(value);
        },
        enumerable: true,
        configurable: true
    });
    ShaderPhongMaterial.prototype.onSetAlphaMap = function (value) { };
    /**
     * 発光状態のために、マテリアルの設定をまとめて変更する。
     * {@link https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p}
     */
    ShaderPhongMaterial.prototype.startGlow = function () {
        this.alphaTest = 0.0;
        this.depthWrite = false;
        this.blending = three_1.AdditiveBlending;
    };
    return ShaderPhongMaterial;
}(three_1.ShaderMaterial));
exports.ShaderPhongMaterial = ShaderPhongMaterial;
