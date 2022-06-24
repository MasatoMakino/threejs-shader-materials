(()=>{"use strict";var n,e={395:(n,e,i)=>{var t,a=i(75);class r{static getChunkName(){return""}static getChunk(){return""}static getDefines(){return{}}static registerChunk(){a.WdD&&null==a.WdD[this.getChunkName()]&&(a.WdD[this.getChunkName()]=this.getChunk())}static getUniform(){return{}}}class s extends r{static registerChunk(){o.registerChunk()}static getUniform(){return{time:{value:0},isAnimate:{value:!0}}}static addTime(n,e){n.uniforms.time.value+=e*n.speed}}class o extends r{static getChunkName(){return"time_animation_uniform_chunk"}static getChunk(){return"\n    uniform float time;\n    uniform bool isAnimate;\n    "}}class l extends r{static registerChunk(){u.registerChunk(),c.registerChunk()}static getDefines(){return{USE_EXPANSION:!1}}static getUniform(){return{expansionStrength:{value:0}}}}class u extends r{static getChunkName(){return"__expansion_uniform_chunk"}static getChunk(){return"\n    #ifdef USE_EXPANSION\n      uniform float expansionStrength;\n    #endif\n    "}}class c extends r{static getChunkName(){return"__expansion_vertex_chunk"}static getChunk(){return"\n    #ifdef USE_EXPANSION\n      transformed += normal * expansionStrength;\n    #endif\n    "}}class m extends r{static registerChunk(){super.registerChunk(),d.registerChunk(),p.registerChunk(),h.registerChunk()}static getUniform(){return a.rDY.merge([super.getUniform(),{hasMap:{value:!1},map:{value:null}}])}static getMap(n){return n.uniforms.map.value}static setMap(n,e){n.uniforms.map.value=e,n.uniforms.hasMap.value=null!=e}}class d extends r{static getChunkName(){return"map_uniform_chunk"}static getChunk(){return"\n      uniform bool hasMap;\n      uniform sampler2D map;\n    "}}class p extends r{static getChunkName(){return"map_fragment_chunk"}static getChunk(){return"\n      if( hasMap ){\n        vec4 texelColor = texture2D( map, mapUV );\n        diffuseColor *= texelColor;\n      }\n    "}}class h extends r{static getChunkName(){return"__ShaderMaterial__map_fragment_begin_chunk"}static getChunk(){return"\n      vec2 mapUV = uvPosition;\n    "}}class _ extends r{static registerChunk(){f.registerChunk(),g.registerChunk(),v.registerChunk(),x.registerChunk(),k.registerChunk()}static getDefines(){return{USE_MESH_POSITION:!1}}}class f extends r{static getChunkName(){return"mesh_phong_uniform"}static getChunk(){return"\n      uniform vec3 diffuse;\n      uniform vec3 emissive;\n      uniform vec3 specular;\n      uniform float shininess;\n      uniform float opacity;\n      uniform bool hasAlphaMap;\n      uniform sampler2D alphaMap;\n    "}}class g extends r{static getChunkName(){return"mesh_phong_diffuse_color"}static getChunk(){return"\n      vec4 diffuseColor = vec4( diffuse, opacity );\n      ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n      vec3 totalEmissiveRadiance = emissive;\n    "}}class v extends r{static getChunkName(){return"mesh_phong_switching_alpha_map"}static getChunk(){return"\n      if( hasAlphaMap ){\n        diffuseColor.a *= texture2D( alphaMap, mapUV ).g;\n      }\n    "}}class x extends r{static getChunkName(){return"mesh_position_varying"}static getChunk(){return"\n    #ifdef USE_MESH_POSITION\n    varying vec3 meshPosition;\n    #endif\n    "}}class k extends r{static getChunkName(){return"mesh_position_vertex"}static getChunk(){return"\n    #ifdef USE_MESH_POSITION\n    meshPosition = position;\n    #endif\n    "}}class C extends r{static registerChunk(){b.registerChunk(),w.registerChunk()}static getDefines(){return{USE_SURFACE_NORMAL:!1}}static getUniform(){return{}}}class b extends r{static getChunkName(){return"surface_normal_varying_chunk"}static getChunk(){return"\n    #ifdef USE_SURFACE_NORMAL\n      varying vec3 surfaceNormal;\n    #endif\n    "}}class w extends r{static getChunkName(){return"surface_normal_vertex_chunk"}static getChunk(){return"\n    #ifdef USE_SURFACE_NORMAL\n      surfaceNormal = normalize( transformedNormal );\n    #endif\n    "}}class M extends r{static registerChunk(){U.registerChunk(),y.registerChunk()}static getUniform(){return{tiles:{value:2},hashLoop:{value:8},amp:{value:.5}}}static getDefines(){return{NUM_OCTAVES:3}}}class U extends r{static getChunkName(){return"tiling_fbm_function_chunk"}static getChunk(){return"\n        // Based On Dave_Hoskins \n        // https://www.shadertoy.com/view/4dlGW2\n        \n        float hash(in vec2 p, in float hashLoop)\n        {\n            p = mod(p, hashLoop);\n            return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));\n        }\n        \n        float noise(in vec2 p, in float hashLoop)\n        {\n            p *= hashLoop;\n            vec2 f = fract(p);\n            vec2 u = f*f*(3.0-2.0*f);\n        \n            p = floor(p);\n            float a = hash(p, hashLoop);\n            float b = hash(p + vec2(1.0, 0.0), hashLoop);\n            float c = hash(p + vec2(0.0, 1.0), hashLoop);\n            float d = hash(p + vec2(1.0, 1.0), hashLoop);\n        \n            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;\n        }\n        \n        // Based On Dave_Hoskins \n        // https://www.shadertoy.com/view/4dlGW2\n        \n        float fbm(in vec2 p)\n        {\n            float v = 0.0;\n            \n            p = mod(p, hashLoop);\n            float a = amp;\n            float hashLoopVal = hashLoop;\n            \n            for (int i = 0; i < NUM_OCTAVES; i++){\n                v += noise(p, hashLoopVal) * a;\n                a *= .5;\n                hashLoopVal *= 2.0;\n            }\n            return v;\n        }\n    "}}class y extends r{static getChunkName(){return"tiling_fbm_uniform_chunk"}static getChunk(){return"\n      uniform float tiles;  \n      uniform float hashLoop;\n      uniform float amp;\n    "}}!function(n){n[n.vertical=4]="vertical",n[n.horizontal=3]="horizontal",n[n.radial=5]="radial"}(t||(t={}));class S extends a.jyz{constructor(n,e,i){super(i),this._opacity=1,null!=i||(i={}),null!=n||(n="\n#define PHONG\n\nvarying vec3 vViewPosition;\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n#include <surface_normal_varying_chunk>\n#include <__expansion_uniform_chunk>\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n    #include <mesh_position_vertex>\n    uvPosition = uv;\n\n    #include <uv_vertex>\n    #include <uv2_vertex>\n    #include <color_vertex>\n    \n    #include <beginnormal_vertex>\n    #include <morphnormal_vertex>\n    #include <skinbase_vertex>\n    #include <skinnormal_vertex>\n    #include <defaultnormal_vertex>\n    #include <surface_normal_vertex_chunk>\n    #include <normal_vertex>\n    \n    #include <begin_vertex>\n    \n    #include <__expansion_vertex_chunk>\n    \n    #include <morphtarget_vertex>\n    #include <skinning_vertex>\n    #include <displacementmap_vertex>\n    #include <project_vertex>\n    #include <logdepthbuf_vertex>\n    #include <clipping_planes_vertex>\n    \n    vViewPosition = - mvPosition.xyz;\n\n    #include <worldpos_vertex>\n    #include <envmap_vertex>\n    #include <shadowmap_vertex>\n    #include <fog_vertex>\n}\n"),null!=e||(e="\n#define PHONG\n\n#include <mesh_phong_uniform>\n#include <mesh_position_varying>\nvarying vec2 uvPosition;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n    #include <clipping_planes_fragment>\n    \n    #include <mesh_phong_diffuse_color>\n    \n    #include <logdepthbuf_fragment>\n    #include <__ShaderMaterial__map_fragment_begin_chunk>\n    #include <map_fragment>\n    #include <color_fragment>\n    // #include <alphamap_fragment>\n    #include <mesh_phong_switching_alpha_map>\n    #include <alphatest_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n    // modulation\n    #include <aomap_fragment>\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    #include <envmap_fragment>\n    #include <output_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n}"),this.initChunks(),this.initUniforms(),this.initDefines(),this.vertexShader=n,this.fragmentShader=e,this.initDefaultSetting(i)}static getBasicUniforms(){return a.rDY.merge([a.rBU.common,a.rBU.specularmap,a.rBU.envmap,a.rBU.aomap,a.rBU.lightmap,a.rBU.emissivemap,a.rBU.bumpmap,a.rBU.normalmap,a.rBU.displacementmap,a.rBU.gradientmap,a.rBU.fog,a.rBU.lights,{emissive:{value:new a.Ilk(0)},specular:{value:new a.Ilk(1118481)},shininess:{value:30},hasAlphaMap:{value:!1}},C.getUniform(),l.getUniform(),m.getUniform()])}initChunks(){_.registerChunk(),C.registerChunk(),l.registerChunk(),m.registerChunk()}initUniforms(){this.uniforms=a.rDY.merge([S.getBasicUniforms(),l.getUniform(),{}])}initDefines(){this.defines=Object.assign({},_.getDefines(),C.getDefines(),l.getDefines(),this.defines)}initDefaultSetting(n){this.uniformOpacity=this._opacity,this.lights=!0}get color(){return this.uniforms.diffuse.value}set color(n){this.uniforms.diffuse.value=n}get opacity(){return this.uniformOpacity}get uniformOpacity(){return this._opacity}set opacity(n){this.uniformOpacity=n}set uniformOpacity(n){var e;this._opacity=n,(null===(e=this.uniforms)||void 0===e?void 0:e.opacity)&&(this.uniforms.opacity.value=n)}get emissive(){return this.uniforms.emissive.value}set emissive(n){this.uniforms.emissive.value=n}get map(){return m.getMap(this)}set map(n){m.setMap(this,n),this.onSetMap(n)}onSetMap(n){}get alphaMap(){return this.uniforms.alphaMap.value}set alphaMap(n){this.uniforms.alphaMap.value=n,this.uniforms.hasAlphaMap.value=null!=n,this.onSetAlphaMap(n)}onSetAlphaMap(n){}startGlow(){this.alphaTest=0,this.depthWrite=!1,this.blending=a.WMw}}var P=i(163);class G extends S{constructor(n){super("\n#define PHONG\n\nvarying vec3 vViewPosition;\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n#include <surface_normal_varying_chunk>\n#include <__expansion_uniform_chunk>\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n    #include <mesh_position_vertex>\n    uvPosition = uv;\n\n    #include <uv_vertex>\n    #include <uv2_vertex>\n    #include <color_vertex>\n    \n    #include <beginnormal_vertex>\n    #include <morphnormal_vertex>\n    #include <skinbase_vertex>\n    #include <skinnormal_vertex>\n    #include <defaultnormal_vertex>\n    #include <surface_normal_vertex_chunk>\n    #include <normal_vertex>\n    \n    #include <begin_vertex>\n    \n    #include <__expansion_vertex_chunk>\n    \n    #include <morphtarget_vertex>\n    #include <skinning_vertex>\n    #include <displacementmap_vertex>\n    #include <project_vertex>\n    #include <logdepthbuf_vertex>\n    #include <clipping_planes_vertex>\n    \n    vViewPosition = - mvPosition.xyz;\n\n    #include <worldpos_vertex>\n    #include <envmap_vertex>\n    #include <shadowmap_vertex>\n    #include <fog_vertex>\n}\n","\n#define PHONG\n\n#include <mesh_phong_uniform>\nvarying vec2 uvPosition;\n#include <mesh_position_varying>\n\n#include <tiling_fbm_uniform_chunk>\n#include <tiling_fbm_function_chunk>\n#include <time_animation_uniform_chunk>\n\nuniform float strength;\nuniform float bloom;\n\n#include <surface_normal_varying_chunk>\nuniform float rimStrength;\nuniform float rimPow;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main()\n{\n    #include <clipping_planes_fragment>\n  \n    #include <mesh_phong_diffuse_color>\n    \n    #include <logdepthbuf_fragment>\n    #include <__ShaderMaterial__map_fragment_begin_chunk>\n    #include <map_fragment>\n    #include <color_fragment>\n    \n    vec2 uv = uvPosition;\n    float uVy = uv.y;\n    uv *= tiles;\n\n    vec2 q = vec2(0.0);\n    q.x = fbm( uv + vec2(1.7,9.2) +.16  * time );\n    q.y = fbm( uv + vec2(8.3,2.8) +.356 * time );\n\n    float fbmVal = fbm(uv + q);\n    fbmVal += 1.0-(uVy * 1.0 );\n    fbmVal *= 1.0-uVy;\n    \n    vec3 viewDir = normalize(vViewPosition);    \n    float rimGlow = 1.0 - max(0.0, dot(surfaceNormal, viewDir));\n    rimGlow = pow(rimGlow, rimPow) * rimStrength;\n    rimGlow = clamp( rimGlow, 0.0, 1.0);\n    fbmVal *= 1.0-rimGlow;\n    \n    vec3 color = diffuseColor.rgb;\n    \n    float st = 1.0 - strength;\n    float bri = smoothstep( max( st - 0.4, 0.0 ), st, fbmVal );\n    \n    float blm = 1.0 - bloom;\n    float bloomVal = smoothstep( blm - 0.4, blm, fbmVal );\n    color += bloomVal;\n\n    diffuseColor.rgb = color;\n    diffuseColor.a *= bri;\n    \n    #include <mesh_phong_switching_alpha_map>\n\n    // #include <alphamap_fragment>\n    #include <alphatest_fragment>\n    #include <specularmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <emissivemap_fragment>\n    // accumulation\n    #include <lights_phong_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n    // modulation\n    #include <aomap_fragment>\n    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n    #include <envmap_fragment>\n    #include <output_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n}",n),this.speed=-.5,this.animationListener=n=>{this.addTime(n.delta/1e3)},this.isAnimate=this.isAnimate}get tiles(){return this.uniforms.tiles.value}set tiles(n){this.uniforms.tiles.value=n}get hashLoop(){return this.uniforms.hashLoop.value}set hashLoop(n){this.uniforms.hashLoop.value=n}get amp(){return this.uniforms.amp.value}set amp(n){this.uniforms.amp.value=n}addTime(n){s.addTime(this,n)}get isAnimate(){return this.uniforms.isAnimate.value}set isAnimate(n){this.uniforms.isAnimate.value=n,this.isAnimate?this.startAnimation():this.stopAnimation()}get strength(){return this.uniforms.strength.value}set strength(n){this.uniforms.strength.value=n}get bloom(){return this.uniforms.bloom.value}set bloom(n){this.uniforms.bloom.value=n}get transformSpeed(){return this.uniforms.transformSpeed.value}set transformSpeed(n){this.uniforms.transformSpeed.value=n}get rimPow(){return this.uniforms.rimPow.value}set rimPow(n){this.uniforms.rimPow.value=n}get rimStrength(){return this.uniforms.rimStrength.value}set rimStrength(n){this.uniforms.rimStrength.value=n}initUniforms(){this.uniforms=a.rDY.merge([S.getBasicUniforms(),M.getUniform(),s.getUniform(),{strength:{value:.45},bloom:{value:.1},rimStrength:{value:1},rimPow:{value:1}}])}initChunks(){super.initChunks(),M.registerChunk(),s.registerChunk()}initDefines(){super.initDefines(),this.defines=Object.assign({},M.getDefines(),this.defines),this.defines.USE_SURFACE_NORMAL=!0}initDefaultSetting(n){super.initDefaultSetting(n),null==n.transparent?this.transparent=!0:this.transparent=n.transparent}startAnimation(){P.Fz.on(P.M9.onBeforeTick,this.animationListener)}stopAnimation(){P.Fz.off(P.M9.onBeforeTick,this.animationListener)}}class L{static initColorGUI(n,e,i="color"){const t={},a=e[i];return t[i]=a.getHex(),n.addColor(t,i).onChange((n=>{a.setHex(n)})),t}static initBasicMaterialGUI(n,e,i="Material"){const t=n.addFolder(i);return this.initMaterialFolder(t,e),t.open(),t}static initMaterialGUI(n,e,i="Material"){const t=this.initBasicMaterialGUI(n,e,i);this.initColorGUI(t,e,"emissive")}static initMaterialFolder(n,e){this.initColorGUI(n,e),n.add(e,"transparent"),n.add(e,"uniformOpacity",0,1)}static initSpriteMaterialGUI(n,e,i="Material"){const t=n.addFolder(i);this.initMaterialFolder(t,e),t.open()}static initGridMaterialGUI(n,e){this.initMaterialGUI(n,e);const i={mask:"",alphaMap:""},t=n.addFolder("WavyGridMaterial");return t.add(e,"isReversed"),t.add(e,"division",2,256).step(1),t.add(e,"divisionScaleX",0,4).step(1),t.add(i,"mask",{none:"",earth:"./textures/landmask.png"}).onChange((n=>{e.maskTexture=""===n?null:(new a.dpR).load(n)})),t.add(i,"alphaMap",{none:"",earth:"./textures/landmask.png"}).onChange((n=>{e.alphaMap=""===n?null:(new a.dpR).load(n)})),t.open(),t}static initWavyMaterialGUI(n,e){const i=this.initGridMaterialGUI(n,e).addFolder("WavyAnimation");i.add(e,"isAnimate"),i.add(e,"speed",-2,2),i.add(e,"waveFrequency",0,1),i.add(e,"wavePow",0,4),i.add(e,"direction",{horizontal:t.horizontal,vertical:t.vertical,radial:t.radial}),i.add(e,"raisedBottom",0,1),i.open()}static initAnimationGUI(n,e,i="Animation"){const t=n.addFolder(i);t.add(e,"isAnimate"),t.add(e,"speed",-2,2),t.open()}static initRimGUI(n,e,i="Rim Effect Material"){const t=n.addFolder(i);L.initColorGUI(t,e,"rimColor"),t.add(e,"rimStrength",0,4).step(.01),t.add(e,"rimPow",0,4).step(.01),L.initColorGUI(t,e,"insideColor"),t.add(e,"insideStrength",0,4).step(.01),t.add(e,"insidePow",0,8).step(.01),t.open()}static initExpansionGUI(n,e,i="ExpansionMaterial"){const t=n.addFolder("ExpansionMaterial");t.add(e,"expansionStrength",-12,12).step(.01),t.open()}static initFBMTilingGUI(n,e,i="FBM Tiling"){const t=n.addFolder("FBM Tiling");t.add(e,"tiles",1,8).step(1),t.add(e,"hashLoop",2,16).step(1),t.add(e,"amp",0,2).step(.01),t.open()}static initSkyGUI(n,e,i,t){const a={turbidity:10,rayleigh:.15,mieCoefficient:.005,mieDirectionalG:.8,inclination:.07,azimuth:.25,exposure:.75},r=4e5;function s(){const n=e.material.uniforms;n.turbidity.value=a.turbidity,n.rayleigh.value=a.rayleigh,n.mieCoefficient.value=a.mieCoefficient,n.mieDirectionalG.value=a.mieDirectionalG;const s=Math.PI*(a.inclination-.5),o=2*Math.PI*(a.azimuth-.5);i.position.x=r*Math.cos(o),i.position.y=r*Math.sin(o)*Math.sin(s),i.position.z=r*Math.sin(o)*Math.cos(s),n.sunPosition.value.copy(i.position),t.toneMappingExposure=a.exposure}s();const o=n.addFolder("Sky");o.add(a,"turbidity",1,20,.1).onChange(s),o.add(a,"rayleigh",0,4,.001).onChange(s),o.add(a,"mieCoefficient",0,.1,.001).onChange(s),o.add(a,"mieDirectionalG",0,1,.001).onChange(s),o.add(a,"inclination",0,1,1e-4).onChange(s),o.add(a,"azimuth",0,1,1e-4).onChange(s),o.add(a,"exposure",0,1,1e-4).onChange(s),o.open()}}var O=i(12),N=i(659);class A{static initScene(){return new a.xsS}static initLight(n){const e=new a.Mig(16777215,1);return n.add(e),e}static initCamera(n,e,i,t=400){const r=new a.cPb(45,e/i,1,t);return r.position.set(0,0,100),r.updateMatrixWorld(!1),n.add(r),r}static initControl(n,e){let i;null!=e&&(i=e.domElement);const t=new O.z(n,i);return t.update(),t}static initRenderer(n,e,i=0,t=!0){const r=new a.CP7({antialias:t});return r.setClearColor(new a.Ilk(i)),r.setSize(n,e),r.setPixelRatio(window.devicePixelRatio),document.body.appendChild(r.domElement),r}static initHelper(n){const e=new a.y8_(30);n.add(e)}static initSky(n,e,i){i.toneMapping=a.LY2;const t=new a.Kj0(new a.Aip(2e4,16,8),new a.vBJ({color:16777215}));t.position.y=-7e5,t.visible=!1,n.add(t);const r=new N.q;r.scale.setScalar(45e3),n.add(r),L.initSkyGUI(e,r,t,i)}}var D=i(899);class I{constructor(){const n=A.initScene();n.fog=new a.ybr(0,80,160),A.initLight(n);const e=A.initCamera(n,640,480),i=A.initRenderer(640,480);A.initControl(e,i),A.initHelper(n);const t=this.initObject(n);P.Fz.addEventListener(P.M9.tick,(t=>{i.render(n,e)})),this.initGUI(t)}initObject(n){const e=new a.cek(16777215,1,0,2);e.position.set(10,20,30),n.add(e);const i=new a.xG9(e);n.add(i);const t=new a.xo$(30,32,32),r=new G({fog:void 0!==n.fog});r.color=new a.Ilk(13382400),r.tiles=1,r.hashLoop=4,r.amp=1,r.rimPow=2,r.speed=-2;const s=new a.Kj0(t,r);return s.scale.set(.5,1,.5),n.add(s),r}initGUI(n){const e=new D.ZP;L.initMaterialGUI(e,n),L.initFBMTilingGUI(e,n),this.initGUIFireMaterial(e,n),this.initRimSetting(e,n)}initGUIFireMaterial(n,e){const i=n.addFolder("FBM Animation");i.add(e,"isAnimate"),i.add(e,"strength",0,1).step(.01),i.add(e,"bloom",0,1).step(.01),i.add(e,"speed",-8,8).step(.01),i.open()}initRimSetting(n,e){const i=n.addFolder("Rim");i.add(e,"rimStrength",0,8).step(.01),i.add(e,"rimPow",0,8).step(.01),i.open()}}window.onload=()=>{new I}}},i={};function t(n){var a=i[n];if(void 0!==a)return a.exports;var r=i[n]={exports:{}};return e[n](r,r.exports,t),r.exports}t.m=e,n=[],t.O=(e,i,a,r)=>{if(!i){var s=1/0;for(c=0;c<n.length;c++){for(var[i,a,r]=n[c],o=!0,l=0;l<i.length;l++)(!1&r||s>=r)&&Object.keys(t.O).every((n=>t.O[n](i[l])))?i.splice(l--,1):(o=!1,r<s&&(s=r));if(o){n.splice(c--,1);var u=a();void 0!==u&&(e=u)}}return e}r=r||0;for(var c=n.length;c>0&&n[c-1][2]>r;c--)n[c]=n[c-1];n[c]=[i,a,r]},t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var i in e)t.o(e,i)&&!t.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:e[i]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.j=865,(()=>{var n={865:0};t.O.j=e=>0===n[e];var e=(e,i)=>{var a,r,[s,o,l]=i,u=0;if(s.some((e=>0!==n[e]))){for(a in o)t.o(o,a)&&(t.m[a]=o[a]);if(l)var c=l(t)}for(e&&e(i);u<s.length;u++)r=s[u],t.o(n,r)&&n[r]&&n[r][0](),n[r]=0;return t.O(c)},i=self.webpackChunkthreejs_shader_materials=self.webpackChunkthreejs_shader_materials||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))})();var a=t.O(void 0,[736],(()=>t(395)));a=t.O(a)})();