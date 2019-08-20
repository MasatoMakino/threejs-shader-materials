import { ShaderPhongMaterial, IAnimatable, AnimationChunk } from "../index";
import { Vector2, ShaderMaterialParameters, UniformsUtils } from "three";
import FragmentShader from "./SwirlMaterial.frag.glsl";
import { Texture } from "three";
import { RepeatWrapping } from "three";

export class SwirlMaterial extends ShaderPhongMaterial implements IAnimatable {
  /*
   * implements IAnimatable
   */
  speed: number = -0.02;
  isAnimate: boolean = true;
  addTime(delta: number): void {
    if (this.isAnimate) {
      AnimationChunk.addTime(this, delta);
    }
  }

  set map(val: Texture) {
    super.map = val;
    this.setRepeat(val);
  }
  set alphaMap(value: Texture) {
    super.alphaMap = value;
    this.setRepeat(value);
  }
  /**
   * リピートモードは強制的にRepeatWrappingに
   * @param value
   */
  private setRepeat(value: Texture) {
    if (value) {
      value.wrapS = RepeatWrapping;
      value.wrapT = RepeatWrapping;
    }
  }

  get uvRotation(): number {
    return this.uniforms.uvRotation.value;
  }
  set uvRotation(value: number) {
    this.uniforms.uvRotation.value = value;
  }

  get swirlRotation(): number {
    return this.uniforms.swirlRotation.value;
  }
  set swirlRotation(value: number) {
    this.uniforms.swirlRotation.value = value;
  }

  get radius(): number {
    return this.uniforms.radius.value;
  }
  set radius(value: number) {
    this.uniforms.radius.value = value;
  }

  get center(): Vector2 {
    return this.uniforms.center.value;
  }
  set center(value: Vector2) {
    this.uniforms.center.value = value;
  }

  constructor(parameters?: ShaderMaterialParameters) {
    super(null, FragmentShader(), parameters);
  }

  protected initChunks(): void {
    super.initChunks();
    AnimationChunk.registerChunk();
  }

  protected initUniforms(): void {
    this.uniforms = UniformsUtils.merge([
      ShaderPhongMaterial.getBasicUniforms(),
      AnimationChunk.getUniform(),
      {
        uvRotation: { value: 0.0 },
        swirlRotation: { value: 3.14 },
        radius: { value: 0.5 },
        center: { value: new Vector2(0.5, 0.5) }
      }
    ]);
  }
}
