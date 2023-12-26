/**
 * SpriteMaterialに準じたシェーダー
 *
 * @see : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/sprite.glsl.js
 */
export declare const vertex = "\n#include <sprite_vertex_uniform_chunk>\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\t#include <uv_vertex>\n\t#include <sprite_mv_position_chunk>\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";
export declare const fragment = "\n#include <sprite_fragment_uniform_chunk>\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n    #include <clipping_planes_fragment>\n    #include <sprite_diffuse_color_chunk>\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n    outgoingLight = diffuseColor.rgb;\n    gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";
//# sourceMappingURL=ShaderSpriteMaterial.glsl.d.ts.map