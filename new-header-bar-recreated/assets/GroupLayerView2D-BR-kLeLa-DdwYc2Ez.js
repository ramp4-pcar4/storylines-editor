import{v as t,S as s,eb as n,i as h,ag as m,ah as l,av as o,am as d}from"./main-DMS0m9I5.js";import{X as V,Y as w}from"./LayerView-Bish-E63-F3IwfiO2.js";import"./Container-BcuL1ZEG-B2LYvC4U.js";import"./MapView-BGOJJ8ch-Ae7aDAwn.js";import"./Cyclical-C_9rKUUQ-D-oBV2jp.js";import"./CollectionFlattener-DkHuHn5E-C3vGoGT9.js";import"./workers-PiCjreoO-BTkQTpWC.js";import"./projection-BA9M1R7d-9x1PsaFU.js";import"./projectBuffer-CvCBvJ6W-Wi8hw3ok.js";import"./TileInfo-CWIRDhZl-MHCFVcer.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-CJOu9wo9.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-CS329Km8.js";import"./signal-CETehA7D-DzMNcpjC.js";import"./Map-1zd11DKO-DLx14FjF.js";import"./Basemap-BEqqSTw9-DT1cSrk6.js";import"./loadAll-e978YItg-B9Hkr0yV.js";import"./PortalItem-CctGdnxF-CAOPDG2E.js";import"./writeUtils-D5qlLkwk-EJTBASxY.js";import"./compilerUtils-CV1QYWI8-CNdyTq7Y.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-LGc5tcLd.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-DHy8rOfj.js";import"./Layer-ChoECxvZ-K9ZMiecJ.js";import"./TimeExtent-Cn0Jofqr-DT_DeRjv.js";import"./GraphicsCollection-CWTXNZOX-DIPvSL7N.js";import"./HeightModelInfo-C5vFqzyF-D_dR4LBi.js";import"./ReactiveMap-CFk6jPfN-DpcaECAt.js";import"./Query-BrwMGK8U-BlQR0MjS.js";import"./Field-C6hA1tZj-DeD-rUkw.js";import"./fieldType-CD2CL2hr-CGRVeitF.js";import"./arcgisLayerUrl-HNYh8jvG-DuIM7Xfh.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-UX6PaiCZ.js";import"./TileKey-C5IL-JBr-DAi85cmh.js";import"./QueueProcessor-DbfV9fLy-D7g7djsb.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-rywKVRXs.js";import"./normalizeUtilsCommon-CRJlkfEA-a_as5EjO.js";import"./utils-9sQxfkoa-DHIGqreG.js";import"./utils-Bq23Xwmj-PZn5ij1v.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-CfrKRl8l.js";import"./vec32-D9GsKZ1t-Cxyibv7P.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-GEVQVsRN.js";import"./imageUtils-BA2D6Uf1-BbbhYfAb.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-DO0eaP_o.js";import"./ColorBackground-gVZldRLm-aAYgCsef.js";import"./parser-DyDJ-rlI-CeHcNjL1.js";import"./layerViewUtils-DURAPenP-qC1w4h37.js";let r=class extends w{constructor(i){super(i),this.type="group",this.layerViews=new m}destroy(){this.layerViews.length=0}_allLayerViewVisibility(i){this.layerViews.forEach(e=>{e.visible=i})}initialize(){this.addHandles([this.layerViews.on("change",i=>this._layerViewsChangeHandler(i)),l(()=>this.layer?.visibilityMode,()=>{this.layer&&this._applyVisibility(()=>this._allLayerViewVisibility(this.visible),()=>this._applyExclusiveVisibility(null))},o),l(()=>this.visible,i=>{this._applyVisibility(()=>this._allLayerViewVisibility(i),()=>{})},o)],"grouplayerview"),this._layerViewsChangeHandler({target:null,added:this.layerViews.toArray(),removed:[],moved:[]})}get creatingLayerViews(){return this.view?.layerViewManager?.isCreatingLayerViewsForLayer(this.layer)??!1}set layerViews(i){this._set("layerViews",d(i,this._get("layerViews")))}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((i,e)=>i+e.updatingProgress,0)/this.layerViews.length}isUpdating(){return this.creatingLayerViews||this.layerViews.some(i=>i.updating)}_hasLayerViewVisibleOverrides(){return this.layerViews.some(i=>i._isOverridden("visible"))}_findLayerViewForLayer(i){return i&&this.layerViews.find(e=>e.layer===i)}_firstVisibleOnLayerOrder(){const i=this.layer.layers.find(e=>!!this._findLayerViewForLayer(e)?.visible);return i&&this._findLayerViewForLayer(i)}_applyExclusiveVisibility(i){i==null&&(i=this._firstVisibleOnLayerOrder())==null&&this.layerViews.length>0&&(i=this._findLayerViewForLayer(this.layer.layers.at(0))),this.layerViews.forEach(e=>{e.visible=e===i})}_layerViewsChangeHandler(i){this.removeHandles("grouplayerview:visible"),this.addHandles(this.layerViews.map(a=>l(()=>a.visible,y=>this._applyVisibility(()=>{y!==this.visible&&(a.visible=this.visible)},()=>this._applyExclusiveVisibility(y?a:null)),o)).toArray(),"grouplayerview:visible");const e=i.added[i.added.length-1];this._applyVisibility(()=>this._allLayerViewVisibility(this.visible),()=>this._applyExclusiveVisibility(e?.visible?e:null))}_applyVisibility(i,e){this._hasLayerViewVisibleOverrides()&&(this.layer?.visibilityMode==="inherited"?i():this.layer?.visibilityMode==="exclusive"&&e())}};t([s({readOnly:!0})],r.prototype,"creatingLayerViews",null),t([s({cast:n})],r.prototype,"layerViews",null),t([s({readOnly:!0})],r.prototype,"updatingProgress",null),t([s()],r.prototype,"view",void 0),r=t([h("esri.views.layers.GroupLayerView")],r);const v=r;let p=class extends V(v){attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",()=>this._updateStageChildren()))}detach(){this.container.removeAllChildren()}update(i){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((i,e)=>this.container.addChildAt(i.container,e))}};p=t([h("esri.views.2d.layers.GroupLayerView2D")],p);const Li=p;export{Li as default};
