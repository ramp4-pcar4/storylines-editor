import{X as u,Q as c,W as v}from"./utils-HtkT8Fn3-CVibEQJ8.js";import{D as z,l as T,N as y,s as I,c as V,m as x,E as w,h as D,V as E}from"./utils-tNxq3jkf-CZJ9x7Wc.js";import"./main-CsB5uMDq.js";import"./TimeExtent-Cn0Jofqr-rhbdDAad.js";import"./quantizationUtils-bJy1cRwp-IhCbMZyx.js";import"./heatmapUtils-seiMkkkR-2AfkKX46.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./utils-DyydRFHu-BDrpJCOw.js";import"./Basemap-BEqqSTw9-C_DWLhDx.js";import"./loadAll-e978YItg-fQWxVhQo.js";import"./PortalItem-CctGdnxF-0oj68Gq5.js";import"./writeUtils-D5qlLkwk-CrFb654m.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-CFC1gja-.js";import"./ClassBreaksDefinition-bYRgYgPp-NmypRjB7.js";async function W(l){const{attribute:i,features:s}=l,{normalizationType:a,normalizationField:e,minValue:n,maxValue:o,fieldType:t,outStatisticTypes:r}=i,m=await u({field:i.field,valueExpression:i.valueExpression,normalizationType:a,normalizationField:e,normalizationTotal:i.normalizationTotal,viewInfoParams:i.viewInfoParams,timeZone:i.timeZone,fieldInfos:i.fieldInfos},s),f=z({normalizationType:a,normalizationField:e,minValue:n,maxValue:o}),d={value:.5,fieldType:t},p=t==="esriFieldTypeString"?T({values:m,supportsNullCount:f,percentileParams:d,outStatisticTypes:r}):y({values:m,minValue:n,maxValue:o,useSampleStdDev:!a,supportsNullCount:f,percentileParams:d,outStatisticTypes:r});return I(p,r,t==="esriFieldTypeDate")}async function X(l){const{attribute:i,features:s}=l,a=await u({field:i.field,field2:i.field2,field3:i.field3,fieldDelimiter:i.fieldDelimiter,valueExpression:i.valueExpression,viewInfoParams:i.viewInfoParams,timeZone:i.timeZone,fieldInfos:i.fieldInfos},s,!1),e=V(a);return x(e,i.domains,i.returnAllCodedValues,i.fieldDelimiter)}async function j(l){const{attribute:i,features:s}=l,{field:a,normalizationType:e,normalizationField:n,normalizationTotal:o,classificationMethod:t}=i,r=await u({field:a,valueExpression:i.valueExpression,normalizationType:e,normalizationField:n,normalizationTotal:o,viewInfoParams:i.viewInfoParams,timeZone:i.timeZone,fieldInfos:i.fieldInfos},s),m=w(r,{field:a,normalizationType:e,normalizationField:n,normalizationTotal:o,classificationMethod:t,standardDeviationInterval:i.standardDeviationInterval,numClasses:i.numClasses,minValue:i.minValue,maxValue:i.maxValue});return D(m,t)}async function G(l){const{attribute:i,features:s}=l,{field:a,normalizationType:e,normalizationField:n,normalizationTotal:o,classificationMethod:t}=i,r=await u({field:a,valueExpression:i.valueExpression,normalizationType:e,normalizationField:n,normalizationTotal:o,viewInfoParams:i.viewInfoParams,timeZone:i.timeZone,fieldInfos:i.fieldInfos},s);return E(r,{field:a,normalizationType:e,normalizationField:n,normalizationTotal:o,classificationMethod:t,standardDeviationInterval:i.standardDeviationInterval,numBins:i.numBins,minValue:i.minValue,maxValue:i.maxValue})}async function H(l){const{attribute:i,features:s}=l,{field:a,radius:e,transform:n,spatialReference:o}=i,t=i.size??[0,0],r=c(s??[],n,o,t);return v(r,e??void 0,a,t[0],t[1])}export{j as classBreaks,H as heatmapStatistics,G as histogram,W as summaryStatistics,X as uniqueValues};
