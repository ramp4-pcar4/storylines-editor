import{n as p}from"./main-Ce-R8kMh.js";import{y as n}from"./utils-9sQxfkoa-YT9_pax4.js";import{R as e}from"./queryTopFeatures-IbhAPJlP-CLyZXpD7.js";import x from"./TopFeaturesQuery-Ckj_IYM7-CfyzexAG.js";import"./normalizeUtils-Bxmy9MNI-DCh8kgnH.js";import"./normalizeUtilsCommon-CRJlkfEA-DT65-KTF.js";import"./utils-Bq23Xwmj-EA-yOhv8.js";import"./query-DFW9-NG_-_5RHA_c8.js";import"./pbfQueryUtils-F4ZE8-K8-B-2t5dCL.js";import"./pbf-D-y3_eZO-CiFkwKpS.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./queryZScale-BiYV6Pr6-BKESoK5U.js";import"./projection-BA9M1R7d-BeBMGWFr.js";import"./projectBuffer-CvCBvJ6W-BU0_qIbA.js";import"./TimeExtent-Cn0Jofqr-BTJlDn7i.js";async function T(m,r,i){const a=n(m),o=await e(a,x.from(r),{...i}),t=o.data.extent;return!t||isNaN(t.xmin)||isNaN(t.ymin)||isNaN(t.xmax)||isNaN(t.ymax)?{count:o.data.count,extent:null}:{count:o.data.count,extent:p.fromJSON(t)}}export{T as executeForTopExtents};
