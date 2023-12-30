import { ShaderLineMaterial } from "../index.js";
import * as glsl from "./RimEdgesMaterial.glsl.js";
export class RimEdgesMaterial extends ShaderLineMaterial {
    constructor(param) {
        super(glsl.vertex, null, param);
    }
}
