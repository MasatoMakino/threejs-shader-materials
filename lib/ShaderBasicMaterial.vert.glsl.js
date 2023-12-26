"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    //language=glsl
    return /* GLSL */ `

#include <surface_normal_varying_chunk>
varying vec3 vViewPosition;
varying vec2 uvPosition;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
    uvPosition = uv;
	
    #include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

    //For Rim Effect
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <surface_normal_vertex_chunk>
    vViewPosition = - mvPosition.xyz;
  
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}
`;
};
