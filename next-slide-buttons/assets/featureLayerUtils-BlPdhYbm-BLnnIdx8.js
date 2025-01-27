import{jc as P,hq as w,ao as $}from"./main-CSyv-l2o.js";import{C as N,D as O}from"./utils-BVWK2jiA-CjqKin24.js";import{i as R}from"./arcgisLayerUrl-HNYh8jvG-CyUNbPxH.js";import{d as x,p as D,g}from"./fetchService-DbaKmJhP-DkoX_9Vq.js";import{S as J,l as d,u as M,L as f,E as l}from"./portalItemUtils-B8bw6SAG-Zl08y7Qr.js";import"./originUtils-BLsWtgV9-B4sclfuf.js";import"./multiOriginJSONSupportUtils-DGETddQl-BrWaY9_8.js";import"./PortalItem-CctGdnxF-B-MpVERN.js";import"./jsonContext-BA8GHqVk-BDLVQSqY.js";import"./saveUtils-CIYk-dsQ-B58E2mHG.js";import"./projection-BA9M1R7d-8HGEzInK.js";import"./projectBuffer-CvCBvJ6W-CfBgzyx5.js";const T="Feature Service",A="feature-layer-utils",Y=`${A}-save`,_=`${A}-save-as`;function h(e){return{isValid:P(e)&&(!("dynamicDataSource"in e)||!e.dynamicDataSource),errorMessage:"Feature layer should be a layer or table in a map or feature service"}}function b(e){const t=[],a=[];for(const{layer:r,layerJSON:o}of e)r.isTable?a.push(o):t.push(o);return{layers:t,tables:a}}function L(e){return b([e])}async function F(e,t){return/\/\d+\/?$/.test(e.url)?L(t[0]):G(t,e)}async function G(e,t){if(e.reverse(),!t)return b(e);const a=await K(t,e);for(const r of e)v(r.layer,r.layerJSON,a);return q(a,e),a}async function K(e,t){let a=await e.fetchData("json");if(j(a))return a;a||={},C(a);const{layer:{url:r,customParameters:o,apiKey:s}}=t[0];return await B(a,{url:r??"",customParameters:o,apiKey:s},t.map(n=>n.layer.layerId)),a}function j(e){return!!(e&&Array.isArray(e.layers)&&Array.isArray(e.tables))}function C(e){e.layers||=[],e.tables||=[]}function q(e,t){const a=[],r=[];for(const{layer:o}of t){const{isTable:s,layerId:n}=o;s?r.push(n):a.push(n)}m(e.layers,a),m(e.tables,r)}function m(e,t){if(e.length<2)return;const a=[];for(const{id:r}of e)a.push(r);w(a.sort(p),t.slice().sort(p))&&e.sort((r,o)=>{const s=t.indexOf(r.id),n=t.indexOf(o.id);return s<n?-1:s>n?1:0})}function p(e,t){return e<t?-1:e>t?1:0}async function B(e,t,a){const{url:r,customParameters:o,apiKey:s}=t,{serviceJSON:n,layersJSON:i}=await x(r,{customParameters:o,apiKey:s}),c=E(e.layers,n.layers,a),u=E(e.tables,n.tables,a);e.layers=c.itemResources,e.tables=u.itemResources;const y=[...c.added,...u.added],S=i?[...i.layers,...i.tables]:[];await U(e,y,r,S)}function E(e,t,a){const r=$(e,t,(s,n)=>s.id===n.id);e=e.filter(s=>!r.removed.some(n=>n.id===s.id));const o=r.added;return o.forEach(({id:s})=>{e.push({id:s})}),{itemResources:e,added:o.filter(({id:s})=>!a.includes(s))}}async function U(e,t,a,r){const o=await V(t),s=t.map(({id:n,type:i})=>new(o.get(i))({url:a,layerId:n,sourceJSON:r.find(({id:c})=>c===n)}));await Promise.allSettled(s.map(n=>n.load())),s.forEach(n=>{const{layerId:i,loaded:c,defaultPopupTemplate:u}=n;if(!c||u==null)return;const y={id:i,popupInfo:u.toJSON()};n.operationalLayerType!=="ArcGISFeatureLayer"&&(y.layerType=n.operationalLayerType),v(n,y,e)})}async function V(e){const t=[];e.forEach(({type:o})=>{const s=g(o),n=D[s];t.push(n())});const a=await Promise.all(t),r=new Map;return e.forEach(({type:o},s)=>{r.set(o,a[s])}),r}function v(e,t,a){e.isTable?I(a.tables,t):I(a.layers,t)}function I(e,t){const a=e.findIndex(({id:r})=>r===t.id);a===-1?e.push(t):e[a]=t}function Z(e,t){const a=e.layers.some(r=>r.layerType==="OrientedImageryLayer");f(t,l.ORIENTED_IMAGERY_LAYER,a)}function k(e,t){const a=e.some(r=>r.type==="oriented-imagery");f(t,l.ORIENTED_IMAGERY_LAYER,a)}async function z(e,t,a){Z(a,t)}async function H(e,t){const{url:a,layerId:r,title:o,fullExtent:s,isTable:n}=e,i=R(a);t.url=(i?.serverType==="FeatureServer"?a:`${a}/${r}`)??null,t.title||=o,t.extent=null,n||s==null||(t.extent=await J(s)),d(t,l.METADATA),d(t,l.MULTI_LAYER),M(t,l.SINGLE_LAYER),f(t,l.TABLE,n),k([e],t)}async function le(e,t){return N({layer:e,itemType:T,validateLayer:h,createItemData:(a,r)=>F(r,[a]),errorNamePrefix:Y,setItemProperties:z},t)}async function ue(e,t,a){return O({layer:e,itemType:T,validateLayer:h,createItemData:(r,o)=>Promise.resolve(L(r)),errorNamePrefix:_,newItem:t,setItemProperties:H},a)}export{le as save,ue as saveAs};
