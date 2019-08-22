import { ShaderPhongMaterial, AnimationChunk } from "../index";
import { UniformsUtils } from "three";
import FragmentShader from "./CellularNoiseMaterial.frag.glsl";
export class CellularNoiseMaterial extends ShaderPhongMaterial {
    constructor(parameters) {
        super(null, FragmentShader(), parameters);
        /*
         * implements IAnimatable
         */
        this.speed = -0.02;
        this.isAnimate = true;
    }
    addTime(delta) {
        if (this.isAnimate) {
            AnimationChunk.addTime(this, delta);
        }
    }
    get grid() {
        return this.uniforms.grid.value;
    }
    set grid(value) {
        this.uniforms.grid.value = value;
    }
    get tiles() {
        return this.uniforms.tiles.value;
    }
    set tiles(value) {
        this.uniforms.tiles.value = value;
    }
    get divisionScaleX() {
        return this.uniforms.divisionScaleX.value;
    }
    set divisionScaleX(value) {
        this.uniforms.divisionScaleX.value = value;
    }
    initChunks() {
        super.initChunks();
        AnimationChunk.registerChunk();
    }
    initUniforms() {
        this.uniforms = UniformsUtils.merge([
            ShaderPhongMaterial.getBasicUniforms(),
            AnimationChunk.getUniform(),
            {
                grid: { value: 3.0 },
                tiles: { value: 1.0 },
                divisionScaleX: { value: 1.0 }
            }
        ]);
    }
}
