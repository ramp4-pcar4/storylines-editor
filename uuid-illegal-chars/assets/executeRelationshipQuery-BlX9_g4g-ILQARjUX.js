import{y as m}from"./utils-9sQxfkoa-BdBM9zKs.js";import{f as y,bM as p}from"./main-DeZqmqPk.js";import{f as j}from"./query-DFW9-NG_-BST0Mrdz.js";import{O as R}from"./FeatureSet-BkVNthuN-CPuhyq4I.js";import{d as f}from"./RelationshipQuery-DJsz3K0U-bThJ-24i.js";import"./normalizeUtils-Bxmy9MNI-DijdZhrJ.js";import"./normalizeUtilsCommon-CRJlkfEA-Br2Kn_ie.js";import"./utils-Bq23Xwmj-cmTZ9sp5.js";import"./pbfQueryUtils-F4ZE8-K8-DDTnR8qI.js";import"./pbf-D-y3_eZO-B42nIPck.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./queryZScale-BiYV6Pr6-QBgJzlNC.js";import"./projection-BA9M1R7d-BtbzAhyR.js";import"./projectBuffer-CvCBvJ6W-qBsxM2mD.js";import"./Field-C6hA1tZj-C7DinTol.js";import"./fieldType-CD2CL2hr-D-XRGi4V.js";import"./Query-BrwMGK8U-CQmF1yt9.js";import"./TimeExtent-Cn0Jofqr-CE8wA-d9.js";function b(r,e){const t=r.toJSON();return t.objectIds&&(t.objectIds=t.objectIds.join(",")),t.orderByFields&&(t.orderByFields=t.orderByFields.join(",")),t.outFields&&!e?.returnCountOnly?t.outFields.includes("*")?t.outFields="*":t.outFields=t.outFields.join(","):delete t.outFields,t.outSR&&(t.outSR=p(t.outSR)),t.dynamicDataSource&&(t.layer=JSON.stringify({source:t.dynamicDataSource}),delete t.dynamicDataSource),t}async function F(r,e,t){const n=await l(r,e,t),o=n.data,s=o.geometryType,a=o.spatialReference,i={};for(const c of o.relatedRecordGroups){const d={fields:void 0,objectIdFieldName:void 0,geometryType:s,spatialReference:a,hasZ:!!o.hasZ,hasM:!!o.hasM,features:c.relatedRecords};if(c.objectId!=null)i[c.objectId]=d;else for(const u of Object.keys(c))u!=="relatedRecords"&&(i[c[u]]=d)}return{...n,data:i}}async function h(r,e,t){const n=await l(r,e,t,{returnCountOnly:!0}),o=n.data,s={};for(const a of o.relatedRecordGroups)a.objectId!=null&&(s[a.objectId]=a.count);return{...n,data:s}}async function l(r,e,t={},n){const o=j({...r.query,f:"json",...n,...b(e,n)});return y(r.path+"/queryRelatedRecords",{...t,query:{...t.query,...o}})}async function E(r,e,t){e=f.from(e);const n=m(r);return F(n,e,t).then(o=>{const s=o.data,a={};return Object.keys(s).forEach(i=>a[i]=R.fromJSON(s[i])),a})}async function V(r,e,t){e=f.from(e);const n=m(r);return h(n,e,{...t}).then(o=>o.data)}export{E as executeRelationshipQuery,V as executeRelationshipQueryForCount};
