import{a as p,f as c,bX as F,bK as f,bM as d}from"./main-Cs_aiUdl.js";import{B as E}from"./normalizeUtils-Bxmy9MNI-YjFjk1Om.js";import{f as x}from"./query-DFW9-NG_-8hHHc0P2.js";import{n as j}from"./queryZScale-BiYV6Pr6-D4_ELQPa.js";const a="Layer does not support extent calculation.";function O(o,r){const n=o.geometry,t=o.toJSON(),e=t;if(n!=null&&(e.geometry=JSON.stringify(n),e.geometryType=f(n),e.inSR=d(n.spatialReference)),t.topFilter?.groupByFields&&(e.topFilter.groupByFields=t.topFilter.groupByFields.join(",")),t.topFilter?.orderByFields&&(e.topFilter.orderByFields=t.topFilter.orderByFields.join(",")),t.topFilter&&(e.topFilter=JSON.stringify(e.topFilter)),t.objectIds&&(e.objectIds=t.objectIds.join(",")),t.orderByFields&&(e.orderByFields=t.orderByFields.join(",")),t.outFields&&!(r?.returnCountOnly||r?.returnExtentOnly||r?.returnIdsOnly)?t.outFields.includes("*")?e.outFields="*":e.outFields=t.outFields.join(","):delete e.outFields,t.outSR?e.outSR=d(t.outSR):n&&t.returnGeometry&&(e.outSR=e.inSR),t.returnGeometry&&delete t.returnGeometry,t.timeExtent){const l=t.timeExtent,{start:i,end:u}=l;i==null&&u==null||(e.time=i===u?i:`${i??"null"},${u??"null"}`),delete t.timeExtent}return e}async function b(o,r,n,t){const e=await s(o,r,"json",t);return j(r,n,e.data),e}async function h(o,r,n){return r.timeExtent!=null&&r.timeExtent.isEmpty?{data:{objectIds:[]}}:s(o,r,"json",n,{returnIdsOnly:!0})}async function w(o,r,n){return r.timeExtent!=null&&r.timeExtent.isEmpty?{data:{count:0,extent:null}}:s(o,r,"json",n,{returnExtentOnly:!0,returnCountOnly:!0}).then(t=>{const e=t.data;if(e.hasOwnProperty("extent"))return t;if(e.features)throw new Error(a);if(e.hasOwnProperty("count"))throw new Error(a);return t})}function I(o,r,n){return r.timeExtent!=null&&r.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):s(o,r,"json",n,{returnIdsOnly:!0,returnCountOnly:!0})}function s(o,r,n,t={},e={}){const l=typeof o=="string"?p(o):o,i=r.geometry?[r.geometry]:[];return t.responseType="json",E(i,null,t).then(u=>{const y=u?.[0];y!=null&&((r=r.clone()).geometry=y);const m=x({...l.query,f:n,...e,...O(r,e)});return c(F(l.path,"queryTopFeatures"),{...t,query:{...m,...t.query}})})}export{h as B,w as R,I as S,b as g};
