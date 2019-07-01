/**
 * 6角形シェーダー
 * {@link https://qiita.com/edo_m18/items/37d8773a5295bc6aba3d}
 */

const shader: string = `
#define PHONG

#include <mesh_phong_uniform>

//varying
varying vec2 uvPosition;

//user settings
#include <wavy_animation_uniform_chunk>
#include <repeat_pattern_uniform_chunk>
#include <mask_map_uniform_chunk>
#include <reversible_uniform_chunk>
uniform float gridWeight;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

float hexDist(vec2 p)
{
    p = abs(p);
    float d = dot(p, normalize(vec2(1.0, 1.73)));
    return max(d, p.x);
}

vec4 hexCoords(vec2 uv)
{
    vec2 r = vec2(1.0, 1.73);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;

    vec2 gv = length(a) < length(b) ? a : b;
    vec2 id = uv - gv;

    float x = atan(gv.x, gv.y);
    float y = 0.5 - hexDist(gv);

    return vec4(x, y, id);
}

void main() {
    #include <clipping_planes_fragment>
    #include <mesh_phong_diffuse_color>
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>

    #include <repeat_pattern_fragment_chunk>    
    vec4 hc = hexCoords( uv );
    vec2 id = hc.zw;
    #include <wavy_animation_fragment_chunk>

    #include <mask_map_fragment_chunk>
    float w = gridWeight + (1.0-mask);
    w = clamp( w, 0.0, 1.0);

    float margin = clamp ( w * 0.33, 0.00, 0.02 );
    float stepMax = w + margin;

    float gridLine = smoothstep(w, stepMax, hc.y);
    gridLine = isReversed
        ? 1.0 - gridLine
        : gridLine;
    diffuseColor.a *= gridLine ;

    #include <mesh_phong_switching_alpha_map>
    #include <alphatest_fragment>
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
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}
`;

export default shader;
