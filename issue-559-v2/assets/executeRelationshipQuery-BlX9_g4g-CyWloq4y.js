import{y as m}from"./utils-9sQxfkoa-DAS0bk5F.js";import{f as y,bM as p}from"./main-DzfxInI5.js";import{f as j}from"./query-DFW9-NG_-Qe1Y09O5.js";import{O as R}from"./FeatureSet-BkVNthuN-BUNJL3yv.js";import{d as f}from"./RelationshipQuery-DJsz3K0U-CjPTonL-.js";import"./normalizeUtils-Bxmy9MNI-RkpwzxoG.js";import"./normalizeUtilsCommon-CRJlkfEA-RJgsE4RT.js";import"./utils-Bq23Xwmj-CFQ9waXV.js";import"./pbfQueryUtils-F4ZE8-K8-BisloHFb.js";import"./pbf-D-y3_eZO-3eMdpa7P.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./queryZScale-BiYV6Pr6-B6dONB2r.js";import"./projection-BA9M1R7d-Dosm3bk0.js";import"./projectBuffer-CvCBvJ6W-D_7p147q.js";import"./Field-C6hA1tZj-BM9vgpKy.js";import"./fieldType-CD2CL2hr-BHcILNXd.js";import"./Query-BrwMGK8U-agtWjP-r.js";import"./TimeExtent-Cn0Jofqr-BgE6uS8e.js";function b(r,e){const t=r.toJSON();return t.objectIds&&(t.objectIds=t.objectIds.join(",")),t.orderByFields&&(t.orderByFields=t.orderByFields.join(",")),t.outFields&&!e?.returnCountOnly?t.outFields.includes("*")?t.outFields="*":t.outFields=t.outFields.join(","):delete t.outFields,t.outSR&&(t.outSR=p(t.outSR)),t.dynamicDataSource&&(t.layer=JSON.stringify({source:t.dynamicDataSource}),delete t.dynamicDataSource),t}async function F(r,e,t){const n=await l(r,e,t),o=n.data,s=o.geometryType,a=o.spatialReference,i={};for(const c of o.relatedRecordGroups){const d={fields:void 0,objectIdFieldName:void 0,geometryType:s,spatialReference:a,hasZ:!!o.hasZ,hasM:!!o.hasM,features:c.relatedRecords};if(c.objectId!=null)i[c.objectId]=d;else for(const u of Object.keys(c))u!=="relatedRecords"&&(i[c[u]]=d)}return{...n,data:i}}async function h(r,e,t){const n=await l(r,e,t,{returnCountOnly:!0}),o=n.data,s={};for(const a of o.relatedRecordGroups)a.objectId!=null&&(s[a.objectId]=a.count);return{...n,data:s}}async function l(r,e,t={},n){const o=j({...r.query,f:"json",...n,...b(e,n)});return y(r.path+"/queryRelatedRecords",{...t,query:{...t.query,...o}})}async function E(r,e,t){e=f.from(e);const n=m(r);return F(n,e,t).then(o=>{const s=o.data,a={};return Object.keys(s).forEach(i=>a[i]=R.fromJSON(s[i])),a})}async function V(r,e,t){e=f.from(e);const n=m(r);return h(n,e,{...t}).then(o=>o.data)}export{E as executeRelationshipQuery,V as executeRelationshipQueryForCount};
