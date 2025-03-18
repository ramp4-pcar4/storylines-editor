import{K as C}from"./main-B45ONSYR.js";import{i as v,L as A}from"./arcgisLayerUrl-HNYh8jvG-By_7MEQ1.js";function t(s,e,r){return!!g(s,e,r)}function c(s,e,r){return g(s,e,r)}function g(s,e,r){return s&&s.hasOwnProperty(e)?s[e]:r}const S={name:"supportsName",size:"supportsSize",contentType:"supportsContentType",keywords:"supportsKeywords",exifInfo:"supportsExifInfo"};function Q(s){const e=s?.supportedSpatialAggregationStatistics?.map(r=>r.toLowerCase());return{envelope:!!e?.includes("envelopeaggregate"),centroid:!!e?.includes("centroidaggregate"),convexHull:!!e?.includes("convexhullaggregate")}}function d(s,e){return!!s?.supportedOperationsWithCacheHint?.map(r=>r.toLowerCase())?.includes(e.toLowerCase())}function f(s){const e=s?.supportedStatisticTypes?.map(r=>r.toLowerCase());return{count:!!e?.includes("count"),sum:!!e?.includes("sum"),min:!!e?.includes("min"),max:!!e?.includes("max"),avg:!!e?.includes("avg"),var:!!e?.includes("var"),stddev:!!e?.includes("stddev"),percentileContinuous:!!e?.includes("percentile_continuous"),percentileDiscrete:!!e?.includes("percentile_discrete"),envelope:!!e?.includes("envelopeaggregate"),centroid:!!e?.includes("centroidaggregate"),convexHull:!!e?.includes("convexhullaggregate")}}function z(s,e){return{analytics:x(s),attachment:R(s),data:F(s),metadata:B(s),operations:T(s.capabilities,s,e),query:D(s,e),queryBins:M(s),queryRelated:E(s),queryTopFeatures:w(s),editing:b(s)}}function x(s){return{supportsCacheHint:d(s.advancedQueryCapabilities,"queryAnalytics")}}function R(s){const e=s.attachmentProperties,r={supportsName:!1,supportsSize:!1,supportsContentType:!1,supportsKeywords:!1,supportsExifInfo:!1,supportsCacheHint:d(s.advancedQueryCapabilities,"queryAttachments"),supportsResize:t(s,"supportsAttachmentsResizing",!1)};return e&&Array.isArray(e)&&e.forEach(p=>{const o=S[p.name];o&&(r[o]=!!p.isEnabled)}),r}function F(s){return{isVersioned:t(s,"isDataVersioned",!1),isBranchVersioned:t(s,"isDataBranchVersioned",!1),supportsAttachment:t(s,"hasAttachments",!1),supportsM:t(s,"hasM",!1),supportsZ:t(s,"hasZ",!1)}}function B(s){return{supportsAdvancedFieldProperties:t(s,"supportsFieldDescriptionProperty",!1)}}function T(s,e,r){const p=s?s.toLowerCase().split(",").map(h=>h.trim()):[],o=r?v(r):null,y=p.includes(o!=null&&o.serverType==="MapServer"?"data":"query"),u=p.includes("editing")&&!e.datesInUnknownTimezone;let n=u&&p.includes("create"),i=u&&p.includes("delete"),a=u&&p.includes("update");const m=p.includes("changetracking"),l=e.advancedQueryCapabilities;return u&&!(n||i||a)&&(n=i=a=!0),{supportsCalculate:t(e,"supportsCalculate",!1),supportsTruncate:t(e,"supportsTruncate",!1),supportsValidateSql:t(e,"supportsValidateSql",!1),supportsAdd:n,supportsDelete:i,supportsEditing:u,supportsChangeTracking:m,supportsQuery:y,supportsQueryAnalytics:t(l,"supportsQueryAnalytic",!1),supportsQueryAttachments:t(l,"supportsQueryAttachments",!1),supportsQueryBins:t(l,"supportsQueryBins",!1),supportsQueryTopFeatures:t(l,"supportsTopFeaturesQuery",!1),supportsResizeAttachments:t(e,"supportsAttachmentsResizing",!1),supportsSync:p.includes("sync"),supportsUpdate:a,supportsExceedsLimitStatistics:t(e,"supportsExceedsLimitStatistics",!1),supportsAsyncConvert3D:t(e,"supportsAsyncConvert3D",!1)}}function D(s,e){const r=s.advancedQueryCapabilities,p=s.ownershipBasedAccessControlForFeatures,o=s.archivingInfo,y=s.currentVersion,u=e?.includes("MapServer"),n=!u||y>=C("mapserver-pbf-version-support"),i=A(e),a=new Set((s.supportedQueryFormats??"").split(",").map(m=>m.toLowerCase().trim()));return{maxRecordCount:c(s,"maxRecordCount",void 0),maxRecordCountFactor:c(s,"maxRecordCountFactor",void 0),standardMaxRecordCount:c(s,"standardMaxRecordCount",void 0),supportedSpatialAggregationStatistics:Q(r),supportsCacheHint:t(r,"supportsQueryWithCacheHint",!1)||d(r,"query"),supportsCentroid:t(r,"supportsReturningGeometryCentroid",!1),supportsCompactGeometry:i,supportsDefaultSpatialReference:t(r,"supportsDefaultSR",!1),supportsDisjointSpatialRelationship:t(r,"supportsDisjointSpatialRel",!1),supportsDistance:t(r,"supportsQueryWithDistance",!1),supportsDistinct:t(r,"supportsDistinct",s.supportsAdvancedQueries),supportsExtent:t(r,"supportsReturningQueryExtent",!1),supportsFormatPBF:n&&a.has("pbf"),supportsFullTextSearch:t(r,"supportsFullTextSearch",!1),supportsGeometryProperties:t(r,"supportsReturningGeometryProperties",!1),supportsHavingClause:t(r,"supportsHavingClause",!1),supportsHistoricMoment:t(o,"supportsQueryWithHistoricMoment",!1),supportsMaxRecordCountFactor:t(r,"supportsMaxRecordCountFactor",!1),supportsOrderBy:t(r,"supportsOrderBy",s.supportsAdvancedQueries),supportsPagination:t(r,"supportsPagination",!1),supportsPercentileStatistics:t(r,"supportsPercentileStatistics",!1),supportsQuantization:t(s,"supportsCoordinatesQuantization",!1),supportsQuantizationEditMode:t(s,"supportsQuantizationEditMode",!1),supportsQueryByAnonymous:t(p,"allowAnonymousToQuery",!0),supportsQueryByOthers:t(p,"allowOthersToQuery",!0),supportsQueryGeometry:t(s,"supportsReturningQueryGeometry",!1),supportsResultType:t(r,"supportsQueryWithResultType",!1),supportsSpatialAggregationStatistics:t(r,"supportsSpatialAggregationStatistics",!1),supportsSqlExpression:t(r,"supportsSqlExpression",!1),supportsStandardizedQueriesOnly:t(s,"useStandardizedQueries",!1),supportsStatistics:t(r,"supportsStatistics",s.supportsStatistics),supportsTopFeaturesQuery:t(r,"supportsTopFeaturesQuery",!1),tileMaxRecordCount:c(s,"tileMaxRecordCount",void 0)}}function E(s){const e=s.advancedQueryCapabilities,r=t(e,"supportsAdvancedQueryRelated",!1);return{supportsPagination:t(e,"supportsQueryRelatedPagination",!1),supportsCount:r,supportsOrderBy:r,supportsCacheHint:d(e,"queryRelated")}}function w(s){return{supportsCacheHint:d(s.advancedQueryCapabilities,"queryTopFilter")}}function M(s){const e=s?s.queryBinsCapabilities:void 0;return{supportsDate:t(e,"supportsDateBin",!1),supportsFixedInterval:t(e,"supportsFixedIntervalBin",!1),supportsAutoInterval:t(e,"supportsAutoIntervalBin",!1),supportsFixedBoundaries:t(e,"supportsFixedBoundariesBin",!1),supportedStatistics:f(e)}}function b(s){const e=s.ownershipBasedAccessControlForFeatures,r=s?s.advancedEditingCapabilities:void 0;return{supportsGeometryUpdate:t(s,"allowGeometryUpdates",!0),supportsGlobalId:t(s,"supportsApplyEditsWithGlobalIds",!1),supportsReturnServiceEditsInSourceSpatialReference:t(s,"supportsReturnServiceEditsInSourceSR",!1),supportsRollbackOnFailure:t(s,"supportsRollbackOnFailureParameter",!1),supportsUpdateWithoutM:t(s,"allowUpdateWithoutMValues",!1),supportsUploadWithItemId:t(s,"supportsAttachmentsByUploadId",!1),supportsDeleteByAnonymous:t(e,"allowAnonymousToDelete",!0),supportsDeleteByOthers:t(e,"allowOthersToDelete",!0),supportsUpdateByAnonymous:t(e,"allowAnonymousToUpdate",!0),supportsUpdateByOthers:t(e,"allowOthersToUpdate",!0),supportsAsyncApplyEdits:t(r,"supportsAsyncApplyEdits",!1),zDefault:c(s,"zDefault",void 0)}}function O(s){return{operations:{supportsAppend:t(s,"supportsAppend",!1),supportsCoverageQuery:s?.playbackInfo?.klv["0601"]??!1,supportsExportClip:t(s,"supportsExportClip",!1),supportsExportFrameset:t(s,"supportsExportFrameset",!1),supportsMensuration:t(s,"supportsMensuration",!1),supportsUpdate:t(s,"supportsUpdate",!1)}}}export{O as q,z as x};
