import{aU as e,a1 as a,v as o,S as p,i as s}from"./main-B45ONSYR.js";import{d as n}from"./BitmapContainer-BC8fvmFc-CUETZrf1.js";import{X as h,Y as d}from"./LayerView-Bish-E63-m9YR3-Mr.js";import{K as g}from"./ExportStrategy-BNE7Gp0u-BVDzdOUO.js";import{n as u}from"./RefreshableLayerView-BdQpGYly-DBu3X2SS.js";import"./WGLContainer-LxgEo4I_-DmxzGwc-.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./LabelMetric-BeluzH3o-GdzIBsBo.js";import"./enums-CpSG_SL3-BMD3Tb1v.js";import"./Texture-BCt2hphT-B4KiRKsV.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Program-DLVwTiPA-BhzVmZxV.js";import"./BufferObject-BM_7mcDb-BHFaa0tf.js";import"./VertexElementDescriptor-BAy1DPb3-BOhpDZGx.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./VertexArrayObject-M4iRGGoi-BdAHaNSx.js";import"./ProgramTemplate-DQOm6Omy-D0h4ifTy.js";import"./Tile-D75RMC64-CTYNWGRT.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TileKey-C5IL-JBr-CvNShEcJ.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./QueueProcessor-DbfV9fLy-BYjFd0WI.js";import"./workers-PiCjreoO-Cfwtz3p6.js";import"./ReactiveMap-CFk6jPfN-BxiZTuiP.js";import"./signal-CETehA7D-Ce7lQyQM.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./Query-BrwMGK8U-CWuEdVb7.js";import"./Field-C6hA1tZj-UZtAHMpI.js";import"./fieldType-CD2CL2hr-CkNKFH-Z.js";import"./TimeExtent-Cn0Jofqr-CiY7tSqJ.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./MapView-BGOJJ8ch-BY7moAw_.js";import"./Cyclical-C_9rKUUQ-I9OnXxgg.js";import"./CollectionFlattener-DkHuHn5E-C_tTL2OF.js";import"./projection-BA9M1R7d-WK5VIHtG.js";import"./projectBuffer-CvCBvJ6W-BGpb6he4.js";import"./TileInfo-CWIRDhZl-CAG-_V1P.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-CJEhVFfs.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-DBRhqRfK.js";import"./Map-1zd11DKO-Cr8pjqUZ.js";import"./Basemap-BEqqSTw9-CpI_h8tc.js";import"./loadAll-e978YItg-DktrzRQd.js";import"./PortalItem-CctGdnxF-PHoYftxN.js";import"./writeUtils-D5qlLkwk-CvJ3UGDB.js";import"./compilerUtils-CV1QYWI8-DCvTmkDB.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-DNZMlWea.js";import"./TablesMixin-C8RojhYs-DxZGWv96.js";import"./Layer-ChoECxvZ-CLAmJagO.js";import"./GraphicsCollection-CWTXNZOX-CPznK44k.js";import"./HeightModelInfo-C5vFqzyF-q4Ne-nDO.js";import"./arcgisLayerUrl-HNYh8jvG-By_7MEQ1.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./normalizeUtils-Bxmy9MNI-Bs_6_WsB.js";import"./normalizeUtilsCommon-CRJlkfEA-DZrMDPkH.js";import"./utils-9sQxfkoa-BGnnnLzF.js";import"./utils-Bq23Xwmj-DyOyL-CU.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-DGsY21B1.js";import"./vec32-D9GsKZ1t-DcvbDM-v.js";import"./imageUtils-BA2D6Uf1-bnjt5uHw.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-CxzI0q_a.js";import"./ColorBackground-gVZldRLm-0RSqJZ1p.js";import"./vec3f32-BS0cezmI-B_madU1n.js";import"./Container-BcuL1ZEG-DQ6v_Xk0.js";import"./parser-DyDJ-rlI-C7QmqZXi.js";import"./StyleDefinition-Ct4HIk9T-B82pTf0h.js";import"./config-nuMERBvb-MDUrh2eL.js";import"./earcut-XDcq3zAf-BcwyrT7l.js";import"./featureConversionUtils-D6hFQ4Af-DDlceMdI.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./layerViewUtils-DURAPenP-BfX7Kg_8.js";import"./Bitmap-CcqmzvfR-CQNgvsJ8.js";let t=class extends u(h(d)){update(r){this._strategy.update(r).catch(i=>{e(i)||a.getLogger(this).error(i)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new n,this.container.addChild(this._bitmapContainer),this._strategy=new g({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this._strategy.destroy(),this._strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(r,i,m){return this.layer.fetchImageBitmap(r,i,m)}async doRefresh(){this.requestUpdate()}isUpdating(){return this._strategy.updating||this.updateRequested}};o([p()],t.prototype,"_strategy",void 0),o([p()],t.prototype,"updating",void 0),t=o([s("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const $t=t;export{$t as default};
