import{o as G,f as P,an as j,ar as C,hf as R,hZ as L,B as U}from"./main-Csa2lEpO.js";import{U as z,P as k}from"./mat3-CC4Foazl-BWjyqE2v.js";import{n as S}from"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import{e as D}from"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import{G as V,m as q,z as N,V as K}from"./Mesh-DLzjDUIO-Bi39gUcz.js";import{o as Q}from"./MeshVertexAttributes-CbNpPur2-DNoN6t3k.js";import{x as $}from"./meshVertexSpaceUtils-B4l_Zo0M-6hT2fNDE.js";import{X as F,L as I,C as X,g as A,l as O,M as Z,m as H,p as J}from"./BufferView-PQoE3GL7-CZfFW9R2.js";import{q as W,v as Y,R as tt,x as E}from"./vec3-BazNroeq-D03FvP-4.js";import{T as et,k as rt,A as M}from"./vec4-DWDdg1fj-BBZZI5gl.js";import{c as ot}from"./types-ChhhI6OU-Cxh6dPlX.js";import{loadGLTF as nt}from"./loader-CkLCe-E_-BIr3T1il.js";import{U as st,E as it,h as at,g as b,m as lt,_ as ut,b as ct,B as ft,k as mt}from"./DefaultMaterial_COLOR_GAMMA-D0o2czi9--GZ3FaWz.js";import{b as pt}from"./vertexSpaceConversion-CiKaVq_u-OgjFNhuy.js";import{f as dt}from"./resourceUtils-Ds65naCv-C-9EBTRe.js";import{G as v}from"./enums-DBi1-Mm2-CUS1pvQe.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./MeshTransform-C--IG09w-DjccavHJ.js";import"./mat4-DX7gBViE-CteUXYnx.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./quat-BODLR7mS-BzM8yv-h.js";import"./quatf64-C16JxGFv-BKWK1F8U.js";import"./vec32-D9GsKZ1t-BXJ_wiZi.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./imageUtils-BA2D6Uf1-LxkYh3Ji.js";import"./MeshLocalVertexSpace-BqgocsoS-D9zYxpVC.js";import"./earcut-XDcq3zAf-BcwyrT7l.js";import"./Indices-DEr2HrWx-Vm3muerx.js";import"./plane-Dt8R0KeE-Dpcoe1CN.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./deduplicate-D2d-E5Pw-Bj42_vWW.js";import"./projectPointToVector-B2UUY9SE-BdTgJvke.js";import"./projection-BA9M1R7d-DQqPDCuS.js";import"./projectBuffer-CvCBvJ6W-CHC2yAAi.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-BdlDl26Y.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-CyG4ctj6.js";import"./External-D_wl4XAw-DQpJHjAw.js";import"./infoFor3D-DIuYZyyK-BtH19JJ7.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Version-CoKzbupV-BH6-tMzC.js";import"./basicInterfaces-Dsf65ICa-DkQ9Rsnx.js";function xt(t,e,r){const l=t.typedBuffer,n=t.typedBufferStride,i=e.typedBuffer,c=e.typedBufferStride,a=r?r.count:e.count;let s=(r?.dstIndex??0)*n,m=(r?.srcIndex??0)*c;for(let u=0;u<a;++u){for(let o=0;o<9;++o)l[s+o]=i[m+o];s+=n,m+=c}}Object.freeze(Object.defineProperty({__proto__:null,copy:xt},Symbol.toStringTag,{value:"Module"}));function gt(t,e,r){const l=t.typedBuffer,n=t.typedBufferStride,i=e.typedBuffer,c=e.typedBufferStride,a=r?r.count:e.count;let s=(r?.dstIndex??0)*n,m=(r?.srcIndex??0)*c;for(let u=0;u<a;++u){for(let o=0;o<16;++o)l[s+o]=i[m+o];s+=n,m+=c}}Object.freeze(Object.defineProperty({__proto__:null,copy:gt},Symbol.toStringTag,{value:"Module"}));function y(t,e){return new t(new ArrayBuffer(e*t.ElementCount*ot(t.ElementType)))}async function xe(t,e,r){const l=new st(yt(r)),n=(await nt(l,e,r,!0)).model,i=n.lods.shift(),c=new Map,a=new Map;n.textures.forEach((g,h)=>c.set(h,bt(g))),n.materials.forEach((g,h)=>a.set(h,vt(g,c)));const s=ht(i);for(const g of s.parts)wt(s,g,a);const{position:m,normal:u,tangent:o,color:f,texCoord0:p}=s.vertexAttributes,d=$(t,r),w=t.spatialReference.isGeographic?$(t):d,B=pt({vertexAttributes:{position:m.typedBuffer,normal:u?.typedBuffer,tangent:o?.typedBuffer},vertexSpace:w,spatialReference:t.spatialReference},d,{allowBufferReuse:!0,sourceUnit:r?.unitConversionDisabled?void 0:"meters"});if(!B)throw new G("load-gltf-mesh:vertex-space-projection",`Failed to load mesh from glTF because we could not convert the vertex space from ${w.type} to ${d.type}`);return{transform:null,vertexSpace:d,components:s.components,spatialReference:t.spatialReference,vertexAttributes:new Q({...B,color:f?.typedBuffer,uv:p?.typedBuffer})}}function yt(t){const e=t?.resolveFile;return e?{busy:!1,request:async(r,l,n)=>{const i=e?.(r)??r;return(await P(i,{responseType:l==="image"?"image":l==="binary"||l==="image+type"?"array-buffer":"json",signal:n?.signal,timeout:0})).data}}:null}function T(t,e){if(t==null)return"-";const r=t.typedBuffer;return`${j(e,r.buffer,()=>e.size)}/${r.byteOffset}/${r.byteLength}`}function Tt(t){return t!=null?t.toString():"-"}function ht(t){let e=0;const r={color:!1,tangent:!1,normal:!1,texCoord0:!1},l=new Map,n=new Map,i=[];for(const c of t.parts){const{attributes:{position:a,normal:s,color:m,tangent:u,texCoord0:o}}=c,f=`
      ${T(a,l)}/
      ${T(s,l)}/
      ${T(m,l)}/
      ${T(u,l)}/
      ${T(o,l)}/
      ${Tt(c.transform)}
    `;let p=!1;const d=j(n,f,()=>(p=!0,{start:e,length:a.count}));p&&(e+=a.count),s&&(r.normal=!0),m&&(r.color=!0),u&&(r.tangent=!0),o&&(r.texCoord0=!0),i.push({gltf:c,writeVertices:p,region:d})}return{vertexAttributes:{position:y(H,e),normal:r.normal?y(O,e):null,tangent:r.tangent?y(F,e):null,color:r.color?y(I,e):null,texCoord0:r.texCoord0?y(J,e):null},parts:i,components:[]}}function bt(t){return new V({data:(dt(t.data),t.data),wrap:Rt(t.parameters.wrap)})}function vt(t,e){const r=new C(St(t.color,t.opacity)),l=t.emissiveFactor?new C($t(t.emissiveFactor)):null,n=i=>i?new K({scale:i.scale?[i.scale[0],i.scale[1]]:[1,1],rotation:U(i.rotation??0),offset:i.offset?[i.offset[0],i.offset[1]]:[0,0]}):null;return new q({color:r,colorTexture:e.get(t.textureColor),normalTexture:e.get(t.textureNormal),emissiveColor:l,emissiveTexture:e.get(t.textureEmissive),occlusionTexture:e.get(t.textureOcclusion),alphaMode:Ct(t.alphaMode),alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,metallic:t.metallicFactor,roughness:t.roughnessFactor,metallicRoughnessTexture:e.get(t.textureMetallicRoughness),colorTextureTransform:n(t.colorTextureTransform),normalTextureTransform:n(t.normalTextureTransform),occlusionTextureTransform:n(t.occlusionTextureTransform),emissiveTextureTransform:n(t.emissiveTextureTransform),metallicRoughnessTextureTransform:n(t.metallicRoughnessTextureTransform)})}function wt(t,e,r){e.writeVertices&&Bt(t,e);const{indices:l,attributes:n,primitiveType:i,material:c}=e.gltf;let a=it(l||n.position.count,i);const s=e.region.start;if(s){const m=new Uint32Array(a);for(let u=0;u<a.length;u++)m[u]+=s;a=m}t.components.push(new N({name:e.gltf.name,faces:a,material:r.get(c),shading:n.normal?"source":"flat",trustSourceNormals:!0}))}function Bt(t,e){const{position:r,normal:l,tangent:n,color:i,texCoord0:c}=t.vertexAttributes,a=e.region.start,{attributes:s,transform:m}=e.gltf,u=s.position.count;if(W(r.slice(a,u),s.position,m),s.normal!=null&&l!=null){const o=z(S(),m),f=l.slice(a,u);Y(f,s.normal,o),R(o)&&tt(f,f)}else l!=null&&at(l,0,0,1,{dstIndex:a,count:u});if(s.tangent!=null&&n!=null){const o=k(S(),m),f=n.slice(a,u);et(f,s.tangent,o),R(o)&&rt(f,f)}else n!=null&&b(n,0,0,1,1,{dstIndex:a,count:u});if(s.texCoord0!=null&&c!=null?lt(c.slice(a,u),s.texCoord0):c!=null&&ut(c,0,0,{dstIndex:a,count:u}),s.color!=null&&i!=null){const o=s.color,f=i.slice(a,u);if(o.elementCount===4)o instanceof F?M(f,o,255):o instanceof I?ct(f,o):o instanceof X&&M(f,o,1/256);else{b(f,255,255,255,255);const p=A.fromTypedArray(f.typedBuffer,f.typedBufferStride);o instanceof O?E(p,o,255):o instanceof A?ft(p,o):o instanceof Z&&E(p,o,1/256)}}else i!=null&&b(i.slice(a,u),255,255,255,255)}function Ct(t){switch(t){case"OPAQUE":return"opaque";case"MASK":return"mask";case"BLEND":return"blend"}}function Rt(t){return{horizontal:_(t.s),vertical:_(t.t)}}function _(t){switch(t){case v.CLAMP_TO_EDGE:return"clamp";case v.MIRRORED_REPEAT:return"mirror";case v.REPEAT:return"repeat"}}function x(t){return t**(1/mt)*255}function St(t,e){return D(x(t[0]),x(t[1]),x(t[2]),e)}function $t(t){return L(x(t[0]),x(t[1]),x(t[2]))}export{xe as loadGLTFMesh};
