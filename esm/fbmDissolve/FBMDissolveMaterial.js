import { UniformsUtils } from "three";
import { Color } from "three";
import { ShaderPhongMaterial } from "../ShaderPhongMaterial";
import { TilingFBMChunk } from "../chunk/TilingFBMChunk";
import VertexShader from "../ShaderPhongMaterial.vert.glsl";
import FragmentShader from "./FBMDissolveMaterial.frag.glsl";
export class FBMDissolveMaterial extends ShaderPhongMaterial {
    get tiles() {
        return this.uniforms.tiles.value;
    }
    set tiles(value) {
        this.uniforms.tiles.value = value;
    }
    get hashLoop() {
        return this.uniforms.hashLoop.value;
    }
    set hashLoop(value) {
        this.uniforms.hashLoop.value = value;
    }
    get amp() {
        return this.uniforms.amp.value;
    }
    set amp(value) {
        this.uniforms.amp.value = value;
    }
    get progress() {
        return this.uniforms.progress.value;
    }
    set progress(value) {
        this.uniforms.progress.value = value;
    }
    get edgeWeight() {
        return this.uniforms.edgeWeight.value;
    }
    set edgeWeight(value) {
        this.uniforms.edgeWeight.value = value;
    }
    get edgeColor() {
        return this.uniforms.edgeColor.value;
    }
    set edgeColor(value) {
        this.uniforms.edgeColor.value = value;
    }
    /**
     *
     * @param parameters
     */
    constructor(parameters) {
        super(VertexShader(), FragmentShader(), parameters);
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            TilingFBMChunk.getUniform(),
            {
                progress: { value: 0.0 },
                edgeWeight: { value: 0.1 },
                edgeColor: { value: new Color(1.0, 1.0, 1.0) }
            }
        ]);
    }
    initChunks() {
        super.initChunks();
        TilingFBMChunk.registerChunk();
    }
    /**
     * definesを初期化する。
     */
    initDefines() {
        super.initDefines();
        this.defines = Object.assign({}, TilingFBMChunk.getDefines(), this.defines);
    }
    initDefaultSetting(parameters) {
        super.initDefaultSetting(parameters);
        if (parameters.transparent == null) {
            this.transparent = true;
        }
        else {
            this.transparent = parameters.transparent;
        }
    }
}
