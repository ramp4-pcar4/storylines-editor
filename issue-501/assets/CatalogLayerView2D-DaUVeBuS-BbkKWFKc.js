import{ag as a,v as i,S as o,i as m}from"./main-BLGVPR4E.js";import{X as n,Y as s}from"./LayerView-Bish-E63-14xUwwRU.js";import"./Container-BcuL1ZEG-Bk-wUyYx.js";import"./MapView-BGOJJ8ch-CAl7TPtR.js";import"./Cyclical-C_9rKUUQ-Cw5NQNiu.js";import"./CollectionFlattener-DkHuHn5E-BAwWOWEy.js";import"./workers-PiCjreoO-BdIF_ryt.js";import"./projection-BA9M1R7d-CgK5UJhM.js";import"./projectBuffer-CvCBvJ6W-R_bfgxmt.js";import"./TileInfo-CWIRDhZl-CQAnfnpg.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-D7mUBfqb.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-CYHSEs8a.js";import"./signal-CETehA7D-COk75xit.js";import"./Map-1zd11DKO-8lMezB9i.js";import"./Basemap-BEqqSTw9-DGMQ-wru.js";import"./loadAll-e978YItg-D2d64dtN.js";import"./PortalItem-CctGdnxF-QcTINXmb.js";import"./writeUtils-D5qlLkwk-ka5gnM98.js";import"./compilerUtils-CV1QYWI8-B_s0Ccxq.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-Dm1NL7Y1.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-ptRz7Z2U.js";import"./Layer-ChoECxvZ-D0ycW4ZB.js";import"./TimeExtent-Cn0Jofqr-ChwuHnBa.js";import"./GraphicsCollection-CWTXNZOX-D2hwPVVG.js";import"./HeightModelInfo-C5vFqzyF-D6QCrNk0.js";import"./ReactiveMap-CFk6jPfN-B9lBXA4S.js";import"./Query-BrwMGK8U-DI_2Zx7_.js";import"./Field-C6hA1tZj-DbB1uazy.js";import"./fieldType-CD2CL2hr-CzF8MVZw.js";import"./arcgisLayerUrl-HNYh8jvG-Bkt9HWex.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-B39fC4xL.js";import"./TileKey-C5IL-JBr-fPUXppry.js";import"./QueueProcessor-DbfV9fLy-JnDGum92.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-DTUgCI4I.js";import"./normalizeUtilsCommon-CRJlkfEA-BxO7OA0B.js";import"./utils-9sQxfkoa-CfwdLGFM.js";import"./utils-Bq23Xwmj-D5PTMjfM.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-L9bpcE1u.js";import"./vec32-D9GsKZ1t-D5810-NE.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-B1Zzq8t1.js";import"./imageUtils-BA2D6Uf1-BAcFhDZh.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-B9NN4PVX.js";import"./ColorBackground-gVZldRLm-BsLddR7P.js";import"./parser-DyDJ-rlI-BAHBC7vX.js";import"./layerViewUtils-DURAPenP-BROh9xD9.js";const l=e=>{let t=class extends e{constructor(...r){super(...r),this.layerViews=new a}get dynamicGroupLayerView(){return this.layerViews.find(r=>r.layer===this.layer?.dynamicGroupLayer)}get footprintLayerView(){return this.layerViews.find(r=>r.layer===this.layer?.footprintLayer)}isUpdating(){return!this.dynamicGroupLayerView||!this.footprintLayerView||this.dynamicGroupLayerView.updating||this.footprintLayerView.updating}};return i([o()],t.prototype,"layer",void 0),i([o()],t.prototype,"layerViews",void 0),i([o({readOnly:!0})],t.prototype,"dynamicGroupLayerView",null),i([o({readOnly:!0})],t.prototype,"footprintLayerView",null),t=i([m("esri.views.layers.CatalogLayerView")],t),t};let p=class extends l(n(s)){constructor(){super(...arguments),this.layerViews=new a}update(e){}viewChange(){}moveEnd(){}attach(){this.addAttachHandles([this._updatingHandles.addOnCollectionChange(()=>this.layerViews,()=>this._updateStageChildren(),{initial:!0})])}detach(){this.container.removeAllChildren()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((e,t)=>this.container.addChildAt(e.container,t))}};i([o()],p.prototype,"layerViews",void 0),p=i([m("esri.views.2d.layers.CatalogLayerView2D")],p);const ct=p;export{ct as default};
