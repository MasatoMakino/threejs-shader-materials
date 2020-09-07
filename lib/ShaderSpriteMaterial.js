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
exports.ShaderSpriteMaterial = void 0;
var three_1 = require("three");
var SpriteChunk_1 = require("./chunk/SpriteChunk");
var ShaderSpriteMaterial_frag_glsl_1 = __importDefault(require("./ShaderSpriteMaterial.frag.glsl"));
var ShaderSpriteMaterial_vert_glsl_1 = __importDefault(require("./ShaderSpriteMaterial.vert.glsl"));
var ShaderSpriteMaterial = /** @class */ (function (_super) {
    __extends(ShaderSpriteMaterial, _super);
    /**
     * コンストラクタ。
     * @param vertexShader
     * @param fragmentShader
     * @param parameters
     */
    function ShaderSpriteMaterial(vertexShader, fragmentShader, parameters) {
        var _this = _super.call(this, parameters) || this;
        if (parameters == null)
            parameters = {};
        if (vertexShader == null) {
            vertexShader = ShaderSpriteMaterial_vert_glsl_1.default();
        }
        if (fragmentShader == null) {
            fragmentShader = ShaderSpriteMaterial_frag_glsl_1.default();
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
     * ShaderChunkにこのマテリアルに必要なChunkを追加する。
     */
    ShaderSpriteMaterial.prototype.initChunks = function () {
        SpriteChunk_1.SpriteChunk.registerChunk();
    };
    /**
     * uniformsを初期化する。
     */
    ShaderSpriteMaterial.prototype.initUniforms = function () {
        this.uniforms = three_1.UniformsUtils.merge([SpriteChunk_1.SpriteChunk.getUniform(), {}]);
    };
    /**
     * definesを初期化する。
     */
    ShaderSpriteMaterial.prototype.initDefines = function () {
        this.defines = Object.assign({}, SpriteChunk_1.SpriteChunk.getDefines(), this.defines);
    };
    /**
     * 1.オプションで指定されなかったパラメーター値を補完する。
     * 2.uniformsに代入する必要のあるパラメーターを明示的に代入する。
     *
     * @param parameters
     */
    ShaderSpriteMaterial.prototype.initDefaultSetting = function (parameters) {
        this.opacity = this._opacity;
    };
    Object.defineProperty(ShaderSpriteMaterial.prototype, "opacity", {
        /**
         * 透明度
         *
         * @see https://github.com/microsoft/TypeScript/pull/37894
         */
        //@ts-ignore : これはopacityプロパティとuniforms.opacityプロパティを同期するために利用されます。
        get: function () {
            return this._opacity;
        },
        /**
         * opacityは基底クラスのMaterialのコンストラクタ内で明示的に1.0が代入される。
         * この段階でuniformsはundefinedなので、そのままでは初期化できない。
         * このsetterでは受け取った値をprivate変数に保存して、初期化後にuniformsに再代入する。
         * @param value
         *
         * @see https://github.com/microsoft/TypeScript/pull/37894
         */
        //@ts-ignore : これはopacityプロパティとuniforms.opacityプロパティを同期するために利用されます。
        set: function (value) {
            this._opacity = value;
            if (this.uniforms && this.uniforms.opacity) {
                this.uniforms.opacity.value = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderSpriteMaterial.prototype, "color", {
        /**
         * Spriteマテリアルと互換性を持つために、colorプロパティはdiffuseへ代入される。
         */
        get: function () {
            return this.uniforms.diffuse.value;
        },
        set: function (value) {
            this.uniforms.diffuse.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderSpriteMaterial.prototype, "center", {
        get: function () {
            return this.uniforms.center.value;
        },
        set: function (value) {
            this.uniforms.center.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderSpriteMaterial.prototype, "rotation", {
        get: function () {
            return this.uniforms.rotation.value;
        },
        set: function (value) {
            this.uniforms.rotation.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderSpriteMaterial.prototype, "uvTransform", {
        get: function () {
            return this.uniforms.uvTransform.value;
        },
        set: function (value) {
            this.uniforms.uvTransform.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderSpriteMaterial.prototype, "map", {
        get: function () {
            return this.uniforms.map.value;
        },
        set: function (value) {
            this.uniforms.map.value = value;
        },
        enumerable: false,
        configurable: true
    });
    return ShaderSpriteMaterial;
}(three_1.ShaderMaterial));
exports.ShaderSpriteMaterial = ShaderSpriteMaterial;
