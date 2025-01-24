import{o as y,$ as c,cY as T,ay as E,a1 as g,b0 as _,aU as w,aC as I}from"./main-gpNb-fIA.js";import{z as P,n as q}from"./featureConversionUtils-D6hFQ4Af-B5c7OWxJ.js";import{I as b}from"./FeatureStore-Co2V0sVE-DPVdkixl.js";import{f as j,h as $}from"./queryUtils-Brxu6254-MEr3n21S.js";import{Z as O}from"./QueryEngine-CH5uUhZK-CjgyyKwj.js";import{X as Q,_ as M}from"./geojson-CNt_qtQf-C_ezS6Pt.js";import{F as N}from"./sourceUtils-BMeqkJ5g-Bno7s4f7.js";import{V as k,b as L,I as f}from"./wfsUtils-DoLaqXsj-DbryQ9-o.js";import{o as Z}from"./FieldsIndex-HmzMbJQG-DOXeYaAb.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./BoundsStore--N6o1xkF-DjYundqx.js";import"./PooledRBush-DbfAmeLn-BQhkQTD6.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./timeSupport-jPViR5jn-BS7_sUd3.js";import"./optimizedFeatureQueryEngineAdapter-DFdaawxC-jxgeQN9l.js";import"./projection-BA9M1R7d-DjGiO5U0.js";import"./projectBuffer-CvCBvJ6W-BppqXe5n.js";import"./normalizeUtils-Bxmy9MNI-D1zSUhD0.js";import"./normalizeUtilsCommon-CRJlkfEA-snka2v1e.js";import"./utils-9sQxfkoa-Cu9SoasQ.js";import"./utils-Bq23Xwmj-CRlLqrXR.js";import"./json-BI97KiBB-Ce5cWfI2.js";import"./LRUCache-C3erQTWv-CTPpJQsN.js";import"./WhereClause-DxwoyBMS-CcnmHhDD.js";import"./TimeOnly-DSMefxKy-CdoPVTRI.js";import"./UnknownTimeZone-C--TOcPG-DKp2wYMQ.js";import"./fieldType-CD2CL2hr-B3_83FRa.js";import"./QueryEngineCapabilities-Gr588n9t-DjYb9CEb.js";import"./quantizationUtils-bJy1cRwp-C9BOenHK.js";import"./utils-HtkT8Fn3-D6i415B8.js";import"./TimeExtent-Cn0Jofqr-DB46E7PV.js";import"./heatmapUtils-seiMkkkR-CQRnB0IM.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./utils-DyydRFHu-D4V4VDXx.js";import"./Basemap-BEqqSTw9-D1iP95qX.js";import"./loadAll-e978YItg-DB-RwY1n.js";import"./PortalItem-CctGdnxF-Bb4EjjRy.js";import"./writeUtils-D5qlLkwk-CaI_hBD2.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-C_vT_4dx.js";import"./utils-tNxq3jkf-DteIK76-.js";import"./ClassBreaksDefinition-bYRgYgPp-BEmyHyB1.js";import"./Scheduler-B7UX7Wr5-CHh7oo9M.js";import"./signal-CETehA7D-DYpFinQS.js";import"./date-Cqvy-TgA-DIf-QFLz.js";import"./xmlUtils-TLuV3CJ7-Cs2DGP6C.js";import"./arcgisLayerUrl-HNYh8jvG-CDgDAw7T.js";import"./Field-C6hA1tZj-BkbLeOdd.js";const x="esri.layers.WFSLayer";class Zt{constructor(){this._customParameters=null,this._queryEngine=null,this._supportsPagination=!0}destroy(){this._queryEngine?.destroy(),this._queryEngine=null}async load(e,t={}){const{getFeatureUrl:a,getFeatureOutputFormat:s,fields:n,geometryType:u,featureType:o,maxRecordCount:i,maxTotalRecordCount:h,maxPageCount:R,objectIdField:d,customParameters:F}=e,{spatialReference:p,getFeatureSpatialReference:l}=k(a,o,e.spatialReference);try{await j(l,p)}catch{throw new y("unsupported-projection","Projection not supported",{inSpatialReference:l,outSpatialReference:p})}c(t),this._customParameters=F,this._featureType=o,this._fieldsIndex=Z.fromLayerJSON({fields:n,dateFieldsTimeReference:n.some(S=>S.type==="esriFieldTypeDate")?{timeZoneIANA:T}:null}),this._geometryType=u,this._getFeatureUrl=a,this._getFeatureOutputFormat=s,this._getFeatureSpatialReference=l,this._maxRecordCount=i,this._maxTotalRecordCount=h,this._maxPageCount=R,this._objectIdField=d,this._spatialReference=p;let m=await this._snapshotFeatures(t);if(m.errors.length>0&&(this._supportsPagination=!1,m=await this._snapshotFeatures(t),m.errors.length>0))throw m.errors[0];return this._queryEngine=new O({fieldsIndex:this._fieldsIndex,geometryType:u,hasM:!1,hasZ:!1,objectIdField:d,spatialReference:p,timeInfo:null,featureStore:new b({geometryType:u,hasM:!1,hasZ:!1})}),this._queryEngine.featureStore.addMany(m.features),{warnings:C(m),extent:(await this._queryEngine.fetchRecomputedExtents()).fullExtent}}async applyEdits(){throw new y("wfs-source:editing-not-supported","applyEdits() is not supported on WFSLayer")}async queryFeatures(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(e,t.signal)}async queryFeatureCount(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(e,t.signal)}async queryObjectIds(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(e,t.signal)}async queryExtent(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(e,t.signal)}async querySnapping(e,t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(e,t.signal)}async refresh(e){return this._customParameters=e.customParameters,this._maxRecordCount=e.maxRecordCount,this._maxTotalRecordCount=e.maxTotalRecordCount,this._maxPageCount=e.maxPageCount,this._snapshotTask?.abort(),this._snapshotTask=E(t=>this._snapshotFeatures({signal:t})),this._snapshotTask.promise.then(t=>{this._queryEngine.featureStore.clear(),this._queryEngine.featureStore.addMany(t.features);for(const a of C(t))g.getLogger(x).warn(new _("wfs-layer:refresh-warning",a.message,a.details));t.errors?.length&&g.getLogger(x).warn(new _("wfs-layer:refresh-error","Refresh completed with errors",{errors:t.errors}))},()=>{this._queryEngine.featureStore.clear()}),await this._waitSnapshotComplete(),{extent:(await this._queryEngine.fetchRecomputedExtents()).fullExtent}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _snapshotFeatures(e){const t=e?.signal,a=this._maxTotalRecordCount,s=this._maxPageCount,n=this._supportsPagination?await L(this._getFeatureUrl,this._featureType.typeName,{customParameters:this._customParameters,signal:t}):void 0;let u=[];const o=[];if(n==null)try{u=await this._singleQuery(t)}catch(i){w(i)||o.push(i)}else{const i=Math.min(n,a),h=U(this,Math.max(1,Math.min(Math.ceil(i/this._maxRecordCount),s)),t);await Promise.allSettled(Array.from({length:10}).map(()=>J(h,u,o)))}return c(t),{features:u,totalRecordCount:n,maxTotalRecordCount:a,maxPageCount:s,errors:o}}async _singleQuery(e){const t=await f(this._getFeatureUrl,this._featureType.typeName,this._getFeatureSpatialReference,this._getFeatureOutputFormat,{customParameters:this._customParameters,signal:e});return this._processGeoJSON(t,{signal:e})}async _pageQuery(e,t){const a=e*this._maxRecordCount,s=await f(this._getFeatureUrl,this._featureType.typeName,this._getFeatureSpatialReference,this._getFeatureOutputFormat,{customParameters:this._customParameters,startIndex:a,count:this._maxRecordCount,signal:t});return this._processGeoJSON(s,{startIndex:a,signal:t})}_processGeoJSON(e,t){Q(e,this._getFeatureSpatialReference.wkid);const{startIndex:a,signal:s}=t;c(s);const n=M(e,{geometryType:this._geometryType,hasZ:!1,objectIdField:this._objectIdField});if(!I(this._spatialReference,this._getFeatureSpatialReference))for(const o of n)o.geometry!=null&&(o.geometry=P($(q(o.geometry,this._geometryType,!1,!1),this._getFeatureSpatialReference,this._spatialReference)));let u=a??1;for(const o of n){const i={};N(this._fieldsIndex,i,o.attributes,!0),o.attributes=i,i[this._objectIdField]==null&&(o.objectId=i[this._objectIdField]=u++)}return n}}function*U(r,e,t){for(let a=0;a<e;a++)yield r._pageQuery(a,t)}async function J(r,e,t){let a=r.next();for(;!a.done;){try{const s=await a.value;e.push(...s)}catch(s){w(s)||t.push(s)}a=r.next()}}function C(r){const e=[];return r.totalRecordCount!=null&&(r.features.length<r.totalRecordCount&&e.push({name:"wfs-layer:maxRecordCount-too-low",message:`Could only fetch ${r.features.length} of ${r.totalRecordCount} in ${r.maxPageCount} queries. Try increasing the value of WFSLayer.maxRecordCount.`,details:{recordCount:r.features.length,totalRecordCount:r.totalRecordCount}}),r.totalRecordCount>r.maxTotalRecordCount&&e.push({name:"wfs-layer:large-dataset",message:`The number of ${r.totalRecordCount} features exceeds the maximum allowed of ${r.maxTotalRecordCount}.`,details:{recordCount:r.features.length,totalRecordCount:r.totalRecordCount,maxTotalRecordCount:r.maxTotalRecordCount}})),e}export{Zt as default};
