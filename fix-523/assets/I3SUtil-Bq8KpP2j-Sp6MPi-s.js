import{bh as s,f as C,ia as y,ib as A}from"./main-BS_S-e9u.js";import"./mat4-DX7gBViE-Ck3AlrGI.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-C0DOCXm_.js";import"./projectBuffer-CvCBvJ6W-wIgKq9o9.js";import"./projectVectorToVector-sIYLNlex-wW9FOv7i.js";import"./sphere-BenPORjV-CnuyVZ7v.js";import"./Query-BrwMGK8U-CcoeI1sc.js";import{G as d}from"./I3SBinaryReader-DEbI3cKZ-Sv2HpwEz.js";import{e as h}from"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./floatRGBA-4pIJN00G-DIp9bqpe.js";import"./NormalAttribute.glsl-axtNsUxo-CZ6EVIhG.js";import"./interfaces-DN2-jsJC-DzMTiT5R.js";import"./BindType-9iOk18Ed-CRW1cdX4.js";import"./VertexAttribute-DqD5S0a2-3q90nikV.js";import{i as g}from"./orientedBoundingBox-oHezdpWm-Da8Ls4Ej.js";var o;(function(t){t[t.TRANSPARENT=0]="TRANSPARENT",t[t.OPAQUE=1]="OPAQUE"})(o||(o={}));var u;(function(t){t[t.Uniform=0]="Uniform",t[t.Varying=1]="Varying",t[t.COUNT=2]="COUNT"})(u||(u={}));var f,S;(function(t){t[t.Solid=0]="Solid",t[t.Sketch=1]="Sketch",t[t.Mixed=2]="Mixed",t[t.COUNT=3]="COUNT"})(f||(f={})),function(t){t[t.REGULAR=0]="REGULAR",t[t.SILHOUETTE=1]="SILHOUETTE"}(S||(S={}));function D(t){return{...P,...t,type:f.Solid}}const P={color:h(0,0,0,.2),size:1,extensionLength:0,opacity:1,objectTransparency:o.OPAQUE,hasSlicePlane:!1};o.OPAQUE,s();var m;async function K(t,a,n,p,I,N,U,R){const E=[];for(const r of a)if(r&&I.includes(r.name)){const i=`${t}/nodes/${n}/attributes/${r.key}/0`;E.push({url:i,storageInfo:r})}const c=await Promise.allSettled(E.map(r=>C(r.url,{responseType:"array-buffer",query:{...U,token:N},signal:R?.signal}).then(i=>d(r.storageInfo,i.data)))),T=[];for(const r of p){const i={};for(let e=0;e<c.length;e++){const l=c[e];if(l.status==="fulfilled"){const O=l.value;i[E[e].storageInfo.name]=L(O,r)}}T.push(i)}return T}(function(t){t[t.OUTSIDE=0]="OUTSIDE",t[t.INTERSECTS_CENTER_OUTSIDE=1]="INTERSECTS_CENTER_OUTSIDE",t[t.INTERSECTS_CENTER_INSIDE=2]="INTERSECTS_CENTER_INSIDE",t[t.INSIDE=3]="INSIDE"})(m||(m={}));const _=-32768,v=-(2**31);function L(t,a){if(!t)return null;const n=t[a];return y(t)?n===_?null:n:A(t)?n===v?null:n:n!=n?null:n}D({color:[0,0,0,0],opacity:0}),s(),s(),new g,new Array(72);export{K as _};
