import{y as m}from"./utils-9sQxfkoa-D2a_EK_f.js";import{f as y,bM as p}from"./main-PWjwnDMV.js";import{f as j}from"./query-DFW9-NG_-C276id-6.js";import{O as R}from"./FeatureSet-BkVNthuN-CPoF4uR4.js";import{d as f}from"./RelationshipQuery-DJsz3K0U-rhWBz5dB.js";import"./normalizeUtils-Bxmy9MNI-BPHTpNbp.js";import"./normalizeUtilsCommon-CRJlkfEA-Be-npwT6.js";import"./utils-Bq23Xwmj-BvYoINn1.js";import"./pbfQueryUtils-F4ZE8-K8-Do7V3Vp0.js";import"./pbf-D-y3_eZO-BP8mfak1.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./queryZScale-BiYV6Pr6-_U1xEZf-.js";import"./projection-BA9M1R7d-BKRd0G8R.js";import"./projectBuffer-CvCBvJ6W-C5Ro3r1r.js";import"./Field-C6hA1tZj-B1Pp42ij.js";import"./fieldType-CD2CL2hr-CVd-54dQ.js";import"./Query-BrwMGK8U-Czy7zTOT.js";import"./TimeExtent-Cn0Jofqr-BjQCS4sW.js";function b(r,e){const t=r.toJSON();return t.objectIds&&(t.objectIds=t.objectIds.join(",")),t.orderByFields&&(t.orderByFields=t.orderByFields.join(",")),t.outFields&&!e?.returnCountOnly?t.outFields.includes("*")?t.outFields="*":t.outFields=t.outFields.join(","):delete t.outFields,t.outSR&&(t.outSR=p(t.outSR)),t.dynamicDataSource&&(t.layer=JSON.stringify({source:t.dynamicDataSource}),delete t.dynamicDataSource),t}async function F(r,e,t){const n=await l(r,e,t),o=n.data,s=o.geometryType,a=o.spatialReference,i={};for(const c of o.relatedRecordGroups){const d={fields:void 0,objectIdFieldName:void 0,geometryType:s,spatialReference:a,hasZ:!!o.hasZ,hasM:!!o.hasM,features:c.relatedRecords};if(c.objectId!=null)i[c.objectId]=d;else for(const u of Object.keys(c))u!=="relatedRecords"&&(i[c[u]]=d)}return{...n,data:i}}async function h(r,e,t){const n=await l(r,e,t,{returnCountOnly:!0}),o=n.data,s={};for(const a of o.relatedRecordGroups)a.objectId!=null&&(s[a.objectId]=a.count);return{...n,data:s}}async function l(r,e,t={},n){const o=j({...r.query,f:"json",...n,...b(e,n)});return y(r.path+"/queryRelatedRecords",{...t,query:{...t.query,...o}})}async function E(r,e,t){e=f.from(e);const n=m(r);return F(n,e,t).then(o=>{const s=o.data,a={};return Object.keys(s).forEach(i=>a[i]=R.fromJSON(s[i])),a})}async function V(r,e,t){e=f.from(e);const n=m(r);return h(n,e,{...t}).then(o=>o.data)}export{E as executeRelationshipQuery,V as executeRelationshipQueryForCount};
