const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./geometryEngineJSON-CGn_tfx8-D3N6SheD.js","./geometryEngineBase-DueYg7ux-CCeespPx.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js","./json-BI97KiBB-Ce5cWfI2.js"])))=>i.map(i=>d[i]);
import{fn as Z,fo as O,aK as U,aq as A,aY as h,aC as m,fp as _,dR as u,b as j,fq as N,g as T,fr as g,cN as q,cO as B,fs as P,dB as I,ft as p,_ as E}from"./main-CSyv-l2o.js";import{N as J,O as R,J as L}from"./projection-BA9M1R7d-8HGEzInK.js";import{B as Y}from"./normalizeUtils-Bxmy9MNI-DPyXixfZ.js";import{a as d}from"./json-BI97KiBB-Ce5cWfI2.js";const c=[0,0];function S(e,n){if(!n)return null;if("x"in n){const i={x:0,y:0};return[i.x,i.y]=e(n.x,n.y,c),n.z!=null&&(i.z=n.z),n.m!=null&&(i.m=n.m),i}if("xmin"in n){const i={xmin:0,ymin:0,xmax:0,ymax:0};return[i.xmin,i.ymin]=e(n.xmin,n.ymin,c),[i.xmax,i.ymax]=e(n.xmax,n.ymax,c),n.hasZ&&(i.zmin=n.zmin,i.zmax=n.zmax,i.hasZ=!0),n.hasM&&(i.mmin=n.mmin,i.mmax=n.mmax,i.hasM=!0),i}return"rings"in n?{rings:x(n.rings,e),hasM:n.hasM,hasZ:n.hasZ}:"paths"in n?{paths:x(n.paths,e),hasM:n.hasM,hasZ:n.hasZ}:"points"in n?{points:w(n.points,e),hasM:n.hasM,hasZ:n.hasZ}:null}function x(e,n){const i=[];for(const t of e)i.push(w(t,n));return i}function w(e,n){const i=[];for(const t of e){const a=n(t[0],t[1],[0,0]);i.push(a),t.length>2&&a.push(t[2]),t.length>3&&a.push(t[3])}return i}async function b(e,n){if(!e||!n)return;const i=Array.isArray(e)?e.map(t=>t.geometry!=null?t.geometry.spatialReference:null).filter(A):[e];await J(i.map(t=>({source:t,dest:n})))}const M=S.bind(null,Z),z=S.bind(null,O);function v(e,n,i,t){if(!e||(i||(i=n,n=e.spatialReference),!h(n)||!h(i)||m(n,i)))return e;if(_(n,i)){const a=u(i)?M(e):z(e);return a.spatialReference=i,a}return R(d,[e],n,i,null,t)[0]}class ${constructor(){this._jobs=[],this._timer=null,this._process=this._process.bind(this)}async push(n,i,t,a){if(!n?.length||!i||!t||m(i,t))return n;const s={geometries:n,inSpatialReference:i,outSpatialReference:t,geographicTransformation:a,resolve:j()};return this._jobs.push(s),this._timer??=setTimeout(this._process,10),s.resolve.promise}_process(){this._timer=null;const n=this._jobs.shift();if(!n)return;const{geometries:i,inSpatialReference:t,outSpatialReference:a,resolve:s,geographicTransformation:o}=n;_(t,a)?u(a)?s(i.map(M)):s(i.map(z)):s(R(d,i,t,a,o,null)),this._jobs.length>0&&(this._timer=setTimeout(this._process,10))}}const C=new $;function ee(e,n,i,t){return C.push(e,n,i,t)}const D=new U({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"}),y=Object.freeze({});async function ne(e,n,i){const{outFields:t,orderByFields:a,groupByFieldsForStatistics:s,outStatistics:o}=e;if(t)for(let r=0;r<t.length;r++)t[r]=t[r].trim();if(a)for(let r=0;r<a.length;r++)a[r]=a[r].trim();if(s)for(let r=0;r<s.length;r++)s[r]=s[r].trim();if(o)for(let r=0;r<o.length;r++)o[r].onStatisticField&&(o[r].onStatisticField=o[r].onStatisticField.trim());return e.geometry&&!e.outSR&&(e.outSR=e.geometry.spatialReference),H(e,n,i)}async function H(e,n,i){if(!e)return null;let{where:t}=e;if(e.where=t=t?.trim(),(!t||/^1 *= *1$/.test(t)||n&&n===t)&&(e.where=null),!e.geometry)return e;let a=await Q(e);if(e.distance=0,e.units=null,e.spatialRel==="esriSpatialRelEnvelopeIntersects"){const{spatialReference:s}=e.geometry;a=N(a),a.spatialReference=s}if(a){await b(a.spatialReference,i),a=K(a,i);const s=(await Y(T(a)))[0];if(s==null)throw y;const o="quantizationParameters"in e&&e.quantizationParameters?.tolerance||"maxAllowableOffset"in e&&e.maxAllowableOffset||0,r=o&&F(a,i)?{densificationStep:8*o}:void 0,f=s.toJSON(),l=v(f,f.spatialReference,i,r);if(!l)throw y;l.spatialReference=i,e.geometry=l}return e}function F(e,n){if(!e)return!1;const i=e.spatialReference;return(g(e)||q(e)||B(e))&&!m(i,n)&&!L(i,n)}function K(e,n){const i=e.spatialReference;return F(e,n)&&g(e)?{spatialReference:i,rings:[[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]]]}:e}async function Q(e){const{distance:n,units:i}=e,t=e.geometry;if(n==null||"vertexAttributes"in t)return t;const a=t.spatialReference,s=i?D.fromJSON(i):P(a),o=a&&(I(a)||u(a))?t:await b(a,p).then(()=>v(t,p));return(await k())(o.spatialReference,o,n,s)}async function k(){return(await E(()=>import("./geometryEngineJSON-CGn_tfx8-D3N6SheD.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.g)).geodesicBuffer}export{ee as C,ne as D,D as Z,b as f,v as h,y as p,H as v};
