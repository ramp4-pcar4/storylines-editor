import{aC as l,aU as c,a1 as y,v as u,S as w,i as g}from"./main-BLGVPR4E.js";import{L as I,D as f}from"./imageUtils-Co-ELErj-CkdKQbeM.js";import{X as S,Y as T}from"./LayerView-Bish-E63-14xUwwRU.js";import{Q as V,$ as v,a as x}from"./Tile-D75RMC64-B39fC4xL.js";import{s as d}from"./TileKey-C5IL-JBr-fPUXppry.js";import{n as Q}from"./RefreshableLayerView-BdQpGYly-CSUQD1Qi.js";import{i as M}from"./Scheduler-B7UX7Wr5-L9bpcE1u.js";import"./MapView-BGOJJ8ch-CAl7TPtR.js";import"./Cyclical-C_9rKUUQ-Cw5NQNiu.js";import"./CollectionFlattener-DkHuHn5E-BAwWOWEy.js";import"./workers-PiCjreoO-BdIF_ryt.js";import"./projection-BA9M1R7d-CgK5UJhM.js";import"./projectBuffer-CvCBvJ6W-R_bfgxmt.js";import"./TileInfo-CWIRDhZl-CQAnfnpg.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-D7mUBfqb.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-CYHSEs8a.js";import"./signal-CETehA7D-COk75xit.js";import"./Map-1zd11DKO-8lMezB9i.js";import"./Basemap-BEqqSTw9-DGMQ-wru.js";import"./loadAll-e978YItg-D2d64dtN.js";import"./PortalItem-CctGdnxF-QcTINXmb.js";import"./writeUtils-D5qlLkwk-ka5gnM98.js";import"./compilerUtils-CV1QYWI8-B_s0Ccxq.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-Dm1NL7Y1.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-ptRz7Z2U.js";import"./Layer-ChoECxvZ-D0ycW4ZB.js";import"./TimeExtent-Cn0Jofqr-ChwuHnBa.js";import"./GraphicsCollection-CWTXNZOX-D2hwPVVG.js";import"./HeightModelInfo-C5vFqzyF-D6QCrNk0.js";import"./ReactiveMap-CFk6jPfN-B9lBXA4S.js";import"./Query-BrwMGK8U-DI_2Zx7_.js";import"./Field-C6hA1tZj-DbB1uazy.js";import"./fieldType-CD2CL2hr-CzF8MVZw.js";import"./arcgisLayerUrl-HNYh8jvG-Bkt9HWex.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./normalizeUtils-Bxmy9MNI-DTUgCI4I.js";import"./normalizeUtilsCommon-CRJlkfEA-BxO7OA0B.js";import"./utils-9sQxfkoa-CfwdLGFM.js";import"./utils-Bq23Xwmj-D5PTMjfM.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./vec32-D9GsKZ1t-D5810-NE.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-B1Zzq8t1.js";import"./imageUtils-BA2D6Uf1-BAcFhDZh.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-B9NN4PVX.js";import"./ColorBackground-gVZldRLm-BsLddR7P.js";import"./QueueProcessor-DbfV9fLy-JnDGum92.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./Bitmap-CcqmzvfR-CU-Oz00-.js";import"./Container-BcuL1ZEG-Bk-wUyYx.js";import"./parser-DyDJ-rlI-BAHBC7vX.js";import"./WGLContainer-LxgEo4I_-Bu4u5MRr.js";import"./LabelMetric-BeluzH3o-BzPo2Kcu.js";import"./enums-CpSG_SL3-BMD3Tb1v.js";import"./Program-DLVwTiPA-9clxiq1B.js";import"./BufferObject-BM_7mcDb-Drn_yE-g.js";import"./VertexElementDescriptor-BAy1DPb3-BOhpDZGx.js";import"./VertexArrayObject-M4iRGGoi-CC8UB1Yz.js";import"./ProgramTemplate-DQOm6Omy-BhrUqFqj.js";import"./vec3f32-BS0cezmI-B_madU1n.js";import"./StyleDefinition-Ct4HIk9T-B82pTf0h.js";import"./config-nuMERBvb-MDUrh2eL.js";import"./earcut-XDcq3zAf-BcwyrT7l.js";import"./featureConversionUtils-D6hFQ4Af-B1tpjajv.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./TileContainer-D48pXXgL-_wwBzSHb.js";import"./layerViewUtils-DURAPenP-BROh9xD9.js";const R=[0,0];let r=class extends Q(I(S(T))){constructor(){super(...arguments),this._tileStrategy=null,this._fetchQueue=null,this.layer=null}get tileMatrixSet(){const{activeLayer:t}=this.layer,{tileMatrixSet:e}=t;if(e&&l(e.tileInfo?.spatialReference,this.view.spatialReference))return e;const i=this._getTileMatrixSetBySpatialReference(t);return i&&i.id!==t.tileMatrixSetId?(t.tileMatrixSetId=i.id,i):null}update(t){this._fetchQueue.pause(),this._fetchQueue.state=t.state,this._tileStrategy.update(t),this._fetchQueue.resume()}attach(){const t=this.tileMatrixSet?.tileInfo;t&&(this._tileInfoView=new V(t),this._fetchQueue=new v({tileInfoView:this._tileInfoView,concurrency:16,process:(e,i)=>this.fetchTile(e,i),scheduler:this.scheduler,priority:M.MAPVIEW_FETCH_QUEUE}),this._tileStrategy=new x({cachePolicy:"keep",resampling:!0,acquireTile:e=>this.acquireTile(e),releaseTile:e=>this.releaseTile(e),tileInfoView:this._tileInfoView}),this.addAttachHandles(this._updatingHandles.add(()=>[this.layer?.activeLayer?.styleId,this.tileMatrixSet],()=>this.doRefresh())),super.attach())}detach(){super.detach(),this._tileStrategy?.destroy(),this._fetchQueue?.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}supportsSpatialReference(t){return this.layer.activeLayer.tileMatrixSets?.some(e=>l(e.tileInfo?.spatialReference,t))??!1}async doRefresh(){if(this.attached){if(this.suspended)return this._tileStrategy.clear(),void this.requestUpdate();this._fetchQueue.reset(),this._tileStrategy.refresh(t=>this._updatingHandles.addPromise(this._enqueueTileFetch(t)))}}acquireTile(t){const e=this._bitmapView.createTile(t),i=e.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(R,e.key),i.resolution=this._tileInfoView.getTileResolution(e.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._updatingHandles.addPromise(this._enqueueTileFetch(e)),this._bitmapView.addChild(e),this.requestUpdate(),e}releaseTile(t){this._fetchQueue.abort(t.key.id),this._bitmapView.removeChild(t),t.once("detach",()=>t.destroy()),this.requestUpdate()}async fetchTile(t,e={}){const i="tilemapCache"in this.layer?this.layer.tilemapCache:null,{signal:s,resamplingLevel:p=0}=e;if(!i)return this._fetchImage(t,s);const a=new d(0,0,0,0);let h;try{await i.fetchAvailabilityUpsample(t.level,t.row,t.col,a,{signal:s}),h=await this._fetchImage(a,s)}catch(o){if(c(o))throw o;if(p<3){const m=this._tileInfoView.getTileParentId(t.id);if(m){const n=new d(m),_=await this.fetchTile(n,{...e,resamplingLevel:p+1});return f(this._tileInfoView,_,n,t)}}throw o}return f(this._tileInfoView,h,a,t)}canResume(){return super.canResume()&&this.tileMatrixSet!==null}async _enqueueTileFetch(t){if(!this._fetchQueue.has(t.key.id)){try{const e=await this._fetchQueue.push(t.key);t.bitmap.source=e,t.bitmap.width=this._tileInfoView.tileInfo.size[0],t.bitmap.height=this._tileInfoView.tileInfo.size[1],t.once("attach",()=>this.requestUpdate())}catch(e){c(e)||y.getLogger(this).error(e)}this.requestUpdate()}}async _fetchImage(t,e){return this.layer.fetchImageBitmapTile(t.level,t.row,t.col,{signal:e})}_getTileMatrixSetBySpatialReference(t){return t.tileMatrixSets?.find(e=>l(e.tileInfo?.spatialReference,this.view.spatialReference))}};u([w({readOnly:!0})],r.prototype,"tileMatrixSet",null),r=u([g("esri.views.2d.layers.WMTSLayerView2D")],r);const Zt=r;export{Zt as default};
