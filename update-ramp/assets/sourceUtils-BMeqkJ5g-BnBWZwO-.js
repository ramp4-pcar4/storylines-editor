const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./geometryEngineJSON-CGn_tfx8-D3N6SheD.js","./geometryEngineBase-DueYg7ux-CCeespPx.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js","./json-BI97KiBB-Ce5cWfI2.js"])))=>i.map(i=>d[i]);
import{hx as d,hy as h,cU as m,eN as g,cT as p,hz as y,aY as a,_}from"./main-CJueYQxD.js";import{h as w}from"./date-Cqvy-TgA-DIf-QFLz.js";class I{constructor(){this.code=null,this.description=null}}class b{constructor(n){this.error=new I,this.globalId=null,this.objectId=null,this.success=!1,this.uniqueId=null,this.error.description=n}}function c(t){return new b(t)}class q{constructor(n){this.globalId=null,this.success=!0,this.objectId=this.uniqueId=n}}function x(t){return new q(t)}const u=new Set;function C(t,n,i,f=!1){u.clear();for(const e in i){const r=t.get(e);if(!r)continue;const o=E(r,i[e]);if(u.add(r.name),r&&(f||r.editable)){const l=d(r,o);if(l)return c(h(l,r,o));n[r.name]=o}}for(const e of t.requiredFields??[])if(!u.has(e.name))return c(`missing required field "${e.name}"`);return null}function E(t,n){let i=n;return m(t)&&typeof n=="string"?i=parseFloat(n):g(t)&&n!=null&&typeof n!="string"?i=String(n):p(t)&&typeof n=="string"&&(i=w(n)),y(i)}let s;function F(t,n){if(!t||!a(n))return t;if("rings"in t||"paths"in t){if(s==null)throw new TypeError("geometry engine not loaded");return s.simplify(n,t)}return t}async function P(){return s==null&&(s=await _(()=>import("./geometryEngineJSON-CGn_tfx8-D3N6SheD.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(t=>t.g)),s}async function G(t,n){!a(t)||n!=="esriGeometryPolygon"&&n!=="esriGeometryPolyline"||await P()}export{C as F,G,c,x as j,F as x};
