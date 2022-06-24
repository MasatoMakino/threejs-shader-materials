import { ShaderLineMaterial } from "..";
import * as glsl from "./RimEdgesMaterial.glsl";
export class RimEdgesMaterial extends ShaderLineMaterial {
    constructor(param) {
        super(glsl.vertex, null, param);
    }
}
