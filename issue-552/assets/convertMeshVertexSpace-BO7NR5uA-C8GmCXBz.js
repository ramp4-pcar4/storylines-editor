import{$ as m,o as s,P as p}from"./main-DM2UJ-BA.js";import{o as n}from"./MeshVertexAttributes-CbNpPur2-Dm9pR7Z4.js";import{b as c}from"./vertexSpaceConversion-CiKaVq_u-DlIpLrsF.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-lVC6D7ix.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-BuI53kP3.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-BG-mOITA.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-B8QPaLKJ.js";import"./projectBuffer-CvCBvJ6W-CLIGyxp8.js";import"./projectPointToVector-B2UUY9SE-CE35qNW5.js";import"./projection-BA9M1R7d-2gVrROi9.js";import"./meshVertexSpaceUtils-B4l_Zo0M-BFrS9HNw.js";import"./MeshLocalVertexSpace-BqgocsoS-68PasvOe.js";import"./vec3-BazNroeq-IxTRsrsE.js";import"./BufferView-PQoE3GL7-DAVvFkc9.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-CeOAinja.js";async function U(o,r,t){await Promise.resolve(),m(t);const i=c(o,r,{useEllipsoid:t?.useEllipsoid});if(!i)throw new s("meshUtils:convertVertexSpace()","Failed to convert to provided vertex space due to projection errors");const e=o.cloneAndModifyVertexAttributes(new n({...i,uv:p(o.vertexAttributes.uv),color:p(o.vertexAttributes.color)}),r);return e.transform=null,e}export{U as convertMeshVertexSpace};
