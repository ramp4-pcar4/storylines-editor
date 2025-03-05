import{$ as m,o as s,P as p}from"./main-Cs_aiUdl.js";import{o as n}from"./MeshVertexAttributes-CbNpPur2-CPv1olWQ.js";import{b as c}from"./vertexSpaceConversion-CiKaVq_u-DUYId_MV.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-CYYetRgj.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-Cq3X6syh.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-DkZddEAR.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-Cx9DZxlB.js";import"./projectBuffer-CvCBvJ6W-7_j_g4FI.js";import"./projectPointToVector-B2UUY9SE-0cNIPZ7G.js";import"./projection-BA9M1R7d-BWvhhUoV.js";import"./meshVertexSpaceUtils-B4l_Zo0M-CaapiszV.js";import"./MeshLocalVertexSpace-BqgocsoS-CQTIr08B.js";import"./vec3-BazNroeq-BJDKHexn.js";import"./BufferView-PQoE3GL7-C5Wjh5KH.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-CLjMCXXy.js";async function U(o,r,t){await Promise.resolve(),m(t);const i=c(o,r,{useEllipsoid:t?.useEllipsoid});if(!i)throw new s("meshUtils:convertVertexSpace()","Failed to convert to provided vertex space due to projection errors");const e=o.cloneAndModifyVertexAttributes(new n({...i,uv:p(o.vertexAttributes.uv),color:p(o.vertexAttributes.color)}),r);return e.transform=null,e}export{U as convertMeshVertexSpace};
