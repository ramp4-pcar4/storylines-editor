import{K as f}from"./main-CJueYQxD.js";import{N as p}from"./PooledRBush-DbfAmeLn-DihsxtEI.js";import{y as u}from"./MeshLocalVertexSpace-BqgocsoS-ByerQo2s.js";import{b as l}from"./vertexSpaceConversion-CiKaVq_u-DkMBNnjq.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-CuyWPRvp.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-BvC1db7A.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-BdxJijxh.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-D_ag1CAN.js";import"./projectBuffer-CvCBvJ6W-D1GMAOjG.js";import"./projectPointToVector-B2UUY9SE-BDb8JvPk.js";import"./projection-BA9M1R7d-MtiC3YOi.js";import"./meshVertexSpaceUtils-B4l_Zo0M-VAfO0ZmC.js";import"./vec3-BazNroeq-Yylo9Rrb.js";import"./BufferView-PQoE3GL7-dwbd5UwX.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-D8BgWqDy.js";class j{async createIndex(o,r){const n=new Array;if(!o.vertexAttributes?.position)return new p;const e=d(o),s=r!=null?await r.invoke("createIndexThread",e,{transferList:n}):this.createIndexThread(e).result;return m().fromJSON(s)}createIndexThread(o){const r=m();if(!o)return{result:r.toJSON()};const n=new Float64Array(o.position);return o.components?h(r,n,o.components.map(e=>new Uint32Array(e))):x(r,n)}}function x(t,o){const r=new Array(o.length/9);let n=0;for(let e=0;e<o.length;e+=9)r[n++]=c(o,e,e+3,e+6);return t.load(r),{result:t.toJSON()}}function h(t,o,r){let n=0;for(const i of r)n+=i.length/3;const e=new Array(n);let s=0;for(const i of r)for(let a=0;a<i.length;a+=3)e[s++]=c(o,3*i[a],3*i[a+1],3*i[a+2]);return t.load(e),{result:t.toJSON()}}function d(t){const{vertexAttributes:{position:o},vertexSpace:r,spatialReference:n,transform:e}=t,s=l({vertexAttributes:{position:o},vertexSpace:r,spatialReference:n,transform:e},u.absolute,{allowBufferReuse:!0})?.position;return s?!t.components||t.components.some(i=>!i.faces)?{position:s.buffer}:{position:s.buffer,components:t.components.map(i=>i.faces)}:null}function m(){return new p(9,f("esri-csp-restrictions")?t=>t:[".minX",".minY",".maxX",".maxY"])}function c(t,o,r,n){return{minX:Math.min(t[o],t[r],t[n]),maxX:Math.max(t[o],t[r],t[n]),minY:Math.min(t[o+1],t[r+1],t[n+1]),maxY:Math.max(t[o+1],t[r+1],t[n+1]),p0:[t[o],t[o+1],t[o+2]],p1:[t[r],t[r+1],t[r+2]],p2:[t[n],t[n+1],t[n+2]]}}export{j as default};
