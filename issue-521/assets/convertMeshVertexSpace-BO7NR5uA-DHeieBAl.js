import{$ as m,o as s,P as p}from"./main-CF9Cdcsk.js";import{o as n}from"./MeshVertexAttributes-CbNpPur2-CvHyf-Go.js";import{b as c}from"./vertexSpaceConversion-CiKaVq_u-Ubie1Fpu.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-1P3ND5w1.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-ClFZ45DM.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-BGSPHhg6.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-sXQq6xYN.js";import"./projectBuffer-CvCBvJ6W-D3ES9b1H.js";import"./projectPointToVector-B2UUY9SE-DFxK_CiR.js";import"./projection-BA9M1R7d-BGah-PNx.js";import"./meshVertexSpaceUtils-B4l_Zo0M-DJDbglSJ.js";import"./MeshLocalVertexSpace-BqgocsoS-fDtBd-cb.js";import"./vec3-BazNroeq-VVfwmEk9.js";import"./BufferView-PQoE3GL7-BnnjdIlD.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-B7ZsuwkJ.js";async function U(o,r,t){await Promise.resolve(),m(t);const i=c(o,r,{useEllipsoid:t?.useEllipsoid});if(!i)throw new s("meshUtils:convertVertexSpace()","Failed to convert to provided vertex space due to projection errors");const e=o.cloneAndModifyVertexAttributes(new n({...i,uv:p(o.vertexAttributes.uv),color:p(o.vertexAttributes.color)}),r);return e.transform=null,e}export{U as convertMeshVertexSpace};
