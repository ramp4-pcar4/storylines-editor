import{hc as m,k4 as B,k5 as _,k6 as b,d7 as g,$ as h,k7 as S,f as j,b6 as w,W as I,o as A,hU as T}from"./main-BnX5fuW-.js";import{A as R,h as O}from"./Indices-DEr2HrWx-Bhs7KUoo.js";import{T as l}from"./enums-DBi1-Mm2-CUS1pvQe.js";function k(e,r){d(e.typedBuffer,r.typedBuffer,e.typedBufferStride,r.typedBufferStride)}function d(e,r,f=2,n=f){const o=r.length/2;let t=0,u=0;if(m(r)||B(r)){for(let i=0;i<o;++i)e[t]=r[u],e[t+1]=r[u+1],t+=f,u+=n;return}const s=_(r);if(b(r))for(let i=0;i<o;++i)e[t]=Math.max(r[u]/s,-1),e[t+1]=Math.max(r[u+1]/s,-1),t+=f,u+=n;else for(let i=0;i<o;++i)e[t]=r[u]/s,e[t+1]=r[u+1]/s,t+=f,u+=n}function q(e,r,f,n){const o=e.typedBuffer,t=e.typedBufferStride,u=n?.count??e.count;let s=(n?.dstIndex??0)*t;for(let i=0;i<u;++i)o[s]=r,o[s+1]=f,s+=t}Object.freeze(Object.defineProperty({__proto__:null,fill:q,normalizeIntegerBuffer:d,normalizeIntegerBufferView:k},Symbol.toStringTag,{value:"Module"}));function x(e,r){y(e.typedBuffer,r.typedBuffer,e.typedBufferStride,r.typedBufferStride)}function y(e,r,f=3,n=f){const o=r.length/n;let t=0,u=0;for(let s=0;s<o;++s)e[t]=r[u],e[t+1]=r[u+1],e[t+2]=r[u+2],t+=f,u+=n}function U(e,r,f,n,o){const t=e.typedBuffer,u=e.typedBufferStride,s=o?.count??e.count;let i=(o?.dstIndex??0)*u;for(let a=0;a<s;++a)t[i]=r,t[i+1]=f,t[i+2]=n,i+=u}Object.freeze(Object.defineProperty({__proto__:null,copy:y,copyView:x,fill:U},Symbol.toStringTag,{value:"Module"}));function v(e,r){p(e.typedBuffer,r,e.typedBufferStride)}function p(e,r,f=4){const n=r.typedBuffer,o=r.typedBufferStride,t=r.count;let u=0,s=0;for(let i=0;i<t;++i)e[u]=n[s],e[u+1]=n[s+1],e[u+2]=n[s+2],e[u+3]=n[s+3],u+=f,s+=o}function z(e,r,f,n,o,t){const u=e.typedBuffer,s=e.typedBufferStride,i=t?.count??e.count;let a=(t?.dstIndex??0)*s;for(let c=0;c<i;++c)u[a]=r,u[a+1]=f,u[a+2]=n,u[a+3]=o,a+=s}Object.freeze(Object.defineProperty({__proto__:null,copy:p,copyView:v,fill:z},Symbol.toStringTag,{value:"Module"}));class L{constructor(r){this._streamDataRequester=r}async loadJSON(r,f){return this._load("json",r,f)}async loadBinary(r,f){return g(r)?(h(f),S(r)):this._load("binary",r,f)}async loadImage(r,f){return this._load("image",r,f)}async _load(r,f,n){if(this._streamDataRequester==null)return(await j(f,{responseType:D[r]})).data;const o=await w(this._streamDataRequester.request(f,r,n));if(o.ok===!0)return o.value;throw I(o.error),new A("glt-loader-request-error",`Request for resource failed: ${o.error}`)}}const D={image:"image",binary:"array-buffer",json:"json","image+type":void 0};function $(e,r){switch(r){case l.TRIANGLES:return M(e);case l.TRIANGLE_STRIP:return N(e);case l.TRIANGLE_FAN:return P(e)}}function M(e){return typeof e=="number"?R(e):T(e)?new Uint16Array(e):e}function N(e){const r=typeof e=="number"?e:e.length;if(r<3)return[];const f=r-2,n=O(3*f);if(typeof e=="number"){let o=0;for(let t=0;t<f;t+=1)t%2==0?(n[o++]=t,n[o++]=t+1,n[o++]=t+2):(n[o++]=t+1,n[o++]=t,n[o++]=t+2)}else{let o=0;for(let t=0;t<f;t+=1)t%2==0?(n[o++]=e[t],n[o++]=e[t+1],n[o++]=e[t+2]):(n[o++]=e[t+1],n[o++]=e[t],n[o++]=e[t+2])}return n}function P(e){const r=typeof e=="number"?e:e.length;if(r<3)return new Uint16Array(0);const f=r-2,n=f<=65536?new Uint16Array(3*f):new Uint32Array(3*f);if(typeof e=="number"){let s=0;for(let i=0;i<f;++i)n[s++]=0,n[s++]=i+1,n[s++]=i+2;return n}const o=e[0];let t=e[1],u=0;for(let s=0;s<f;++s){const i=e[s+2];n[u++]=o,n[u++]=t,n[u++]=i,t=i}return n}const F=2.1;export{x as B,$ as E,L as U,q as _,v as b,d as c,y as d,z as g,U as h,F as k,k as m,p as y};
