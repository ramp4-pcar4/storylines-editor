import{gK as n,W as p,f as y,dQ as m,C as u,v as o,S as i,a0 as d,n as h,i as c,et as a,eB as f,fc as S,eD as g,eC as v}from"./main-BeHOkNcW.js";import{m as C}from"./MultiOriginJSONSupport-DKRh9P6w-COMdjHif.js";import{D as b}from"./Layer-ChoECxvZ-CXNltAcP.js";import{u as G}from"./BlendLayer-D1WkSmwP-SI_Mae1u.js";import{E as F}from"./OperationalLayer-B5IXiMa2-CLfQsOPO.js";import{C as _}from"./PortalLayer-CElnYuSQ-Cvcu9OdR.js";import{T as x}from"./RefreshableLayer-a8BQ58Xh-gjTO2UxJ.js";import{S as E}from"./ScaleRangeLayer-Bz0DcnvM-DJHJhzHr.js";import{e as P,_ as k,Z as w}from"./commonProperties-BtIqvFU_-BcbRVFT-.js";import"./TimeExtent-Cn0Jofqr-C_U19-xI.js";import"./jsonUtils-wIllKWI4-CHr5Lqnl.js";import"./parser-DyDJ-rlI-DlmL5WbF.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-BOk1KVYm.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./PortalItem-CctGdnxF-DAhyzDGF.js";import"./portalItemUtils-B8bw6SAG-BGX9JXJQ.js";import"./projection-BA9M1R7d-Y0Nkchuw.js";import"./projectBuffer-CvCBvJ6W-CKax217x.js";import"./ElevationInfo-yv2-9tj6-DCeJY3Dy.js";import"./lengthUtils-DKpMe5qR-DOl54Qyt.js";const R=["atom","xml"],j={base:a,key:"type",typeMap:{"simple-line":f},errorContext:"symbol"},D={base:a,key:"type",typeMap:{"picture-marker":S,"simple-marker":g},errorContext:"symbol"},M={base:a,key:"type",typeMap:{"simple-fill":v},errorContext:"symbol"};let t=class extends G(x(F(_(E(C(b)))))){constructor(...e){super(...e),this.description=null,this.fullExtent=null,this.legendEnabled=!0,this.lineSymbol=null,this.pointSymbol=null,this.polygonSymbol=null,this.operationalLayerType="GeoRSS",this.url=null,this.type="geo-rss"}normalizeCtorArgs(e,r){return typeof e=="string"?{url:e,...r}:e}readFeatureCollections(e,r){return r.featureCollection.layers.forEach(s=>{const l=s.layerDefinition.drawingInfo.renderer.symbol;l&&l.type==="esriSFS"&&l.outline?.style.includes("esriSFS")&&(l.outline.style="esriSLSSolid")}),r.featureCollection.layers}get hasPoints(){return this._hasGeometry("esriGeometryPoint")}get hasPolylines(){return this._hasGeometry("esriGeometryPolyline")}get hasPolygons(){return this._hasGeometry("esriGeometryPolygon")}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?n(this.url,R)||"GeoRSS":e}set title(e){this._set("title",e)}load(e){const r=e!=null?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service","Feature Service","Feature Collection","Scene Service"]},e).catch(p).then(()=>this._fetchService(r)).then(s=>{this.read(s,{origin:"service"})})),Promise.resolve(this)}async hasDataChanged(){const e=await this._fetchService();return this.read(e,{origin:"service",ignoreDefaults:!0}),!0}async _fetchService(e){const r=this.spatialReference,{data:s}=await y(u.geoRSSServiceUrl,{query:{url:this.url,refresh:!!this.loaded||void 0,outSR:m(r)?void 0:r.wkid??JSON.stringify(r)},signal:e});return s}_hasGeometry(e){return this.featureCollections?.some(r=>r.featureSet?.geometryType===e&&r.featureSet.features?.length>0)??!1}};o([i()],t.prototype,"description",void 0),o([i()],t.prototype,"featureCollections",void 0),o([d("service","featureCollections",["featureCollection.layers"])],t.prototype,"readFeatureCollections",null),o([i({type:h,json:{name:"lookAtExtent"}})],t.prototype,"fullExtent",void 0),o([i(P)],t.prototype,"id",void 0),o([i(k)],t.prototype,"legendEnabled",void 0),o([i({types:j,json:{write:!0}})],t.prototype,"lineSymbol",void 0),o([i({type:["show","hide"]})],t.prototype,"listMode",void 0),o([i({types:D,json:{write:!0}})],t.prototype,"pointSymbol",void 0),o([i({types:M,json:{write:!0}})],t.prototype,"polygonSymbol",void 0),o([i({type:["GeoRSS"]})],t.prototype,"operationalLayerType",void 0),o([i(w)],t.prototype,"url",void 0),o([i({json:{origins:{service:{read:{source:"name",reader:e=>e||void 0}}}}})],t.prototype,"title",null),o([i({readOnly:!0,json:{read:!1},value:"geo-rss"})],t.prototype,"type",void 0),t=o([c("esri.layers.GeoRSSLayer")],t);const te=t;export{te as default};
