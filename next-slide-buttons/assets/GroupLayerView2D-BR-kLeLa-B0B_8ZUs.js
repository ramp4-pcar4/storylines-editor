import{v as t,S as s,eb as n,i as h,ag as m,ah as l,av as o,am as d}from"./main-CSyv-l2o.js";import{X as V,Y as w}from"./LayerView-Bish-E63-CWZFEe8u.js";import"./Container-BcuL1ZEG-tsMYLCbQ.js";import"./MapView-BGOJJ8ch-nT-NWb9C.js";import"./Cyclical-C_9rKUUQ-CeaCeUzW.js";import"./CollectionFlattener-DkHuHn5E-DwQBKn9r.js";import"./workers-PiCjreoO-DUNkHRl-.js";import"./projection-BA9M1R7d-8HGEzInK.js";import"./projectBuffer-CvCBvJ6W-CfBgzyx5.js";import"./TileInfo-CWIRDhZl-DdWGEd2C.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-D3WyYE6Z.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-CwTS9ZoY.js";import"./signal-CETehA7D-CtmQsIzG.js";import"./Map-1zd11DKO-BK0Duige.js";import"./Basemap-BEqqSTw9-DbL0K-rW.js";import"./loadAll-e978YItg-BsUhaDhp.js";import"./PortalItem-CctGdnxF-B-MpVERN.js";import"./writeUtils-D5qlLkwk-BKnxPe2w.js";import"./compilerUtils-CV1QYWI8-Bk3Iuos8.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-BxCN6HxU.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-ClKRz9b0.js";import"./Layer-ChoECxvZ-v9CZxaUh.js";import"./TimeExtent-Cn0Jofqr-BhabZhIE.js";import"./GraphicsCollection-CWTXNZOX-BFK5fPZa.js";import"./HeightModelInfo-C5vFqzyF-jSW1G0U2.js";import"./ReactiveMap-CFk6jPfN-BtUZG60a.js";import"./Query-BrwMGK8U-DQQU-sJm.js";import"./Field-C6hA1tZj-CllHE1WT.js";import"./fieldType-CD2CL2hr-BC7pt10u.js";import"./arcgisLayerUrl-HNYh8jvG-CyUNbPxH.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-CNma6O8-.js";import"./TileKey-C5IL-JBr-CfM0KuuT.js";import"./QueueProcessor-DbfV9fLy-CoISen0P.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-DPyXixfZ.js";import"./normalizeUtilsCommon-CRJlkfEA-BAOUdLbS.js";import"./utils-9sQxfkoa-DviREFnb.js";import"./utils-Bq23Xwmj-Lu1e5M63.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-8gVAKbcQ.js";import"./vec32-D9GsKZ1t-DekPPkYE.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-BsDSPr02.js";import"./imageUtils-BA2D6Uf1-CImV0YV_.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-zMVzMXA9.js";import"./ColorBackground-gVZldRLm-D4YJxm4a.js";import"./parser-DyDJ-rlI-uTNCpt_z.js";import"./layerViewUtils-DURAPenP-DJj0Gbd3.js";let r=class extends w{constructor(i){super(i),this.type="group",this.layerViews=new m}destroy(){this.layerViews.length=0}_allLayerViewVisibility(i){this.layerViews.forEach(e=>{e.visible=i})}initialize(){this.addHandles([this.layerViews.on("change",i=>this._layerViewsChangeHandler(i)),l(()=>this.layer?.visibilityMode,()=>{this.layer&&this._applyVisibility(()=>this._allLayerViewVisibility(this.visible),()=>this._applyExclusiveVisibility(null))},o),l(()=>this.visible,i=>{this._applyVisibility(()=>this._allLayerViewVisibility(i),()=>{})},o)],"grouplayerview"),this._layerViewsChangeHandler({target:null,added:this.layerViews.toArray(),removed:[],moved:[]})}get creatingLayerViews(){return this.view?.layerViewManager?.isCreatingLayerViewsForLayer(this.layer)??!1}set layerViews(i){this._set("layerViews",d(i,this._get("layerViews")))}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((i,e)=>i+e.updatingProgress,0)/this.layerViews.length}isUpdating(){return this.creatingLayerViews||this.layerViews.some(i=>i.updating)}_hasLayerViewVisibleOverrides(){return this.layerViews.some(i=>i._isOverridden("visible"))}_findLayerViewForLayer(i){return i&&this.layerViews.find(e=>e.layer===i)}_firstVisibleOnLayerOrder(){const i=this.layer.layers.find(e=>!!this._findLayerViewForLayer(e)?.visible);return i&&this._findLayerViewForLayer(i)}_applyExclusiveVisibility(i){i==null&&(i=this._firstVisibleOnLayerOrder())==null&&this.layerViews.length>0&&(i=this._findLayerViewForLayer(this.layer.layers.at(0))),this.layerViews.forEach(e=>{e.visible=e===i})}_layerViewsChangeHandler(i){this.removeHandles("grouplayerview:visible"),this.addHandles(this.layerViews.map(a=>l(()=>a.visible,y=>this._applyVisibility(()=>{y!==this.visible&&(a.visible=this.visible)},()=>this._applyExclusiveVisibility(y?a:null)),o)).toArray(),"grouplayerview:visible");const e=i.added[i.added.length-1];this._applyVisibility(()=>this._allLayerViewVisibility(this.visible),()=>this._applyExclusiveVisibility(e?.visible?e:null))}_applyVisibility(i,e){this._hasLayerViewVisibleOverrides()&&(this.layer?.visibilityMode==="inherited"?i():this.layer?.visibilityMode==="exclusive"&&e())}};t([s({readOnly:!0})],r.prototype,"creatingLayerViews",null),t([s({cast:n})],r.prototype,"layerViews",null),t([s({readOnly:!0})],r.prototype,"updatingProgress",null),t([s()],r.prototype,"view",void 0),r=t([h("esri.views.layers.GroupLayerView")],r);const v=r;let p=class extends V(v){attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",()=>this._updateStageChildren()))}detach(){this.container.removeAllChildren()}update(i){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((i,e)=>this.container.addChildAt(i.container,e))}};p=t([h("esri.views.2d.layers.GroupLayerView2D")],p);const Li=p;export{Li as default};
