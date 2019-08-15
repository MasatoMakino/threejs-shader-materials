export default () => {
    return `
#define PHONG

#include <mesh_phong_uniform>
varying vec2 uvPosition;

#ifdef USE_SURFACE_NORMAL
  varying vec3 surfaceNormal;
#endif

uniform vec3 rimColor;
uniform float rimStrength;
uniform float rimPow;

uniform vec3 insideColor;
uniform float insideStrength;
uniform float insidePow;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
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

void main() {
    #include <clipping_planes_fragment>
    #include <mesh_phong_diffuse_color>
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    
    vec3 viewDir = normalize(vViewPosition);    
    
    float rimGlow = 1.0 - max(0.0, dot(surfaceNormal, viewDir));
    rimGlow = pow( rimGlow, rimPow);
    diffuseColor.rgb += rimColor * rimGlow * rimStrength;

    float insideGlow = max(0.0, dot(surfaceNormal, viewDir));
    insideGlow = pow( insideGlow, insidePow);
    diffuseColor.rgb += insideColor * insideGlow * insideStrength;

    #include <color_fragment>
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
    #ifdef USE_LIGHT
      gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #else
      gl_FragColor = diffuseColor;
    #endif
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}`;
};
