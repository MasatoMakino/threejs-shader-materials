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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapChunk = void 0;
var three_1 = require("three");
var GLSLChunk_1 = require("./GLSLChunk");
/**
 * マスクテクスチャを利用するShaderMaterial用Chunk。
 * マスクテクスチャがどのように描画に反映されるかは、各Materialのシェーダー実装による。
 */
var MapChunk = /** @class */ (function (_super) {
    __extends(MapChunk, _super);
    function MapChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapChunk.registerChunk = function () {
        _super.registerChunk.call(this);
        MapUniformChunk.registerChunk();
        MapFragmentChunk.registerChunk();
        MapFragmentBeginChunk.registerChunk();
    };
    MapChunk.getUniform = function () {
        return three_1.UniformsUtils.merge([
            _super.getUniform.call(this),
            {
                hasMap: { value: false },
                map: { value: null }
            }
        ]);
    };
    MapChunk.getMap = function (_self) {
        return _self.uniforms.map.value;
    };
    MapChunk.setMap = function (_self, val) {
        _self.uniforms.map.value = val;
        _self.uniforms.hasMap.value = val != null;
    };
    return MapChunk;
}(GLSLChunk_1.GLSLChunk));
exports.MapChunk = MapChunk;
var MapUniformChunk = /** @class */ (function (_super) {
    __extends(MapUniformChunk, _super);
    function MapUniformChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapUniformChunk.getChunkName = function () {
        return "map_uniform_chunk";
    };
    MapUniformChunk.getChunk = function () {
        return "\n      uniform bool hasMap;\n      uniform sampler2D map;\n    ";
    };
    return MapUniformChunk;
}(GLSLChunk_1.GLSLChunk));
var MapFragmentChunk = /** @class */ (function (_super) {
    __extends(MapFragmentChunk, _super);
    function MapFragmentChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapFragmentChunk.getChunkName = function () {
        return "map_fragment_chunk";
    };
    MapFragmentChunk.getChunk = function () {
        return "\n      if( hasMap ){\n        vec4 texelColor = texture2D( map, mapUV );\n        texelColor = mapTexelToLinear( texelColor );\n        diffuseColor *= texelColor;\n      }\n    ";
    };
    return MapFragmentChunk;
}(GLSLChunk_1.GLSLChunk));
var MapFragmentBeginChunk = /** @class */ (function (_super) {
    __extends(MapFragmentBeginChunk, _super);
    function MapFragmentBeginChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapFragmentBeginChunk.getChunkName = function () {
        return "map_fragment_begin_chunk";
    };
    MapFragmentBeginChunk.getChunk = function () {
        return "\n      vec2 mapUV = uvPosition;\n    ";
    };
    return MapFragmentBeginChunk;
}(GLSLChunk_1.GLSLChunk));
