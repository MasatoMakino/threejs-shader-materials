/**
 * テクスチャを等高線状にマップするマテリアル。
 * マッピング以外の昨日はMeshPhongMaterialに準じる。
 */
import { ShaderMaterialParameters, Texture, Geometry, BufferGeometry } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
export declare class ContourMaterial extends ShaderPhongMaterial {
    readonly map: Texture;
    loadMap(url: string, geo: Geometry | BufferGeometry): void;
    private _map;
    constructor(parameters?: ShaderMaterialParameters);
    protected initDefines(): void;
    protected initUniforms(): void;
    protected initDefaultSetting(parameters?: ShaderMaterialParameters): void;
}
//# sourceMappingURL=ContourMaterial.d.ts.map