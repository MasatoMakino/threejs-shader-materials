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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpansionMaterial = void 0;
var ShaderPhongMaterial_1 = require("../ShaderPhongMaterial");
var ExpansionMaterial = /** @class */ (function (_super) {
    __extends(ExpansionMaterial, _super);
    function ExpansionMaterial(parameters) {
        return _super.call(this, null, null, parameters) || this;
    }
    Object.defineProperty(ExpansionMaterial.prototype, "expansionStrength", {
        get: function () {
            return this.uniforms.expansionStrength.value;
        },
        set: function (value) {
            this.uniforms.expansionStrength.value = value;
        },
        enumerable: false,
        configurable: true
    });
    ExpansionMaterial.prototype.initDefines = function () {
        _super.prototype.initDefines.call(this);
        this.defines.USE_EXPANSION = true;
    };
    return ExpansionMaterial;
}(ShaderPhongMaterial_1.ShaderPhongMaterial));
exports.ExpansionMaterial = ExpansionMaterial;
