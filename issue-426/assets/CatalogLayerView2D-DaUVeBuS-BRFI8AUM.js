import{ag as a,v as i,S as o,i as m}from"./main-Dph3xG49.js";import{X as n,Y as s}from"./LayerView-Bish-E63-DUoHdiKZ.js";import"./Container-BcuL1ZEG-z7nQXZG-.js";import"./MapView-BGOJJ8ch-CwpKF8ri.js";import"./Cyclical-C_9rKUUQ-B6In6GpN.js";import"./CollectionFlattener-DkHuHn5E-BcXpRSUE.js";import"./workers-PiCjreoO-DeHwTEoz.js";import"./projection-BA9M1R7d-DAEw6OHS.js";import"./projectBuffer-CvCBvJ6W-BFUqJjz1.js";import"./TileInfo-CWIRDhZl-DGtUhA-r.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-_P1xyEpi.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-BXnDaVqZ.js";import"./signal-CETehA7D-CIV4VTJW.js";import"./Map-1zd11DKO-mpaTMIKW.js";import"./Basemap-BEqqSTw9-C--fT58s.js";import"./loadAll-e978YItg-vPm5HQtW.js";import"./PortalItem-CctGdnxF-D7o4Fqb4.js";import"./writeUtils-D5qlLkwk-D8ldZtIs.js";import"./compilerUtils-CV1QYWI8-BBKsh3iY.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-B0bPyw7w.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-KuS-TeYW.js";import"./Layer-ChoECxvZ-CpN4NAR4.js";import"./TimeExtent-Cn0Jofqr-DUFEaBxg.js";import"./GraphicsCollection-CWTXNZOX-IM9LQLb1.js";import"./HeightModelInfo-C5vFqzyF-DAMN-T0e.js";import"./ReactiveMap-CFk6jPfN-CB_B3Voh.js";import"./Query-BrwMGK8U-ytymcwiw.js";import"./Field-C6hA1tZj-Bml-XZKO.js";import"./fieldType-CD2CL2hr-CXXpNbyA.js";import"./arcgisLayerUrl-HNYh8jvG-d5relZqn.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-BC_RKtYN.js";import"./TileKey-C5IL-JBr-ws19cFRA.js";import"./QueueProcessor-DbfV9fLy-C1UwoLkM.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-CLI8iwes.js";import"./normalizeUtilsCommon-CRJlkfEA-CFyPR9CZ.js";import"./utils-9sQxfkoa-CRVoznqM.js";import"./utils-Bq23Xwmj-DPjy7Vnb.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-B61cBC9j.js";import"./vec32-D9GsKZ1t-LlXW_l-c.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-921rkqJJ.js";import"./imageUtils-BA2D6Uf1-Drjx7kjc.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-B8hBY_Yh.js";import"./ColorBackground-gVZldRLm-DttrM_jv.js";import"./parser-DyDJ-rlI-CxZP8lkK.js";import"./layerViewUtils-DURAPenP-Bx6Og-NS.js";const l=e=>{let t=class extends e{constructor(...r){super(...r),this.layerViews=new a}get dynamicGroupLayerView(){return this.layerViews.find(r=>r.layer===this.layer?.dynamicGroupLayer)}get footprintLayerView(){return this.layerViews.find(r=>r.layer===this.layer?.footprintLayer)}isUpdating(){return!this.dynamicGroupLayerView||!this.footprintLayerView||this.dynamicGroupLayerView.updating||this.footprintLayerView.updating}};return i([o()],t.prototype,"layer",void 0),i([o()],t.prototype,"layerViews",void 0),i([o({readOnly:!0})],t.prototype,"dynamicGroupLayerView",null),i([o({readOnly:!0})],t.prototype,"footprintLayerView",null),t=i([m("esri.views.layers.CatalogLayerView")],t),t};let p=class extends l(n(s)){constructor(){super(...arguments),this.layerViews=new a}update(e){}viewChange(){}moveEnd(){}attach(){this.addAttachHandles([this._updatingHandles.addOnCollectionChange(()=>this.layerViews,()=>this._updateStageChildren(),{initial:!0})])}detach(){this.container.removeAllChildren()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((e,t)=>this.container.addChildAt(e.container,t))}};i([o()],p.prototype,"layerViews",void 0),p=i([m("esri.views.2d.layers.CatalogLayerView2D")],p);const ct=p;export{ct as default};
