import{aQ as p,v as t,S as s,i as a,o as l}from"./main-Dph3xG49.js";import{m as y}from"./MultiOriginJSONSupport-DKRh9P6w-CcBdpzuV.js";import{D as m}from"./Layer-ChoECxvZ-CpN4NAR4.js";import{C as u}from"./PortalLayer-CElnYuSQ-BiqIO5bH.js";import"./TimeExtent-Cn0Jofqr-DUFEaBxg.js";import"./PortalItem-CctGdnxF-D7o4Fqb4.js";import"./portalItemUtils-B8bw6SAG-DK6kDx-I.js";import"./projection-BA9M1R7d-DAEw6OHS.js";import"./projectBuffer-CvCBvJ6W-BFUqJjz1.js";let e=class extends u(y(m)){constructor(o){super(o),this.resourceInfo=null,this.type="unknown"}initialize(){this.addResolvingPromise(new Promise((o,r)=>{p(()=>{const n=this.resourceInfo&&(this.resourceInfo.layerType||this.resourceInfo.type);let i="Unknown layer type";n&&(i+=" "+n),r(new l("layer:unknown-layer-type",i,{layerType:n}))})}))}read(o,r){super.read({resourceInfo:o},r)}write(o,r){return null}};t([s({readOnly:!0})],e.prototype,"resourceInfo",void 0),t([s({type:["show","hide"]})],e.prototype,"listMode",void 0),t([s({json:{read:!1},readOnly:!0,value:"unknown"})],e.prototype,"type",void 0),e=t([a("esri.layers.UnknownLayer")],e);const O=e;export{O as default};
