import{C as y,D as n}from"./utils-BVWK2jiA-CAq2E78t.js";import{S as p,l as c,L as u,E as i}from"./portalItemUtils-B8bw6SAG-st604wb_.js";import"./main-8gcLRx1v.js";import"./originUtils-BLsWtgV9-B4sclfuf.js";import"./multiOriginJSONSupportUtils-DGETddQl-BrWaY9_8.js";import"./PortalItem-CctGdnxF-CePmfc6n.js";import"./jsonContext-BA8GHqVk-BtwbWRlq.js";import"./saveUtils-CIYk-dsQ-Bk0Wdr5p.js";import"./projection-BA9M1R7d-Di6ZS0V1.js";import"./projectBuffer-CvCBvJ6W-BesdUF9o.js";const s="Image Service",g="imagery-layer-save",v="imagery-layer-save-as",f="imagery-tile-layer-save",d="imagery-tile-layer-save-as";function m(t){if(t.type==="imagery")return{isValid:!0};const{raster:e}=t,r=e?.datasetFormat==="Function"?e.primaryRasters?.rasters[0]:e;return{isValid:r?.datasetFormat==="RasterTileServer"&&(r.tileType==="Raster"||r.tileType==="Map"),errorMessage:"imagery tile layer should be created from a tiled image service."}}function o(t){const e=t.layerJSON;return Promise.resolve(e&&Object.keys(e).length?e:null)}async function T(t,e){const{parsedUrl:r,title:a,fullExtent:l}=t;e.url=r.path,e.title||=a;try{e.extent=await p(l)}catch{e.extent=void 0}c(e,i.METADATA),u(e,i.TILED_IMAGERY,t.type==="imagery-tile")}async function S(t,e){const r=t.type==="imagery"?g:f;return y({layer:t,itemType:s,validateLayer:m,createItemData:o,errorNamePrefix:r},e)}async function F(t,e,r){const a=t.type==="imagery"?v:d;return n({layer:t,itemType:s,validateLayer:m,createItemData:o,errorNamePrefix:a,newItem:e,setItemProperties:T},r)}export{S as save,F as saveAs};
