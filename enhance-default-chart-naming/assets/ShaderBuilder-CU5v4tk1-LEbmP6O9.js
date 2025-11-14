import{a6 as T,h as g}from"./main-CgXE8sFZ.js";import{n as c}from"./BindType-CKbZk6AG-Bqvzo9NX.js";const l=()=>T.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class b{constructor(){this._includedModules=new Map}include(e,t){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,t),e(this.builder,t))}}class D extends b{constructor(){super(...arguments),this.vertex=new p,this.fragment=new p,this.attributes=new I,this.varyings=new A,this.extensions=new m,this.outputs=new d}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e,t=!1){const r=this.extensions.generateSource(e),i=this.attributes.generateSource(e),a=this.varyings.generateSource(e),n=e==="vertex"?this.vertex:this.fragment,u=n.uniforms.generateSource(),h=n.code.generateSource(),_=n.main.generateSource(t),f=e==="vertex"?F:E,S=n.constants.generateSource(),$=this.outputs.generateSource(e);return`#version 300 es
${r.join(`
`)}
${f}
${S.join(`
`)}
${u.join(`
`)}
${i.join(`
`)}
${a.join(`
`)}
${$.join(`
`)}
${h.join(`
`)}
${_.join(`
`)}`}generateBind(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const n=a.bind[c.Bind];n&&t.set(a.name,n)}),this.fragment.uniforms.entries.forEach(a=>{const n=a.bind[c.Bind];n&&t.set(a.name,n)});const r=Array.from(t.values()),i=r.length;return a=>{for(let n=0;n<i;++n)r[n](e,a)}}generateBindPass(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const n=a.bind[c.Pass];n&&t.set(a.name,n)}),this.fragment.uniforms.entries.forEach(a=>{const n=a.bind[c.Pass];n&&t.set(a.name,n)});const r=Array.from(t.values()),i=r.length;return(a,n)=>{for(let u=0;u<i;++u)r[u](e,a,n)}}generateBindDraw(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const n=a.bind[c.Draw];n&&t.set(a.name,n)}),this.fragment.uniforms.entries.forEach(a=>{const n=a.bind[c.Draw];n&&t.set(a.name,n)});const r=Array.from(t.values()),i=r.length;return(a,n,u)=>{for(let h=0;h<i;++h)r[h](e,u,a,n)}}}class v{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(const t of e)this._add(t);return this._stage}get(e){return this._entries.get(e)}_add(e){if(e!=null){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new g("shaderbuilder:duplicate-uniform",`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else l().error(`Trying to add null Uniform from ${new Error().stack}.`)}generateSource(){return Array.from(this._entries.values()).map(({name:e,arraySize:t,type:r})=>t!=null?`uniform ${r} ${e}[${t}];`:`uniform ${r} ${e};`)}get entries(){return Array.from(this._entries.values())}}class w{constructor(e){this._stage=e,this._bodies=new Array}add(e){return this._bodies.push(e),this._stage}generateSource(e){if(this._bodies.length>0)return[`void main() {
 ${this._bodies.join(`
`)||""} 
}`];if(e)throw new g("shaderbuilder:missing-main","Shader does not contain main function body.");return[]}}class y{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}}class p extends b{constructor(){super(...arguments),this.uniforms=new v(this),this.main=new w(this),this.code=new y(this),this.constants=new s(this)}get builder(){return this}}class I{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return e==="fragment"?[]:this._entries.map(t=>`in ${t[1]} ${t[0]};`)}}class A{constructor(){this._entries=new Map}add(e,t,r){this._entries.has(e)?l().warn(`Ignoring duplicate varying ${t} ${e}`):this._entries.set(e,{type:t,invariant:r?.invariant??!1})}generateSource(e){const t=new Array;return this._entries.forEach((r,i)=>t.push((r.invariant&&e==="vertex"?"invariant ":"")+(e==="vertex"?"out":"in")+` ${r.type} ${i};`)),t}}class m{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t=e==="vertex"?m.ALLOWLIST_VERTEX:m.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(r=>t.includes(r)).map(r=>`#extension ${r} : enable`)}static{this.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"]}static{this.ALLOWLIST_VERTEX=[]}}class d{constructor(){this._entries=new Map}add(e,t,r=0){const i=this._entries.get(r);i?.name!==e||i?.type!==t?this._entries.set(r,{name:e,type:t}):l().warn(`Fragment shader output location ${r} occupied`)}static{this.DEFAULT_TYPE="vec4"}static{this.DEFAULT_NAME="fragColor"}generateSource(e){if(e==="vertex")return[];this._entries.size===0&&this._entries.set(0,{name:d.DEFAULT_NAME,type:d.DEFAULT_TYPE});const t=new Array;return this._entries.forEach((r,i)=>t.push(`layout(location = ${i}) out ${r.type} ${r.name};`)),t}}class s{constructor(e){this._stage=e,this._entries=new Set}add(e,t,r){let i="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":i=s._numberToFloatStr(r);break;case"int":i=s._numberToIntStr(r);break;case"bool":i=r.toString();break;case"vec2":i=`vec2(${s._numberToFloatStr(r[0])},                            ${s._numberToFloatStr(r[1])})`;break;case"vec3":i=`vec3(${s._numberToFloatStr(r[0])},                            ${s._numberToFloatStr(r[1])},                            ${s._numberToFloatStr(r[2])})`;break;case"vec4":i=`vec4(${s._numberToFloatStr(r[0])},                            ${s._numberToFloatStr(r[1])},                            ${s._numberToFloatStr(r[2])},                            ${s._numberToFloatStr(r[3])})`;break;case"ivec2":i=`ivec2(${s._numberToIntStr(r[0])},                             ${s._numberToIntStr(r[1])})`;break;case"ivec3":i=`ivec3(${s._numberToIntStr(r[0])},                             ${s._numberToIntStr(r[1])},                             ${s._numberToIntStr(r[2])})`;break;case"ivec4":i=`ivec4(${s._numberToIntStr(r[0])},                             ${s._numberToIntStr(r[1])},                             ${s._numberToIntStr(r[2])},                             ${s._numberToIntStr(r[3])})`;break;case"uvec2":i=`uvec2(${s._numberToIntStr(r[0])},                             ${s._numberToIntStr(r[1])})`;break;case"uvec3":i=`uvec3(${s._numberToIntStr(r[0])},                             ${s._numberToIntStr(r[1])},                             ${s._numberToIntStr(r[2])})`;break;case"uvec4":i=`uvec4(${s._numberToIntStr(r[0])},                             ${s._numberToIntStr(r[1])},                             ${s._numberToIntStr(r[2])},                             ${s._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":i=`${t}(${Array.prototype.map.call(r,a=>s._numberToFloatStr(a)).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${i};`),this._stage}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const E=`#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  precision highp int;
  precision highp sampler2D;
  precision highp usampler2D;
  precision highp sampler2DArray;
  precision highp sampler2DShadow;
#else
  precision mediump float;
  precision mediump int;
  precision mediump sampler2D;
  precision mediump usampler2D;
  precision mediump sampler2DArray;
  precision mediump sampler2DShadow;
#endif`,F=`precision highp float;
 precision highp sampler2D;
 precision highp usampler2D;
 precision highp sampler2DArray;
 precision highp sampler2DShadow;


 invariant gl_Position;
 `;export{D as v};
