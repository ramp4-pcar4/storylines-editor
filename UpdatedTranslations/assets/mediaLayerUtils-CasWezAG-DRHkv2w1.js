import{C as c,D as y}from"./utils-BVWK2jiA-DPQsJIcG.js";import{i as f}from"./jsonContext-BA8GHqVk-Dw3uuYtF.js";import{S as d,l as v,E as x}from"./portalItemUtils-B8bw6SAG-Cs_YrdZM.js";import{T as o}from"./resourceUtils-BmW6QqlX-CaAIKBqe.js";import"./main-YbCtmqIL.js";import"./originUtils-BLsWtgV9-B4sclfuf.js";import"./multiOriginJSONSupportUtils-DGETddQl-BrWaY9_8.js";import"./PortalItem-CctGdnxF-CSNfUncK.js";import"./saveUtils-CIYk-dsQ-C1fU7tpy.js";import"./projection-BA9M1R7d-eP4tAA5p.js";import"./projectBuffer-CvCBvJ6W-Cf0LWf3a.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./resourceUtils-rTM6Iemx-m-8i0aRV.js";const i="Media Layer",E="media-layer-save",T="media-layer-save-as",s=["media-layer:unsupported-source"];function n(e){return{isValid:e.type==="media",errorMessage:"Layer.type should be 'media'"}}function m(e){return f(e,"portal-item",!0)}function p(e){return Promise.resolve(e.layerJSON)}async function u(e,r){r.extent=e.fullExtent?await d(e.fullExtent):null}async function I(e,r){r.title||=e.title,await u(e,r),v(r,x.METADATA)}async function U(e,r){return c({layer:e,itemType:i,validateLayer:n,createJSONContext:t=>m(t),createItemData:p,errorNamePrefix:E,supplementalUnsupportedErrors:s,setItemProperties:u,saveResources:(t,a)=>o(e.resourceReferences,a)},r)}async function b(e,r,t){return y({layer:e,itemType:i,validateLayer:n,createJSONContext:a=>m(a),createItemData:p,errorNamePrefix:T,supplementalUnsupportedErrors:s,newItem:r,setItemProperties:I,saveResources:(a,l)=>o(e.resourceReferences,l)},t)}export{U as save,b as saveAs};
