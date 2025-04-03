import{bR as W,j as L,K as y,ah as X,aq as B,b9 as N,$ as Y,bh as g,cO as Q,iX as J,cN as K,fr as V,iY as ee,iZ as te,bK as E,O as se,v as m,S as _,i as re,ht as ie,aG as oe,g_ as ae,f4 as T,i_ as ne,h0 as he,i$ as de}from"./main-DpxXUdv2.js";import{o as ce}from"./FieldsIndex-HmzMbJQG-TJvx7wIJ.js";import{a as le,bo as ue,k as pe,bp as me,bq as z,br as O,bs as q}from"./UpdateTracking2D-Du_WIf4G-DMk4JWwr.js";import{c as _e}from"./OverrideHelper-DWRbVlj1-CyeWir4A.js";import{D as ye,t as v,h as ge,j as fe,k as be}from"./definitions-DJSdSb77-DkoRHaVx.js";import{i as we}from"./WGLContainer-LxgEo4I_-D4n4xuJp.js";import{o as Ie,m as ve,u as Se,P as xe,W as Re,e as Me}from"./AttributeStore-DjyP9U7y--KdJLT8V.js";import{_ as Te,h as Ge,j as je,a as Ce,e as ze,J as Pe,Z as Ue,Y as ke,X as $e,K as Oe,W as P}from"./FeatureCommandQueue-DzV-HBIG-tHBAbaHc.js";import{z as qe,R as Ae,C as U}from"./featureConversionUtils-D6hFQ4Af-CEOAGb29.js";import{c as x}from"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import{V as Ve}from"./Tile-D75RMC64-CowKumQg.js";import{l as Ee}from"./normalizeUtils-Bxmy9MNI-BzK2AhMf.js";import{H as De}from"./normalizeUtilsSync-CBU7m8rm-ZovPMNhW.js";import{f as Fe,h as Ze}from"./queryUtils-Brxu6254-CEjsZrE1.js";async function He(r,e,t){const s=[],i={scaleInfo:je(r),scaleExpression:null};for(const o of e)switch(o.type){case"marker":if(o.animationParams){s.push(...$e(t.instances.animatedMarker,o,P,i));break}s.push(...Oe(t.instances.marker,o,P,i));break;case"fill":o.spriteRasterizationParam==null?s.push(...Ue(t.instances.fill,o,i)):s.push(...ke(t.instances.complexFill,o,!1,i));break;case"line":o.spriteRasterizationParam?s.push(...ze(t.instances.texturedLine,o,!1,i)):s.push(...Pe(t.instances.line,o,!1,i));break;case"text":s.push(...Ce(t.instances.text,o,P,i))}return s}class G extends Me{static from(e,t,s){return new G(e,t,s)}constructor(e,t,s){super(s),this._items=e,this._tile=t,this._index=-1,this._cachedGeometry=null;const i=t.lod;i.wrap&&(this._wrappingInfo={worldSizeX:i.worldSize[0]})}get _current(){return this._items[this._index]}getItem(){return this._current}getZOrder(){return this._current.zOrder}getMeshWriters(){return this._current.symbolResource?.symbolInfo.meshWriters??[]}hasField(e){return this._current.attributes[e]!=null}field(e){return this.readAttribute(e)}get geometryType(){const e=E(this._current.geometry);return e==="esriGeometryPoint"?"esriGeometryMultipoint":e}getCursor(){return this.copy()}copy(){const e=new G(this._items,this._tile,this.metadata);return this.copyInto(e),e}copyInto(e){super.copyInto(e),e._cachedGeometry=this._cachedGeometry,e._index=this._index}get fields(){throw new Error("Fields reading not supported to graphics.")}get hasFeatures(){return!!this._items.length}get hasNext(){return this._index+1<this._items.length}get exceededTransferLimit(){throw new Error("InternalError: exceededTransferLimit not implemented for graphics.")}get hasZ(){return!1}get hasM(){return!1}getInTransform(){return this._tile.transform}getSize(){return this._items.length}getAttributeHash(){let e="";for(const t in this._current.attributes)e+=this._current.attributes[t];return e}getObjectId(){return this._items[this._index].objectId}getDisplayId(){return this._current.displayId}setDisplayId(e){throw new Error("InternalError: Setting displayId not supported for graphics.")}setIndex(e){this._index=e}getIndex(){return this._index}next(){for(this._cachedGeometry=null;++this._index<this._items.length&&!this._getExists(););return this._index<this._items.length}readGeometryArea(){throw new Error("InternalError: readGeometryArea not supported for graphics.")}_readGeometry(){if(!this._cachedGeometry){let e=qe(this._current.projectedGeometry,this.hasZ,this.hasM);if(this.geometryType==="esriGeometryPolyline"&&(e=Ae(new x,e,this.hasZ,this.hasM,this.geometryType,this._tile.transform.scale[0])),this._cachedGeometry=U(new x,e,this.hasZ,this.hasM,this.geometryType,this._tile.transform),!this._cachedGeometry)return null;this._wrapGeometry(this._cachedGeometry)}return this._cachedGeometry}_wrapGeometry(e){if(!this._wrappingInfo)return;const{worldSizeX:t}=this._wrappingInfo;if(e.isPoint)return t===1?(e.coords.push(v,0),e.coords.push(2*-v,0),void e.lengths.push(3)):t===2?(e.coords.push(2*v,0),e.coords.push(4*-v,0),void e.lengths.push(3)):void this._wrapVertex(e.coords,0,2,t);if(this.geometryType==="esriGeometryMultipoint"){if(t===1){const s=e.coords.slice();s[0]-=512;const i=e.coords.slice();i[0]+=512,e.coords.push(...s,...i);const o=e.lengths[0];return void e.lengths.push(o,o)}this._wrapVertex(e.coords,0,2,t)}}_wrapVertex(e,t,s,i){const o=t*s,a=e[o];a<-v*(i-2)?e[o]=a+v*i:a>v*(i-1)&&(e[o]=a-v*i)}_readX(){const e=this._readGeometry();return e!=null?e.coords[0]:0}_readY(){const e=this._readGeometry();return e!=null?e.coords[1]:0}_readServerCentroid(){switch(this.geometryType){case"esriGeometryPolygon":{const e=he(this._current.projectedGeometry),t=new x([],e);return U(new x,t,this.hasZ,this.hasM,this.geometryType,this._tile.transform)}case"esriGeometryPolyline":{const e=this._current.projectedGeometry,t=ne(e.paths,this.hasZ),s=new x([],t);return U(new x,s,this.hasZ,this.hasM,this.geometryType,this._tile.transform)}}return null}_readAttribute(e,t){const s=this._current.attributes[e];if(s!==void 0)return s;const i=e.toLowerCase();for(const o in this._current.attributes)if(o.toLowerCase()===i)return this._current.attributes[o]}_readAttributes(){return this._current.attributes}}class k{static fromGraphic(e,t,s,i){return new k(e.geometry,t,e.attributes,e.visible,e.uid,e.version,s,i)}constructor(e,t,s,i,o,a,n,l){this.geometry=e,this.symbol=t,this.attributes=s,this.visible=i,this.objectId=o,this._version=a,this.zOrder=n,this.displayId=l,this.bounds=g(),this.prevBounds=g(),this.size=[0,0,0,0]}get linearCIM(){return this.symbolResource?.symbolInfo.linearCIM}get hasAnimations(){const{linearCIM:e}=this;return!!e&&e.some(t=>"animationParams"in t&&!!t.animationParams)}update(e,t,s){return(this._version!==e.version||this.zOrder!==s||this.symbol!==t)&&(this.prevBounds=this.bounds,this.bounds=g(),this.zOrder=s,this.geometry=e.geometry,this.attributes=e.attributes,this.symbol=t,this.visible=e.visible,this._version=e.version,this.symbolResource=null,this.projectedGeometry=null,!0)}async projectAndNormalize(e){let t=this.geometry;if(!t||!t.spatialReference||t.type==="mesh")return;t.type==="extent"&&(t=q(t)),await Fe(t.spatialReference,e);const s=De(t);if(!s)return;const i=Ze(s,t.spatialReference,e);i&&de(i),this.projectedGeometry=V(i)?q(i):i}}class We{constructor(e,t,s){this.added=e,this.updated=t,this.removed=s}hasAnyUpdate(){return!!(this.added.length||this.updated.length||this.removed.length)}}const A=1e-5;function Le(r,e){return e.zOrder-r.zOrder}class Xe{constructor(e,t,s,i,o){this._items=new Map,this._boundsDirty=!1,this._outSpatialReference=e,this._cimResourceManager=t,this._hittestDrawHelper=new me(t),this._tileInfoView=s,this._store=o;const a=s.getClosestInfoForScale(i);this._resolution=this._tileInfoView.getTileResolution(a.level)}destroy(){this._hittestDrawHelper.destroy()}items(){return this._items.values()}getItem(e){return this._items.get(e)}async update(e,t,s){const i=[],o=[],a=[],n=new Set,l=[];let d=0;for(const h of e.items){d++;const c=h.uid,u=this._items.get(c),f=t(h);if(n.add(c),u){u.update(h,f,d)&&(o.push(u),l.push(this._updateItem(u,s)));continue}const b=this._store.createDisplayIdForObjectId(c),w=k.fromGraphic(h,f,d,b);l.push(this._updateItem(w,s)),this._items.set(w.objectId,w),i.push(w)}for(const[h,c]of this._items.entries())n.has(h)||(this._store.releaseDisplayIdForObjectId(h),this._items.delete(h),a.push(c));return await Promise.all(l),this._index=null,new We(i,o,a)}updateLevel(e){this._resolution!==e&&(this._index=null,this._boundsDirty=!0,this._resolution=e)}hitTest(e,t,s,i,o){const a=y("esri-mobile"),n=a?ge:fe,l=n+(a?0:be);e=Ee(e,this._tileInfoView.spatialReference);const d=i*window.devicePixelRatio*l,h=g();h[0]=e-d,h[1]=t-d,h[2]=e+d,h[3]=t+d;const c=i*window.devicePixelRatio*n,u=g();u[0]=e-c,u[1]=t-c,u[2]=e+c,u[3]=t+c;const f=.5*i*(l+z),b=this._searchIndex(e-f,t-f,e+f,t+f);if(!b||b.length===0)return[];const w=[],$=g(),R=g();for(const I of b){if(!I.visible)continue;const{projectedGeometry:C,symbolResource:M}=I;this._getSymbolBounds($,M,C,R,o),R[3]=R[2]=R[1]=R[0]=0,ie($,h)&&w.push(I)}if(w.length===0)return[];const D=this._hittestDrawHelper,j=[];for(const I of w){const{projectedGeometry:C,symbolResource:M}=I;if(!M)continue;const{textInfo:F,symbolInfo:Z}=M,H=Z.cimSymbol;D.hitTest(u,H.symbol,C,F,o,i)&&j.push(I)}return j.sort(Le),j.map(I=>I.objectId)}queryItems(e){return this._items.size===0?[]:this._searchForItems(e)}clear(){this._items.clear(),this._index=null}async _updateItem(e,t){await e.projectAndNormalize(this._outSpatialReference),await t(e);const{size:s}=e;s[0]=s[1]=s[2]=s[3]=0,this._getSymbolBounds(e.bounds,e.symbolResource,e.projectedGeometry,e.size,0)}_searchIndex(e,t,s,i){return this._boundsDirty&&(this._items.forEach(o=>this._getSymbolBounds(o.bounds,o.symbolResource,o.projectedGeometry,o.size,0)),this._boundsDirty=!1),this._index||(this._index=Ve(9,o=>({minX:o.bounds[0],minY:o.bounds[1],maxX:o.bounds[2],maxY:o.bounds[3]})),this._index.load(Array.from(this._items.values()))),this._index.search({minX:e,minY:t,maxX:s,maxY:i})}_searchForItems(e){const t=this._tileInfoView.spatialReference,s=e.bounds,i=oe(t);if(i&&t.isWrappable){const[o,a]=i.valid,n=Math.abs(s[2]-a)<A,l=Math.abs(s[0]-o)<A;if((!n||!l)&&(n||l)){const d=e.resolution;let h;h=g(n?[o,s[1],o+d*z,s[3]]:[a-d*z,s[1],a,s[3]]);const c=this._searchIndex(s[0],s[1],s[2],s[3]),u=this._searchIndex(h[0],h[1],h[2],h[3]);return[...new Set([...c,...u])]}}return this._searchIndex(s[0],s[1],s[2],s[3])}_getSymbolBounds(e,t,s,i,o){if(!t||!t.symbolInfo.linearCIM||!s)return null;if(e||(e=g()),ae(e,s),!i||i[0]===0&&i[1]===0&&i[2]===0&&i[3]===0){const{textInfo:l,symbolInfo:d}=t,h=d.cimSymbol;i||(i=[0,0,0,0]);const c=O.getSymbolInflateSize(i,h.symbol,this._cimResourceManager,o,l);i[0]=T(c[0]),i[1]=T(c[1]),i[2]=T(c[2]),i[3]=T(c[3])}const a=this._resolution,n=O.safeSize(i);return e[0]-=n*a,e[1]-=n*a,e[2]+=n*a,e[3]+=n*a,e}}class S{static getOrCreate(e,t,s){let i=t.get(e.id);return i||(i=new S(e,s),t.set(e.id,i)),i}static fromItems(e,t,s){const i=new S(e,s);for(const o of t)i.append(o);return i}constructor(e,t){this.tile=e,this.metadata=t,this.addedOrModified=[],this.removed=[],this.objectIdMap=null}get reader(){return this._reader||(this._reader=G.from(this.addedOrModified,this.tile,this.metadata)),this._reader}append(e){this.addedOrModified.push(e),e.hasAnimations&&(this.objectIdMap=this.objectIdMap||{},this.objectIdMap[e.displayId]=e.objectId)}}let p=class extends W(L){constructor(r){super(r),this._attached=!1,this._tiles=new Map,this._controller=new AbortController,this._hashToSymbolInfo=new Map,this._lastCleanup=performance.now(),this._cleanupRequired=!0,this.lastUpdateId=-1,this.renderer=null,this._updateTracking=new le({debugName:"GraphicsView2D"}),this.updateRequested=!1,this.defaultPointSymbolEnabled=!0,this._commandQueue=new Te({process:e=>{if(e.type==="update")return this._update();throw new Error("InternalError: Unsupported command")}}),this.graphicUpdateHandler=this.graphicUpdateHandler.bind(this)}destroy(){this.container.destroy(),this.view=null,this.renderer=null,this._set("graphics",null),this._controller.abort(),this._graphicStore.clear(),this._graphicStore.destroy(),this._attributeStore=null,this._hashToSymbolInfo.clear(),this._updateTracking.destroy(),this._commandQueue.destroy()}_initAttributeStore(){this._storage=new Ie({spatialReference:this.view.spatialReference,fields:new ce}),this._attributeStore=new ve({isLocal:!0,update:e=>{y("esri-2d-update-debug")&&console.debug(`[Id: ${this.layerId}] GraphicsView2D.AttributeStoreView.updateStart`,{message:e}),this.container.attributeView.requestUpdate(e),this.container.requestRender(),y("esri-2d-update-debug")&&console.debug(`[Id: ${this.layerId}] GraphicsView2D.AttributeStoreView.updateEnd`,{message:e})}});const r=Ge(null,[]);this._attributeStore.update(r,this._storage,null),this.container.checkHighlight=()=>this._attributeStore.hasHighlight}initialize(){this._initAttributeStore(),this._metadata=Se.createGraphics(this.view.spatialReference),this._resourceProxy=new xe({fetch:e=>Promise.all(e.map(t=>this.view.stage.textureManager.rasterizeItem(t))),fetchDictionary:e=>{throw new Error("InternalError: Graphics do not support Dictionary requests")}}),this.addHandles([X(()=>this._effectiveRenderer,()=>this._pushUpdate()),this.view.graphicsTileStore.on("update",this._onTileUpdate.bind(this)),this.container.on("attach",()=>{this.addHandles([this.graphics.on("change",()=>this._pushUpdate())]),this._graphicStore?.destroy(),this._graphicStore=new Xe(this.view.spatialReference,this._cimResourceManager,this.view.featuresTilingScheme,this.view.state.scale,this._attributeStore),this._attached=!0,this.requestUpdate(),this._pushUpdate()})]),this._updateTracking.addUpdateTracking("CommandQueue",this._commandQueue.updateTracking);const r=this.view.graphicsTileStore.tiles;this._onTileUpdate({added:r,removed:[]})}get _effectiveRenderer(){return typeof this.renderer=="function"?this.renderer():this.renderer}get _cimResourceManager(){return this.view.stage.textureManager.resourceManager}get updating(){const r=!this._attached||this._updateTracking.updating;return y("esri-2d-log-updating")&&console.log(`Updating GraphicsView2D: ${r}
  -> attaching ${!this._attached}
  -> updateTracking ${this._updateTracking.updating}`),r}hitTest(r){if(!this.view||this.view.suspended)return[];const{resolution:e,rotation:t}=this.view.state,s=this._graphicStore.hitTest(r.x,r.y,2,e,t),i=new Set(s),o=this.graphics.items.reduce((a,n)=>(i.has(n.uid)&&a.set(n.uid,n),a),new Map);return s.map(a=>o.get(a)).filter(B)}requestUpdate(){this.updateRequested||(this.updateRequested=!0,this.requestUpdateCallback()),this.notifyChange("updating")}processUpdate(r){this.updateRequested&&(this.updateRequested=!1,this.update(r))}viewChange(){this.requestUpdate()}setHighlight(r){const e=[];for(const{objectId:t,highlightFlags:s}of r){const i=this._graphicStore.getItem(t)?.displayId;e.push({objectId:t,highlightFlags:s,displayId:i})}this._attributeStore.setHighlight(e,r),this._pushUpdate()}graphicUpdateHandler(r){this._pushUpdate()}update(r){this.updateRequested=!1,this._attached&&this._graphicStore.updateLevel(r.state.resolution)}pushUpdate(){this._pushUpdate()}_pushUpdate(){N(this._commandQueue.push({type:"update"}))}async _update(){try{y("esri-2d-update-debug")&&console.debug(`[Id: ${this.layerId}] GraphicsView._update start`);const r=await this._graphicStore.update(this.graphics,t=>this._getSymbolForGraphic(t),t=>this._ensureSymbolResource(t));for(const t of r.updated)this.container.restartAnimation(t.objectId);if(!r.hasAnyUpdate())return void this._attributeStore.sendUpdates();r.removed.length&&(this._cleanupRequired=!0),y("esri-2d-update-debug")&&console.debug(`[Id: ${this.layerId}] GraphicsView updateMessage`,r);const e=this._createTileMessages(r);await this._fetchResources(e),this._write(e);for(const t of r.added)this._setFilterState(t);for(const t of r.updated)this._setFilterState(t);y("esri-2d-update-debug")&&console.debug(`[Id: ${this.layerId}] GraphicsView sendUpdate`,r),this._attributeStore.sendUpdates(),y("esri-2d-update-debug")&&console.debug(`[Id: ${this.layerId}] GraphicsView sendUpdate.await`,r)}catch{}this._cleanupSharedResources()}_createTileMessages(r){const e=new Map;for(const t of r.added){const s=this.view.graphicsTileStore.getIntersectingTiles(t.bounds);for(const i of s)S.getOrCreate(i,e,this._metadata).append(t)}for(const t of r.updated){const s=this.view.graphicsTileStore.getIntersectingTiles(t.prevBounds),i=this.view.graphicsTileStore.getIntersectingTiles(t.bounds);for(const o of s)S.getOrCreate(o,e,this._metadata).removed.push(t.displayId);for(const o of i)S.getOrCreate(o,e,this._metadata).append(t)}for(const t of r.removed){const s=this.view.graphicsTileStore.getIntersectingTiles(t.bounds);for(const i of s)S.getOrCreate(i,e,this._metadata).removed.push(t.displayId)}return Array.from(e.values())}async _fetchResources(r){for(const{tile:e,reader:t}of r){y("esri-2d-update-debug")&&console.debug(`Id[${this.layerId}] Tile[${e.id}] GraphicsView fetchResources`,r);const s=t.getCursor();for(;s.next();)for(const i of s.getMeshWriters())i.enqueueRequest(this._resourceProxy,s,e.createArcadeEvaluationOptions(this.view.timeZone))}await this._resourceProxy.fetchEnqueuedResources()}_write(r){for(const e of r){y("esri-2d-update-debug")&&console.debug(`Id[${this.layerId}] Tile[${e.tile.id}] GraphicsView write`,e);const t=this._writeMeshes(e);let s=this._tiles.get(e.tile.key);s||(s=this._createFeatureTile(e.tile.key)),y("esri-2d-update-debug")&&console.debug(`Id[${this.layerId}] Tile[${e.tile.id}] GraphicsView onTileData`,e),this.container.onTileData(s,{type:"update",modify:t,remove:e.removed,end:!1,attributeEpoch:this._attributeStore.epoch,objectIdMap:e.objectIdMap}),this.container.requestRender()}}_writeMeshes(r){const e=new Re(r.tile.id),t=r.reader.getCursor();for(;t.next();){e.entityStart(t.getDisplayId(),t.getZOrder());for(const s of t.getMeshWriters())s.write(e,this._resourceProxy,t,r.tile.createArcadeEvaluationOptions(this.view.timeZone),r.tile.level);e.entityEnd()}return{...e.serialize().message,tileId:r.tile.id}}_setFilterState(r){const e=r.displayId,t=this._attributeStore.getHighlightFlags(r.objectId);this._attributeStore.setData(e,0,0,t|(r.visible?ye:0))}_getSymbolForGraphic(r){return r.symbol!=null?r.symbol:this._effectiveRenderer!=null?this._effectiveRenderer.getSymbol(r):this._getNullSymbol(r)}async _ensureSymbolResource(r){if(!r.symbol)return;const e=await this._getSymbolInfo(r.symbol);if(!e)return;const t=e.linearCIM.filter(s=>s.type==="text");if(t.length>0){const s=await this._getTextResources(r,t);r.symbolResource={symbolInfo:e,textInfo:s}}else r.symbolResource={symbolInfo:e}}_getSymbolInfo(r){const e=r.hash();return this._hashToSymbolInfo.has(e)||this._hashToSymbolInfo.set(e,this._createSymbolInfo(e,r).catch(t=>null)),this._hashToSymbolInfo.get(e)}async _createSymbolInfo(r,e){const t=await this._convertToCIMSymbol(e),s=await this._createLinearCIM(t);return{hash:r,cimSymbol:t,linearCIM:s,meshWriters:await this._createMeshWriters(t,s)}}async _convertToCIMSymbol(r){const e=ue(r);return e.type==="web-style"?(await e.fetchCIMSymbol()).data:e}async _createLinearCIM(r){return await Promise.all(pe.fetchResources(r.symbol,this._cimResourceManager,[])),this.view.stage.cimAnalyzer.analyzeSymbolReference(r,!1)}async _createMeshWriters(r,e){Y(this._controller.signal);const t=this.container.instanceStore,s=this.view.stage.meshWriterRegistry,i=await He(r,e,t);return Promise.all(i.map(o=>s.createMeshWriter(this._storage,this._resourceProxy,{tileInfo:this.view.featuresTilingScheme.tileInfo},o)))}_onTileUpdate(r){if(r.added&&r.added.length>0)for(const e of r.added)this._updateTracking.addPromise(this._addTile(e));if(r.removed&&r.removed.length>0)for(const e of r.removed)this._removeTile(e.key)}_createFeatureTile(r){const e=this.view.featuresTilingScheme.getTileBounds(g(),r),t=this.view.featuresTilingScheme.getTileResolution(r.level),s=new we(r,t,e[0],e[3]);return this._tiles.set(r,s),this.container.addChild(s),s}async _addTile(r){if(!this._attached)return;const e=this._graphicStore.queryItems(r);if(!e.length)return;const t=this._createFeatureTile(r.key),s=S.fromItems(r,e,this._metadata);await this._fetchResources([s]);const i=this._writeMeshes(s);t.onMessage({type:"append",append:i,clear:!1,end:!0,attributeEpoch:this._attributeStore.epoch,objectIdMap:s.objectIdMap})}_removeTile(r){if(!this._tiles.has(r))return;const e=this._tiles.get(r);this.container.removeChild(e),e.destroy(),this._tiles.delete(r)}_getNullSymbol(r){const e=r.geometry;return Q(e)?J:K(e)||V(e)?ee:this.defaultPointSymbolEnabled?te:null}async _getTextResources(r,e){const t=new Array,s=new Array;for(let n=0;n<e.length;n++){const l=e[n],{resource:d,overrides:h}=l.textRasterizationParam;if(h?.length>0){const c=_e.resolveSymbolOverrides({type:"CIMSymbolReference",primitiveOverrides:h,symbol:{type:"CIMPointSymbol",symbolLayers:[{type:"CIMVectorMarker",enable:!0,size:d.symbol.height,anchorPointUnits:"Relative",frame:{xmin:-5,ymin:-5,xmax:5,ymax:5},markerGraphics:[{type:"CIMMarkerGraphic",geometry:{x:0,y:0},symbol:d.symbol,textString:d.textString}],scaleSymbolsProportionally:!0,respectFrame:!0}]}},r,this.view.spatialReference,null,E(r.projectedGeometry),null,null);c.then(u=>{const f=u.symbolLayers[0],{textString:b}=f.markerGraphics[0];s.push({type:"cim-rasterization-info",resource:{type:"text",textString:b||"",font:d.font}}),l.text=d.textString=b||""}),t.push(c)}else s.push({type:"cim-rasterization-info",resource:d})}t.length>0&&await Promise.all(t);const i=s.map(n=>this.view.stage.textureManager.rasterizeItem(n)),o=await Promise.all(i);se(o);const a=new Map;for(let n=0;n<e.length;n++){const l=e[n];a.set(l.textRasterizationParam.resource.symbol,{text:l.text,glyphMosaicItems:o[n]})}return a}_cleanupSharedResources(){if(!this._cleanupRequired)return;const r=performance.now();if(r-this._lastCleanup<5e3)return;this._cleanupRequired=!1,this._lastCleanup=r;const e=new Set;for(const s of this._graphicStore.items()){const i=s.symbolResource?.symbolInfo.hash;e.add(i)}const t=new Set(this._hashToSymbolInfo.keys());for(const s of t.values())e.has(s)||this._hashToSymbolInfo.delete(s)}};m([_()],p.prototype,"_effectiveRenderer",null),m([_({constructOnly:!0})],p.prototype,"layerId",void 0),m([_({constructOnly:!0})],p.prototype,"requestUpdateCallback",void 0),m([_()],p.prototype,"container",void 0),m([_({constructOnly:!0})],p.prototype,"graphics",void 0),m([_()],p.prototype,"renderer",void 0),m([_()],p.prototype,"_updateTracking",void 0),m([_()],p.prototype,"updating",null),m([_()],p.prototype,"view",void 0),m([_()],p.prototype,"updateRequested",void 0),m([_()],p.prototype,"defaultPointSymbolEnabled",void 0),p=m([re("esri.views.2d.layers.graphics.GraphicsView2D")],p);const ht=p;export{ht as X};
