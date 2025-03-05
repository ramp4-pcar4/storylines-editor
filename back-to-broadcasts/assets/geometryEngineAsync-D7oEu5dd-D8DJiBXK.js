import{w as l,g as w}from"./main-Cs_aiUdl.js";import{q as h}from"./workers-PiCjreoO-CplQWBwY.js";function a(e){return Array.isArray(e)?e[0]?.spatialReference:e?.spatialReference}function p(e){return e&&(Array.isArray(e)?e.map(p):e.toJSON?e.toJSON():e)}function c(e){return Array.isArray(e)?e.map(t=>w(t)):w(e)}function S(e,t){let n;return Array.isArray(e)?n=e:(n=[],n.push(e),t!=null&&n.push(t)),n}let f;async function d(){return f||(f=h("geometryEngineWorker",{strategy:"distributed"})),f}async function r(e,t){return(await d()).invoke("executeGEOperation",{operation:e,parameters:p(t)})}async function m(e,t){const n=await d();return Promise.all(n.broadcast("executeGEOperation",{operation:e,parameters:p(t)}))}function A(e){return r("extendedSpatialReferenceInfo",[e])}async function O(e,t){return c(await r("clip",[a(e),e,t]))}async function D(e,t){return c(await r("cut",[a(e),e,t]))}function J(e,t){return r("contains",[a(e),e,t])}function N(e,t){return r("crosses",[a(e),e,t])}function L(e,t,n){return r("distance",[a(e),e,t,n])}function T(e,t){return r("equals",[a(e),e,t])}function V(e,t){return r("intersects",[a(e),e,t])}function v(e,t){return r("touches",[a(e),e,t])}function E(e,t){return r("within",[a(e),e,t])}function b(e,t){return r("disjoint",[a(e),e,t])}function q(e,t){return r("overlaps",[a(e),e,t])}function z(e,t,n){return r("relate",[a(e),e,t,n])}function H(e){return r("isSimple",[a(e),e])}async function I(e){return c(await r("simplify",[a(e),e]))}async function P(e,t=!1){return c(await r("convexHull",[a(e),e,t]))}async function j(e,t){return c(await r("difference",[a(e),e,t]))}async function k(e,t){return c(await r("symmetricDifference",[a(e),e,t]))}async function B(e,t){return c(await r("intersect",[a(e),e,t]))}async function C(e,t=null){const n=S(e,t);return c(await r("union",[a(n),n]))}async function G(e,t,n,i,s,u){return c(await r("offset",[a(e),e,t,n,i,s,u]))}async function W(e,t,n,i=!1){const s=[a(e),e,t,n,i];return c(await r("buffer",s))}async function F(e,t,n,i,s,u){const g=[a(e),e,t,n,i,s,u];return c(await r("geodesicBuffer",g))}async function K(e,t,n=!0){const i=await r("nearestCoordinate",[a(e),e,t,n]);return{...i,coordinate:l.fromJSON(i.coordinate)}}async function M(e,t){const n=await r("nearestVertex",[a(e),e,t]);return{...n,coordinate:l.fromJSON(n.coordinate)}}async function Q(e,t,n,i){return(await r("nearestVertices",[a(e),e,t,n,i])).map(s=>({...s,coordinate:l.fromJSON(s.coordinate)}))}function y(e){return"xmin"in e?e.center:"x"in e?e:e.extent?.center}async function U(e,t,n){if(e==null)throw new o;const i=e.spatialReference;if((n=n??y(e))==null)throw new o;const s=e.constructor.fromJSON(await r("rotate",[i,e,t,n]));return s.spatialReference=i,s}async function X(e,t){if(e==null)throw new o;const n=e.spatialReference;if((t=t??y(e))==null)throw new o;const i=e.constructor.fromJSON(await r("flipHorizontal",[n,e,t]));return i.spatialReference=n,i}async function Y(e,t){if(e==null)throw new o;const n=e.spatialReference;if((t=t??y(e))==null)throw new o;const i=e.constructor.fromJSON(await r("flipVertical",[n,e,t]));return i.spatialReference=n,i}async function Z(e,t,n,i){return c(await r("generalize",[a(e),e,t,n,i]))}async function _(e,t,n){return c(await r("densify",[a(e),e,t,n]))}async function $(e,t,n,i=0){return c(await r("geodesicDensify",[a(e),e,t,n,i]))}function ee(e,t){return r("planarArea",[a(e),e,t])}function te(e,t){return r("planarLength",[a(e),e,t])}function ne(e,t,n){return r("geodesicArea",[a(e),e,t,n])}function re(e,t,n){return r("geodesicLength",[a(e),e,t,n])}async function ae(e,t){return c(await r("intersectLinesToPoints",[a(e),e,t]))}async function ie(e,t){await m("changeDefaultSpatialReferenceTolerance",[e,t])}async function ce(e){await m("clearDefaultSpatialReferenceTolerance",[e])}class o extends Error{constructor(){super("Illegal Argument Exception")}}export{W as buffer,ie as changeDefaultSpatialReferenceTolerance,ce as clearDefaultSpatialReferenceTolerance,O as clip,J as contains,P as convexHull,N as crosses,D as cut,_ as densify,j as difference,b as disjoint,L as distance,T as equals,A as extendedSpatialReferenceInfo,X as flipHorizontal,Y as flipVertical,Z as generalize,ne as geodesicArea,F as geodesicBuffer,$ as geodesicDensify,re as geodesicLength,B as intersect,ae as intersectLinesToPoints,V as intersects,H as isSimple,K as nearestCoordinate,M as nearestVertex,Q as nearestVertices,G as offset,q as overlaps,ee as planarArea,te as planarLength,z as relate,U as rotate,I as simplify,k as symmetricDifference,v as touches,C as union,E as within};
