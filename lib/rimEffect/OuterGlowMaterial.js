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
exports.OuterGlowMaterial = void 0;
var RimEffectMaterial_1 = require("./RimEffectMaterial");
var OuterGlowMaterial = /** @class */ (function (_super) {
    __extends(OuterGlowMaterial, _super);
    function OuterGlowMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OuterGlowMaterial.prototype, "expansionStrength", {
        get: function () {
            return this.uniforms.expansionStrength.value;
        },
        set: function (value) {
            this.uniforms.expansionStrength.value = value;
        },
        enumerable: false,
        configurable: true
    });
    OuterGlowMaterial.prototype.initDefines = function () {
        _super.prototype.initDefines.call(this);
        this.defines.USE_LIGHT = false;
        this.defines.USE_EXPANSION = true;
    };
    return OuterGlowMaterial;
}(RimEffectMaterial_1.RimEffectMaterial));
exports.OuterGlowMaterial = OuterGlowMaterial;
