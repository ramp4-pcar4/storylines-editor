import{bZ as f,jo as u,f as p}from"./main-DpxXUdv2.js";import{f as d}from"./query-DFW9-NG_-BP99JGMy.js";import{h as y}from"./AttachmentInfo-D9RFO8W2-DbKJmq2L.js";import"./normalizeUtils-Bxmy9MNI-BzK2AhMf.js";import"./normalizeUtilsCommon-CRJlkfEA-4m5Oyrtk.js";import"./utils-9sQxfkoa-p8r8UJKS.js";import"./utils-Bq23Xwmj-DKd3LM-s.js";import"./pbfQueryUtils-F4ZE8-K8-DCwI50MF.js";import"./pbf-D-y3_eZO-C5q2e4ro.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./queryZScale-BiYV6Pr6-DusoePCL.js";import"./projection-BA9M1R7d-DvQb2AGE.js";import"./projectBuffer-CvCBvJ6W-5Rq78G6B.js";function I(a){const t=a.toJSON();return t.attachmentTypes&&(t.attachmentTypes=t.attachmentTypes.join(",")),t.keywords&&(t.keywords=t.keywords.join(",")),t.globalIds&&(t.globalIds=t.globalIds.join(",")),t.objectIds&&(t.objectIds=t.objectIds.join(",")),t.size&&(t.size=t.size.join(",")),t}function B(a,t){const o={};for(const n of t){const{parentObjectId:e,parentGlobalId:r,attachmentInfos:c}=n;for(const s of c){const{id:i}=s,h=f(u(`${a.path}/${e}/attachments/${i}`)),m=y.fromJSON(s);m.set({url:h,parentObjectId:e,parentGlobalId:r}),o[e]?o[e].push(m):o[e]=[m]}}return o}function J(a,t,o){let n={query:d({...a.query,f:"json",...I(t)})};return o&&(n={...o,...n,query:{...o.query,...n.query}}),p(a.path+"/queryAttachments",n).then(e=>e.data.attachmentGroups)}async function N(a,t,o){const{objectIds:n}=t,e=[];for(const r of n)e.push(p(a.path+"/"+r+"/attachments",o));return Promise.all(e).then(r=>n.map((c,s)=>({parentObjectId:c,attachmentInfos:r[s].data.attachmentInfos})))}export{J as executeAttachmentQuery,N as fetchAttachments,B as processAttachmentQueryResult};
