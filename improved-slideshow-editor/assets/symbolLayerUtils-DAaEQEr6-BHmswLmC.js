const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./objectResourceUtils-CelAKRU2-DlNeOxXI.js","./main-Csa2lEpO.js","./main-C_VpDndL.css","./devEnvironmentUtils-CxrVv3RG-CX5aoxVE.js","./mat3-CC4Foazl-BWjyqE2v.js","./common-CYWrYyJl-E8-sukrT.js","./mat3f64-Dh9_zhFu-BIT-k8Dm.js","./mat4-DX7gBViE-CteUXYnx.js","./mat4f64-Dn1WEGBx-C99QVUMW.js","./vec2f64-CeODonrJ-CkkJCdRC.js","./vec32-D9GsKZ1t-BXJ_wiZi.js","./AttributeArray-BWXEft_i-Ku7pEJ5v.js","./requestImageUtils-Ut4YcoNU-BPAwd2yQ.js","./basicInterfaces-Dsf65ICa-DkQ9Rsnx.js","./enums-DBi1-Mm2-CUS1pvQe.js","./Texture-BCt2hphT-CEwFxDHP.js","./Util-BjGjeg6f-08Szkf4F.js","./vec42-D8CJyqHG-DnfLTeQH.js","./vec4f64-hf2nxvhQ-CaAr8PTM.js","./ViewingMode-CyR_b1T8-_s7_Gbsk.js","./InterleavedLayout-DXzw3B2n-Cuzr6NrU.js","./BufferView-PQoE3GL7-CZfFW9R2.js","./vec2-tHZ6OaOy-xCj1obDt.js","./types-ChhhI6OU-Cxh6dPlX.js","./NormalAttribute.glsl-axtNsUxo-CC5yZStQ.js","./compilerUtils-CV1QYWI8-CS0r1gya.js","./interfaces-DN2-jsJC-DzMTiT5R.js","./VertexAttribute-DqD5S0a2-3q90nikV.js","./BindType-9iOk18Ed-CRW1cdX4.js","./AlphaCutoff-ZPx1GqOi-UcccL64p.js","./boundedPlane-DlvE0eNx-BYdLpHf-.js","./sphere-BenPORjV-BvjznUsE.js","./plane-Dt8R0KeE-Dpcoe1CN.js","./quatf64-C16JxGFv-BKWK1F8U.js","./lineSegment-CcqvCARM-DPEQNjex.js","./renderState-Dap0WV9P-D4IHxyei.js","./orientedBoundingBox-oHezdpWm-UPv1-U-7.js","./quat-BODLR7mS-BzM8yv-h.js","./spatialReferenceEllipsoidUtils-DUrKTvup-BdlDl26Y.js","./computeTranslationToOriginAndRotation-wF0y9WQG-CyG4ctj6.js","./projectBuffer-CvCBvJ6W-CHC2yAAi.js","./doublePrecisionUtils-BJbYwoii-kIP-tL_t.js","./lengthUtils-DKpMe5qR-DXDAEdXh.js","./vec3-BazNroeq-D03FvP-4.js","./vec4-DWDdg1fj-BBZZI5gl.js","./DefaultMaterial_COLOR_GAMMA-D0o2czi9--GZ3FaWz.js","./Indices-DEr2HrWx-Vm3muerx.js","./resourceUtils-Ds65naCv-C-9EBTRe.js","./vec2f32-CVhmN3Me-DxoqVD7C.js","./NestedMap-Ddo7BfvO-BpVPk8mz.js","./Version-CoKzbupV-BH6-tMzC.js","./triangle-hqU-Tc1X-Bn162ncA.js"])))=>i.map(i=>d[i]);
import{o as n,_ as f,im as a,gU as d,ik as v,dU as u}from"./main-Csa2lEpO.js";import{b}from"./LRUCache-C3erQTWv-Cg3yHPg5.js";let c=h();function h(){return new b(50)}async function _(o,i=null){if(!o.isPrimitive){const e=o.resource?.href;if(!e)throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const t=c.get(e);if(t!==void 0)return t;const{fetch:l}=await f(()=>import("./objectResourceUtils-CelAKRU2-DlNeOxXI.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]),import.meta.url),m=await l(e,{disableTextures:!0,spherical:!0,doublePrecisionRequiresObfuscation:!0}),s=a(m.referenceBoundingBox,u());return c.put(e,s),s}if(!o.resource?.primitive)throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const r=d(v(o.resource.primitive));if(i!=null)for(let e=0;e<r.length;e++)r[e]*=i;return a(r,u())}export{_ as computeObjectLayerResourceSize};
