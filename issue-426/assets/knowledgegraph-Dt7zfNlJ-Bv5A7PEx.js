const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./knowledgeGraphService-DOJz0fzA-YO3-WyGy.js","./main-Dph3xG49.js","./main-DzVe78FN.css","./Relationship-Db9GUmYx-BPIXiDJ3.js"])))=>i.map(i=>d[i]);
import{r as _,_ as D,C as E,J as $,d as k,dK as N,b7 as j}from"./main-Dph3xG49.js";import{t as q,N as I}from"./arcadeUtils-DpP0k7IY-BoL_c_FN.js";import{w as P,T as c,n as l,M as T,y as w,F as J,g as K,C as S,e as M,S as C,d as b,c as O,h as V,a as L,R as A,ak as Q}from"./languageUtils-BYxF9hRA-DOEQR96C.js";import{n as U}from"./portalUtils-CKN9iXwH-Dq5Ks5zc.js";import{_ as z,W as B,K as H}from"./projection-BA9M1R7d-DAEw6OHS.js";import X from"./PortalItem-CctGdnxF-D7o4Fqb4.js";import{f as Y,j as Z}from"./project-DQKhruav-C-M3Wa5h.js";import{j as tt,w as nt,x as rt,b as et,k as it}from"./Relationship-Db9GUmYx-BPIXiDJ3.js";import"./TimeOnly-DSMefxKy-DvisX-Am.js";import"./UnknownTimeZone-C--TOcPG-DGBg-kBf.js";import"./ImmutableArray-CiJxhY8_-Kqx7aWRu.js";import"./featureConversionUtils-D6hFQ4Af-C63q97lE.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./FieldsIndex-HmzMbJQG-CiBADeEQ.js";import"./number-eRKYXfX9-CyrlJALJ.js";import"./shared-D1w-26bA-ChLFFpBi.js";import"./Field-C6hA1tZj-Bml-XZKO.js";import"./fieldType-CD2CL2hr-CXXpNbyA.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./Query-BrwMGK8U-ytymcwiw.js";import"./TimeExtent-Cn0Jofqr-DUFEaBxg.js";import"./projectBuffer-CvCBvJ6W-BFUqJjz1.js";import"./utils-9sQxfkoa-CRVoznqM.js";import"./utils-Bq23Xwmj-DPjy7Vnb.js";let u=null;async function ot(t){const n=E.geometryServiceUrl??"";if(!n){z()||await B();for(const r of t)r.container[r.indexer]=H(r.container[r.indexer],$.WGS84);return}const e=t.map(r=>r.container[r.indexer]),o=new Y({geometries:e,outSpatialReference:$.WGS84}),s=await Z(n,o);for(let r=0;r<s.length;r++){const i=t[r];i.container[i.indexer]=s[r]}}async function W(t,n){const e=new X({portal:t,id:n});return await e.load(),u===null&&(u=await D(()=>import("./knowledgeGraphService-DOJz0fzA-YO3-WyGy.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(o=>o.k)),await u.fetchKnowledgeGraph(e.url)}function R(t,n,e,o,s){if(t===null)return null;if(w(t)||C(t))return t;if(b(t)||b(t))return t.toJSDate();if(O(t))return t.toStorageFormat();if(V(t))return t.toStorageString();if(L(t)){const r={};for(const i of t.keys())r[i]=R(t.field(i),n,e,o,s),r[i]instanceof k&&s.push({container:r,indexer:i});return r}if(S(t)){const r=t.map(i=>R(i,n,e,o,s));for(let i=0;i<r.length;i++)r[i]instanceof k&&s.push({container:r,indexer:i});return r}return A(t)?t.spatialReference.isWGS84?t:t.spatialReference.isWebMercator&&n?N(t):t:void 0}function at(t,n){if(!t)return t;if(t.spatialReference.isWGS84&&n.spatialReference.isWebMercator)return j(t);if(t.spatialReference.equals(n.spatialReference))return t;throw new c(n,l.WrongSpatialReference,null)}function v(t,n){if(!t)return null;const e={};for(const o in t)e[o]=m(t[o],n);return e}function m(t,n){return t===null?null:S(t)?t.map(e=>m(e,n)):t instanceof nt?{graphTypeName:t.typeName,id:t.id,graphType:"entity",properties:v(t.properties,n)}:t instanceof rt?{graphType:"object",properties:v(t.properties,n)}:t instanceof et?{graphTypeName:t.typeName,id:t.id,graphType:"relationship",originId:t.originId??null,destinationId:t.destinationId??null,properties:v(t.properties,n)}:t instanceof it?{graphType:"path",path:t.path?t.path.map(e=>m(e,n)):null}:A(t)?at(t,n):w(t)||C(t)||Q(t)?t:null}function Ct(t){t.mode==="async"&&(t.functions.knowledgegraphbyportalitem=function(n,e){return t.standardFunctionAsync(n,e,(o,s,r)=>{if(P(r,2,2,n,e),r[0]===null)throw new c(n,l.PortalRequired,e);if(r[0]instanceof q){const d=T(r[1]);let f;return f=n.services?.portal?n.services.portal:_.getDefault(),W(U(r[0],f),d)}if(w(r[0])===!1)throw new c(n,l.InvalidParameter,e);const i=T(r[0]);return W(n.services?.portal??_.getDefault(),i)})},t.signatures.push({name:"knowledgegraphbyportalitem",min:2,max:2}),t.functions.querygraph=function(n,e){return t.standardFunctionAsync(n,e,async(o,s,r)=>{P(r,2,4,n,e);const i=r[0];if(!J(i))throw new c(n,l.InvalidParameter,e);const d=r[1];if(!w(d))throw new c(n,l.InvalidParameter,e);u===null&&(u=await D(()=>import("./knowledgeGraphService-DOJz0fzA-YO3-WyGy.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(a=>a.k));let f=null;const h=K(r[2],null);if(!(h instanceof I||h===null))throw new c(n,l.InvalidParameter,e);if(h){let a=[];f=R(h,!0,!1,n,a),a=a.filter(p=>!p.container[p.indexer].spatialReference.isWGS84),a.length>0&&await ot(a)}const x=new tt({openCypherQuery:d,bindParameters:f});(i?.serviceDefinition?.currentVersion??11.3)>11.2&&(x.outputSpatialReference=n.spatialReference);const F=(await u.executeQueryStreaming(i,x)).resultRowsStream.getReader(),y=[];try{for(;;){const{done:a,value:p}=await F.read();if(a)break;if(S(p))for(const g of p)y.push(m(g,n));else{const g=[];for(const G of p)g.push(m(p[G],n));y.push(g)}}}catch(a){throw a}return I.convertJsonToArcade(y,M(n),!1,!0)})},t.signatures.push({name:"querygraph",min:2,max:4}))}export{Ct as registerFunctions};
