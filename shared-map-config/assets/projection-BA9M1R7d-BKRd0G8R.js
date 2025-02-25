const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./geometryEngineBase-DueYg7ux-CCeespPx.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js","./hydrated-CplJC1Fs-CuZPS-We.js","./main-PWjwnDMV.js","./main-D9wSeoBJ.css"])))=>i.map(i=>d[i]);
import{dx as U,dN as ln,_ as b,$ as an,dO as un,dP as V,J as A,aC as x,aY as m,o as cn,dQ as K,dR as B,dS as N,dC as $,w as fn,n as hn,l as pn,m as dn,G as mn,dT as g,dU as Y,dV as q,dw as gn,b1 as wn}from"./main-PWjwnDMV.js";import{G as _n,n as O,E as yn}from"./projectBuffer-CvCBvJ6W-C5Ro3r1r.js";function D(e,t,n,s,i,r){return M[0]=e,M[1]=t,M[2]=n,O(M,s,0,i,r,0)}const M=Y();let S=0;class k{static fromGE(t){const n=new k;return n._wkt=t.wkt,n._wkid=t.wkid,n._isInverse=t.isInverse,n}constructor(t){this.uid=S++,t?(this._wkt=t.wkt!=null?t.wkt:null,this._wkid=t.wkid!=null?t.wkid:-1,this._isInverse=t.isInverse!=null&&t.isInverse===!0):(this._wkt=null,this._wkid=-1,this._isInverse=!1)}get wkt(){return this._wkt}set wkt(t){this._wkt=t,this.uid=S++}get wkid(){return this._wkid}set wkid(t){this._wkid=t,this.uid=S++}get isInverse(){return this._isInverse}set isInverse(t){this._isInverse=t,this.uid=S++}getInverse(){const t=new k;return t._wkt=this.wkt,t._wkid=this._wkid,t._isInverse=!this.isInverse,t}}let Z=class v{static cacheKey(t,n){return[t.wkid?.toString()??"-1",t.wkt?.toString()??"",t.wkt2?.toString()??"",n.wkid?.toString()??"-1",n.wkt?.toString()??"",n.wkt2?.toString()??""].join()}static fromGE(t){const n=new v;let s="";for(const i of t.steps){const r=k.fromGE(i);n.steps.push(r),s+=r.uid.toString()+","}return n._cachedProjection={},n._gtlistentry=null,n._chain=s,n}constructor(t){if(this.steps=[],this._cachedProjection={},this._chain="",this._gtlistentry=null,t?.steps)for(const n of t.steps)n instanceof k?this.steps.push(n):this.steps.push(new k({wkid:n.wkid,wkt:n.wkt,isInverse:n.isInverse}))}getInverse(){const t=new v;t.steps=[];for(let n=this.steps.length-1;n>=0;n--){const s=this.steps[n];t.steps.push(s.getInverse())}return t}getGTListEntry(){let t="";for(const n of this.steps)t+=n.uid.toString()+",";return t!==this._chain&&(this._gtlistentry=null,this._cachedProjection={},this._chain=t),this._gtlistentry}assignCachedGe(t,n,s){this._cachedProjection[v.cacheKey(t,n)]=s}getCachedGeTransformation(t,n){let s="";for(const r of this.steps)s+=r.uid.toString()+",";s!==this._chain&&(this._gtlistentry=null,this._cachedProjection={},this._chain=s);const i=this._cachedProjection[v.cacheKey(t,n)];return i===void 0?null:i}};function kn(e,t,n){if(t==null||n==null||n.vcsWkid||x(t,n)||g(t)||g(n))return null;const s=q(t)/q(n);if(s===1)return null;switch(e){case"point":case"esriGeometryPoint":return i=>vn(i,s);case"polyline":case"esriGeometryPolyline":return i=>xn(i,s);case"polygon":case"esriGeometryPolygon":return i=>Rn(i,s);case"multipoint":case"esriGeometryMultipoint":return i=>jn(i,s);case"extent":case"esriGeometryEnvelope":return i=>Pn(i,s);default:return null}}function vn(e,t){e?.z!=null&&(e.z*=t)}function Rn(e,t){if(e)for(const n of e.rings)for(const s of n)s.length>2&&(s[2]*=t)}function xn(e,t){if(e)for(const n of e.paths)for(const s of n)s.length>2&&(s[2]*=t)}function jn(e,t){if(e)for(const n of e.points)n.length>2&&(n[2]*=t)}function Pn(e,t){e&&e.zmin!=null&&e.zmax!=null&&(e.zmin*=t,e.zmax*=t)}let d=null,w=null,R=null,E={};const C=new gn;function z(){return!!d&&wn()}function J(){return!!z()||(U(C),j(),!1)}function zn(e,t){return!e||!t||_(e,t)||J()}function Gn(e,t){return!_(e,t)&&!z()}function j(e){return R==null&&(R=Promise.all([ln(),b(()=>import("./geometryEngineBase-DueYg7ux-CCeespPx.js"),__vite__mapDeps([0,1]),import.meta.url).then(t=>t.g),b(()=>import("./hydrated-CplJC1Fs-CuZPS-We.js"),__vite__mapDeps([2,3,4]),import.meta.url)])),R.then(([,t,{hydratedAdapter:n}])=>{an(e),w=n,d=t.default,d._enableProjection(un),C.notify()})}function Q(e,t,n=null,s=null){return Array.isArray(e)?e.length===0?[]:W(w,e,e[0].spatialReference,t,n,s):W(w,[e],e.spatialReference,t,n,s)[0]}function W(e,t,n,s,i=null,r=null){if(n==null||s==null)return t;if(_(n,s,i))return t.map(o=>L(o,n,s));if(i==null&&V(n))return t.map(o=>L(o,n,A.WGS84)).map(o=>P(o,s));if(i==null&&V(s))return t.map(o=>P(o,A.WGS84)).map(o=>L(o,A.WGS84,s));if(i==null){const o=Z.cacheKey(n,s);E[o]!==void 0?i=E[o]:((i=H(n,s,void 0))==null&&(i=new Z),E[o]=i)}if(d==null||e==null)throw new T;return r!=null?d._project(e,t,n,s,i,r):d._project(e,t,n,s,i)}function In(e,t){const n=F([e],t);return n.pending!=null?{pending:n.pending,geometry:null}:n.geometries!=null?{pending:null,geometry:n.geometries[0]}:{pending:null,geometry:null}}function F(e,t){if(!z()){for(const n of e)if(n!=null&&!x(n.spatialReference,t)&&m(n.spatialReference)&&m(t)&&!_(n.spatialReference,t))return U(C),{pending:j(),geometries:null}}return{pending:null,geometries:e.map(n=>n==null?null:x(n.spatialReference,t)?n:m(n.spatialReference)&&m(t)?P(n,t):null)}}function H(e,t,n=null){if(e==null||t==null)return null;if(d==null||w==null)throw new T;const s=d._getTransformation(w,e,t,n,n?.spatialReference);return s!==null?Z.fromGE(s):null}function Mn(e,t,n=null){if(d==null||w==null)throw new T;const s=d._getTransformationBySuitability(w,e,t,n,n?.spatialReference);if(s!==null){const i=[];for(const r of s)i.push(Z.fromGE(r));return i}return[]}class T extends cn{constructor(){super("projection:not-loaded","projection engine not fully loaded yet, please call load()")}}function Sn(){d=null,w=null,R=null,E={}}const En={get loadPromise(){return R}};function P(e,t){try{const n=Q(e,t);return n==null?null:("xmin"in e&&"xmin"in n&&(n.zmin=e.zmin,n.zmax=e.zmax),kn(n.type,e.spatialReference,t)?.(n),n)}catch(n){if(!(n instanceof T))throw n;return null}}async function Ln(e,t,n){const s=e.spatialReference;return s!=null&&t!=null&&await X(s,t,null,n),P(e,t)}function _(e,t,n){return!n&&(!!x(e,t)||m(e)&&m(t)&&!!_n(e,t,yn))}function Zn(e,t){if(x(e,t))return!0;if(!m(e)||!m(t))return!1;const n=K(e)||B(e)||N(e),s=K(t)||B(t)||N(t);return n&&s}async function X(e,t,n,s){if(z())return $(s);if(Array.isArray(e)){for(const{source:i,dest:r,geographicTransformation:o}of e)if(i&&r&&!_(i,r,o))return j(s)}else if(e&&t&&!_(e,t,n))return j(s);return $(s)}function L(e,t,n){return e?"x"in e?nn(e,t,new fn,n,0):"xmin"in e?rn(e,t,new hn,n,0):"rings"in e?sn(e,t,new pn,n,0):"paths"in e?en(e,t,new dn,n,0):"points"in e?tn(e,t,new mn,n,0):null:null}function On(e,t,n=t.spatialReference,s=0){return n!=null&&e.spatialReference!=null&&nn(e,e.spatialReference,t,n,s)!=null}function nn(e,t,n,s,i){u[0]=e.x,u[1]=e.y;const r=e.z;return u[2]=r!==void 0?r:i,O(u,t,0,u,s,0)?(n.x=u[0],n.y=u[1],n.spatialReference=s,r!==void 0||g(s)?(n.z=u[2],n.hasZ=!0):(n.z=void 0,n.hasZ=!1),e.m===void 0?(n.m=void 0,n.hasM=!1):(n.m=e.m,n.hasM=!0),n):null}function Tn(e,t,n=t.spatialReference,s=0){return e.spatialReference!=null&&n!=null&&tn(e,e.spatialReference,t,n,s)!=null}function tn(e,t,n,s,i){const{points:r,hasZ:o,hasM:a}=e,l=[],h=r.length,p=[];for(const c of r)p.push(c[0],c[1],o?c[2]:i);if(!O(p,t,0,p,s,0,h))return null;const f=o||g(s);for(let c=0;c<h;++c){const y=3*c,G=p[y],I=p[y+1];f&&a?l.push([G,I,p[y+2],r[c][3]]):f?l.push([G,I,p[y+2]]):a?l.push([G,I,r[c][2]]):l.push([G,I])}return n.points=l,n.spatialReference=s,n.hasZ=o,n.hasM=a,n}function An(e,t,n=t.spatialReference,s=0){return e.spatialReference!=null&&n!=null&&en(e,e.spatialReference,t,n,s)!=null}function en(e,t,n,s,i){const{paths:r,hasZ:o,hasM:a}=e,l=[];if(!on(r,o??!1,a??!1,t,l,s,i))return null;const h=o||g(s);return n.paths=l,n.spatialReference=s,n.hasZ=h,n.hasM=a,n}function Wn(e,t,n=t.spatialReference,s=0){return e.spatialReference!=null&&n!=null&&sn(e,e.spatialReference,t,n,s)!=null}function sn(e,t,n,s,i){const{rings:r,hasZ:o,hasM:a}=e,l=[];if(!on(r,o??!1,a??!1,t,l,s,i))return null;const h=o||g(s);return n.rings=l,n.spatialReference=s,n.hasZ=h,n.hasM=a,n}function Cn(e,t,n=t.spatialReference,s=0){return e.spatialReference!=null&&n!=null&&rn(e,e.spatialReference,t,n,s)!=null}function rn(e,t,n,s,i){const{xmin:r,ymin:o,xmax:a,ymax:l,hasZ:h,hasM:p}=e,f=h?e.zmin:i;if(!D(r,o,f,t,u,s))return null;const c=h||g(s);n.xmin=u[0],n.ymin=u[1],c&&(n.zmin=u[2]);const y=h?e.zmax:i;return D(a,l,y,t,u,s)?(n.xmax=u[0],n.ymax=u[1],c&&(n.zmax=u[2]),p&&(n.mmin=e.mmin,n.mmax=e.mmax),n.spatialReference=s,n):null}function on(e,t,n,s,i,r,o=0){const a=new Array;for(const p of e)for(const f of p)a.push(f[0],f[1],t?f[2]:o);if(!O(a,s,0,a,r,0))return!1;let l=0;i.length=0;const h=t||g(r);for(const p of e){const f=new Array;for(const c of p)h&&n?f.push([a[l++],a[l++],a[l++],c[3]]):h?f.push([a[l++],a[l++],a[l++]]):n?(f.push([a[l++],a[l++],c[2]]),l++):(f.push([a[l++],a[l++]]),l++);i.push(f)}return!0}const u=Y(),Kn=Object.freeze(Object.defineProperty({__proto__:null,canProjectWithoutEngine:_,getTransformation:H,getTransformations:Mn,initializeProjection:X,isEqualBaseGCS:Zn,isLoaded:z,isLoadedOrLoad:J,isLoadedOrLoadFor:zn,load:j,project:Q,projectExtent:Cn,projectMany:W,projectMultipoint:Tn,projectOrLoad:In,projectOrLoadMany:F,projectPoint:On,projectPolygon:Wn,projectPolyline:An,projectWithZConversion:Ln,projectWithoutEngine:L,requiresLoad:Gn,test:En,tryProjectWithZConversion:P,unload:Sn},Symbol.toStringTag,{value:"Module"}));export{zn as B,P as H,_ as J,Q as K,Zn as L,X as N,W as O,L as Q,In as V,j as W,F as X,H as Y,z as _,Wn as a,kn as o,Kn as p,Z as s};
