import{aO as p,J as l}from"./main-BnX5fuW-.js";import{G as n}from"./geometryEngineBase-DueYg7ux-CCeespPx.js";import{hydratedAdapter as r}from"./hydrated-CplJC1Fs-DbFjClGE.js";import"./_commonjsHelpers-BITg13Vk-KnjfkSck.js";function i(e){const t=Array.isArray(e)?e[0].spatialReference:e.spatialReference;return t?p(l,t):l.WGS84}function w(e){return n.extendedSpatialReferenceInfo(e)}function R(e,t){return n.clip(r,i(e),e,t)}function x(e,t){return n.cut(r,i(e),e,t)}function S(e,t){return n.contains(r,i(e),e,t)}function y(e,t){return n.crosses(r,i(e),e,t)}function A(e,t,a){return n.distance(r,i(e),e,t,a)}function D(e,t){return n.equals(r,i(e),e,t)}function L(e,t){return n.intersects(r,i(e),e,t)}function T(e,t){return n.touches(r,i(e),e,t)}function V(e,t){return n.within(r,i(e),e,t)}function O(e,t){return n.disjoint(r,i(e),e,t)}function v(e,t){return n.overlaps(r,i(e),e,t)}function z(e,t,a){return n.relate(r,i(e),e,t,a)}function H(e){return n.isSimple(r,i(e),e)}function J(e){return n.simplify(r,i(e),e)}function C(e,t=!1){return n.convexHull(r,i(e),e,t)}function I(e,t){return n.difference(r,i(e),e,t)}function N(e,t){return n.symmetricDifference(r,i(e),e,t)}function b(e,t){return n.intersect(r,i(e),e,t)}function j(e,t=null){return n.union(r,i(e),e,t)}function q(e,t,a,s,c,u){return n.offset(r,i(e),e,t,a,s,c,u)}function B(e,t,a,s=!1){return n.buffer(r,i(e),e,t,a,s)}function E(e,t,a,s,c,u){return n.geodesicBuffer(r,i(e),e,t,a,s,c,u)}function G(e,t,a=!0){return n.nearestCoordinate(r,i(e),e,t,a)}function P(e,t){return n.nearestVertex(r,i(e),e,t)}function W(e,t,a,s){return n.nearestVertices(r,i(e),e,t,a,s)}function f(e){return"xmin"in e?"center"in e?e.center:null:"x"in e?e:"extent"in e?e.extent?.center??null:null}function k(e,t,a){if(e==null)throw new o;const s=e.spatialReference;if((a=a??f(e))==null)throw new o;const c=e.constructor.fromJSON(n.rotate(e,t,a));return c.spatialReference=s,c}function F(e,t){if(e==null)throw new o;const a=e.spatialReference;if((t=t??f(e))==null)throw new o;const s=e.constructor.fromJSON(n.flipHorizontal(e,t));return s.spatialReference=a,s}function K(e,t){if(e==null)throw new o;const a=e.spatialReference;if((t=t??f(e))==null)throw new o;const s=e.constructor.fromJSON(n.flipVertical(e,t));return s.spatialReference=a,s}function M(e,t,a,s){return n.generalize(r,i(e),e,t,a,s)}function Q(e,t,a){return n.densify(r,i(e),e,t,a)}function U(e,t,a,s=0){return n.geodesicDensify(r,i(e),e,t,a,s)}function X(e,t){return n.planarArea(r,i(e),e,t)}function Y(e,t){return n.planarLength(r,i(e),e,t)}function Z(e,t,a){return n.geodesicArea(r,i(e),e,t,a)}function $(e,t,a){return n.geodesicLength(r,i(e),e,t,a)}function _(e,t){return n.intersectLinesToPoints(r,i(e),e,t)}function ee(e,t){n.changeDefaultSpatialReferenceTolerance(e,t)}function te(e){n.clearDefaultSpatialReferenceTolerance(e)}class o extends Error{constructor(){super("Illegal Argument Exception")}}export{B as buffer,ee as changeDefaultSpatialReferenceTolerance,te as clearDefaultSpatialReferenceTolerance,R as clip,S as contains,C as convexHull,y as crosses,x as cut,Q as densify,I as difference,O as disjoint,A as distance,D as equals,w as extendedSpatialReferenceInfo,F as flipHorizontal,K as flipVertical,M as generalize,Z as geodesicArea,E as geodesicBuffer,U as geodesicDensify,$ as geodesicLength,b as intersect,_ as intersectLinesToPoints,L as intersects,H as isSimple,G as nearestCoordinate,P as nearestVertex,W as nearestVertices,q as offset,v as overlaps,X as planarArea,Y as planarLength,z as relate,k as rotate,J as simplify,N as symmetricDifference,T as touches,j as union,V as within};
