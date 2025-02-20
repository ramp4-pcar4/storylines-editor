import{y as le,c as ie,d as oe,N as b,x as ce,Z as ue,t as E,g as fe,r as T}from"./arcadeUtils-DpP0k7IY-B5PNEHhu.js";import{J as f,w as m,d as V,h as G,c as W,M as z,T as s,n as l,C as g,Z as P,z as C,r as J,g as w,Y,p as D,K as M,f as R,L as de,S as q,e as S}from"./languageUtils-BYxF9hRA-BBCJyVBT.js";import{I,A as j,z as p}from"./TimeOnly-DSMefxKy-d-fxgp_2.js";import{n as B}from"./portalUtils-CKN9iXwH-B8g8godJ.js";import{d,n as L,m as A,w as O,l as x,G as H,g as K,r as X,V as we,f as _,p as me}from"./main-B-qqJ5ov.js";import{disjoint as he,intersects as pe,touches as ye,crosses as ve,within as ge,contains as Pe,overlaps as Ie,equals as Ae,relate as Fe,intersect as Re,union as Ne,difference as be,symmetricDifference as Se,clip as Oe,cut as xe,planarArea as Q,geodesicArea as $,planarLength as Z,geodesicLength as U,distance as De,densify as ee,geodesicDensify as ne,generalize as je,buffer as Le,geodesicBuffer as Te,offset as Ce,rotate as te,simplify as ae,isSimple as Je,convexHull as Ze,nearestCoordinate as ke,nearestVertex as ze}from"./geometryEngineAsync-D7oEu5dd-mX2h4VhB.js";import"./ImmutableArray-CiJxhY8_-Kqx7aWRu.js";import"./featureConversionUtils-D6hFQ4Af-7zE_Etyc.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./FieldsIndex-HmzMbJQG-C2DYcGxg.js";import"./UnknownTimeZone-C--TOcPG-DKb3aA_p.js";import"./number-eRKYXfX9-DHWMkafT.js";import"./shared-D1w-26bA-Cpq72sLR.js";import"./Field-C6hA1tZj-7h8v-exC.js";import"./fieldType-CD2CL2hr-B0GoEBDi.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./Query-BrwMGK8U-CyKS3Qe-.js";import"./TimeExtent-Cn0Jofqr-1iB3KTqK.js";import"./workers-PiCjreoO-DJYvxXtl.js";async function re(r,n,t){if(!we?.findCredential(r.restUrl))return null;if(r.loadStatus==="loaded"&&n===""&&r.user?.sourceJSON&&t===!1)return r.user.sourceJSON;const o={responseType:"json",query:{f:"json"}};if(t&&(o.query.returnUserLicenseTypeExtensions=!0),n===""){const e=await _(r.restUrl+"/community/self",o);if(e.data){const a=e.data;if(a?.username)return a}return null}const c=await _(r.restUrl+"/community/users/"+n,o);if(c.data){const e=c.data;return e.error?null:e}return null}function F(r,n,t){if(m(r,2,2,n,t),!(r[0]instanceof d&&r[1]instanceof d)&&!(r[0]instanceof d&&r[1]===null)&&!(r[1]instanceof d&&r[0]===null)&&(r[0]!==null||r[1]!==null))throw new s(n,l.InvalidParameter,t)}async function se(r,n){if(r.type!=="polygon"&&r.type!=="polyline"&&r.type!=="extent")return 0;let t=1;(r.spatialReference.vcsWkid||r.spatialReference.latestVcsWkid)&&(t=fe(r.spatialReference)/me(r.spatialReference));let o=0;if(r.type==="polyline")for(const e of r.paths)for(let a=1;a<e.length;a++)o+=T(e[a],e[a-1],t);else if(r.type==="polygon")for(const e of r.rings){for(let a=1;a<e.length;a++)o+=T(e[a],e[a-1],t);(e[0][0]!==e[e.length-1][0]||e[0][1]!==e[e.length-1][1]||e[0][2]!==void 0&&e[0][2]!==e[e.length-1][2])&&(o+=T(e[0],e[e.length-1],t))}else r.type==="extent"&&(o+=2*T([r.xmin,r.ymin,0],[r.xmax,r.ymin,0],t),o+=2*T([r.xmin,r.ymin,0],[r.xmin,r.ymax,0],t),o*=2,o+=4*Math.abs(w(r.zmax,0)*t-w(r.zmin,0)*t));const c=new A({hasZ:!1,hasM:!1,spatialReference:r.spatialReference,paths:[[[0,0],[0,o]]]});return Z(c,n)}function sn(r){r.mode==="async"&&(r.functions.disjoint=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]===null||e[1]===null||he(e[0],e[1])))},r.functions.intersects=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]!==null&&e[1]!==null&&pe(e[0],e[1])))},r.functions.touches=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]!==null&&e[1]!==null&&ye(e[0],e[1])))},r.functions.crosses=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]!==null&&e[1]!==null&&ve(e[0],e[1])))},r.functions.within=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]!==null&&e[1]!==null&&ge(e[0],e[1])))},r.functions.contains=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]!==null&&e[1]!==null&&Pe(e[0],e[1])))},r.functions.overlaps=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]!==null&&e[1]!==null&&Ie(e[0],e[1])))},r.functions.equals=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(m(e,2,2,n,t),e[0]===e[1]||(e[0]instanceof d&&e[1]instanceof d?Ae(e[0],e[1]):(V(e[0])&&V(e[1])||!!(G(e[0])&&G(e[1])||W(e[0])&&W(e[1])))&&e[0].equals(e[1]))))},r.functions.relate=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,3,3,n,t),e[0]instanceof d&&e[1]instanceof d)return Fe(e[0],e[1],z(e[2]));if(e[0]instanceof d&&e[1]===null||e[1]instanceof d&&e[0]===null||e[0]===null&&e[1]===null)return!1;throw new s(n,l.InvalidParameter,t)})},r.functions.intersection=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]===null||e[1]===null?null:Re(e[0],e[1])))},r.functions.union=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{const a=[];if((e=f(e)).length===0)throw new s(n,l.WrongNumberOfParameters,t);if(e.length===1)if(g(e[0])){const i=f(e[0]);for(let u=0;u<i.length;u++)if(i[u]!==null){if(!(i[u]instanceof d))throw new s(n,l.InvalidParameter,t);a.push(i[u])}}else{if(!P(e[0])){if(e[0]instanceof d)return C(I(e[0]),n.spatialReference);if(e[0]===null)return null;throw new s(n,l.InvalidParameter,t)}{const i=f(e[0].toArray());for(let u=0;u<i.length;u++)if(i[u]!==null){if(!(i[u]instanceof d))throw new s(n,l.InvalidParameter,t);a.push(i[u])}}}else for(let i=0;i<e.length;i++)if(e[i]!==null){if(!(e[i]instanceof d))throw new s(n,l.InvalidParameter,t);a.push(e[i])}return a.length===0?null:Ne(a)})},r.functions.difference=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]===null?null:e[1]===null?I(e[0]):be(e[0],e[1])))},r.functions.symmetricdifference=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>(F(e=f(e),n,t),e[0]===null&&e[1]===null?null:e[0]===null?I(e[1]):e[1]===null?I(e[0]):Se(e[0],e[1])))},r.functions.clip=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,2,n,t),!(e[1]instanceof L)&&e[1]!==null)throw new s(n,l.InvalidParameter,t);if(e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return e[1]===null?null:Oe(e[0],e[1])})},r.functions.cut=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,2,n,t),!(e[1]instanceof A)&&e[1]!==null)throw new s(n,l.InvalidParameter,t);if(e[0]===null)return[];if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return e[1]===null?[I(e[0])]:xe(e[0],e[1])})},r.functions.area=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{if(m(e,1,2,n,t),(e=f(e))[0]===null)return 0;if(J(e[0])){const a=await e[0].sumArea(j(w(e[1],-1)),!1,n.abortSignal);if(n.abortSignal.aborted)throw new s(n,l.Cancelled,t);return a}if(g(e[0])||P(e[0])){const a=Y(e[0],n.spatialReference);return a===null?0:Q(a,j(w(e[1],-1)))}if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return Q(e[0],j(w(e[1],-1)))})},r.functions.areageodetic=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{if(m(e,1,2,n,t),(e=f(e))[0]===null)return 0;if(J(e[0])){const a=await e[0].sumArea(j(w(e[1],-1)),!0,n.abortSignal);if(n.abortSignal.aborted)throw new s(n,l.Cancelled,t);return a}if(g(e[0])||P(e[0])){const a=Y(e[0],n.spatialReference);return a===null?0:$(a,j(w(e[1],-1)))}if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return $(e[0],j(w(e[1],-1)))})},r.functions.length=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{if(m(e,1,2,n,t),(e=f(e))[0]===null)return 0;if(J(e[0])){const a=await e[0].sumLength(p(w(e[1],-1)),!1,n.abortSignal);if(n.abortSignal.aborted)throw new s(n,l.Cancelled,t);return a}if(g(e[0])||P(e[0])){const a=D(e[0],n.spatialReference);return a===null?0:Z(a,p(w(e[1],-1)))}if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return Z(e[0],p(w(e[1],-1)))})},r.functions.length3d=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(m(e,1,2,n,t),(e=f(e))[0]===null)return 0;if(g(e[0])||P(e[0])){const a=D(e[0],n.spatialReference);return a===null?0:a.hasZ===!0?se(a,p(w(e[1],-1))):Z(a,p(w(e[1],-1)))}if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return e[0].hasZ===!0?se(e[0],p(w(e[1],-1))):Z(e[0],p(w(e[1],-1)))})},r.functions.lengthgeodetic=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{if(m(e,1,2,n,t),(e=f(e))[0]===null)return 0;if(J(e[0])){const a=await e[0].sumLength(p(w(e[1],-1)),!0,n.abortSignal);if(n.abortSignal.aborted)throw new s(n,l.Cancelled,t);return a}if(g(e[0])||P(e[0])){const a=D(e[0],n.spatialReference);return a===null?0:U(a,p(w(e[1],-1)))}if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return U(e[0],p(w(e[1],-1)))})},r.functions.distance=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{e=f(e),m(e,2,3,n,t);let a=e[0];(g(e[0])||P(e[0]))&&(a=M(e[0],n.spatialReference));let i=e[1];if((g(e[1])||P(e[1]))&&(i=M(e[1],n.spatialReference)),!(a instanceof d))throw new s(n,l.InvalidParameter,t);if(!(i instanceof d))throw new s(n,l.InvalidParameter,t);return De(a,i,p(w(e[2],-1)))})},r.functions.distancegeodetic=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{e=f(e),m(e,2,3,n,t);const a=e[0],i=e[1];if(!(a instanceof O))throw new s(n,l.InvalidParameter,t);if(!(i instanceof O))throw new s(n,l.InvalidParameter,t);const u=new A({paths:[],spatialReference:a.spatialReference});return u.addPath([a,i]),U(u,p(w(e[2],-1)))})},r.functions.densify=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,3,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);const a=R(e[1]);if(isNaN(a))throw new s(n,l.InvalidParameter,t);if(a<=0)throw new s(n,l.InvalidParameter,t);return e[0]instanceof x||e[0]instanceof A?ee(e[0],a,p(w(e[2],-1))):e[0]instanceof L?ee(x.fromExtent(e[0]),a,p(w(e[2],-1))):e[0]})},r.functions.densifygeodetic=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,3,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);const a=R(e[1]);if(isNaN(a))throw new s(n,l.InvalidParameter,t);if(a<=0)throw new s(n,l.InvalidParameter,t);return e[0]instanceof x||e[0]instanceof A?ne(e[0],a,p(w(e[2],-1))):e[0]instanceof L?ne(x.fromExtent(e[0]),a,p(w(e[2],-1))):e[0]})},r.functions.generalize=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,4,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);const a=R(e[1]);if(isNaN(a))throw new s(n,l.InvalidParameter,t);return je(e[0],a,de(w(e[2],!0)),p(w(e[3],-1)))})},r.functions.buffer=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,3,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);const a=R(e[1]);if(isNaN(a))throw new s(n,l.InvalidParameter,t);return a===0?I(e[0]):Le(e[0],a,p(w(e[2],-1)))})},r.functions.buffergeodetic=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,3,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);const a=R(e[1]);if(isNaN(a))throw new s(n,l.InvalidParameter,t);return a===0?I(e[0]):Te(e[0],a,p(w(e[2],-1)))})},r.functions.offset=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,6,n,t),e[0]===null)return null;if(!(e[0]instanceof x||e[0]instanceof A))throw new s(n,l.InvalidParameter,t);const a=R(e[1]);if(isNaN(a))throw new s(n,l.InvalidParameter,t);const i=R(w(e[4],10));if(isNaN(i))throw new s(n,l.InvalidParameter,t);const u=R(w(e[5],0));if(isNaN(u))throw new s(n,l.InvalidParameter,t);return Ce(e[0],a,p(w(e[2],-1)),z(w(e[3],"round")).toLowerCase(),i,u)})},r.functions.rotate=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,3,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);const a=e[0]instanceof L?x.fromExtent(e[0]):e[0],i=R(e[1]);if(isNaN(i))throw new s(n,l.InvalidParameter,t);const u=w(e[2],null);if(u===null)return te(a,i);if(u instanceof O)return te(a,i,u);throw new s(n,l.InvalidParameter,t)})},r.functions.centroid=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,1,1,n,t),e[0]===null)return null;let a=e[0];if((g(e[0])||P(e[0]))&&(a=M(e[0],n.spatialReference)),a===null)return null;if(!(a instanceof d))throw new s(n,l.InvalidParameter,t);return a instanceof O?C(I(a),n.spatialReference):a instanceof x?a.centroid:a instanceof A?le(a):a instanceof H?ie(a):a instanceof L?a.center:null})},r.functions.measuretocoordinate=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,2,n,t),e[0]===null)return null;let a=e[0];if((g(e[0])||P(e[0]))&&(a=D(e[0],n.spatialReference)),a===null)return null;if(!(a instanceof d))throw new s(n,l.InvalidParameter,t);if(!(a instanceof A))throw new s(n,l.InvalidParameter,t);if(q(e[1]===!1))throw new s(n,l.InvalidParameter,t);const i=oe(a,e[1]);return i?b.convertObjectToArcadeDictionary(i,S(n),!1,!0):null})},r.functions.pointtocoordinate=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,2,n,t),e[0]===null)return null;let a=e[0];if((g(e[0])||P(e[0]))&&(a=D(e[0],n.spatialReference)),a===null)return null;if(!(a instanceof d))throw new s(n,l.InvalidParameter,t);if(!(a instanceof A))throw new s(n,l.InvalidParameter,t);const i=e[1];if(i===null)return null;if(!(i instanceof O))throw new s(n,l.InvalidParameter,t);if(q(e[1]===!1))throw new s(n,l.InvalidParameter,t);const u=ce(a,i);return u?b.convertObjectToArcadeDictionary(u,S(n),!1,!0):null})},r.functions.distancetocoordinate=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,2,2,n,t),e[0]===null)return null;let a=e[0];if((g(e[0])||P(e[0]))&&(a=D(e[0],n.spatialReference)),a===null)return null;if(!(a instanceof d))throw new s(n,l.InvalidParameter,t);if(!(a instanceof A))throw new s(n,l.InvalidParameter,t);if(q(e[1]===!1))throw new s(n,l.InvalidParameter,t);const i=ue(a,e[1]);return i?b.convertObjectToArcadeDictionary(i,S(n),!1,!0):null})},r.functions.multiparttosinglepart=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{if(e=f(e),m(e,1,1,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);if(e[0]instanceof O)return[C(I(e[0]),n.spatialReference)];if(e[0]instanceof L)return[C(I(e[0]),n.spatialReference)];const a=await ae(e[0]);if(a instanceof x){const i=[],u=[];for(let h=0;h<a.rings.length;h++)if(a.isClockwise(a.rings[h])){const y=K({rings:[a.rings[h]],hasZ:a.hasZ===!0,hasM:a.hasM===!0,spatialReference:a.spatialReference.toJSON()});i.push(y)}else u.push({ring:a.rings[h],pt:a.getPoint(h,0)});for(let h=0;h<u.length;h++)for(let y=0;y<i.length;y++)if(i[y].contains(u[h].pt)){i[y].addRing(u[h].ring);break}return i}if(a instanceof A){const i=[];for(let u=0;u<a.paths.length;u++){const h=K({paths:[a.paths[u]],hasZ:a.hasZ===!0,hasM:a.hasM===!0,spatialReference:a.spatialReference.toJSON()});i.push(h)}return i}if(e[0]instanceof H){const i=[],u=C(I(e[0]),n.spatialReference);for(let h=0;h<u.points.length;h++)i.push(u.getPoint(h));return i}return null})},r.functions.issimple=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,1,1,n,t),e[0]===null)return!0;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return Je(e[0])})},r.functions.simplify=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,1,1,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return ae(e[0])})},r.functions.convexhull=function(n,t){return r.standardFunctionAsync(n,t,(o,c,e)=>{if(e=f(e),m(e,1,1,n,t),e[0]===null)return null;if(!(e[0]instanceof d))throw new s(n,l.InvalidParameter,t);return Ze(e[0])})},r.functions.getuser=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{m(e,0,2,n,t);let a=w(e[1],""),i=a===!0;if(a=a===!0||a===!1?"":z(a),e.length===0||e[0]instanceof E){let h;h=n.services?.portal?n.services.portal:X.getDefault(),e.length>0&&(h=B(e[0],h));const y=await re(h,a,i);if(y){const N=JSON.parse(JSON.stringify(y));for(const v of["lastLogin","created","modified"])N[v]!==void 0&&N[v]!==null&&(N[v]=new Date(N[v]));return b.convertObjectToArcadeDictionary(N,S(n))}return null}let u=null;if(J(e[0])&&(u=e[0]),u){if(i=!1,a)return null;await u.load();const h=await u.getOwningSystemUrl();if(!h){if(!a){const v=await u.getIdentityUser();return v?b.convertObjectToArcadeDictionary({username:v},S(n)):null}return null}let y;y=n.services?.portal?n.services.portal:X.getDefault(),y=B(new E(h),y);const N=await re(y,a,i);if(N){const v=JSON.parse(JSON.stringify(N));for(const k of["lastLogin","created","modified"])v[k]!==void 0&&v[k]!==null&&(v[k]=new Date(v[k]));return b.convertObjectToArcadeDictionary(v,S(n))}return null}throw new s(n,l.InvalidParameter,t)})},r.functions.nearestcoordinate=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{if(e=f(e),m(e,2,2,n,t),!(e[0]instanceof d||e[0]===null))throw new s(n,l.InvalidParameter,t);if(!(e[1]instanceof O||e[1]===null))throw new s(n,l.InvalidParameter,t);if(e[0]===null||e[1]===null)return null;const a=await ke(e[0],e[1]);return a===null?null:b.convertObjectToArcadeDictionary({coordinate:a.coordinate,distance:a.distance,sideOfLine:a.distance===0?"straddle":a.isRightSide?"right":"left"},S(n),!1,!0)})},r.functions.nearestvertex=function(n,t){return r.standardFunctionAsync(n,t,async(o,c,e)=>{if(e=f(e),m(e,2,2,n,t),!(e[0]instanceof d||e[0]===null))throw new s(n,l.InvalidParameter,t);if(!(e[1]instanceof O||e[1]===null))throw new s(n,l.InvalidParameter,t);if(e[0]===null||e[1]===null)return null;const a=await ze(e[0],e[1]);return a===null?null:b.convertObjectToArcadeDictionary({coordinate:a.coordinate,distance:a.distance,sideOfLine:a.distance===0?"straddle":a.isRightSide?"right":"left"},S(n),!1,!0)})})}export{sn as registerFunctions};
