import{V as o}from"./Program-DLVwTiPA-CGOZKlkS.js";let d=class{constructor(e){this._readFile=e}resolveIncludes(e){return this._resolve(e)}_resolve(e,r=new Map){if(r.has(e))return r.get(e);const t=this._read(e);if(!t)throw new Error(`cannot find shader file ${e}`);const a=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let s=a.exec(t);const i=[];for(;s!=null;)i.push({path:s[1],start:s.index,length:s[0].length}),s=a.exec(t);let l=0,n="";return i.forEach(h=>{n+=t.slice(l,h.start),n+=r.has(h.path)?"":this._resolve(h.path,r),l=h.start+h.length}),n+=t.slice(l),r.set(e,n),n}_read(e){return this._readFile(e)}};function u(e,r,t=""){return new o(e,t+r.shaders.vertexShader,t+r.shaders.fragmentShader,r.attributes)}export{d as c,u as d};
