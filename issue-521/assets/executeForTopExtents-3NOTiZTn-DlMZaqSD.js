import{n as p}from"./main-CF9Cdcsk.js";import{y as n}from"./utils-9sQxfkoa-B2tJKLdN.js";import{R as e}from"./queryTopFeatures-IbhAPJlP-4LN2UWd0.js";import x from"./TopFeaturesQuery-Ckj_IYM7-DF3Kkd9q.js";import"./normalizeUtils-Bxmy9MNI-B0scjlT6.js";import"./normalizeUtilsCommon-CRJlkfEA-DMgO1pD4.js";import"./utils-Bq23Xwmj-BGnXTX3O.js";import"./query-DFW9-NG_-DOFY_zne.js";import"./pbfQueryUtils-F4ZE8-K8-BSpQ3M4M.js";import"./pbf-D-y3_eZO-CPSXnAQS.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./queryZScale-BiYV6Pr6-DZKst1Ds.js";import"./projection-BA9M1R7d-BGah-PNx.js";import"./projectBuffer-CvCBvJ6W-D3ES9b1H.js";import"./TimeExtent-Cn0Jofqr-OY-iPXBs.js";async function T(m,r,i){const a=n(m),o=await e(a,x.from(r),{...i}),t=o.data.extent;return!t||isNaN(t.xmin)||isNaN(t.ymin)||isNaN(t.xmax)||isNaN(t.ymax)?{count:o.data.count,extent:null}:{count:o.data.count,extent:p.fromJSON(t)}}export{T as executeForTopExtents};
