const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./objectResourceUtils-CelAKRU2-DKQr5wGe.js","./main-CaWWi_jZ.js","./main-D2HtlAsr.css","./devEnvironmentUtils-CxrVv3RG-CX5aoxVE.js","./mat3-CC4Foazl-BWjyqE2v.js","./common-CYWrYyJl-E8-sukrT.js","./mat3f64-Dh9_zhFu-BIT-k8Dm.js","./mat4-DX7gBViE-CznOV6K4.js","./mat4f64-Dn1WEGBx-C99QVUMW.js","./vec2f64-CeODonrJ-CkkJCdRC.js","./vec32-D9GsKZ1t-CS2r7p5V.js","./AttributeArray-BWXEft_i-DcwunHr0.js","./requestImageUtils-Ut4YcoNU-B_o1mvTC.js","./basicInterfaces-Dsf65ICa-DkQ9Rsnx.js","./enums-DBi1-Mm2-CUS1pvQe.js","./Texture-BCt2hphT-CuZkhmn8.js","./Util-BjGjeg6f-08Szkf4F.js","./vec42-D8CJyqHG-DnfLTeQH.js","./vec4f64-hf2nxvhQ-CaAr8PTM.js","./ViewingMode-CyR_b1T8-_s7_Gbsk.js","./InterleavedLayout-DXzw3B2n-DhZsrzr4.js","./BufferView-PQoE3GL7-TcOrQZI-.js","./vec2-tHZ6OaOy-xCj1obDt.js","./types-ChhhI6OU-Cxh6dPlX.js","./NormalAttribute.glsl-axtNsUxo-BxR74sUe.js","./compilerUtils-CV1QYWI8-DDSdsowl.js","./interfaces-DN2-jsJC-DzMTiT5R.js","./VertexAttribute-DqD5S0a2-3q90nikV.js","./BindType-9iOk18Ed-CRW1cdX4.js","./AlphaCutoff-ZPx1GqOi-UcccL64p.js","./boundedPlane-DlvE0eNx-CPCUQgqv.js","./sphere-BenPORjV-BDIWEZoS.js","./plane-Dt8R0KeE-CO-ihWZ7.js","./quatf64-C16JxGFv-BKWK1F8U.js","./lineSegment-CcqvCARM-B4K3vlWl.js","./renderState-Dap0WV9P-D4IHxyei.js","./orientedBoundingBox-oHezdpWm-C8AjZK1P.js","./quat-BODLR7mS-CCUcK7eH.js","./spatialReferenceEllipsoidUtils-DUrKTvup-CXVBGzUn.js","./computeTranslationToOriginAndRotation-wF0y9WQG-DTXlpZ77.js","./projectBuffer-CvCBvJ6W-B9mdKl1o.js","./doublePrecisionUtils-BJbYwoii-kIP-tL_t.js","./lengthUtils-DKpMe5qR-B1qEiA4n.js","./vec3-BazNroeq-CbzIhdM5.js","./vec4-DWDdg1fj-DQdunNqj.js","./DefaultMaterial_COLOR_GAMMA-D0o2czi9-mnkQUSlK.js","./Indices-DEr2HrWx-Bb0SEWdb.js","./resourceUtils-Ds65naCv-CBkf38t4.js","./vec2f32-CVhmN3Me-DxoqVD7C.js","./NestedMap-Ddo7BfvO-BpVPk8mz.js","./Version-CoKzbupV-BgDSkAuF.js","./triangle-hqU-Tc1X-BqaX8HFK.js"])))=>i.map(i=>d[i]);
import{o as n,_ as f,im as a,gU as d,ik as v,dU as u}from"./main-CaWWi_jZ.js";import{b}from"./LRUCache-C3erQTWv-qCISEBLR.js";let c=h();function h(){return new b(50)}async function _(o,i=null){if(!o.isPrimitive){const e=o.resource?.href;if(!e)throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const t=c.get(e);if(t!==void 0)return t;const{fetch:l}=await f(()=>import("./objectResourceUtils-CelAKRU2-DKQr5wGe.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]),import.meta.url),m=await l(e,{disableTextures:!0,spherical:!0,doublePrecisionRequiresObfuscation:!0}),s=a(m.referenceBoundingBox,u());return c.put(e,s),s}if(!o.resource?.primitive)throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const r=d(v(o.resource.primitive));if(i!=null)for(let e=0;e<r.length;e++)r[e]*=i;return a(r,u())}export{_ as computeObjectLayerResourceSize};
