import{h3 as u,h4 as n,h5 as i,K as a,P as c}from"./main-BnX5fuW-.js";import{t as l}from"./QueryEngineCapabilities-Gr588n9t-DjYb9CEb.js";import{s as y}from"./capabilities-Cjn77swe-Y9lFlGVh.js";function $(t){return{renderer:{type:"simple",symbol:t==="esriGeometryPoint"||t==="esriGeometryMultipoint"?u:t==="esriGeometryPolyline"?n:i}}}const d=/^[_$a-zA-Z][_$a-zA-Z0-9]*$/;let m=1;function B(t,s){if(a("esri-csp-restrictions"))return()=>({[s]:null,...t});try{let r=`this${p(s)} = null;`;for(const e in t)r+=`this${p(e)} = ${JSON.stringify(t[e])};`;const o=new Function(`
      return class AttributesClass$${m++} {
        constructor() {
          ${r};
        }
      }
    `)();return()=>new o}catch{return()=>({[s]:null,...t})}}function p(t){return d.test(t)?`.${t}`:`["${t}"]`}function C(t={}){return[{name:"New Feature",description:"",prototype:{attributes:c(t)}}]}function R(t,s){return{analytics:{supportsCacheHint:!1},attachment:null,data:{isVersioned:!1,isBranchVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:t},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:s,supportsDelete:s,supportsEditing:s,supportsChangeTracking:!1,supportsQuery:!0,supportsQueryBins:!1,supportsQueryAnalytics:!1,supportsQueryAttachments:!1,supportsQueryTopFeatures:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:s,supportsExceedsLimitStatistics:!0,supportsAsyncConvert3D:!1},query:l,queryRelated:{supportsCount:!0,supportsOrderBy:!0,supportsPagination:!0,supportsCacheHint:!1},queryTopFeatures:{supportsCacheHint:!1},queryBins:y,editing:{supportsGeometryUpdate:s,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsAsyncApplyEdits:!1,zDefault:void 0}}}export{R as $,C as A,$ as d,B as f};
