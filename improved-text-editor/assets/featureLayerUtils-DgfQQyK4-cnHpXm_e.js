const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./editingSupport-gUqP9iyf-Bv-nIa7g.js","./main-CaWWi_jZ.js","./main-D2HtlAsr.css","./uuid-Dj9mdEVg-BaKSCiyT.js","./normalizeUtils-Bxmy9MNI-DaSIHsQi.js","./normalizeUtilsCommon-CRJlkfEA-D28GUlBd.js","./utils-9sQxfkoa-e50_pXDU.js","./utils-Bq23Xwmj-CRR7qGso.js","./EditBusLayer-Df29OyJh-BrnxUc7p.js","./infoFor3D-DIuYZyyK-BtH19JJ7.js"])))=>i.map(i=>d[i]);
import{aK as A,o as s,_ as g,eM as v,eN as P,eO as j,d4 as L,ep as E,eP as R,V as m,dr as C}from"./main-CaWWi_jZ.js";import{s as S}from"./uuid-Dj9mdEVg-BaKSCiyT.js";import{p as I,a as F}from"./Field-C6hA1tZj-D2fqHTUP.js";import{b as f}from"./Query-BrwMGK8U-Bsiezx7-.js";import{p as _}from"./jsonUtils-C64Zfu7c-DHNpy5Jp.js";import{d as M}from"./UniqueValueRenderer-fS5V0Ej1-C5L_NW_k.js";import{c as T,d as x}from"./RelationshipQuery-DJsz3K0U-D43WmejM.js";async function V(t,e,r){e=e.clone(),t.capabilities.query.supportsMaxRecordCountFactor&&(e.maxRecordCountFactor=q(t));const n=D(t),a=t.capabilities.query.supportsPagination;e.start=0,e.num=n;let o=null;for(;;){const i=await t.source.queryFeaturesJSON(e,r);if(o==null?o=i:o.features=o.features.concat(i.features),o.exceededTransferLimit=i.exceededTransferLimit,!a||!i.exceededTransferLimit)break;e.start+=n}return o}function D(t){return q(t)*N(t)}function N(t){return t.capabilities.query.maxRecordCount||2e3}function q(t){return t.capabilities.query.supportsMaxRecordCountFactor?f.MAX_MAX_RECORD_COUNT_FACTOR:1}const K=new A({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch"});async function W(t,e,r,n){const a=await d(t);if(await w(t,e,n),!a.addAttachment)throw new s(n,"Layer source does not support addAttachment capability");return a.addAttachment(e,r)}function w(t,e,r){const{attributes:n}=e,{objectIdField:a}=t;return t.capabilities?.data?.supportsAttachment?e?n?a&&n[a]?Promise.resolve():Promise.reject(new s(r,`feature is missing the identifying attribute ${a}`)):Promise.reject(new s(r,"'attributes' are required on a feature to query attachments")):Promise.reject(new s(r,"A feature is required to add/delete/update attachments")):Promise.reject(new s(r,"this layer doesn't support attachments"))}async function Y(t,e,r,n,a){const o=await d(t);if(await w(t,e,a),!o.updateAttachment)throw new s(a,"Layer source does not support updateAttachment capability");return o.updateAttachment(e,r,n)}async function tt(t,e,r){const{applyEdits:n}=await g(()=>import("./editingSupport-gUqP9iyf-Bv-nIa7g.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]),import.meta.url),a=await t.load();let o=r;return a.type==="feature"&&a.infoFor3D&&e.deleteFeatures!=null&&a.globalIdField!=null&&(o={...o,globalIdToObjectId:await $(a,e.deleteFeatures,a.globalIdField)}),n(a,a.source,e,r)}async function et(t,e,r){const{uploadAssets:n}=await g(()=>import("./editingSupport-gUqP9iyf-Bv-nIa7g.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]),import.meta.url),a=await t.load();return n(a,a.source,e,r)}async function nt(t,e,r,n){const a=await d(t);if(await w(t,e,n),!a.deleteAttachments)throw new s(n,"Layer source does not support deleteAttachments capability");return a.deleteAttachments(e,r)}async function rt(t,e,r){const n=(await t.load({signal:e?.signal})).source;if(!n.fetchRecomputedExtents)throw new s(r,"Layer source does not support fetchUpdates capability");return n.fetchRecomputedExtents(e)}async function at(t,e,r,n){e=T.from(e),await t.load();const a=t.source,o=t.capabilities;if(!o?.data?.supportsAttachment)throw new s(n,"this layer doesn't support attachments");const{attachmentTypes:i,objectIds:l,globalIds:y,num:u,size:c,start:p,where:b}=e;if(!o?.operations?.supportsQueryAttachments&&(i?.length>0||y?.length>0||c?.length>0||u||p||b))throw new s(n,"when 'capabilities.operations.supportsQueryAttachments' is false, only objectIds is supported",e);if(!(l?.length||y?.length||b))throw new s(n,"'objectIds', 'globalIds', or 'where' are required to perform attachment query",e);if(!a.queryAttachments)throw new s(n,"Layer source does not support queryAttachments capability",e);return a.queryAttachments(e)}async function ot(t,e,r,n){const a=await d(t);if(!a.queryObjectIds)throw new s(n,"Layer source does not support queryObjectIds capability");return a.queryObjectIds(f.from(e)??t.createQuery(),r)}async function st(t,e,r,n){const a=await d(t);if(!a.queryFeatureCount)throw new s(n,"Layer source does not support queryFeatureCount capability");return a.queryFeatureCount(f.from(e)??t.createQuery(),r)}async function it(t,e,r,n){const a=await d(t);if(!a.queryExtent)throw new s(n,"Layer source does not support queryExtent capability");return a.queryExtent(f.from(e)??t.createQuery(),r)}async function ut(t,e,r,n){const a=await d(t);if(!a.queryRelatedFeatures)throw new s(n,"Layer source does not support queryRelatedFeatures capability");return a.queryRelatedFeatures(x.from(e),r)}async function ct(t,e,r,n){const a=await d(t);if(!a.queryRelatedFeaturesCount)throw new s(n,"Layer source does not support queryRelatedFeaturesCount capability");return a.queryRelatedFeaturesCount(x.from(e),r)}async function lt(t){const e=t.source;if(e?.refresh)try{const{dataChanged:r,updates:n}=await e.refresh();if(n!=null&&(t.sourceJSON={...t.sourceJSON,...n},t.read(n,{origin:"service",url:t.parsedUrl})),r)return!0}catch{}if(t.definitionExpression)try{return(await v(t.definitionExpression,t.fieldsIndex)).hasDateFunctions}catch{}return!1}function pt(t){const e=new f,r=t.capabilities?.data,n=t.capabilities?.query;e.historicMoment=t.historicMoment,e.gdbVersion=t.gdbVersion,e.returnGeometry=!0,n&&(e.compactGeometryEnabled=n.supportsCompactGeometry,e.defaultSpatialReferenceEnabled=n.supportsDefaultSpatialReference),r&&(r.supportsZ&&t.returnZ!=null&&(e.returnZ=t.returnZ),r.supportsM&&t.returnM!=null&&(e.returnM=t.returnM)),e.outFields=["*"];const{timeOffset:a,timeExtent:o}=t;return e.timeExtent=a!=null&&o!=null?o.offset(-a.value,a.unit):o||null,e.multipatchOption=t.geometryType==="multipatch"?"xyFootprint":null,e}function dt(t){const{globalIdField:e,fields:r}=t;if(e)return e;if(r){for(const n of r)if(n.type==="esriFieldTypeGlobalID")return n.name}}function ft(t){const{objectIdField:e,fields:r}=t;if(e)return e;if(r){for(const n of r)if(n.type==="esriFieldTypeOID")return n.name}}function yt(t){return t.currentVersion?t.currentVersion:t.hasOwnProperty("capabilities")||t.hasOwnProperty("drawingInfo")||t.hasOwnProperty("hasAttachments")||t.hasOwnProperty("htmlPopupType")||t.hasOwnProperty("relationships")||t.hasOwnProperty("timeInfo")||t.hasOwnProperty("typeIdField")||t.hasOwnProperty("types")?10:9.3}function mt(t,e){const{subtypes:r,subtypeField:n}=t;if(!e?.attributes||!r?.length||!n)return null;const a=e.attributes[n];return a==null?null:r.find(o=>o.code===a)}function ht(t,e){const{fieldsIndex:r,subtypeField:n}=t,{name:a,type:o}=r.get(e)??{};if(!a)return null;if((n&&r.get(n)?.name)===a&&t.subtypes?.length){const i=t.subtypes.map(l=>new I({code:O(l.code,o),name:l.name}));if(i?.length)return new F({codedValues:i})}return null}function wt(t,e){const{fieldsIndex:r}=t,{name:n,type:a}=r.get(e)??{};if(!n)return null;if(("typeIdField"in t?r.get(t.typeIdField)?.name:null)===n&&"types"in t&&t.types?.length){const o=t.types.map(i=>new I({code:O(i.id,a),name:i.name}));return new F({codedValues:o})}return null}function O(t,e){return e?P({type:e})&&typeof t=="number"?`${t}`:j({type:e})&&typeof t=="string"?Number.parseInt(t,10):t:t}async function d(t){return(await t.load()).source}async function G(t,e){if(!m||m.findCredential(t))return;let r;try{const n=await C(t,e);n&&(r=await m.checkSignInStatus(`${n}/sharing`))}catch{}if(r)try{const n=e!=null?e.signal:null;await m.getCredential(t,{signal:n})}catch{}}async function bt(t,e,r){const n=t.parsedUrl?.path;n&&t.authenticationTriggerEvent===e&&await G(n,r)}function gt(t){return!Q(t)&&(t.userHasUpdateItemPrivileges||t.editingEnabled)}const h=L({types:E});function It(t,e){if(t.defaultSymbol)return t.types?.length?new M({defaultSymbol:h(t.defaultSymbol,t,e),field:t.typeIdField,uniqueValueInfos:t.types.map(r=>({id:r.id,symbol:h(r.symbol,r,e)}))}):new _({symbol:h(t.defaultSymbol,t,e)})}function Ft(t){let e=t.sourceJSON?.cacheMaxAge;if(!e)return!1;const r=t.editingInfo?.lastEditDate?.getTime();return r==null||(e*=1e3,Date.now()-r<e)}async function $(t,e,r){if(e==null)return null;const n=[],{objectIdField:a}=t;if(e.forEach(u=>{let c=null;if("attributes"in u){const{attributes:p}=u;c={globalId:p[r],objectId:p[a]!=null&&p[a]!==-1?p[a]:null}}else c={globalId:u.globalId,objectId:u.objectId!=null&&u.objectId!==-1?u.objectId:null};c.globalId!=null&&(c.objectId!=null&&c.objectId!==-1||n.push(c.globalId))}),n.length===0)return null;const o=t.createQuery();o.where=n.map(u=>`${r}='${u}'`).join(" OR "),o.returnGeometry=!1,o.outFields=[a,r],o.cacheHint=!1;const i=await R(V(t,o));if(!i.ok)return null;const l=new Map,y=i.value.features;for(const u of y){const c=u.attributes[r],p=u.attributes[a];c!=null&&p!=null&&p!==-1&&l.set(S(c),p)}return l}function xt(t,e,r){if(!e||!r||!t)return null;const n=r.getAttribute(e);return n==null?null:t.find(a=>{const{id:o}=a;return o!=null&&o.toString()===n.toString()})??null}function Q(t){return t.sourceJSON?.isMultiServicesView||J(t)}function J(t){return!!t.sourceJSON?.capabilities?.toLowerCase().split(",").map(e=>e.trim()).includes("map")}function qt(t,e,r){const n=e?.queryBins;if(!n)throw new s(r,"Layer source does not support binning");switch(t.binParameters.type){case"auto-interval":if(!n.supportsAutoInterval)throw new s(r,"Layer source does not support auto-interval binning");break;case"date":if(!n.supportsDate)throw new s(r,"Layer source does not support date binning");break;case"fixed-boundaries":if(!n.supportsFixedBoundaries)throw new s(r,"Layer source does not support fixed-boundaries binning");break;case"fixed-interval":if(!n.supportsFixedInterval)throw new s(r,"Layer source does not support fixed-interval binning")}const a=n?.supportedStatistics;if(t.outStatistics&&a){const o=new Map([["count","count"],["sum","sum"],["min","min"],["max","max"],["avg","avg"],["stddev","stddev"],["var","var"],["percentile-continuous","percentileContinuous"],["percentile-discrete","percentileDiscrete"],["centroid-aggregate","centroid"],["convex-hull-aggregate","convexHull"],["envelope-aggregate","envelope"]]);for(const{statisticType:i}of t.outStatistics){const l=o.get(i);if(l&&!a[l])throw new s(r,`Layer source does not support ${i} statistic type`)}}}export{Y as $,$ as A,at as B,ot as H,st as K,Q as O,W as Q,tt as U,ut as W,it as X,ct as Y,et as Z,nt as _,yt as a,bt as c,Ft as d,lt as e,xt as f,wt as i,K as k,gt as l,qt as m,dt as n,mt as o,It as p,ft as r,ht as s,pt as t,rt as z};
