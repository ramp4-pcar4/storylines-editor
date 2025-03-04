const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./visualVariableUtils-D3kZJRyn-DbXWzWQN.js","./main-Csa2lEpO.js","./main-C_VpDndL.css","./compilerUtils-CV1QYWI8-CS0r1gya.js","./lengthUtils-DKpMe5qR-DXDAEdXh.js","./sizeVariableUtils-t52KcLLi-D0hbQF8b.js"])))=>i.map(i=>d[i]);
import{v as a,S as p,af as X,g as Y,ac as U,n as J,J as ee,i as I,bi as Q,a0 as te,e as B,aO as re,ek as ie,j as se,bp as oe,ai as ne,o as A,ag as ae,aq as T,a2 as k,eD as M,_ as le,an as pe,p as ue,K as ye,$ as L,eH as ce,bV as z,ex as he,f as de,bK as fe,bM as me}from"./main-Csa2lEpO.js";import{a8 as ge}from"./languageUtils-BYxF9hRA-CbGa4cRq.js";import{f as we,c as be}from"./scaleUtils-DxsfQwK1-D47S70rF.js";import{e as N}from"./floorFilterUtils-4r-vVdzs-C43jLoAE.js";import{y as $}from"./drapedUtils-BZ1SGPtE-wAUYi4Tv.js";import{B as ve}from"./normalizeUtils-Bxmy9MNI-CxqBL-_M.js";import{y as xe,n as Se,a as Fe}from"./utils-9sQxfkoa-zpI_pnji.js";import{s as Oe}from"./sublayerUtils-CyM0QC5B-D3DFpTZc.js";import{k as je}from"./TimeExtent-Cn0Jofqr-5kMZKCzf.js";import{h as Ee,m as Re}from"./popupUtils-nV1O8RUO-BtCXbrhq.js";function _e(t,e){const{dpi:i,gdbVersion:o,geometry:r,geometryPrecision:n,height:s,historicMoment:d,layerOption:u,mapExtent:l,maxAllowableOffset:y,returnFieldName:c,returnGeometry:m,returnUnformattedValues:x,returnZ:f,spatialReference:F,timeExtent:w,tolerance:g,width:b}=t.toJSON(),{dynamicLayers:j,layerDefs:E,layerIds:V}=Pe(t),q=e?.geometry!=null?e.geometry:null,v={historicMoment:d,geometryPrecision:n,maxAllowableOffset:y,returnFieldName:c,returnGeometry:m,returnUnformattedValues:x,returnZ:f,tolerance:g},R=q?.toJSON()||r;v.imageDisplay=`${b},${s},${i}`,o&&(v.gdbVersion=o),R&&(delete R.spatialReference,v.geometry=JSON.stringify(R),v.geometryType=fe(R));const G=F??R?.spatialReference??l?.spatialReference;if(G&&(v.sr=me(G)),v.time=w?[w.start,w.end].join(","):null,l){const{xmin:Z,ymin:C,xmax:K,ymax:W}=l;v.mapExtent=`${Z},${C},${K},${W}`}return E&&(v.layerDefs=E),j&&!E&&(v.dynamicLayers=j),v.layers=u==="popup"?"visible":u,V&&!j&&(v.layers+=`:${V.join(",")}`),v}function Pe(t){const{mapExtent:e,floors:i,width:o,sublayers:r,layerIds:n,layerOption:s,gdbVersion:d}=t,u=r?.find(f=>f.layer!=null)?.layer?.serviceSublayers,l=s==="popup",y={},c=be({extent:e,width:o,spatialReference:e?.spatialReference}),m=[],x=f=>{const F=c===0,w=f.minScale===0||c<=f.minScale,g=f.maxScale===0||c>=f.maxScale;if(f.visible&&(F||w&&g))if(f.sublayers)f.sublayers.forEach(x);else{if(n?.includes(f.id)===!1||l&&(!f.popupTemplate||!f.popupEnabled))return;m.unshift(f)}};if(r?.forEach(x),r&&!m.length)y.layerIds=[];else{const f=Oe(m,u,d),F=m.map(w=>{const g=N(i,w);return w.toExportImageJSON(g)});if(f)y.dynamicLayers=JSON.stringify(F);else{if(r){let g=m.map(({id:b})=>b);n&&(g=g.filter(b=>n.includes(b))),y.layerIds=g}else n?.length&&(y.layerIds=n);const w=Ie(i,m);if(w!=null&&w.length){const g={};for(const b of w)b.definitionExpression&&(g[b.id]=b.definitionExpression);Object.keys(g).length&&(y.layerDefs=JSON.stringify(g))}}}return y}function Ie(t,e){const i=!!t?.length,o=e.filter(r=>r.definitionExpression!=null||i&&r.floorInfo!=null);return o.length?o.map(r=>{const n=N(t,r),s=z(n,r.definitionExpression);return{id:r.id,definitionExpression:s??void 0}}):null}var P;let h=P=class extends B{static from(t){return re(P,t)}constructor(t){super(t),this.dpi=96,this.floors=null,this.gdbVersion=null,this.geometry=null,this.geometryPrecision=null,this.height=400,this.historicMoment=null,this.layerIds=null,this.layerOption="top",this.mapExtent=null,this.maxAllowableOffset=null,this.returnFieldName=!0,this.returnGeometry=!1,this.returnM=!1,this.returnUnformattedValues=!0,this.returnZ=!1,this.spatialReference=null,this.sublayers=null,this.timeExtent=null,this.tolerance=null,this.width=400}writeHistoricMoment(t,e){e.historicMoment=t&&t.getTime()}};a([p({type:Number,json:{write:!0}})],h.prototype,"dpi",void 0),a([p()],h.prototype,"floors",void 0),a([p({type:String,json:{write:!0}})],h.prototype,"gdbVersion",void 0),a([p({types:X,json:{read:Y,write:!0}})],h.prototype,"geometry",void 0),a([p({type:Number,json:{write:!0}})],h.prototype,"geometryPrecision",void 0),a([p({type:Number,json:{write:!0}})],h.prototype,"height",void 0),a([p({type:Date})],h.prototype,"historicMoment",void 0),a([U("historicMoment")],h.prototype,"writeHistoricMoment",null),a([p({type:[Number],json:{write:!0}})],h.prototype,"layerIds",void 0),a([p({type:["top","visible","all","popup"],json:{write:!0}})],h.prototype,"layerOption",void 0),a([p({type:J,json:{write:!0}})],h.prototype,"mapExtent",void 0),a([p({type:Number,json:{write:!0}})],h.prototype,"maxAllowableOffset",void 0),a([p({type:Boolean,json:{write:!0}})],h.prototype,"returnFieldName",void 0),a([p({type:Boolean,json:{write:!0}})],h.prototype,"returnGeometry",void 0),a([p({type:Boolean,json:{write:!0}})],h.prototype,"returnM",void 0),a([p({type:Boolean,json:{write:!0}})],h.prototype,"returnUnformattedValues",void 0),a([p({type:Boolean,json:{write:!0}})],h.prototype,"returnZ",void 0),a([p({type:ee,json:{write:!0}})],h.prototype,"spatialReference",void 0),a([p()],h.prototype,"sublayers",void 0),a([p({type:je,json:{write:!0}})],h.prototype,"timeExtent",void 0),a([p({type:Number,json:{write:!0}})],h.prototype,"tolerance",void 0),a([p({type:Number,json:{write:!0}})],h.prototype,"width",void 0),h=P=a([I("esri.rest.support.IdentifyParameters")],h);const D=h;let S=class extends B{constructor(t){super(t),this.displayFieldName=null,this.feature=null,this.layerId=null,this.layerName=null}readFeature(t,e){return Q.fromJSON({attributes:{...e.attributes},geometry:{...e.geometry}})}writeFeature(t,e){if(!t)return;const{attributes:i,geometry:o}=t;i&&(e.attributes={...i}),o!=null&&(e.geometry=o.toJSON(),e.geometryType=ie.toJSON(o.type))}};a([p({type:String,json:{write:!0}})],S.prototype,"displayFieldName",void 0),a([p({type:Q})],S.prototype,"feature",void 0),a([te("feature",["attributes","geometry"])],S.prototype,"readFeature",null),a([U("feature")],S.prototype,"writeFeature",null),a([p({type:Number,json:{write:!0}})],S.prototype,"layerId",void 0),a([p({type:String,json:{write:!0}})],S.prototype,"layerName",void 0),S=a([I("esri.rest.support.IdentifyResult")],S);const Ne=S;async function Ve(t,e,i){const o=(e=Ae(e)).geometry?[e.geometry]:[],r=xe(t);return r.path+="/identify",ve(o).then(n=>{const s=_e(e,{geometry:n?.[0]}),d=Se({...r.query,f:"json",...s}),u=Fe(d,i);return de(r.path,u).then(Ge).then(l=>Te(l,e.sublayers))})}function Ge(t){const e=t.data;return e.results=e.results||[],e.exceededTransferLimit=!!e.exceededTransferLimit,e.results=e.results.map(i=>Ne.fromJSON(i)),e}function Ae(t){return t=D.from(t)}function Te(t,e){if(!e?.length)return t;const i=new Map;function o(r){i.set(r.id,r),r.sublayers&&r.sublayers.forEach(o)}e.forEach(o);for(const r of t.results)r.feature.sourceLayer=i.get(r.layerId);return t}const H=k();let _=null;function Ke(t,e){return e.type==="tile"||e.type==="map-image"}let O=class extends se{constructor(t){super(t),this._featuresResolutions=new WeakMap,this.highlightGraphics=null,this.highlightGraphicUpdated=null,this.updateHighlightedFeatures=oe(async e=>{this.destroyed||this.updatingHandles.addPromise(this._updateHighlightedFeaturesGeometries(e).catch(()=>{}))})}initialize(){const t=e=>{this.updatingHandles.addPromise(this._updateHighlightedFeaturesSymbols(e).catch(()=>{})),this.updateHighlightedFeatures(this._highlightGeometriesResolution)};this.addHandles([ne(()=>this.highlightGraphics,"change",e=>t(e.added),{onListenerAdd:e=>t(e)})])}async fetchPopupFeaturesAtLocation(t,e){const{layerView:{layer:i,view:{scale:o}}}=this;if(!t)throw new A("fetchPopupFeatures:invalid-area","Nothing to fetch without area",{layer:i});const r=Me(i.sublayers,o,e);if(!r.length)return[];const n=await $e(i,r);if(!((i.capabilities?.operations?.supportsIdentify??!0)&&i.version>=10.5)&&!n)throw new A("fetchPopupFeatures:not-supported","query operation is disabled for this service",{layer:i});return n?this._fetchPopupFeaturesUsingQueries(t,r,e):this._fetchPopupFeaturesUsingIdentify(t,r,e)}clearHighlights(){this.highlightGraphics?.removeAll()}highlight(t){const e=this.highlightGraphics;if(!t||!e)return H;let i=ge(t)?[t]:ae.isCollection(t)?t.toArray():Array.isArray(t)?t:[];if(i=i?.filter(T),(i?.length??0)===0)return H;for(const o of i){const{sourceLayer:r}=o;r!=null&&"geometryType"in r&&r.geometryType==="point"&&(o.visible=!1)}return e.addMany(i),k(()=>e.removeMany(i??[]))}async _updateHighlightedFeaturesSymbols(t){const{layerView:{view:e},highlightGraphics:i,highlightGraphicUpdated:o}=this;if(i&&o)for(const r of t){const n=r.sourceLayer&&"renderer"in r.sourceLayer&&r.sourceLayer.renderer;r.sourceLayer&&"geometryType"in r.sourceLayer&&r.sourceLayer.geometryType==="point"&&n&&"getSymbolAsync"in n&&n.getSymbolAsync(r).then(async s=>{s||=new M;let d=null;const u="visualVariables"in n?n.visualVariables?.find(l=>l.type==="size"):void 0;u&&(_||(_=(await le(async()=>{const{getSize:l}=await import("./visualVariableUtils-D3kZJRyn-DbXWzWQN.js");return{getSize:l}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url)).getSize),d=_(u,r,{view:e.type,scale:e.scale,shape:s.type==="simple-marker"?s.style:null})),d||="width"in s&&"height"in s&&s.width!=null&&s.height!=null?Math.max(s.width,s.height):"size"in s?s.size:16,i.includes(r)&&(r.symbol=new M({style:"square",size:d,xoffset:"xoffset"in s?s.xoffset:0,yoffset:"yoffset"in s?s.yoffset:0}),o(r,"symbol"),r.visible=!0)})}}async _updateHighlightedFeaturesGeometries(t){const{layerView:{layer:e,view:i},highlightGraphics:o,highlightGraphicUpdated:r}=this;if(this._highlightGeometriesResolution=t,!r||!o?.length||!e.capabilities.operations.supportsQuery)return;const n=this._getTargetResolution(t),s=new Map;for(const l of o)if(!this._featuresResolutions.has(l)||this._featuresResolutions.get(l)>n){const y=l.sourceLayer;pe(s,y,()=>new Map).set(l.getObjectId(),l)}const d=Array.from(s,([l,y])=>{const c=l.createQuery();return c.objectIds=[...y.keys()],c.outFields=[l.objectIdField],c.returnGeometry=!0,c.maxAllowableOffset=n,c.outSpatialReference=i.spatialReference,l.queryFeatures(c)}),u=await Promise.all(d);if(!this.destroyed)for(const{features:l}of u)for(const y of l){const c=y.sourceLayer,m=s.get(c).get(y.getObjectId());m&&o.includes(m)&&(m.geometry=y.geometry,r(m,"geometry"),this._featuresResolutions.set(m,n))}}_getTargetResolution(t){const e=t*ue(this.layerView.view.spatialReference),i=e/16;return i<=10?0:t/e*i}async _fetchPopupFeaturesUsingIdentify(t,e,i){const o=await this._createIdentifyParameters(t,e,i);if(o==null)return[];const{results:r}=await Ve(this.layerView.layer.parsedUrl,o,i);return r.map(n=>n.feature)}async _createIdentifyParameters(t,e,i){const{floors:o,layer:r,timeExtent:n,view:{spatialReference:s,scale:d}}=this.layerView;if(!e.length)return null;await Promise.all(e.map(({sublayer:x})=>x.load(i).catch(()=>{})));const u=Math.min(ye("mapservice-popup-identify-max-tolerance"),r.allSublayers.reduce((x,f)=>f.renderer?$({renderer:f.renderer,pointerType:i?.pointerType}):x,2)),l=this.createFetchPopupFeaturesQueryGeometry(t,u),y=we(d,s),c=Math.round(l.width/y),m=new J({xmin:l.center.x-y*c,ymin:l.center.y-y*c,xmax:l.center.x+y*c,ymax:l.center.y+y*c,spatialReference:l.spatialReference});return new D({floors:o,gdbVersion:"gdbVersion"in r?r.gdbVersion:void 0,geometry:t,height:c,layerOption:"popup",mapExtent:m,returnGeometry:!0,spatialReference:s,sublayers:r.sublayers,timeExtent:n,tolerance:u,width:c})}async _fetchPopupFeaturesUsingQueries(t,e,i){const{layerView:{floors:o,timeExtent:r}}=this,n=e.map(async({sublayer:s,popupTemplate:d})=>{if(await s.load(i).catch(()=>{}),s.capabilities&&!s.capabilities.operations.supportsQuery)return[];const u=s.createQuery(),l=$({renderer:s.renderer,pointerType:i?.pointerType}),y=this.createFetchPopupFeaturesQueryGeometry(t,l),c=new Set,[m]=await Promise.all([Ee(s,d),s.renderer?.collectRequiredFields(c,s.fieldsIndex)]);L(i),ce(c,s.fieldsIndex,m);const x=Array.from(c).sort();u.geometry=y,u.outFields=x,u.timeExtent=r;const f=N(o,s);u.where=z(u.where,f);const F=this._getTargetResolution(y.width/l),w=await Le(d);L(i);const g=s.geometryType==="point"||w&&w.arcadeUtils.hasGeometryOperations(d);g||(u.maxAllowableOffset=F);let{features:b}=await s.queryFeatures(u,i);const j=g?0:F;b=await He(s,b,i);for(const E of b)this._featuresResolutions.set(E,j);return b});return(await Promise.allSettled(n)).reduce((s,d)=>d.status==="fulfilled"?[...s,...d.value]:s,[]).filter(T)}};function Me(t,e,i){const o=[];if(!t)return o;const r=n=>{const s=n.minScale===0||e<=n.minScale,d=n.maxScale===0||e>=n.maxScale;if(n.visible&&s&&d){if(n.sublayers)n.sublayers.forEach(r);else if(n.popupEnabled){const u=Re(n,{...i,defaultPopupTemplateEnabled:!1});u!=null&&o.unshift({sublayer:n,popupTemplate:u})}}};return t.map(r),o}function Le(t){return t.expressionInfos?.length||Array.isArray(t.content)&&t.content.some(e=>e.type==="expression")?he():Promise.resolve()}async function $e(t,e){if(t.capabilities?.operations?.supportsQuery)return!0;try{return await Promise.any(e.map(({sublayer:i})=>i.load().then(()=>i.capabilities.operations.supportsQuery)))}catch{return!1}}async function He(t,e,i){const o=t.renderer;return o&&"defaultSymbol"in o&&!o.defaultSymbol&&(e=o.valueExpression?await Promise.all(e.map(r=>o.getSymbolAsync(r,i).then(n=>n?r:null))).then(r=>r.filter(n=>n!=null)):e.filter(r=>o.getSymbol(r)!=null)),e}a([p({constructOnly:!0})],O.prototype,"createFetchPopupFeaturesQueryGeometry",void 0),a([p({constructOnly:!0})],O.prototype,"layerView",void 0),a([p({constructOnly:!0})],O.prototype,"highlightGraphics",void 0),a([p({constructOnly:!0})],O.prototype,"highlightGraphicUpdated",void 0),a([p({constructOnly:!0})],O.prototype,"updatingHandles",void 0),O=a([I("esri.views.layers.support.MapServiceLayerViewHelper")],O);export{O,Ke as _};
