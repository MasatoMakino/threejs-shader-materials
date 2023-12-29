"use strict";
/**
 * 十字のラインでグリッドを分割するシェーダー
 *
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphong.glsl.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragment = void 0;
// language=GLSL
exports.fragment = `
#define PHONG

#include <mesh_phong_uniform>
varying vec2 uvPosition;
#include <mesh_position_varying>

//user settings
#include <time_animation_uniform_chunk>
#include <wavy_animation_uniform_chunk>
#include <repeat_pattern_uniform_chunk>
#include <mask_map_uniform_chunk>
#include <reversible_uniform_chunk>
uniform float gridWeight;
uniform float radius;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>


void main() {
    #include <clipping_planes_fragment>
  
    #include <mesh_phong_diffuse_color>
    
    #include <logdepthbuf_fragment>
    #include <__ShaderMaterial__map_fragment_begin_chunk>
    #include <map_fragment>
    #include <color_fragment>

    #include <repeat_pattern_fragment_chunk>    
    vec2 localPos = mod(uv, 1.0) - 0.5;
    vec2 id = uv - localPos;
    #include <wavy_animation_fragment_chunk>

    #include <mask_map_fragment_chunk>
    float w = gridWeight;
    w = clamp( w, 0.0, 1.0);
    
    float margin = clamp ( w * 0.33, 0.00, 0.05 );
    
    //十字を描画
    float gridLine;
    gridLine  = smoothstep ( -w-margin, -w, localPos.x );
    gridLine -= smoothstep ( w, w+margin, localPos.x );
    gridLine += smoothstep ( -w-margin, -w, localPos.y );
    gridLine -= smoothstep ( w, w+margin, localPos.y );
    gridLine  = clamp( gridLine, 0.0, 1.0 ); 

    //半径でマスク
    float r = radius - (1.0-mask);
    gridLine -= smoothstep( r, r+margin, localPos.x);
    gridLine -= smoothstep( -r, -r-margin, localPos.x);
    gridLine -= smoothstep( r, r+margin, localPos.y);
    gridLine -= smoothstep( -r, -r-margin, localPos.y);
    gridLine = clamp( gridLine, 0.0, 1.0 );
    
    gridLine = isReversed
        ? 1.0 - gridLine
        : gridLine;
    diffuseColor.a *= gridLine;

    #include <mesh_phong_switching_alpha_map>

	// #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <alphahash_fragment>
    #include <specularmap_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>
    #include <emissivemap_fragment>

    // accumulation
    #include <lights_phong_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>

    // modulation
    #include <aomap_fragment>

    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	
    #include <envmap_fragment>
    #include <opaque_fragment>
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}`;
