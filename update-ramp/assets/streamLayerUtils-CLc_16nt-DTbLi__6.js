import{C as m,D as p}from"./utils-BVWK2jiA-CGtWPnt9.js";import{S as u,l as c,u as y,E as i}from"./portalItemUtils-B8bw6SAG-BZzOLQXw.js";import"./main-CJueYQxD.js";import"./originUtils-BLsWtgV9-B4sclfuf.js";import"./multiOriginJSONSupportUtils-DGETddQl-BrWaY9_8.js";import"./PortalItem-CctGdnxF-h5IZ14b9.js";import"./jsonContext-BA8GHqVk-BiM2eGtR.js";import"./saveUtils-CIYk-dsQ-DeTZfu7F.js";import"./projection-BA9M1R7d-MtiC3YOi.js";import"./projectBuffer-CvCBvJ6W-D1GMAOjG.js";const o="Stream Service",d="Feed",f="stream-layer-save",v="stream-layer-save-as";function l(r){return{isValid:r.type==="stream"&&!!r.url&&!r.webSocketUrl,errorMessage:"Stream layer should be created using a url to a stream service"}}function n(r){const e=r.layerJSON;return Promise.resolve(e&&Object.keys(e).length?e:null)}async function x(r,e){const{parsedUrl:t,title:s,fullExtent:a}=r;e.url=t.path,e.title||=s,e.extent=null,a!=null&&(e.extent=await u(a)),c(e,i.METADATA),y(e,i.SINGLE_LAYER)}async function g(r,e){return m({layer:r,itemType:o,additionalItemType:d,validateLayer:l,createItemData:n,errorNamePrefix:f},e)}async function h(r,e,t){return p({layer:r,itemType:o,validateLayer:l,createItemData:n,errorNamePrefix:v,newItem:e,setItemProperties:x},t)}export{g as save,h as saveAs};
