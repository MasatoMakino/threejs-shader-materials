import { BufferGeometry } from "three";
/**
 * 法線によって描画を切り分けるEdgesGeometryの習作
 *
 * 未解決の問題点 :
 * 1. SphereGeometryのように、閉じていない（切れ目のある）ジオメトリでは、正常に境界線が描画できない。
 *   mergeVertices関数が期待通りに動作していない？
 * 2. 複数のジオメトリをマージした場合、描画が正常に行われない。
 */
export declare class RimEdgesGeometry extends BufferGeometry {
    constructor(geometry?: BufferGeometry, thresholdAngle?: number);
    private static margeGeometry;
    /**
     *
     * @param attribute
     * @private
     */
    private static convertAttributeToVector3Array;
    /**
     * Get normals from BufferGeometry
     *
     * @param geometry
     * @private
     */
    private static getFaceNormalInfo;
    private static extractEdgeDataMap;
}
//# sourceMappingURL=RimEdgesGeometry.d.ts.map