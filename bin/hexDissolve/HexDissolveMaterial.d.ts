import { ShaderMaterialParameters } from "three";
import { GridMaterial } from "../GridMaterial";
import { Color } from "three";
/**
 * 六角形グリッドマテリアル
 */
export declare class HexDissolveMaterial extends GridMaterial {
    /**
     * ディゾルブの進行度を指定する。
     * 1.0でディゾルブ完了となる。
     */
    progress: number;
    /**
     * ディゾルブの開始ずれを指定する。
     * 最後にディゾルブが始まるグリッドが、progressのどの値で開始されるかを意味する。
     * ex)
     * delay = 0.8の時、最後のグリッドはprogress = 0.8 ~ 1.0でディゾルブする。
     */
    delay: number;
    isAscending: boolean;
    /**
     * グリッド線の太さ
     * 0.0で線なし、0.5でグリッド面なしになる。
     */
    gridWeight: number;
    gridEmissive: Color;
    /**
     * ディゾルブ中に表示されるグローラインの太さ
     * 数値はグリッド線の太さの倍率、2.0ならグローアウトラインはディゾルブラインの倍の太さになる。
     *
     * 注意 : isReversed = true かつgridEmissiveWeightが2.0以下の場合、グロー線が消えなくなる。
     * 反転させる場合は、2.0以上を指定すること。
     */
    gridEmissiveWeight: number;
    constructor(parameters?: ShaderMaterialParameters);
    protected initUniforms(): void;
    protected initChunks(): void;
}
//# sourceMappingURL=HexDissolveMaterial.d.ts.map