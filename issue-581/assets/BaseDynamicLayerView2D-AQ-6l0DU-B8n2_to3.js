import{aU as e,a1 as a,v as o,S as p,i as s}from"./main-DpxXUdv2.js";import{d as n}from"./BitmapContainer-BC8fvmFc-Cojk4FBD.js";import{X as h,Y as d}from"./LayerView-Bish-E63-DjYnGP7W.js";import{K as g}from"./ExportStrategy-BNE7Gp0u-C5TWSoVw.js";import{n as u}from"./RefreshableLayerView-BdQpGYly-YzOB2Oxh.js";import"./WGLContainer-LxgEo4I_-D4n4xuJp.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./LabelMetric-BeluzH3o-DwoZtUZv.js";import"./enums-CpSG_SL3-BMD3Tb1v.js";import"./Texture-BCt2hphT-CY5BmhUW.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Program-DLVwTiPA-CVTJoSEG.js";import"./BufferObject-BM_7mcDb-kyljAjji.js";import"./VertexElementDescriptor-BAy1DPb3-BOhpDZGx.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./VertexArrayObject-M4iRGGoi-CuMbr1xh.js";import"./ProgramTemplate-DQOm6Omy-BrGTglrE.js";import"./Tile-D75RMC64-CowKumQg.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TileKey-C5IL-JBr-C70_wn6p.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./QueueProcessor-DbfV9fLy-CksWzEWc.js";import"./workers-PiCjreoO-7R5mjQqD.js";import"./ReactiveMap-CFk6jPfN-CDgV15WM.js";import"./signal-CETehA7D-CgZKEK0G.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./Query-BrwMGK8U-DqQJTG_M.js";import"./Field-C6hA1tZj-CwiJIz6T.js";import"./fieldType-CD2CL2hr-CllUqCz8.js";import"./TimeExtent-Cn0Jofqr-C7YvvP3G.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./MapView-BGOJJ8ch-DWfdEP-W.js";import"./Cyclical-C_9rKUUQ-CxlB_6Th.js";import"./CollectionFlattener-DkHuHn5E-DDpF7hdv.js";import"./projection-BA9M1R7d-DvQb2AGE.js";import"./projectBuffer-CvCBvJ6W-5Rq78G6B.js";import"./TileInfo-CWIRDhZl-BwgbhG-a.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-IfR4AP0Q.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-2aHYDj8S.js";import"./Map-1zd11DKO-amuxABGg.js";import"./Basemap-BEqqSTw9-Bx1g4OoC.js";import"./loadAll-e978YItg-C32hiM-C.js";import"./PortalItem-CctGdnxF-C6oa7Q-1.js";import"./writeUtils-D5qlLkwk-B6RfOaZh.js";import"./compilerUtils-CV1QYWI8-CB5476AS.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-D5jiA99P.js";import"./TablesMixin-C8RojhYs-C7R3bchU.js";import"./Layer-ChoECxvZ-yJ4ACum4.js";import"./GraphicsCollection-CWTXNZOX-lIlclSaK.js";import"./HeightModelInfo-C5vFqzyF-DmAcJ8Ca.js";import"./arcgisLayerUrl-HNYh8jvG-CIVa6WBy.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./normalizeUtils-Bxmy9MNI-BzK2AhMf.js";import"./normalizeUtilsCommon-CRJlkfEA-4m5Oyrtk.js";import"./utils-9sQxfkoa-p8r8UJKS.js";import"./utils-Bq23Xwmj-DKd3LM-s.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-BENAW0fL.js";import"./vec32-D9GsKZ1t-CeQ3Vrgu.js";import"./imageUtils-BA2D6Uf1-yHRfs0jd.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-CqFeqYQY.js";import"./ColorBackground-gVZldRLm-5Cokf_fY.js";import"./vec3f32-BS0cezmI-B_madU1n.js";import"./Container-BcuL1ZEG-GTijiPOY.js";import"./parser-DyDJ-rlI-BMpMnGrd.js";import"./StyleDefinition-Ct4HIk9T-B82pTf0h.js";import"./config-nuMERBvb-MDUrh2eL.js";import"./earcut-XDcq3zAf-BcwyrT7l.js";import"./featureConversionUtils-D6hFQ4Af-CEOAGb29.js";import"./OptimizedFeature-EIithYlr-Cq64mIT3.js";import"./OptimizedFeatureSet-DfZGBuxJ-C08BOAgi.js";import"./layerViewUtils-DURAPenP-CnFNC98P.js";import"./Bitmap-CcqmzvfR-Cmt2rDd1.js";let t=class extends u(h(d)){update(r){this._strategy.update(r).catch(i=>{e(i)||a.getLogger(this).error(i)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new n,this.container.addChild(this._bitmapContainer),this._strategy=new g({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this._strategy.destroy(),this._strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(r,i,m){return this.layer.fetchImageBitmap(r,i,m)}async doRefresh(){this.requestUpdate()}isUpdating(){return this._strategy.updating||this.updateRequested}};o([p()],t.prototype,"_strategy",void 0),o([p()],t.prototype,"updating",void 0),t=o([s("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const $t=t;export{$t as default};
