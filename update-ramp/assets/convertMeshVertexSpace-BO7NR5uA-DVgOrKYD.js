import{$ as m,o as s,P as p}from"./main-CJueYQxD.js";import{o as n}from"./MeshVertexAttributes-CbNpPur2-DVePyKmH.js";import{b as c}from"./vertexSpaceConversion-CiKaVq_u-DkMBNnjq.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-CuyWPRvp.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-BvC1db7A.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-BdxJijxh.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-D_ag1CAN.js";import"./projectBuffer-CvCBvJ6W-D1GMAOjG.js";import"./projectPointToVector-B2UUY9SE-BDb8JvPk.js";import"./projection-BA9M1R7d-MtiC3YOi.js";import"./meshVertexSpaceUtils-B4l_Zo0M-VAfO0ZmC.js";import"./MeshLocalVertexSpace-BqgocsoS-ByerQo2s.js";import"./vec3-BazNroeq-Yylo9Rrb.js";import"./BufferView-PQoE3GL7-dwbd5UwX.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-D8BgWqDy.js";async function U(o,r,t){await Promise.resolve(),m(t);const i=c(o,r,{useEllipsoid:t?.useEllipsoid});if(!i)throw new s("meshUtils:convertVertexSpace()","Failed to convert to provided vertex space due to projection errors");const e=o.cloneAndModifyVertexAttributes(new n({...i,uv:p(o.vertexAttributes.uv),color:p(o.vertexAttributes.color)}),r);return e.transform=null,e}export{U as convertMeshVertexSpace};
