/**
 * スプライトで雲を描画するマテリアル
 *
 * @see : https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderLib/sprite.glsl.js
 */
// language=GLSL
export const fragment = /* GLSL */ `

uniform float rimStrength;
uniform float bottomStrength;
uniform vec3 rimColor;
uniform vec3 skyColor;

uniform float rimCenter;
uniform float rimRange;
#include <sprite_fragment_uniform_chunk>

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  vec3 color = diffuse;
  #include <clipping_planes_fragment>
  #include <sprite_diffuse_color_chunk>
	#include <logdepthbuf_fragment>
	
	#include <map_fragment>
	#include <alphatest_fragment>
	
	float bottom = 0.0;	
  
	#ifdef USE_MAP
    bottom = 1.0 - texture2D( map, vUv ).g;
    bottom *= bottomStrength;
  #endif
    
  float rim = 0.0;
  #ifdef USE_MAP
    float a = texture2D( map, vUv ).a ;
    float edge = 
        smoothstep( rimCenter-rimRange, rimCenter, a )
      - smoothstep( rimCenter, rimCenter+rimRange, a );
  #endif
    
  outgoingLight = mix( diffuse, skyColor, bottom);
  outgoingLight += rimColor * edge * rimStrength;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}`;
