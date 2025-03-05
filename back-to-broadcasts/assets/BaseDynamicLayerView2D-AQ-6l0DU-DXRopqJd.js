import{aU as e,a1 as a,v as o,S as p,i as s}from"./main-Cs_aiUdl.js";import{d as n}from"./BitmapContainer-BC8fvmFc-Dj5tDKsv.js";import{X as h,Y as d}from"./LayerView-Bish-E63-vHSal4H4.js";import{K as g}from"./ExportStrategy-BNE7Gp0u-Q7DNVJXQ.js";import{n as u}from"./RefreshableLayerView-BdQpGYly-B0bFUndH.js";import"./WGLContainer-LxgEo4I_-C62Hu5m1.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./LabelMetric-BeluzH3o-Dga8ucQD.js";import"./enums-CpSG_SL3-BMD3Tb1v.js";import"./Texture-BCt2hphT-BmJNygwb.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Program-DLVwTiPA-DG9Z5jVy.js";import"./BufferObject-BM_7mcDb-Biccor6B.js";import"./VertexElementDescriptor-BAy1DPb3-BOhpDZGx.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./VertexArrayObject-M4iRGGoi-D3Kk-ubx.js";import"./ProgramTemplate-DQOm6Omy-DEvR-gT3.js";import"./Tile-D75RMC64-C9lj-Ovu.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TileKey-C5IL-JBr-BdeLQOWf.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./QueueProcessor-DbfV9fLy-BmkWX0Xd.js";import"./workers-PiCjreoO-CplQWBwY.js";import"./ReactiveMap-CFk6jPfN-BDIYf1Oi.js";import"./signal-CETehA7D-C84fUPHe.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./Query-BrwMGK8U-DQSiC4Cc.js";import"./Field-C6hA1tZj-CMbYZi9Y.js";import"./fieldType-CD2CL2hr-CH0Anpbb.js";import"./TimeExtent-Cn0Jofqr-CAgh_uO-.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./MapView-BGOJJ8ch-DuvHsReP.js";import"./Cyclical-C_9rKUUQ-CS9wpO7T.js";import"./CollectionFlattener-DkHuHn5E-igQXiAHe.js";import"./projection-BA9M1R7d-BWvhhUoV.js";import"./projectBuffer-CvCBvJ6W-7_j_g4FI.js";import"./TileInfo-CWIRDhZl-GF_uUznO.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-CtY5ccrQ.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-D0UN9u8j.js";import"./Map-1zd11DKO-Bs-0v5vl.js";import"./Basemap-BEqqSTw9-CMimbyYx.js";import"./loadAll-e978YItg-Crr1bqUJ.js";import"./PortalItem-CctGdnxF-BtTD9Sgk.js";import"./writeUtils-D5qlLkwk-B53fDe66.js";import"./compilerUtils-CV1QYWI8-JHgFGjx8.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-CYYetRgj.js";import"./TablesMixin-C8RojhYs-DSdHVDGG.js";import"./Layer-ChoECxvZ-CC9CEywo.js";import"./GraphicsCollection-CWTXNZOX-DEVRhbHr.js";import"./HeightModelInfo-C5vFqzyF-CMFLm6qy.js";import"./arcgisLayerUrl-HNYh8jvG-D_2U6us3.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./normalizeUtils-Bxmy9MNI-YjFjk1Om.js";import"./normalizeUtilsCommon-CRJlkfEA-pZvmG5Cu.js";import"./utils-9sQxfkoa-BPdjV6WE.js";import"./utils-Bq23Xwmj-Ck7Ykhi-.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-DcHXUqd-.js";import"./vec32-D9GsKZ1t-Cq3X6syh.js";import"./imageUtils-BA2D6Uf1-CCnJQPNB.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-t7Esrjr0.js";import"./ColorBackground-gVZldRLm-BuWFqwmB.js";import"./vec3f32-BS0cezmI-B_madU1n.js";import"./Container-BcuL1ZEG-D1JqktUr.js";import"./parser-DyDJ-rlI-BSFL6_CY.js";import"./StyleDefinition-Ct4HIk9T-B82pTf0h.js";import"./config-nuMERBvb-MDUrh2eL.js";import"./earcut-XDcq3zAf-BcwyrT7l.js";import"./featureConversionUtils-D6hFQ4Af-fr8pAOas.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./layerViewUtils-DURAPenP-D045xkJx.js";import"./Bitmap-CcqmzvfR-CHzfwdTh.js";let t=class extends u(h(d)){update(r){this._strategy.update(r).catch(i=>{e(i)||a.getLogger(this).error(i)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new n,this.container.addChild(this._bitmapContainer),this._strategy=new g({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this._strategy.destroy(),this._strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(r,i,m){return this.layer.fetchImageBitmap(r,i,m)}async doRefresh(){this.requestUpdate()}isUpdating(){return this._strategy.updating||this.updateRequested}};o([p()],t.prototype,"_strategy",void 0),o([p()],t.prototype,"updating",void 0),t=o([s("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const $t=t;export{$t as default};
