import{v as a,S as l,i as m,j as u,bV as c}from"./main-DzfxInI5.js";import{b as p}from"./scaleUtils-DxsfQwK1-CI9BE-G9.js";import{e as y}from"./floorFilterUtils-4r-vVdzs-C43jLoAE.js";import{s as b}from"./sublayerUtils-CyM0QC5B-CQa5AmZv.js";const d={visible:"visibleSublayers",definitionExpression:"layerDefs",labelingInfo:"hasDynamicLayers",labelsVisible:"hasDynamicLayers",opacity:"hasDynamicLayers",minScale:"visibleSublayers",maxScale:"visibleSublayers",renderer:"hasDynamicLayers",source:"hasDynamicLayers"};let i=class extends u{constructor(e){super(e),this.floors=null,this.scale=0}destroy(){this.layer=null}get dynamicLayers(){if(!this.hasDynamicLayers)return null;const e=this.visibleSublayers.map(r=>{const t=y(this.floors,r);return r.toExportImageJSON(t)});return e.length?JSON.stringify(e):null}get hasDynamicLayers(){return this.layer&&b(this.visibleSublayers,this.layer.serviceSublayers,this.layer.gdbVersion)}set layer(e){this._get("layer")!==e&&(this._set("layer",e),this.removeHandles("layer"),e&&this.addHandles([e.allSublayers.on("change",()=>this.notifyChange("visibleSublayers")),e.on("sublayer-update",r=>this.notifyChange(d[r.propertyName]))],"layer"))}get layers(){const e=this.visibleSublayers;return e?e.length?"show:"+e.map(r=>r.id).join(","):"show:-1":null}get layerDefs(){const e=!!this.floors?.length,r=this.visibleSublayers.filter(t=>t.definitionExpression!=null||e&&t.floorInfo!=null);return r.length?JSON.stringify(r.reduce((t,n)=>{const o=y(this.floors,n),s=c(o,n.definitionExpression);return s!=null&&(t[n.id]=s),t},{})):null}get version(){this.commitProperty("layers"),this.commitProperty("layerDefs"),this.commitProperty("dynamicLayers");const e=this.layer;return e&&(e.commitProperty("dpi"),e.commitProperty("imageFormat"),e.commitProperty("imageTransparency"),e.commitProperty("gdbVersion")),(this._get("version")||0)+1}get visibleSublayers(){const e=[];if(!this.layer)return e;const r=this.layer.sublayers,t=this.scale,n=s=>{s.visible&&(t===0||p(t,s.minScale,s.maxScale))&&(s.sublayers?s.sublayers.forEach(n):e.unshift(s))};r&&r.forEach(n);const o=this._get("visibleSublayers");return!o||o.length!==e.length||o.some((s,h)=>e[h]!==s)?e:o}toJSON(){const e=this.layer;let r={dpi:e.dpi,format:e.imageFormat,transparent:e.imageTransparency,gdbVersion:e.gdbVersion||null};return this.hasDynamicLayers&&this.dynamicLayers?r.dynamicLayers=this.dynamicLayers:r={...r,layers:this.layers,layerDefs:this.layerDefs},r}};a([l({readOnly:!0})],i.prototype,"dynamicLayers",null),a([l()],i.prototype,"floors",void 0),a([l({readOnly:!0})],i.prototype,"hasDynamicLayers",null),a([l()],i.prototype,"layer",null),a([l({readOnly:!0})],i.prototype,"layers",null),a([l({readOnly:!0})],i.prototype,"layerDefs",null),a([l({type:Number})],i.prototype,"scale",void 0),a([l({readOnly:!0})],i.prototype,"version",null),a([l({readOnly:!0})],i.prototype,"visibleSublayers",null),i=a([m("esri.layers.support.ExportImageParameters")],i);export{i as r};
