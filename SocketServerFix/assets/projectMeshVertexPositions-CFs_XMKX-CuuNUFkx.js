import{n as p}from"./projectBuffer-CvCBvJ6W-SRZZwGAf.js";import{y as m}from"./MeshLocalVertexSpace-BqgocsoS-CTqNhO6u.js";import{aC as e}from"./main-BH3u4lL3.js";import{b as n}from"./vertexSpaceConversion-CiKaVq_u-CHxVUwkq.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./mat4-DX7gBViE-Bhv_uAls.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./vec32-D9GsKZ1t-CfgckxUA.js";import"./spatialReferenceEllipsoidUtils-DUrKTvup-B9pKQfzJ.js";import"./computeTranslationToOriginAndRotation-wF0y9WQG-I3qTS2xq.js";import"./projectPointToVector-B2UUY9SE-awVI261K.js";import"./projection-BA9M1R7d-Bngn7BFN.js";import"./meshVertexSpaceUtils-B4l_Zo0M-DzSGHOxF.js";import"./vec3-BazNroeq-DRCHMLPd.js";import"./BufferView-PQoE3GL7-DA3MJJhr.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4-DWDdg1fj-OpWdpZ36.js";function V(t,i){const o=n(t,m.absolute);if(!o)return null;let r=o.position;return e(t.spatialReference,i)||(r=new Float64Array(o.position.length),p(o.position,t.spatialReference,0,r,i,0))?r:null}export{V as projectMeshVertexPositions};
