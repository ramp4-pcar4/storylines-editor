import{n as p}from"./main-DM2UJ-BA.js";import{y as n}from"./utils-9sQxfkoa-DaG1cX8F.js";import{R as e}from"./queryTopFeatures-IbhAPJlP-CadNJljm.js";import x from"./TopFeaturesQuery-Ckj_IYM7-BllMMGbw.js";import"./normalizeUtils-Bxmy9MNI-D25btusP.js";import"./normalizeUtilsCommon-CRJlkfEA-D8uA1Nwi.js";import"./utils-Bq23Xwmj-BTXb7vuO.js";import"./query-DFW9-NG_-cYcEL-R8.js";import"./pbfQueryUtils-F4ZE8-K8-DVO7LWUM.js";import"./pbf-D-y3_eZO-DrklByOe.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./queryZScale-BiYV6Pr6-BUIalLLf.js";import"./projection-BA9M1R7d-2gVrROi9.js";import"./projectBuffer-CvCBvJ6W-CLIGyxp8.js";import"./TimeExtent-Cn0Jofqr-BmGqEZkt.js";async function T(m,r,i){const a=n(m),o=await e(a,x.from(r),{...i}),t=o.data.extent;return!t||isNaN(t.xmin)||isNaN(t.ymin)||isNaN(t.xmax)||isNaN(t.ymax)?{count:o.data.count,extent:null}:{count:o.data.count,extent:p.fromJSON(t)}}export{T as executeForTopExtents};
