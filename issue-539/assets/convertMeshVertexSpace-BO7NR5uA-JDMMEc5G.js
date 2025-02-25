import{$ as m,o as s,P as p}from"./main-Ce-R8kMh.js";import{o as n}from"./MeshVertexAttributes-CbNpPur2-D1z_tXqW.js";import{b as c}from"./vertexSpaceConversion-CiKaVq_u-Cjuy9vrK.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-DrBVdviH.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-Bcdl2gIA.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-CFrFvLMc.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-DBSeNczu.js";import"./projectBuffer-CvCBvJ6W-BU0_qIbA.js";import"./projectPointToVector-B2UUY9SE-DYcTu9v0.js";import"./projection-BA9M1R7d-BeBMGWFr.js";import"./meshVertexSpaceUtils-B4l_Zo0M-Dkpy1o_l.js";import"./MeshLocalVertexSpace-BqgocsoS-Dia74nH8.js";import"./vec3-BazNroeq-BZQ71gDF.js";import"./BufferView-PQoE3GL7-VJfaiVgt.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-BhICq0UZ.js";async function U(o,r,t){await Promise.resolve(),m(t);const i=c(o,r,{useEllipsoid:t?.useEllipsoid});if(!i)throw new s("meshUtils:convertVertexSpace()","Failed to convert to provided vertex space due to projection errors");const e=o.cloneAndModifyVertexAttributes(new n({...i,uv:p(o.vertexAttributes.uv),color:p(o.vertexAttributes.color)}),r);return e.transform=null,e}export{U as convertMeshVertexSpace};
