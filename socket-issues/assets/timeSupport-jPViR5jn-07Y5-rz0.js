const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./geometryEngineJSON-CGn_tfx8-D3N6SheD.js","./geometryEngineBase-DueYg7ux-CCeespPx.js","./_commonjsHelpers-BITg13Vk-KnjfkSck.js","./json-BI97KiBB-Ce5cWfI2.js"])))=>i.map(i=>d[i]);
import{cN as M,fr as _,aI as $,h7 as D,_ as Z,o as E,aY as q,h8 as z,h9 as K,bK as W}from"./main-8gcLRx1v.js";import{Y as H,O as C,b as Y,a as L,_ as X,c as k,C as F,R as B}from"./featureConversionUtils-D6hFQ4Af-8sNh0qIJ.js";import{c as G}from"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import{f as Q}from"./queryUtils-Brxu6254-t1vCVoCG.js";const x=new G,tt=new G,V=new G,b={esriGeometryPoint:Y,esriGeometryPolyline:L,esriGeometryPolygon:X,esriGeometryMultipoint:k};function Pt(t,e,r,s=t.hasZ,i=t.hasM){if(e==null)return null;const n=t.hasZ&&s,o=t.hasM&&i;if(r){const l=F(V,e,t.hasZ,t.hasM,"esriGeometryPoint",r,s,i);return Y(l,n,o)}return Y(e,n,o)}function P(t,e,r,s,i,n,o=e,l=r){const u=e&&o,a=r&&l,f=s!=null?"coords"in s?s:s.geometry:null;if(f==null)return null;if(i){let c=B(tt,f,e,r,t,i,o,l);return n&&(c=F(V,c,u,a,t,n)),b[t]?.(c,u,a)??null}if(n){const c=F(V,f,e,r,t,n,o,l);return b[t]?.(c,u,a)??null}return H(x,f,e,r,o,l),b[t]?.(x,u,a)??null}function _t(t){return t&&j in t?JSON.parse(JSON.stringify(t,et)):t}const j="_geVersion",et=(t,e)=>t!==j?e:void 0;function w(t,e){return t?e?4:3:e?3:2}function Et(t,e,r,s){if(!e?.lengths.length)return null;t.lengths.length&&(t.lengths.length=0),t.coords.length&&(t.coords.length=0);const i=t.coords,n=[],o=r?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],{lengths:l,coords:u}=e,a=w(r,s);let f=0;for(const c of l){const m=nt(o,u,f,c,r,s);m&&n.push(m),f+=c*a}if(n.sort((c,m)=>{let p=c[2]-m[2];return p===0&&r&&(p=c[4]-m[4]),p}),n.length){let c=6*n[0][2];i[0]=n[0][0]/c,i[1]=n[0][1]/c,r&&(c=6*n[0][4],i[2]=c!==0?n[0][3]/c:0),(i[0]<o[0]||i[0]>o[1]||i[1]<o[2]||i[1]>o[3]||r&&(i[2]<o[4]||i[2]>o[5]))&&(i.length=0)}if(!i.length){const c=e.lengths[0]?rt(u,0,l[0],r,s):null;if(!c)return null;i[0]=c[0],i[1]=c[1],r&&c.length>2&&(i[2]=c[2])}return t}function nt(t,e,r,s,i,n){const o=w(i,n);let l=r,u=r+o,a=0,f=0,c=0,m=0,p=0;for(let g=0,T=s-1;g<T;g++,l+=o,u+=o){const h=e[l],y=e[l+1],R=e[l+2],N=e[u],S=e[u+1],O=e[u+2];let d=h*S-N*y;m+=d,a+=(h+N)*d,f+=(y+S)*d,i&&(d=h*O-N*R,c+=(R+O)*d,p+=d),h<t[0]&&(t[0]=h),h>t[1]&&(t[1]=h),y<t[2]&&(t[2]=y),y>t[3]&&(t[3]=y),i&&(R<t[4]&&(t[4]=R),R>t[5]&&(t[5]=R))}if(m>0&&(m*=-1),p>0&&(p*=-1),!m)return null;const I=[a,f,.5*m];return i&&(I[3]=c,I[4]=.5*p),I}function rt(t,e,r,s,i){const n=w(s,i);let o=e,l=e+n,u=0,a=0,f=0,c=0;for(let m=0,p=r-1;m<p;m++,o+=n,l+=n){const I=t[o],g=t[o+1],T=t[o+2],h=t[l],y=t[l+1],R=t[l+2],N=s?st(I,g,T,h,y,R):it(I,g,h,y);if(N)if(u+=N,s){const S=lt(I,g,T,h,y,R);a+=N*S[0],f+=N*S[1],c+=N*S[2]}else{const S=ot(I,g,h,y);a+=N*S[0],f+=N*S[1]}}return u>0?s?[a/u,f/u,c/u]:[a/u,f/u]:r>0?s?[t[e],t[e+1],t[e+2]]:[t[e],t[e+1]]:null}function it(t,e,r,s){const i=r-t,n=s-e;return Math.sqrt(i*i+n*n)}function st(t,e,r,s,i,n){const o=s-t,l=i-e,u=n-r;return Math.sqrt(o*o+l*l+u*u)}function ot(t,e,r,s){return[t+.5*(r-t),e+.5*(s-e)]}function lt(t,e,r,s,i,n){return[t+.5*(s-t),e+.5*(i-e),r+.5*(n-r)]}function ut(t){return t==="mesh"?z:K(t)}function J(t,e){return t?e?4:3:e?3:2}function at(t,e,r,s){return U(t,e,r,s.coords[0],s.coords[1])}function ct(t,e,r,s,i,n){const o=J(i,n),{coords:l,lengths:u}=s;if(!u)return!1;for(let a=0,f=0;a<u.length;a++,f+=o)if(!U(t,e,r,l[f],l[f+1]))return!1;return!0}function U(t,e,r,s,i){if(!t)return!1;const n=J(e,r),{coords:o,lengths:l}=t;let u=!1,a=0;for(const f of l)u=ft(u,o,n,a,f,s,i),a+=f*n;return u}function ft(t,e,r,s,i,n,o){let l=t,u=s;for(let a=s,f=s+i*r;a<f;a+=r){u=a+r,u===f&&(u=s);const c=e[a],m=e[a+1],p=e[u],I=e[u+1];(m<o&&I>=o||I<o&&m>=o)&&c+(o-m)/(I-m)*(p-c)<n&&(l=!l)}return l}const v="unsupported-query",mt={esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"intersects",esriSpatialRelIndexIntersects:null,esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:null},A={spatialRelationship:{esriSpatialRelIntersects:!0,esriSpatialRelContains:!0,esriSpatialRelWithin:!0,esriSpatialRelCrosses:!0,esriSpatialRelDisjoint:!0,esriSpatialRelTouches:!0,esriSpatialRelOverlaps:!0,esriSpatialRelEnvelopeIntersects:!0,esriSpatialRelIndexIntersects:!1,esriSpatialRelRelation:!1},queryGeometry:{esriGeometryPoint:!0,esriGeometryMultiPatch:!1,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!0},layerGeometry:{esriGeometryPoint:!0,esriGeometryMultiPatch:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!1}};function pt(t){return t!=null&&A.spatialRelationship[t]===!0}function It(t){return t!=null&&A.queryGeometry[W(t)]===!0}function ht(t){return t!=null&&A.layerGeometry[t]===!0}function yt(){return Z(()=>import("./geometryEngineJSON-CGn_tfx8-D3N6SheD.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(t=>t.g)}function bt(t,e,r,s,i){if(M(e)&&r==="esriGeometryPoint"&&(t==="esriSpatialRelIntersects"||t==="esriSpatialRelContains")){const n=C(new G,e,!1,!1);return Promise.resolve(o=>at(n,!1,!1,o))}if(M(e)&&r==="esriGeometryMultipoint"){const n=C(new G,e,!1,!1);if(t==="esriSpatialRelContains")return Promise.resolve(o=>ct(n,!1,!1,o,s,i))}if(_(e)&&r==="esriGeometryPoint"&&(t==="esriSpatialRelIntersects"||t==="esriSpatialRelContains"))return Promise.resolve(n=>$(e,P(r,s,i,n)));if(_(e)&&r==="esriGeometryMultipoint"&&t==="esriSpatialRelContains")return Promise.resolve(n=>D(e,P(r,s,i,n)));if(_(e)&&t==="esriSpatialRelIntersects"){const n=ut(r);return Promise.resolve(o=>n(e,P(r,s,i,o)))}return yt().then(n=>{const o=n[mt[t]].bind(null,e.spatialReference,e);return l=>o(P(r,s,i,l))})}async function vt(t,e,r){const{spatialRel:s,geometry:i}=t;if(i){if(!pt(s))throw new E(v,"Unsupported query spatial relationship",{query:t});if(q(i.spatialReference)&&q(r)){if(!It(i))throw new E(v,"Unsupported query geometry type",{query:t});if(!ht(e))throw new E(v,"Unsupported layer geometry type",{query:t});if(t.outSR)return Q(t.geometry?.spatialReference,t.outSR)}}}function Mt(t){if(_(t))return!0;if(M(t)){for(const e of t.rings)if(e.length!==5||e[0][0]!==e[1][0]||e[0][0]!==e[4][0]||e[2][0]!==e[3][0]||e[0][1]!==e[3][1]||e[0][1]!==e[4][1]||e[1][1]!==e[2][1])return!1;return!0}return!1}async function Yt(t,e){if(!t)return null;const r=e.featureAdapter,{startTimeField:s,endTimeField:i}=t;let n=Number.POSITIVE_INFINITY,o=Number.NEGATIVE_INFINITY;if(s&&i)await e.forEach(l=>{const u=r.getAttribute(l,s),a=r.getAttribute(l,i);u==null||isNaN(u)||(n=Math.min(n,u)),a==null||isNaN(a)||(o=Math.max(o,a))});else{const l=s||i;await e.forEach(u=>{const a=r.getAttribute(u,l);a==null||isNaN(a)||(n=Math.min(n,a),o=Math.max(o,a))})}return{start:n,end:o}}function Ft(t,e,r){if(!e||!t)return null;const{startTimeField:s,endTimeField:i}=t;if(!s&&!i)return null;const{start:n,end:o}=e;if(n===null&&o===null)return null;if(n===void 0&&o===void 0)return St();const l=r.getAttributeAsTimestamp?.bind(r)??r.getAttribute.bind(r);return s&&i?Nt(l,s,i,n,o):Rt(l,s||i,n,o)}function Nt(t,e,r,s,i){return s!=null&&i!=null?n=>{const o=t(n,e),l=t(n,r);return(o==null||o<=i)&&(l==null||l>=s)}:s!=null?n=>{const o=t(n,r);return o==null||o>=s}:i!=null?n=>{const o=t(n,e);return o==null||o<=i}:void 0}function Rt(t,e,r,s){return r!=null&&s!=null&&r===s?i=>t(i,e)===r:r!=null&&s!=null?i=>{const n=t(i,e);return n!=null&&n>=r&&n<=s}:r!=null?i=>{const n=t(i,e);return n!=null&&n>=r}:s!=null?i=>{const n=t(i,e);return n!=null&&n<=s}:void 0}function St(){return()=>!1}export{Ft as G,vt as S,Yt as T,P as a,Mt as d,Pt as e,bt as g,Et as n,_t as r};
