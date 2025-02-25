import{bh as W,v as d,S as p,i as R,I as se,b as ie,$ as g,J as v,ah as P,av as K,aw as re,g as ne,an as oe,dV as ae,P as z,hm as D,j as X,hn as M,ho as le,hp as O,hq as ue,aF as he,ay as b,W as N,a1 as j,n as ce,hr as de,gI as pe,hs as U,ht as A,gH as H,hu as fe,hv as q,hw as Y,eP as B}from"./main-PWjwnDMV.js";import{i as ee}from"./UpdatingHandles-CUu3u1ms-BwdESJaa.js";import{I as _e}from"./FeatureStore-Co2V0sVE-CElWpT8A.js";import{Z as ge}from"./QueryEngine-CH5uUhZK-BVwPnUvQ.js";import{V as I}from"./TileInfo-CWIRDhZl-Ch2wjHMe.js";import{b as S}from"./Query-BrwMGK8U-Czy7zTOT.js";import{q as ye,j as me}from"./ElevationInfo-yv2-9tj6-CyBKWN5L.js";import{b as te}from"./LRUCache-C3erQTWv-C199rMlj.js";import{s as V}from"./uuid-Dj9mdEVg-BaKSCiyT.js";import{L as Fe,q as Ce,V as Ee}from"./featureConversionUtils-D6hFQ4Af-CEuFGI_1.js";import{L as Te}from"./arcgisLayerUrl-HNYh8jvG-BMXHpDXD.js";import{U as ve}from"./pbfQueryUtils-F4ZE8-K8-Do7V3Vp0.js";import{w as Se,J as be,q as Ie,P as we}from"./query-DFW9-NG_-C276id-6.js";import{G as Oe}from"./ByteSizeUnit-DL8UhsB0-B2-AmVRx.js";import{r as xe}from"./BoundsStore--N6o1xkF-BcOTl2h8.js";import{e as Re}from"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./timeSupport-jPViR5jn-BsRUQ5fy.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./queryUtils-Brxu6254-tmwGb18Z.js";import"./projection-BA9M1R7d-BKRd0G8R.js";import"./projectBuffer-CvCBvJ6W-C5Ro3r1r.js";import"./normalizeUtils-Bxmy9MNI-BPHTpNbp.js";import"./normalizeUtilsCommon-CRJlkfEA-Be-npwT6.js";import"./utils-9sQxfkoa-D2a_EK_f.js";import"./utils-Bq23Xwmj-BvYoINn1.js";import"./json-BI97KiBB-Ce5cWfI2.js";import"./optimizedFeatureQueryEngineAdapter-DFdaawxC-DNl3CnZx.js";import"./WhereClause-DxwoyBMS-B8Miz4ar.js";import"./TimeOnly-DSMefxKy-XoAdFLl7.js";import"./UnknownTimeZone-C--TOcPG-Dog7Z2QG.js";import"./fieldType-CD2CL2hr-CVd-54dQ.js";import"./QueryEngineCapabilities-Gr588n9t-DjYb9CEb.js";import"./quantizationUtils-bJy1cRwp-CSdDG6Qx.js";import"./utils-HtkT8Fn3-CYPZVlpA.js";import"./TimeExtent-Cn0Jofqr-BjQCS4sW.js";import"./heatmapUtils-seiMkkkR-CxJCLPog.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./utils-DyydRFHu-DVSaoXEc.js";import"./Basemap-BEqqSTw9-6FRywGmX.js";import"./loadAll-e978YItg-BnulJHOd.js";import"./PortalItem-CctGdnxF-B7QwDhS9.js";import"./writeUtils-D5qlLkwk-C0JpaLz3.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-BoY0uuoO.js";import"./utils-tNxq3jkf-CT0u8vKS.js";import"./ClassBreaksDefinition-bYRgYgPp-B0skPqFW.js";import"./FieldsIndex-HmzMbJQG-O-PfDURr.js";import"./Scheduler-B7UX7Wr5-DMHMl04j.js";import"./signal-CETehA7D-BLwyPag2.js";import"./Field-C6hA1tZj-B1Pp42ij.js";import"./lengthUtils-DKpMe5qR-DCJ3Mz-L.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./pbf-D-y3_eZO-BP8mfak1.js";import"./queryZScale-BiYV6Pr6-_U1xEZf-.js";import"./PooledRBush-DbfAmeLn-CeAvuHAX.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";function $(e=!1,t){if(e){const{elevationInfo:s,alignPointsInFeatures:i}=t;return new Pe(s,i)}return new Ae}let Ae=class{async alignCandidates(e,t,s){return e}notifyElevationSourceChange(){}};const He=1024;let Pe=class{constructor(e,t){this._elevationInfo=e,this._alignPointsInFeatures=t,this._alignmentsCache=new te(He),this._cacheVersion=0}async alignCandidates(e,t,s){const i=this._elevationInfo;return i==null||i.mode!=="absolute-height"||i.featureExpressionInfo?this._alignComputedElevationCandidates(e,t,s):(De(e,t,i),e)}notifyElevationSourceChange(){this._alignmentsCache.clear(),this._cacheVersion++}async _alignComputedElevationCandidates(e,t,s){const i=new Map;for(const _ of e)oe(i,_.objectId,Me).push(_);const[r,n,o]=this._prepareQuery(i,t),a=await this._alignPointsInFeatures(r,s);if(g(s),o!==this._cacheVersion)return this._alignComputedElevationCandidates(e,t,s);this._applyCacheAndResponse(r,a,n);const{drapedObjectIds:l,failedObjectIds:h}=a,c=[];for(const _ of e){const{objectId:y}=_;l.has(y)&&_.type==="edge"&&(_.draped=!0),h.has(y)||c.push(_)}return c}_prepareQuery(e,t){const s=[],i=[];for(const[r,n]of e){const o=[];for(const a of n)this._addToQueriesOrCachedResult(r,a.target,o,i),a.type==="edge"&&(this._addToQueriesOrCachedResult(r,a.start,o,i),this._addToQueriesOrCachedResult(r,a.end,o,i));o.length!==0&&s.push({objectId:r,points:o})}return[{spatialReference:t.toJSON(),pointsInFeatures:s},i,this._cacheVersion]}_addToQueriesOrCachedResult(e,t,s,i){const r=k(e,t),n=this._alignmentsCache.get(r);n==null?s.push(t):i.push(new ze(t,n))}_applyCacheAndResponse(e,{elevations:t,drapedObjectIds:s,failedObjectIds:i},r){for(const a of r)a.apply();let n=0;const o=this._alignmentsCache;for(const{objectId:a,points:l}of e.pointsInFeatures){if(i.has(a)){n+=l.length;continue}const h=!s.has(a);for(const c of l){const _=k(a,c),y=t[n++];c.z=y,h&&o.put(_,y,1)}}}};class ze{constructor(t,s){this.point=t,this.z=s}apply(){this.point.z=this.z}}function k(e,{x:t,y:s,z:i,spatialReference:r}){return`${e}-${t}-${s}-${i??0}}-wkid:${r?.wkid}`}function De(e,t,s){const{offset:i,unit:r}=s;if(i==null)return;const n=ae(t),o=i*(me(r??"meters")/n);for(const a of e)switch(a.type){case"edge":a.start.z+=o,a.end.z+=o;continue;case"vertex":a.target.z+=o;continue}}function Me(){return[]}let Ne=class{filter(e,t){return t}notifyElevationSourceChange(){}},je=class{filter(e,t){const{point:s,distance:i}=e,{z:r}=s;if(r==null||t.length===0)return t;const n=$e(i),o=this._updateCandidatesTo3D(t,s,n).filter(Ue);return o.sort(ke),o}_updateCandidatesTo3D(e,t,s){for(const i of e)switch(i.type){case"edge":qe(i,t,s);continue;case"vertex":Ve(i,t,s);continue}return e}};function Ue(e){return e.distance<=1}function L(e=!1){return e?new je:new Ne}function qe(e,t,{x:s,y:i,z:r}){const{start:n,end:o,target:a}=e;e.draped||Be(a,t,n,o);const l=(t.x-a.x)/s,h=(t.y-a.y)/i,c=(t.z-a.z)/r;e.distance=Math.sqrt(l*l+h*h+c*c)}function Be(e,t,s,i){const r=i.x-s.x,n=i.y-s.y,o=i.z-s.z,a=r*r+n*n+o*o,l=(t.x-s.x)*r+(t.y-s.y)*n+o*(t.z-s.z),h=Math.min(1,Math.max(0,l/a)),c=s.x+r*h,_=s.y+n*h,y=s.z+o*h;e.x=c,e.y=_,e.z=y}function Ve(e,t,{x:s,y:i,z:r}){const{target:n}=e,o=(t.x-n.x)/s,a=(t.y-n.y)/i,l=(t.z-n.z)/r,h=Math.sqrt(o*o+a*a+l*l);e.distance=h}function $e(e){return typeof e=="number"?{x:e,y:e,z:e}:e}function ke(e,t){return e.distance-t.distance}function J(e=!1,t){return e?new Qe(t):new Le}class Le{async fetch(){return[]}notifySymbologyChange(){}}const Je=1024;let Qe=class{constructor(e){this._getSymbologyCandidates=e,this._candidatesCache=new te(Je),this._cacheVersion=0}async fetch(e,t){if(e.length===0)return[];const s=[],i=[],r=this._candidatesCache;for(const c of e){const _=Q(c),y=r.get(_);if(y)for(const E of y)i.push(z(E));else s.push(c),r.put(_,[],1)}if(s.length===0)return i;const n=this._cacheVersion,{candidates:o,sourceCandidateIndices:a}=await this._getSymbologyCandidates(s,t);if(g(t),n!==this._cacheVersion)return this.fetch(e,t);const l=[],{length:h}=o;for(let c=0;c<h;++c){const _=o[c],y=Q(s[a[c]]),E=r.get(y);E.push(_),r.put(y,E,E.length),l.push(z(_))}return i.concat(l)}notifySymbologyChange(){this._candidatesCache.clear(),this._cacheVersion++}};function Q(e){switch(e.type){case"vertex":{const{objectId:t,target:s}=e,i=`${t}-vertex-${s.x}-${s.y}-${s.z??0}`;return D(i).toString()}case"edge":{const{objectId:t,start:s,end:i}=e,r=`${t}-edge-${s.x}-${s.y}-${s.z??0}-to-${i.x}-${i.y}-${i.z??0}`;return D(r).toString()}default:return""}}class Ze{constructor(t,s){this.data=t,this.resolution=s,this.state={type:u.CREATED},this.alive=!0}process(t){switch(this.state.type){case u.CREATED:return this.state=this._gotoFetchCount(this.state,t),this.state.task.promise.then(t.resume,t.resume);case u.FETCH_COUNT:break;case u.FETCHED_COUNT:return this.state=this._gotoFetchFeatures(this.state,t),this.state.task.promise.then(t.resume,t.resume);case u.FETCH_FEATURES:break;case u.FETCHED_FEATURES:this.state=this._goToDone(this.state,t);case u.DONE:}return null}get debugInfo(){return{data:this.data,featureCount:this._featureCount,state:this._stateToString}}get _featureCount(){switch(this.state.type){case u.CREATED:case u.FETCH_COUNT:return 0;case u.FETCHED_COUNT:return this.state.featureCount;case u.FETCH_FEATURES:return this.state.previous.featureCount;case u.FETCHED_FEATURES:return this.state.features.length;case u.DONE:return this.state.previous.features.length}}get _stateToString(){switch(this.state.type){case u.CREATED:return"created";case u.FETCH_COUNT:return"fetch-count";case u.FETCHED_COUNT:return"fetched-count";case u.FETCH_FEATURES:return"fetch-features";case u.FETCHED_FEATURES:return"fetched-features";case u.DONE:return"done"}}_gotoFetchCount(t,s){return{type:u.FETCH_COUNT,previous:t,task:b(async i=>{const r=await B(s.fetchCount(this,i));this.state.type===u.FETCH_COUNT&&(this.state=Ge(this.state,r.ok?r.value:1/0))})}}_gotoFetchFeatures(t,s){return{type:u.FETCH_FEATURES,previous:t,task:b(async i=>{const r=await B(s.fetchFeatures(this,t.featureCount,i));this.state.type===u.FETCH_FEATURES&&(this.state=We(this.state,r.ok?r.value:[]))})}}_goToDone(t,s){return s.finish(this,t.features),{type:u.DONE,previous:t}}reset(){const t=this.state;switch(this.state={type:u.CREATED},t.type){case u.CREATED:case u.FETCHED_COUNT:case u.FETCHED_FEATURES:case u.DONE:break;case u.FETCH_COUNT:case u.FETCH_FEATURES:t.task.abort()}}intersects(t){return t==null||!this.data.extent||(H(t,Z),A(this.data.extent,Z))}}function Ge(e,t){return{type:u.FETCHED_COUNT,featureCount:t,previous:e}}function We(e,t){return{type:u.FETCHED_FEATURES,previous:e,features:t}}var u;(function(e){e[e.CREATED=0]="CREATED",e[e.FETCH_COUNT=1]="FETCH_COUNT",e[e.FETCHED_COUNT=2]="FETCHED_COUNT",e[e.FETCH_FEATURES=3]="FETCH_FEATURES",e[e.FETCHED_FEATURES=4]="FETCHED_FEATURES",e[e.DONE=5]="DONE"})(u||(u={}));const Z=W();let f=class extends X{get _minimumVerticesPerFeature(){switch(this.store?.featureStore.geometryType){case"esriGeometryPoint":case"esriGeometryMultipoint":return 1;case"esriGeometryPolygon":return 4;case"esriGeometryPolyline":return 2}}get _mandatoryOutFields(){const e=new Set;return this.objectIdField&&e.add(this.objectIdField),this.globalIdField&&e.add(this.globalIdField),e}set outFields(e){const t=this._get("outFields"),s=M(e,this._mandatoryOutFields);le(s,t)||(this._set("outFields",s),O(s,t)||this.refresh())}get outFields(){return this._get("outFields")??this._mandatoryOutFields}set filter(e){const t=this._get("filter"),s=this._filterProperties(e);JSON.stringify(t)!==JSON.stringify(s)&&this._set("filter",s)}set customParameters(e){const t=this._get("customParameters");JSON.stringify(t)!==JSON.stringify(e)&&this._set("customParameters",e)}get _configuration(){return{filter:this.filter,customParameters:this.customParameters,tileInfo:this.tileInfo,tileSize:this.tileSize}}set tileInfo(e){const t=this._get("tileInfo");t!==e&&(e!=null&&t!=null&&JSON.stringify(e)===JSON.stringify(t)||(this._set("tileInfo",e),this.store.tileInfo=e))}set tileSize(e){this._get("tileSize")!==e&&this._set("tileSize",e)}get updating(){return this._updatingHandles.updating}get hasZ(){return this.store.featureStore.hasZ}constructor(e){super(e),this.suspended=!0,this._historicMoment=null,this.tilesOfInterest=[],this.availability=0,this._pendingTiles=new Map,this._updatingHandles=new ee}initialize(){this._initializeFetchExtent(),this._updatingHandles.add(()=>this._configuration,()=>this.refresh()),this._updatingHandles.add(()=>this.tilesOfInterest,(e,t)=>{ue(e,t,({id:s},{id:i})=>s===i)||this._process()},K),this.addHandles(he(()=>!this.suspended,()=>this._process()))}destroy(){this._pendingTiles.forEach(e=>this._deletePendingTile(e)),this._pendingTiles.clear(),this.store.destroy(),this.tilesOfInterest.length=0,this._updatingHandles.destroy()}refresh(){this.store.refresh(),this._pendingTiles.forEach(e=>this._deletePendingTile(e)),this._process()}async handleEdits(e){if(e.historicMoment&&(this._historicMoment=e.historicMoment),!e.addedFeatures.length&&!e.updatedFeatures.length&&!e.deletedFeatures.length)return;for(const i of this._pendingTiles.values())i.reset();const t={...e,deletedFeatures:e.deletedFeatures.map(({objectId:i,globalId:r})=>i&&i!==-1?i:this._lookupObjectIdByGlobalId(r))},s=b(async i=>{try{await this.store.processEdits(t,(r,n)=>this._queryFeaturesById(r,n),i),this._processPendingTiles()}catch(r){N(r),j.getLogger(this).warn("Failed to apply edits",r)}});this.addHandles(s),await this._updatingHandles.addPromise(s.promise)}setHistoricMoment(e){e?.getTime()!==this._historicMoment?.getTime()&&(this._historicMoment=e,this.refresh())}_initializeFetchExtent(){if(!this.capabilities.query.supportsExtent||!Te(this.url))return;const e=b(async t=>{try{const s=await Se(this.url,new S({where:"1=1",outSpatialReference:this.spatialReference,cacheHint:this.capabilities.query.supportsCacheHint??void 0}),{query:this._configuration.customParameters,signal:t});this.store.extent=ce.fromJSON(s.data?.extent)}catch(s){N(s),j.getLogger(this).warn("Failed to fetch data extent",s)}});this._updatingHandles.addPromise(e.promise.then(()=>this._process())),this.addHandles(e)}get debugInfo(){return{numberOfFeatures:this.store.featureStore.numFeatures,tilesOfInterest:this.tilesOfInterest,pendingTiles:Array.from(this._pendingTiles.values()).map(e=>e.debugInfo),storedTiles:this.store.debugInfo}}_process(){this._markTilesNotAlive(),this._createPendingTiles(),this._deletePendingTiles(),this._processPendingTiles()}_markTilesNotAlive(){for(const e of this._pendingTiles.values())e.alive=!1}_createPendingTiles(){if(this.suspended)return;const e=this._collectMissingTilesInfo();if(this._setAvailability(e==null?1:e.coveredArea/e.fullArea),e!=null)for(const{data:t,resolution:s}of e.missingTiles){const i=this._pendingTiles.get(t.id);i?(i.resolution=s,i.alive=!0):this._createPendingTile(t,s)}}_collectMissingTilesInfo(){let e=null;for(let t=this.tilesOfInterest.length-1;t>=0;t--){const s=this.tilesOfInterest[t],i=this.store.process(s,(r,n)=>this._verifyTileComplexity(r,n),this.outFields);e==null?e=i:e.prepend(i)}return e}_deletePendingTiles(){for(const e of this._pendingTiles.values())e.alive||this._deletePendingTile(e)}_processPendingTiles(){const e={fetchCount:(t,s)=>this._fetchCount(t,s),fetchFeatures:(t,s,i)=>this._fetchFeatures(t,s,i),finish:(t,s)=>this._finishPendingTile(t,s),resume:()=>this._processPendingTiles()};if(this._ensureFetchAllCounts(e))for(const t of this._pendingTiles.values())this._verifyTileComplexity(this.store.getFeatureCount(t.data),t.resolution)&&this._updatingHandles.addPromise(t.process(e))}_verifyTileComplexity(e,t){return this._verifyVertexComplexity(e)&&this._verifyFeatureDensity(e,t)}_verifyVertexComplexity(e){return e*this._minimumVerticesPerFeature<Xe}_verifyFeatureDensity(e,t){if(this.tileInfo==null)return!1;const s=this.tileSize*t;return e*(Ye/(s*s))<et}_ensureFetchAllCounts(e){let t=!0;for(const s of this._pendingTiles.values())s.state.type<u.FETCHED_COUNT&&this._updatingHandles.addPromise(s.process(e)),s.state.type<=u.FETCH_COUNT&&(t=!1);return t}_finishPendingTile(e,t){this.store.add(e.data,t),this._deletePendingTile(e),this._updateAvailability()}_updateAvailability(){const e=this._collectMissingTilesInfo();this._setAvailability(e==null?1:e.coveredArea/e.fullArea)}_setAvailability(e){this._set("availability",e)}_createPendingTile(e,t){const s=new Ze(e,t);return this._pendingTiles.set(e.id,s),s}_deletePendingTile(e){e.reset(),this._pendingTiles.delete(e.data.id)}async _fetchCount(e,t){return this.store.fetchCount(e.data,this.url,this._createCountQuery(e),{query:this.customParameters,timeout:w,signal:t})}async _fetchFeatures(e,t,s){let i=0;const r=[];let n=0,o=t;for(;;){const a=this._createFeaturesQuery(e),l=this._setPagingParameters(a,i,o),{features:h,exceededTransferLimit:c}=await this._queryFeatures(a,s);l&&(i+=a.num),n+=h.length;for(const _ of h)r.push(_);if(o=t-n,!l||!c||o<=0)return r}}_filterProperties(e){return e==null?{where:"1=1",gdbVersion:void 0,timeExtent:void 0}:{where:e.where||"1=1",timeExtent:e.timeExtent,gdbVersion:e.gdbVersion}}_lookupObjectIdByGlobalId(e){const t=this.globalIdField,s=this.objectIdField;if(t==null)throw new Error("Expected globalIdField to be defined");let i=null;const r=e&&V(e);if(this.store.featureStore.forEach(n=>{r===V(n.attributes[t])&&(i=n.objectId??n.attributes[s])}),i==null)throw new Error(`Expected to find a feature with globalId ${e}`);return i}_queryFeaturesById(e,t){const s=this._createFeaturesQuery();return s.objectIds=e,this._queryFeatures(s,t)}_queryFeatures(e,t){return this.capabilities.query.supportsFormatPBF?this._queryFeaturesPBF(e,t):this._queryFeaturesJSON(e,t)}async _queryFeaturesPBF(e,t){const{sourceSpatialReference:s}=this,{data:i}=await be(this.url,e,new ve({sourceSpatialReference:s}),{query:this._configuration.customParameters,timeout:w,signal:t});return Fe(i)}async _queryFeaturesJSON(e,t){const{sourceSpatialReference:s}=this,{data:i}=await Ie(this.url,e,s,{query:this._configuration.customParameters,timeout:w,signal:t});return Ce(i,this.objectIdField)}_createCountQuery(e){const t=this._createBaseQuery(e);return this.capabilities.query.supportsCacheHint&&(t.cacheHint=!0),t}_createFeaturesQuery(e=null){const t=this._createBaseQuery(e),s=e?.data!=null?this.store.getAttributesForTile(e?.data?.id):null,i=M(de(this.outFields,s??new Set),this._mandatoryOutFields);return t.outFields=Array.from(i),t.returnGeometry=!0,e!=null&&(this.capabilities.query.supportsResultType?t.resultType="tile":this.capabilities.query.supportsCacheHint&&(t.cacheHint=!0)),t}_createBaseQuery(e){const t=new S({returnZ:this.hasZ,returnM:!1,historicMoment:this._historicMoment,geometry:this.tileInfo!=null&&e!=null?pe(e.data.extent,this.tileInfo.spatialReference):void 0}),s=this._configuration.filter;return s!=null&&(t.where=s.where,t.gdbVersion=s.gdbVersion,t.timeExtent=s.timeExtent),t.outSpatialReference=this.spatialReference,t}_setPagingParameters(e,t,s){if(!this.capabilities.query.supportsPagination)return!1;const{supportsMaxRecordCountFactor:i,supportsCacheHint:r,tileMaxRecordCount:n,maxRecordCount:o,supportsResultType:a}=this.capabilities.query,l=i?S.MAX_MAX_RECORD_COUNT_FACTOR:1,h=l*((a||r)&&n?n:o||Ke);return e.start=t,i?(e.maxRecordCountFactor=Math.min(l,Math.ceil(s/h)),e.num=Math.min(s,e.maxRecordCountFactor*h)):e.num=Math.min(s,h),!0}};d([p({constructOnly:!0})],f.prototype,"url",void 0),d([p({constructOnly:!0})],f.prototype,"objectIdField",void 0),d([p({constructOnly:!0})],f.prototype,"globalIdField",void 0),d([p({constructOnly:!0})],f.prototype,"capabilities",void 0),d([p({constructOnly:!0})],f.prototype,"sourceSpatialReference",void 0),d([p({constructOnly:!0})],f.prototype,"spatialReference",void 0),d([p({constructOnly:!0})],f.prototype,"store",void 0),d([p({readOnly:!0})],f.prototype,"_minimumVerticesPerFeature",null),d([p()],f.prototype,"_mandatoryOutFields",null),d([p()],f.prototype,"outFields",null),d([p()],f.prototype,"suspended",void 0),d([p()],f.prototype,"_historicMoment",void 0),d([p()],f.prototype,"filter",null),d([p()],f.prototype,"customParameters",null),d([p({readOnly:!0})],f.prototype,"_configuration",null),d([p()],f.prototype,"tileInfo",null),d([p()],f.prototype,"tileSize",null),d([p()],f.prototype,"tilesOfInterest",void 0),d([p({readOnly:!0})],f.prototype,"updating",null),d([p({readOnly:!0})],f.prototype,"availability",void 0),d([p()],f.prototype,"hasZ",null),f=d([R("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTiledFetcher")],f);const Ke=2e3,w=6e5,Xe=1e6,Ye=25,et=1;class tt{constructor(){this._store=new Map,this._byteSize=0}set(t,s){this.delete(t),this._store.set(t,s),this._byteSize+=s.byteSize}delete(t){const s=this._store.get(t);return!!this._store.delete(t)&&(s!=null&&(this._byteSize-=s.byteSize),!0)}get(t){return this._used(t),this._store.get(t)}has(t){return this._used(t),this._store.has(t)}clear(){this._store.clear()}applyByteSizeLimit(t,s){for(const[i,r]of this._store){if(this._byteSize<=t)break;this.delete(i),s(r)}}values(){return this._store.values()}[Symbol.iterator](){return this._store[Symbol.iterator]()}_used(t){const s=this._store.get(t);s&&(this._store.delete(t),this._store.set(t,s))}}let F=class extends X{constructor(e){super(e),this.tileInfo=null,this.extent=null,this.maximumByteSize=10*Oe.MEGABYTES,this._tileBounds=new xe,this._tiles=new tt,this._refCounts=new Map,this._tileFeatureCounts=new Map,this._tmpBoundingRect=W()}add(e,t){for(const r of t)this._referenceFeature(r.objectId);const s=this.featureStore.upsertMany(t),i=s.map(r=>new Set(Object.keys(r.attributes))).reduce((r,n)=>U(r,n),new Set(Object.keys(s[0]?.attributes??[])));this._addTileStorage(e,new Set(s.map(r=>r.objectId)),it(s),i),this._tiles.applyByteSizeLimit(this.maximumByteSize,r=>this._removeTileStorage(r))}getAttributesForTile(e){return e?this._tiles.get(e)?.attributeKeys:null}destroy(){this.clear(),this._tileFeatureCounts.clear()}clear(){this.featureStore.clear(),this._tileBounds.clear(),this._tiles.clear(),this._refCounts.clear()}refresh(){this.clear(),this._tileFeatureCounts.clear()}processEdits(e,t,s){return this._processEditsDelete(e.deletedFeatures.concat(e.updatedFeatures)),this._processEditsRefetch(e.addedFeatures.concat(e.updatedFeatures),t,s)}_addTileStorage(e,t,s,i){const r=e.id;this._tiles.set(r,new ot(e,t,s,i)),this._tileBounds.set(r,e.extent),this._tileFeatureCounts.set(r,t.size)}_remove({id:e}){const t=this._tiles.get(e);t&&this._removeTileStorage(t)}_removeTileStorage(e){const t=[];for(const i of e.objectIds)this._unreferenceFeature(i)===C.REMOVED&&t.push(i);this.featureStore.removeManyById(t);const s=e.data.id;this._tiles.delete(s),this._tileBounds.delete(s)}_processEditsDelete(e){this.featureStore.removeManyById(e);for(const t of this._tiles.values()){for(const s of e)t.objectIds.delete(s);this._tileFeatureCounts.set(t.data.id,t.objectIds.size)}for(const t of e)this._refCounts.delete(t)}async _processEditsRefetch(e,t,s){if(!e.length)return;const i=(await t(e,s)).features,{hasZ:r,hasM:n}=this.featureStore;for(const o of i){const a=Ee(this._tmpBoundingRect,o.geometry,r,n);a!=null&&this._tileBounds.forEachInBounds(a,l=>{const h=this._tiles.get(l);this.featureStore.add(o);const c=o.objectId;h.objectIds.has(c)||(h.objectIds.add(c),this._referenceFeature(c),this._tileFeatureCounts.set(h.data.id,h.objectIds.size))})}}process(e,t=()=>!0,s){if(this.tileInfo==null||!e.extent||this.extent!=null&&!A(H(this.extent,this._tmpBoundingRect),e.extent))return new x(e);const i=this.getAttributesForTile(e.id);if(O(s,i))return new x(e);const r=this._createTileTree(e,this.tileInfo);return this._simplify(r,t,null,0,1),this._collectMissingTiles(e,r,this.tileInfo,s)}get debugInfo(){return Array.from(this._tiles.values()).map(({data:e})=>({data:e,featureCount:this._tileFeatureCounts.get(e.id)||0}))}getFeatureCount(e){return this._tileFeatureCounts.get(e.id)??0}async fetchCount(e,t,s,i){const r=this._tileFeatureCounts.get(e.id);if(r!=null)return r;const n=await we(t,s,i);return this._tileFeatureCounts.set(e.id,n.data.count),n.data.count}_createTileTree(e,t){const s=new G(e.level,e.row,e.col);return t.updateTileInfo(s,I.ExtrapolateOptions.POWER_OF_TWO),this._tileBounds.forEachInBounds(e.extent,i=>{const r=this._tiles.get(i)?.data;r&&st(e,r)&&this._populateChildren(s,r,t,this._tileFeatureCounts.get(r.id)||0)}),s}_populateChildren(e,t,s,i){const r=t.level-e.level-1;if(r<0)return void(e.isLeaf=!0);const n=t.row>>r,o=t.col>>r,a=e.row<<1,l=o-(e.col<<1)+(n-a<<1),h=e.children[l];if(h!=null)this._populateChildren(h,t,s,i);else{const c=new G(e.level+1,n,o);s.updateTileInfo(c,I.ExtrapolateOptions.POWER_OF_TWO),e.children[l]=c,this._populateChildren(c,t,s,i)}}_simplify(e,t,s,i,r){const n=r*r;if(e.isLeaf)return t(this.getFeatureCount(e),r)?0:(this._remove(e),s!=null&&(s.children[i]=null),n);const o=r/2,a=o*o;let l=0;for(let h=0;h<e.children.length;h++){const c=e.children[h];l+=c!=null?this._simplify(c,t,e,h,o):a}return l===0?this._mergeChildren(e):1-l/n<lt&&(this._purge(e),s!=null&&(s.children[i]=null),l=n),l}_mergeChildren(e){const t=new Set;let s,i=0;this._forEachLeaf(e,r=>{const n=this._tiles.get(r.id);if(n){s=s?U(s,n.attributeKeys):new Set(n.attributeKeys),i+=n.byteSize;for(const o of n.objectIds)t.has(o)||(t.add(o),this._referenceFeature(o));this._remove(r)}}),this._addTileStorage(e,t,i,s??new Set),e.isLeaf=!0,e.children[0]=e.children[1]=e.children[2]=e.children[3]=null,this._tileFeatureCounts.set(e.id,t.size)}_forEachLeaf(e,t){for(const s of e.children)s!=null&&(s.isLeaf?t(s):this._forEachLeaf(s,t))}_purge(e){if(e!=null)if(e.isLeaf)this._remove(e);else for(let t=0;t<e.children.length;t++){const s=e.children[t];this._purge(s),e.children[t]=null}}_collectMissingTiles(e,t,s,i){const r=new at(s,e,this.extent);return this._collectMissingTilesRecurse(t,r,1,i),r.info}_collectMissingTilesRecurse(e,t,s,i){const r=this.getAttributesForTile(e.id),n=r&&!O(i,r);if(n&&t.addMissing(e.level,e.row,e.col,s),e.isLeaf)return;if(!e.hasChildren)return void(n||t.addMissing(e.level,e.row,e.col,s));const o=s/2;for(let a=0;a<e.children.length;a++){const l=e.children[a];l==null?t.addMissing(e.level+1,(e.row<<1)+((2&a)>>1),(e.col<<1)+(1&a),o):this._collectMissingTilesRecurse(l,t,o,i)}}_referenceFeature(e){const t=(this._refCounts.get(e)||0)+1;return this._refCounts.set(e,t),t===1?C.ADDED:C.UNCHANGED}_unreferenceFeature(e){const t=(this._refCounts.get(e)||0)-1;return t===0?(this._refCounts.delete(e),C.REMOVED):(t>0&&this._refCounts.set(e,t),C.UNCHANGED)}get test(){}};function st(e,t){if(!e||!t)return!1;if(e.level===t.level)return e.row===t.row&&e.col===t.col;const s=e.level<t.level,i=s?e:t,r=s?t:e,n=1<<r.level-i.level;return Math.floor(r.row/n)===i.row&&Math.floor(r.col/n)===i.col}function it(e){return e.reduce((t,s)=>t+rt(s),0)}function rt(e){return 32+nt(e.geometry)+fe(e.attributes)}function nt(e){if(e==null)return 0;const t=q(e.lengths,4);return 32+q(e.coords,8)+t}d([p({constructOnly:!0})],F.prototype,"featureStore",void 0),d([p()],F.prototype,"tileInfo",void 0),d([p()],F.prototype,"extent",void 0),d([p()],F.prototype,"maximumByteSize",void 0),F=d([R("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTileStore")],F);let ot=class{constructor(e,t,s,i){this.data=e,this.objectIds=t,this.byteSize=s,this.attributeKeys=i}};class G{constructor(t,s,i){this.level=t,this.row=s,this.col=i,this.isLeaf=!1,this.extent=null,this.children=[null,null,null,null]}get hasChildren(){return!this.isLeaf&&(this.children[0]!=null||this.children[1]!=null||this.children[2]!=null||this.children[3]!=null)}}let x=class{constructor(e,t=[]){this.missingTiles=t,this.fullArea=0,this.coveredArea=0,this.fullArea=Y(e.extent),this.coveredArea=this.fullArea}prepend(e){this.missingTiles=e.missingTiles.concat(this.missingTiles),this.coveredArea+=e.coveredArea,this.fullArea+=e.fullArea}},at=class{constructor(e,t,s){this._tileInfo=e,this._extent=null,this.info=new x(t),s!=null&&(this._extent=H(s))}addMissing(e,t,s,i){const r=new Re(null,e,t,s);this._tileInfo.updateTileInfo(r,I.ExtrapolateOptions.POWER_OF_TWO),r.extent==null||this._extent!=null&&!A(this._extent,r.extent)||(this.info.missingTiles.push({data:r,resolution:i}),this.info.coveredArea-=Y(r.extent))}};const lt=.18751;var C;(function(e){e[e.ADDED=0]="ADDED",e[e.REMOVED=1]="REMOVED",e[e.UNCHANGED=2]="UNCHANGED"})(C||(C={}));let T=class extends se.EventedAccessor{constructor(){super(...arguments),this._isInitializing=!0,this.remoteClient=null,this._whenSetup=ie(),this._elevationAligner=$(),this._elevationFilter=L(),this._symbologyCandidatesFetcher=J(),this._updatingHandles=new ee,this._alignPointsInFeatures=async(e,t)=>{const s={query:e},i=await this.remoteClient.invoke("alignElevation",s,{signal:t});return g(t),i},this._getSymbologyCandidates=async(e,t)=>{const s={candidates:e,spatialReference:this._spatialReference.toJSON()},i=await this.remoteClient.invoke("getSymbologyCandidates",s,{signal:t});return g(t),i}}get updating(){return this._isInitializing||this._updatingHandles.updating||this._featureFetcher.updating}destroy(){this._featureFetcher?.destroy(),this._queryEngine?.destroy(),this._featureStore?.clear()}async setup(e){if(this.destroyed)return{result:{}};const{geometryType:t,objectIdField:s,timeInfo:i,fieldsIndex:r}=e.serviceInfo,{hasZ:n}=e,o=v.fromJSON(e.spatialReference);this._spatialReference=o,this._featureStore=new _e({...e.serviceInfo,hasZ:n,hasM:!1}),this._queryEngine=new ge({spatialReference:e.spatialReference,featureStore:this._featureStore,geometryType:t,fieldsIndex:r,hasZ:n,hasM:!1,objectIdField:s,timeInfo:i}),this._featureFetcher=new f({store:new F({featureStore:this._featureStore}),url:e.serviceInfo.url,objectIdField:e.serviceInfo.objectIdField,globalIdField:e.serviceInfo.globalIdField,capabilities:e.serviceInfo.capabilities,spatialReference:o,sourceSpatialReference:v.fromJSON(e.serviceInfo.spatialReference),customParameters:e.configuration.customParameters});const a=e.configuration.viewType==="3d";return this._elevationAligner=$(a,{elevationInfo:e.elevationInfo!=null?ye.fromJSON(e.elevationInfo):null,alignPointsInFeatures:this._alignPointsInFeatures}),this._elevationFilter=L(a),this.addHandles([P(()=>this._featureFetcher.availability,l=>this.emit("notify-availability",{availability:l}),K),P(()=>this.updating,()=>this._notifyUpdating())]),this._whenSetup.resolve(),this._isInitializing=!1,this.configure(e.configuration)}async configure(e){return await this._updatingHandles.addPromise(this._whenSetup.promise),this._updateFeatureFetcherConfiguration(e),m}async setSuspended(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),g(t),this._featureFetcher.suspended=e,m}async updateOutFields(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),g(t),this._featureFetcher.outFields=new Set(e??[]),m}async fetchCandidates(e,t){await this._whenSetup.promise,g(t);const s=ut(e),i=t?.signal,r=await this._queryEngine.executeQueryForSnapping(s,i);g(i);const n=await this._elevationAligner.alignCandidates(r.candidates,v.fromJSON(e.point.spatialReference)??v.WGS84,i);g(i);const o=await this._symbologyCandidatesFetcher.fetch(n,i);g(i);const a=o.length===0?n:n.concat(o);return{result:{candidates:this._elevationFilter.filter(s,a)}}}async updateTiles(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),g(t),this._featureFetcher.tileSize=e.tileSize,this._featureFetcher.tilesOfInterest=e.tiles,this._featureFetcher.tileInfo=e.tileInfo!=null?I.fromJSON(e.tileInfo):null,m}async refresh(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),g(t),this._featureFetcher.refresh(),m}async whenNotUpdating(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),g(t),await re(()=>!this.updating,t),g(t),m}async getDebugInfo(e,t){return g(t),{result:this._featureFetcher.debugInfo}}async handleEdits(e,t){return await this._updatingHandles.addPromise(this._whenSetup.promise),g(t),await this._updatingHandles.addPromise(this._featureFetcher.handleEdits(e)),g(t),m}async setHistoricMoment(e,t){return this._featureFetcher.setHistoricMoment(e.moment),m}async notifyElevationSourceChange(e,t){return this._elevationAligner.notifyElevationSourceChange(),m}async notifySymbologyChange(e,t){return this._symbologyCandidatesFetcher.notifySymbologyChange(),m}async setSymbologySnappingSupported(e){return this._symbologyCandidatesFetcher=J(e,this._getSymbologyCandidates),m}_updateFeatureFetcherConfiguration(e){this._featureFetcher.filter=e.filter!=null?S.fromJSON(e.filter):null,this._featureFetcher.customParameters=e.customParameters}_notifyUpdating(){this.emit("notify-updating",{updating:this.updating})}};d([p({readOnly:!0})],T.prototype,"updating",null),d([p()],T.prototype,"_isInitializing",void 0),T=d([R("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceSnappingSourceWorker")],T);const fs=T;function ut(e){if(!e.filter)return{...e,query:{where:"1=1"}};const{distance:t,units:s,spatialRel:i,where:r,timeExtent:n,objectIds:o}=e.filter,a={geometry:e.filter.geometry?ne(e.filter.geometry):void 0,distance:t,units:s,spatialRel:i,timeExtent:n,objectIds:o,where:r??"1=1"};return{...e,query:a}}const m={result:{}};export{fs as default};
