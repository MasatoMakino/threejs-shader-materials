/**
 * ジオメトリの縁を強調するマテリアル
 *
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic.glsl.js
 */

//language=glsl
export const fragment = /* GLSL */ `
//for Rim Effect
varying vec2 uvPosition;
#include <surface_normal_varying_chunk>
varying vec3 vViewPosition;

uniform vec3 rimColor;
uniform float rimStrength;
uniform float rimPow;

uniform vec3 insideColor;
uniform float insideStrength;
uniform float insidePow;

//original
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	
	#include <logdepthbuf_fragment>
	#include <map_fragment>

    //for Rim Effect
    vec3 viewDir = normalize(vViewPosition);
    float rimGlow = 1.0 - max(0.0, dot(surfaceNormal, viewDir));
    rimGlow = pow(rimGlow, rimPow);
    diffuseColor.rgb += rimColor * rimGlow * rimStrength;
  
    float insideGlow = max(0.0, dot(surfaceNormal, viewDir));
    insideGlow = pow(insideGlow, insidePow);
    diffuseColor.rgb += insideColor * insideGlow * insideStrength;
    
    #include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
    #include <alphahash_fragment>
    #include <specularmap_fragment>
	
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>
	
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;