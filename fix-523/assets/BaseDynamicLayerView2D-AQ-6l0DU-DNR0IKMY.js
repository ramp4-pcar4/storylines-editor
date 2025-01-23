import{aU as e,a1 as a,v as o,S as p,i as s}from"./main-BS_S-e9u.js";import{d as n}from"./BitmapContainer-BC8fvmFc-DyHYFBeW.js";import{X as h,Y as d}from"./LayerView-Bish-E63-BncmJW47.js";import{K as g}from"./ExportStrategy-BNE7Gp0u-CdT5vnna.js";import{n as u}from"./RefreshableLayerView-BdQpGYly-C_p5xJju.js";import"./WGLContainer-LxgEo4I_-DKIJMRRq.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./LabelMetric-BeluzH3o-5YYP12c0.js";import"./enums-CpSG_SL3-BMD3Tb1v.js";import"./Texture-BCt2hphT-C9icgrSQ.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Program-DLVwTiPA-BNRFoc7R.js";import"./BufferObject-BM_7mcDb-CdtFg9V1.js";import"./VertexElementDescriptor-BAy1DPb3-BOhpDZGx.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./VertexArrayObject-M4iRGGoi-B8K5AKeX.js";import"./ProgramTemplate-DQOm6Omy-NPry_fvF.js";import"./Tile-D75RMC64-CwcHmZkA.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TileKey-C5IL-JBr-CjWffVPk.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./QueueProcessor-DbfV9fLy-BK7UAi7-.js";import"./workers-PiCjreoO-Gd4jffXJ.js";import"./ReactiveMap-CFk6jPfN-7NWF3tck.js";import"./signal-CETehA7D-C6T3qkuU.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./Query-BrwMGK8U-CcoeI1sc.js";import"./Field-C6hA1tZj-D307IX69.js";import"./fieldType-CD2CL2hr-V0R985MP.js";import"./TimeExtent-Cn0Jofqr-gGdBdZmk.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./MapView-BGOJJ8ch-Crt5Yg1u.js";import"./Cyclical-C_9rKUUQ-BYzutzh6.js";import"./CollectionFlattener-DkHuHn5E-Cey1HrEf.js";import"./projection-BA9M1R7d-CzGUO2co.js";import"./projectBuffer-CvCBvJ6W-wIgKq9o9.js";import"./TileInfo-CWIRDhZl-D71i4ss3.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-BiN_cUUa.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-y4nFk1Pn.js";import"./Map-1zd11DKO-DsizoQvI.js";import"./Basemap-BEqqSTw9-CZPEZD3H.js";import"./loadAll-e978YItg-DaVxBWoG.js";import"./PortalItem-CctGdnxF-IWmAubEM.js";import"./writeUtils-D5qlLkwk-C7vVl4F9.js";import"./compilerUtils-CV1QYWI8-ea-VbZeJ.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-Ck3AlrGI.js";import"./TablesMixin-C8RojhYs-Cei0Oel9.js";import"./Layer-ChoECxvZ-WeXehlnb.js";import"./GraphicsCollection-CWTXNZOX-C3xNNKPZ.js";import"./HeightModelInfo-C5vFqzyF-Bn1ArER6.js";import"./arcgisLayerUrl-HNYh8jvG-CxD8PCee.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./normalizeUtils-Bxmy9MNI-1bh2kCM7.js";import"./normalizeUtilsCommon-CRJlkfEA-BO8g7KnX.js";import"./utils-9sQxfkoa-BgAiDBsH.js";import"./utils-Bq23Xwmj-PYKhYNrU.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-CisgVBBP.js";import"./vec32-D9GsKZ1t-C0DOCXm_.js";import"./imageUtils-BA2D6Uf1-DaMJcv6M.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-C6RARytV.js";import"./ColorBackground-gVZldRLm-C59VL975.js";import"./vec3f32-BS0cezmI-B_madU1n.js";import"./Container-BcuL1ZEG-WTT-YTaB.js";import"./parser-DyDJ-rlI-CnW9EFr3.js";import"./StyleDefinition-Ct4HIk9T-B82pTf0h.js";import"./config-nuMERBvb-MDUrh2eL.js";import"./earcut-XDcq3zAf-BcwyrT7l.js";import"./featureConversionUtils-D6hFQ4Af-QbOmFFsO.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./layerViewUtils-DURAPenP-DZMOq25g.js";import"./Bitmap-CcqmzvfR-D4Ozt7PP.js";let t=class extends u(h(d)){update(r){this._strategy.update(r).catch(i=>{e(i)||a.getLogger(this).error(i)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new n,this.container.addChild(this._bitmapContainer),this._strategy=new g({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this._strategy.destroy(),this._strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(r,i,m){return this.layer.fetchImageBitmap(r,i,m)}async doRefresh(){this.requestUpdate()}isUpdating(){return this._strategy.updating||this.updateRequested}};o([p()],t.prototype,"_strategy",void 0),o([p()],t.prototype,"updating",void 0),t=o([s("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const $t=t;export{$t as default};
