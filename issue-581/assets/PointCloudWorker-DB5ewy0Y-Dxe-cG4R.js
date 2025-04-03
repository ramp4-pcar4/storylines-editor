import{hY as F,aq as C,J as I}from"./main-DpxXUdv2.js";import{v as x}from"./quat-BODLR7mS-D4NhAIuB.js";import{e as O}from"./quatf64-C16JxGFv-BKWK1F8U.js";import{w as k}from"./vec32-D9GsKZ1t-CeQ3Vrgu.js";import{u as A,o as w}from"./vec3f32-BS0cezmI-B_madU1n.js";import{n as R}from"./projectBuffer-CvCBvJ6W-5Rq78G6B.js";import{G as U,U as J,F as B}from"./PointCloudUniqueValueRenderer-C-5hwEaR-DoRY7-Pu.js";import{$ as N,F as V,Y as q,G as T}from"./I3SBinaryReader-DEbI3cKZ-vh2jwOsM.js";import{i as Y}from"./orientedBoundingBox-oHezdpWm-8EkmtX_V.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./RendererLegendOptions-K3md58-X-QEZwM-DN.js";import"./VertexAttribute-DqD5S0a2-3q90nikV.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-CkaDZrm1.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-Dokqsgwy.js";import"./mat4-DX7gBViE-D5jiA99P.js";import"./plane-Dt8R0KeE-CfeyDlAD.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";function E(u,t,a,n){const{rendererJSON:c,isRGBRenderer:m}=u;let o=null,s=null;if(t&&m)o=t;else if(t&&c?.type==="pointCloudUniqueValueRenderer"){s=U.fromJSON(c);const r=s.colorUniqueValueInfos;o=new Uint8Array(3*n);const i=g(s.fieldTransformType);for(let e=0;e<n;e++){const l=(i?i(t[e]):t[e])+"";for(let f=0;f<r.length;f++)if(r[f].values.includes(l)){o[3*e]=r[f].color.r,o[3*e+1]=r[f].color.g,o[3*e+2]=r[f].color.b;break}}}else if(t&&c?.type==="pointCloudStretchRenderer"){s=J.fromJSON(c);const r=s.stops;o=new Uint8Array(3*n);const i=g(s.fieldTransformType);for(let e=0;e<n;e++){const l=i?i(t[e]):t[e],f=r.length-1;if(l<r[0].value)o[3*e]=r[0].color.r,o[3*e+1]=r[0].color.g,o[3*e+2]=r[0].color.b;else if(l>=r[f].value)o[3*e]=r[f].color.r,o[3*e+1]=r[f].color.g,o[3*e+2]=r[f].color.b;else for(let b=1;b<r.length;b++)if(l<r[b].value){const p=(l-r[b-1].value)/(r[b].value-r[b-1].value);o[3*e]=r[b].color.r*p+r[b-1].color.r*(1-p),o[3*e+1]=r[b].color.g*p+r[b-1].color.g*(1-p),o[3*e+2]=r[b].color.b*p+r[b-1].color.b*(1-p);break}}}else if(t&&c?.type==="pointCloudClassBreaksRenderer"){s=B.fromJSON(c);const r=s.colorClassBreakInfos;o=new Uint8Array(3*n);const i=g(s.fieldTransformType);for(let e=0;e<n;e++){const l=i?i(t[e]):t[e];for(let f=0;f<r.length;f++)if(l>=r[f].minValue&&l<=r[f].maxValue){o[3*e]=r[f].color.r,o[3*e+1]=r[f].color.g,o[3*e+2]=r[f].color.b;break}}}else o=new Uint8Array(3*n).fill(255);if(a&&s?.colorModulation){const r=s.colorModulation.minValue,i=s.colorModulation.maxValue,e=.3;for(let l=0;l<n;l++){const f=a[l],b=f>=i?1:f<=r?e:e+(1-e)*(f-r)/(i-r);o[3*l]=b*o[3*l],o[3*l+1]=b*o[3*l+1],o[3*l+2]=b*o[3*l+2]}}return o}function G(u,t){if(u.encoding==null||u.encoding===""){const a=N(t,u);if(a.vertexAttributes.position==null)return;const n=V(t,a.vertexAttributes.position),c=a.header.fields,m=[c.offsetX,c.offsetY,c.offsetZ],o=[c.scaleX,c.scaleY,c.scaleZ],s=n.length/3,r=new Float64Array(3*s);for(let i=0;i<s;i++)r[3*i]=n[3*i]*o[0]+m[0],r[3*i+1]=n[3*i+1]*o[1]+m[1],r[3*i+2]=n[3*i+2]*o[2]+m[2];return r}if(u.encoding==="lepcc-xyz")return q(t).result}function h(u,t,a){return u?.attributeInfo.useElevation?t?$(t,a):null:u?.attributeInfo.storageInfo?T(u.attributeInfo.storageInfo,u.buffer,a):null}function $(u,t){const a=new Float64Array(t);for(let n=0;n<t;n++)a[n]=u[3*n+2];return a}function j(u,t,a,n,c){const m=u.length/3;let o=0;for(let s=0;s<m;s++){let r=!0;for(let i=0;i<n.length&&r;i++){const{filterJSON:e}=n[i],l=c[i].values[s];switch(e.type){case"pointCloudValueFilter":{const f=e.mode==="exclude";e.values.includes(l)===f&&(r=!1);break}case"pointCloudBitfieldFilter":{const f=M(e.requiredSetBits),b=M(e.requiredClearBits);((l&f)!==f||l&b)&&(r=!1);break}case"pointCloudReturnFilter":{const f=15&l,b=l>>>4&15,p=b>1,S=f===1,y=f===b;let v=!1;for(const d of e.includedReturns)if(d==="last"&&y||d==="firstOfMany"&&S&&p||d==="lastOfMany"&&y&&p||d==="single"&&!p){v=!0;break}v||(r=!1);break}}}r&&(a[o]=s,u[3*o]=u[3*s],u[3*o+1]=u[3*s+1],u[3*o+2]=u[3*s+2],t[3*o]=t[3*s],t[3*o+1]=t[3*s+1],t[3*o+2]=t[3*s+2],o++)}return o}function g(u){switch(u){default:case null:case"none":return t=>t;case"low-four-bit":return t=>15&t;case"high-four-bit":return t=>(240&t)>>4;case"absolute-value":return t=>Math.abs(t);case"modulo-ten":return t=>t%10}}function M(u){let t=0;for(const a of u||[])t|=1<<a;return t}class z{transform(t){const a=this._transform(t),n=[a.points.buffer,a.rgb.buffer];a.pointIdFilterMap!=null&&n.push(a.pointIdFilterMap.buffer);for(const c of a.attributes)"buffer"in c.values&&F(c.values.buffer)&&c.values.buffer!==a.rgb.buffer&&n.push(c.values.buffer);return Promise.resolve({result:a,transferList:n})}_transform(t){const a=G(t.schema,t.geometryBuffer);let n=a.length/3,c=null;const m=new Array,o=h(t.primaryAttributeData,a,n);t.primaryAttributeData!=null&&o&&m.push({attributeInfo:t.primaryAttributeData.attributeInfo,values:o});const s=h(t.modulationAttributeData,a,n);t.modulationAttributeData!=null&&s&&m.push({attributeInfo:t.modulationAttributeData.attributeInfo,values:s});let r=E(t.rendererInfo,o,s,n);if(t.filterInfo&&t.filterInfo.length>0&&t.filterAttributesData!=null){const e=t.filterAttributesData.filter(C).map(l=>{const f=h(l,a,n),b={attributeInfo:l.attributeInfo,values:f};return m.push(b),b});c=new Uint32Array(n),n=j(a,r,c,t.filterInfo,e)}for(const e of t.userAttributesData){const l=h(e,a,n);m.push({attributeInfo:e.attributeInfo,values:l})}3*n<r.length&&(r=new Uint8Array(r.buffer.slice(0,3*n))),Z(a,n,t.elevationOffset);const i=X(a,n,Y.fromData(t.obbData),I.fromJSON(t.inSR),I.fromJSON(t.outSR));return{obbData:t.obbData,points:i,rgb:r,attributes:m,pointIdFilterMap:c}}}function X(u,t,a,n,c){if(!R(u,n,0,u,c,0,t))throw new Error("Can't reproject");const m=A(a.center),o=w(),s=w(),r=A(a.halfSize);x(D,a.quaternion);const i=new Float32Array(3*t);for(let e=0;e<t;e++){let l=3*e;o[0]=u[l]-m[0],o[1]=u[l+1]-m[1],o[2]=u[l+2]-m[2],k(s,o,D),r[0]=Math.max(r[0],Math.abs(s[0])),r[1]=Math.max(r[1],Math.abs(s[1])),r[2]=Math.max(r[2],Math.abs(s[2])),i[l++]=o[0],i[l++]=o[1],i[l]=o[2]}return a.halfSize=r,i}function Z(u,t,a){if(a!==0)for(let n=0;n<t;n++)u[3*n+2]+=a}const D=O();function ht(){return new z}export{ht as default};
