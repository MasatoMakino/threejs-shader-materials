import { ShaderPhongMaterial } from "../ShaderPhongMaterial.js";
import { BufferGeometry, ShaderMaterialParameters, Texture } from "three";
/**
 * テクスチャを等高線状にマップするマテリアル。
 * マッピング以外の機能はMeshPhongMaterialに準じる。
 */
export declare class ContourMaterial extends ShaderPhongMaterial {
    get map(): Texture;
    loadMap(url: string, geo: BufferGeometry): void;
    private _map;
    constructor(parameters?: ShaderMaterialParameters);
    protected initDefines(): void;
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=ContourMaterial.d.ts.map