import{r as y}from"./BufferObject-BM_7mcDb-CuaYgevR.js";import{V as c}from"./Program-DLVwTiPA-BXbjfbYO.js";import{G as j,a as F}from"./Program-DLVwTiPA-BXbjfbYO.js";import"./main-YbCtmqIL.js";import{s as p}from"./NestedMap-Ddo7BfvO-BpVPk8mz.js";import{c as v,d as O}from"./ProgramTemplate-DQOm6Omy-Bz7K2u1R.js";import{V as w}from"./Texture-BCt2hphT-Bw3WeXlx.js";import{c as C}from"./VertexArrayObject-M4iRGGoi-CzrgcLFY.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";class ${constructor(e){this._rctx=e,this._store=new p}dispose(){this._store.forAll(e=>e.dispose()),this._store.clear()}acquire(e,t,o,i){const r=this._store.get(e,t);if(r!=null)return r.ref(),r;const s=new c(this._rctx,e,t,o,i);return s.ref(),this._store.set(e,t,s),s}get test(){}}function m(f){const{options:e,value:t}=f;return typeof e[t]=="number"}function b(f){let e="";for(const t in f){const o=f[t];if(typeof o=="boolean")o&&(e+=`#define ${t}
`);else if(typeof o=="number")e+=`#define ${t} ${o.toFixed()}
`;else if(typeof o=="object")if(m(o)){const{value:i,options:r,namespace:s}=o,n=s?`${s}_`:"";for(const a in r)e+=`#define ${n}${a} ${r[a].toFixed()}
`;e+=`#define ${t} ${n}${i}
`}else{const i=o.options;let r=0;for(const s in i)e+=`#define ${i[s]} ${(r++).toFixed()}
`;e+=`#define ${t} ${i[o.value]}
`}}return e}export{y as BufferObject,j as FramebufferObject,c as Program,$ as ProgramCache,F as Renderbuffer,v as ShaderCompiler,w as Texture,C as VertexArrayObject,O as createProgram,b as glslifyDefineMap};
