import{v as t,S as i,a0 as a,i as l,em as u}from"./main-PWjwnDMV.js";import{s as y}from"./commonProperties-BtIqvFU_-NVGpN57p.js";import{r as m,w as d,v as w}from"./TimeInfo-w_HB2CsF-CkhjIfJq.js";import{k as x}from"./TimeExtent-Cn0Jofqr-BjQCS4sW.js";const O={type:Boolean,json:{read:{source:"timeAnimation"},write:{target:"timeAnimation",layerContainerTypes:y}}},T=p=>{let e=class extends p{constructor(){super(...arguments),this.timeExtent=null,this.timeOffset=null,this.useViewTime=!0}readOffset(o,f){const r=f.timeInfo.exportOptions;if(!r)return null;const n=r.timeOffset,s=w.fromJSON(r.timeOffsetUnits);return n&&s?new m({value:n,unit:s}):null}set timeInfo(o){u(o,this.fieldsIndex),this._set("timeInfo",o)}};return t([i({type:x,json:{write:!1}})],e.prototype,"timeExtent",void 0),t([i({type:m})],e.prototype,"timeOffset",void 0),t([a("service","timeOffset",["timeInfo.exportOptions"])],e.prototype,"readOffset",null),t([i({value:null,type:d,json:{write:!0,origins:{"web-document":{read:!1,write:!1},"portal-item":{read:!1,write:!1}}}})],e.prototype,"timeInfo",null),t([i(O)],e.prototype,"useViewTime",void 0),e=t([l("esri.layers.mixins.TemporalLayer")],e),e};export{O as m,T as x};
