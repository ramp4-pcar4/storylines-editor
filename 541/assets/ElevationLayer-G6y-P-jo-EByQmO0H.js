const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ElevationQuery-qAsmERYh-D7Z6aGTC.js","./main-B-qqJ5ov.js","./main-BI1Cc2qD.css","./projection-BA9M1R7d-BrWcDNEF.js","./projectBuffer-CvCBvJ6W-D4VBeyna.js","./TileKey-B_6qmYK--BtZdR-Xy.js"])))=>i.map(i=>d[i]);
import{U as f,o as g,W as w,f as c,X as V,_ as m,$ as u,v as o,S as l,a0 as y,i as b,a1 as T,a2 as D,a3 as S}from"./main-B-qqJ5ov.js";import{m as L}from"./MultiOriginJSONSupport-DKRh9P6w-BxRd_lXm.js";import{M as x}from"./HeightModelInfo-C5vFqzyF-DO96zinI.js";import{D as E}from"./Layer-ChoECxvZ-Bet1V6UW.js";import{O as $}from"./ArcGISCachedService-C64Ko1TY-ClbMtIN_.js";import{a as k}from"./ArcGISService-BYA-y6X6-CSskMNGp.js";import{E as I}from"./OperationalLayer-B5IXiMa2-BIwp1zxE.js";import{C as M}from"./PortalLayer-CElnYuSQ-DeGVh8DZ.js";import{Z as O}from"./commonProperties-BtIqvFU_-sViXb4Wn.js";import{q as N}from"./workers-PiCjreoO-DJYvxXtl.js";import"./TimeExtent-Cn0Jofqr-1iB3KTqK.js";import"./TileInfo-CWIRDhZl-Bhhxrbtd.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./TileInfoTilemapCache-D1SExPij-C2_ojDjC.js";import"./TilemapCache-CRRxws77-CD791Oky.js";import"./ByteSizeUnit-DL8UhsB0-B2-AmVRx.js";import"./LRUCache-C3erQTWv-C7R8Kkcb.js";import"./arcgisLayerUrl-HNYh8jvG-B2O143Ys.js";import"./PortalItem-CctGdnxF-CGvGDFAo.js";import"./portalItemUtils-B8bw6SAG-BnU8bsbU.js";import"./projection-BA9M1R7d-BrWcDNEF.js";import"./projectBuffer-CvCBvJ6W-D4VBeyna.js";import"./ElevationInfo-yv2-9tj6-BLPN2Mb1.js";import"./lengthUtils-DKpMe5qR-n4iUZvey.js";class A{constructor(e,t,i,a){this._hasNoDataValues=null,this._minValue=null,this._maxValue=null,"pixelData"in e?(this.values=e.pixelData,this.width=e.width,this.height=e.height,this.noDataValue=e.noDataValue):(this.values=e,this.width=t,this.height=i,this.noDataValue=a)}get hasNoDataValues(){if(this._hasNoDataValues==null){const e=this.noDataValue;this._hasNoDataValues=this.values.includes(e)}return this._hasNoDataValues}get minValue(){return this._ensureBounds(),this._minValue}get maxValue(){return this._ensureBounds(),this._maxValue}_ensureBounds(){if(this._minValue!=null)return;const{noDataValue:e,values:t}=this;let i=1/0,a=-1/0,h=!0;for(const n of t)n===e?this._hasNoDataValues=!0:(i=n<i?n:i,a=n>a?n:a,h=!1);h?(this._minValue=0,this._maxValue=0):(this._minValue=i,this._maxValue=a>-3e38?a:0)}}class C{constructor(e,t,i,a,h={}){this._mainMethod=t,this._transferLists=i,this._listeners=[],this._promise=N(e,{...h,schedule:a}).then(n=>{if(this._thread===void 0){this._thread=n,this._promise=null,h.hasInitialize&&this.broadcast({},"initialize");for(const p of this._listeners)this._connectListener(p)}else n.close()}),this._promise.catch(n=>T.getLogger("esri.core.workers.WorkerHandle").error(`Failed to initialize ${e} worker: ${n}`))}on(e,t){const i={removed:!1,eventName:e,callback:t,threadHandle:null};return this._listeners.push(i),this._connectListener(i),D(()=>{i.removed=!0,S(this._listeners,i),this._thread&&i.threadHandle!=null&&i.threadHandle.remove()})}destroy(){this._thread&&(this._thread.close(),this._thread=null),this._promise=null,this._listeners.length=0,this._transferLists={}}invoke(e,t){return this.invokeMethod(this._mainMethod,e,t)}invokeMethod(e,t,i){if(this._thread){const a=this._transferLists[e],h=a?a(t):[];return this._thread.invoke(e,t,{transferList:h,signal:i})}return this._promise?this._promise.then(()=>(u(i),this.invokeMethod(e,t,i))):Promise.reject(null)}broadcast(e,t){return this._thread?Promise.all(this._thread.broadcast(t,e)).then(()=>{}):this._promise?this._promise.then(()=>this.broadcast(e,t)):Promise.reject()}get promise(){return this._promise}_connectListener(e){this._thread&&this._thread.on(e.eventName,e.callback).then(t=>{e.removed||(e.threadHandle=t)})}}class v extends C{constructor(e=null){super("LercWorker","_decode",{_decode:t=>[t.buffer]},e,{strategy:"dedicated"}),this.schedule=e,this.ref=0}decode(e,t,i){return e&&e.byteLength!==0?this.invoke({buffer:e,options:t},i):Promise.resolve(null)}release(){--this.ref<=0&&(d.forEach((e,t)=>{e===this&&d.delete(t)}),this.destroy())}}const d=new Map;function P(r=null){let e=d.get(r);return e||(r!=null?(e=new v(t=>r.immediate.schedule(t)),d.set(r,e)):(e=new v,d.set(null,e))),++e.ref,e}let s=class extends $(k(I(M(L(E))))){constructor(...r){super(...r),this.capabilities={operations:{supportsTileMap:!1}},this.copyright=null,this.heightModelInfo=null,this.path=null,this.minScale=void 0,this.maxScale=void 0,this.opacity=1,this.operationalLayerType="ArcGISTiledElevationServiceLayer",this.sourceJSON=null,this.type="elevation",this.url=null,this.version=null,this._lercDecoder=P()}normalizeCtorArgs(r,e){return typeof r=="string"?{url:r,...e}:r}destroy(){this._lercDecoder=f(this._lercDecoder)}readCapabilities(r,e){const t=e.capabilities&&e.capabilities.split(",").map(i=>i.toLowerCase().trim());return t?{operations:{supportsTileMap:t.includes("tilemap")}}:{operations:{supportsTileMap:!1}}}readVersion(r,e){let t=e.currentVersion;return t||(t=9.3),t}load(r){const e=r!=null?r.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:t=>{if(t.typeKeywords){for(let i=0;i<t.typeKeywords.length;i++)if(t.typeKeywords[i].toLowerCase()==="elevation 3d layer")return!0}throw new g("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}},r).catch(w).then(()=>this._fetchImageService(e))),Promise.resolve(this)}fetchTile(r,e,t,i){const a=(i=i||{signal:null}).signal!=null?i.signal:i.signal=new AbortController().signal,h={responseType:"array-buffer",signal:a},n={noDataValue:i.noDataValue,returnFileInfo:!0};return this.load().then(()=>this._fetchTileAvailability(r,e,t,i)).then(()=>c(this.getTileUrl(r,e,t),h)).then(p=>this._lercDecoder.decode(p.data,n,a)).then(p=>new A(p))}getTileUrl(r,e,t){const i=!this.capabilities.operations.supportsTileMap&&this.supportsBlankTile,a=V({...this.parsedUrl.query,blankTile:!i&&null});return`${this.parsedUrl.path}/tile/${r}/${e}/${t}${a?"?"+a:""}`}async queryElevation(r,e){const{ElevationQuery:t}=await m(()=>import("./ElevationQuery-qAsmERYh-D7Z6aGTC.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);return u(e),new t().query(this,r,e)}async createElevationSampler(r,e){const{ElevationQuery:t}=await m(()=>import("./ElevationQuery-qAsmERYh-D7Z6aGTC.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);return u(e),new t().createSampler(this,r,e)}_fetchTileAvailability(r,e,t,i){return this.tilemapCache?this.tilemapCache.fetchAvailability(r,e,t,i):Promise.resolve("unknown")}async _fetchImageService(r){if(this.sourceJSON)return this.sourceJSON;const e={query:{f:"json",...this.parsedUrl.query},responseType:"json",signal:r},t=await c(this.parsedUrl.path,e);t.ssl&&(this.url=this.url?.replace(/^http:/i,"https:")),this.sourceJSON=t.data,this.read(t.data,{origin:"service",url:this.parsedUrl})}get hasOverriddenFetchTile(){return!this.fetchTile[_]}};o([l({readOnly:!0})],s.prototype,"capabilities",void 0),o([y("service","capabilities",["capabilities"])],s.prototype,"readCapabilities",null),o([l({json:{read:{source:"copyrightText"}}})],s.prototype,"copyright",void 0),o([l({readOnly:!0,type:x})],s.prototype,"heightModelInfo",void 0),o([l({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],s.prototype,"path",void 0),o([l({type:["show","hide"]})],s.prototype,"listMode",void 0),o([l({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],s.prototype,"minScale",void 0),o([l({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],s.prototype,"maxScale",void 0),o([l({json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],s.prototype,"opacity",void 0),o([l({type:["ArcGISTiledElevationServiceLayer"]})],s.prototype,"operationalLayerType",void 0),o([l()],s.prototype,"sourceJSON",void 0),o([l({json:{read:!1},value:"elevation",readOnly:!0})],s.prototype,"type",void 0),o([l(O)],s.prototype,"url",void 0),o([l()],s.prototype,"version",void 0),o([y("version",["currentVersion"])],s.prototype,"readVersion",null),s=o([b("esri.layers.ElevationLayer")],s);const _=Symbol("default-fetch-tile");s.prototype.fetchTile[_]=!0;const ne=s;export{ne as default};
