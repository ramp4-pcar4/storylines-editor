import{ag as a,v as i,S as o,i as m}from"./main-ljaACljU.js";import{X as n,Y as s}from"./LayerView-Bish-E63-c2B9NG7k.js";import"./Container-BcuL1ZEG-BF8AVwOU.js";import"./MapView-BGOJJ8ch-XevuxAOh.js";import"./Cyclical-C_9rKUUQ-oYEKJmBt.js";import"./CollectionFlattener-DkHuHn5E-BtjL-h2l.js";import"./workers-PiCjreoO-BqkkSVM6.js";import"./projection-BA9M1R7d-BS7P1XGe.js";import"./projectBuffer-CvCBvJ6W-De1B3yto.js";import"./TileInfo-CWIRDhZl-C_8ETfPK.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-BwXg4tKZ.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-D0AkC5Jm.js";import"./signal-CETehA7D-BBlaj_eU.js";import"./Map-1zd11DKO-57Jlnzhx.js";import"./Basemap-BEqqSTw9-D_FgFCyj.js";import"./loadAll-e978YItg-Bi1AEo4v.js";import"./PortalItem-CctGdnxF-CqupN-im.js";import"./writeUtils-D5qlLkwk-DlOfGBX9.js";import"./compilerUtils-CV1QYWI8-BUKrHW4G.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-C1VO5ErA.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-IbmU1hv4.js";import"./Layer-ChoECxvZ-B44SEYeM.js";import"./TimeExtent-Cn0Jofqr-Ck50QJvn.js";import"./GraphicsCollection-CWTXNZOX-CwHJbLWv.js";import"./HeightModelInfo-C5vFqzyF-s_7Wdzu6.js";import"./ReactiveMap-CFk6jPfN-Doxc14-g.js";import"./Query-BrwMGK8U-C5TYBQTQ.js";import"./Field-C6hA1tZj-BCQx8YuA.js";import"./fieldType-CD2CL2hr-iuW5PF1A.js";import"./arcgisLayerUrl-HNYh8jvG-DK1s7ONN.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-R82ATK8u.js";import"./TileKey-C5IL-JBr-CkwhKTVV.js";import"./QueueProcessor-DbfV9fLy-If4oveSE.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-uHtcx8ev.js";import"./normalizeUtilsCommon-CRJlkfEA-DPnLix4D.js";import"./utils-9sQxfkoa-DfW1o-gO.js";import"./utils-Bq23Xwmj-Bil3XTua.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-B0YVB201.js";import"./vec32-D9GsKZ1t-Dv0QTCaj.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-Clw5YXNz.js";import"./imageUtils-BA2D6Uf1-C764M3sD.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-PRMEadab.js";import"./ColorBackground-gVZldRLm-koc7n6-6.js";import"./parser-DyDJ-rlI-6nhVKEIP.js";import"./layerViewUtils-DURAPenP-DkWE4eR_.js";const l=e=>{let t=class extends e{constructor(...r){super(...r),this.layerViews=new a}get dynamicGroupLayerView(){return this.layerViews.find(r=>r.layer===this.layer?.dynamicGroupLayer)}get footprintLayerView(){return this.layerViews.find(r=>r.layer===this.layer?.footprintLayer)}isUpdating(){return!this.dynamicGroupLayerView||!this.footprintLayerView||this.dynamicGroupLayerView.updating||this.footprintLayerView.updating}};return i([o()],t.prototype,"layer",void 0),i([o()],t.prototype,"layerViews",void 0),i([o({readOnly:!0})],t.prototype,"dynamicGroupLayerView",null),i([o({readOnly:!0})],t.prototype,"footprintLayerView",null),t=i([m("esri.views.layers.CatalogLayerView")],t),t};let p=class extends l(n(s)){constructor(){super(...arguments),this.layerViews=new a}update(e){}viewChange(){}moveEnd(){}attach(){this.addAttachHandles([this._updatingHandles.addOnCollectionChange(()=>this.layerViews,()=>this._updateStageChildren(),{initial:!0})])}detach(){this.container.removeAllChildren()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((e,t)=>this.container.addChildAt(e.container,t))}};i([o()],p.prototype,"layerViews",void 0),p=i([m("esri.views.2d.layers.CatalogLayerView2D")],p);const ct=p;export{ct as default};
