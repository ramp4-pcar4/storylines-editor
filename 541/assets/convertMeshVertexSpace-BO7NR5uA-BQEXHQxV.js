import{$ as m,o as s,P as p}from"./main-B-qqJ5ov.js";import{o as n}from"./MeshVertexAttributes-CbNpPur2-DjrylYx8.js";import{b as c}from"./vertexSpaceConversion-CiKaVq_u-BPCku7j-.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-wsQhA476.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-Cpv9XLxo.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-LhkrX1jW.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-Ba05TsnS.js";import"./projectBuffer-CvCBvJ6W-D4VBeyna.js";import"./projectPointToVector-B2UUY9SE-BVpcqiWy.js";import"./projection-BA9M1R7d-BrWcDNEF.js";import"./meshVertexSpaceUtils-B4l_Zo0M-0J63thEZ.js";import"./MeshLocalVertexSpace-BqgocsoS-Djc-HwYp.js";import"./vec3-BazNroeq-BpG8jsRC.js";import"./BufferView-PQoE3GL7-BKyY1XmX.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-CAz7b_oW.js";async function U(o,r,t){await Promise.resolve(),m(t);const i=c(o,r,{useEllipsoid:t?.useEllipsoid});if(!i)throw new s("meshUtils:convertVertexSpace()","Failed to convert to provided vertex space due to projection errors");const e=o.cloneAndModifyVertexAttributes(new n({...i,uv:p(o.vertexAttributes.uv),color:p(o.vertexAttributes.color)}),r);return e.transform=null,e}export{U as convertMeshVertexSpace};
