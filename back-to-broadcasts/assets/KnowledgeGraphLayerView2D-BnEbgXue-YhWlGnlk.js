import{ag as p,am as m,v as o,S as e,eb as a,i as s}from"./main-Cs_aiUdl.js";import{X as l,Y as n}from"./LayerView-Bish-E63-vHSal4H4.js";import"./Container-BcuL1ZEG-D1JqktUr.js";import"./MapView-BGOJJ8ch-DuvHsReP.js";import"./Cyclical-C_9rKUUQ-CS9wpO7T.js";import"./CollectionFlattener-DkHuHn5E-igQXiAHe.js";import"./workers-PiCjreoO-CplQWBwY.js";import"./projection-BA9M1R7d-BWvhhUoV.js";import"./projectBuffer-CvCBvJ6W-7_j_g4FI.js";import"./TileInfo-CWIRDhZl-GF_uUznO.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-CtY5ccrQ.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-D0UN9u8j.js";import"./signal-CETehA7D-C84fUPHe.js";import"./Map-1zd11DKO-Bs-0v5vl.js";import"./Basemap-BEqqSTw9-CMimbyYx.js";import"./loadAll-e978YItg-Crr1bqUJ.js";import"./PortalItem-CctGdnxF-BtTD9Sgk.js";import"./writeUtils-D5qlLkwk-B53fDe66.js";import"./compilerUtils-CV1QYWI8-JHgFGjx8.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-CYYetRgj.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-DSdHVDGG.js";import"./Layer-ChoECxvZ-CC9CEywo.js";import"./TimeExtent-Cn0Jofqr-CAgh_uO-.js";import"./GraphicsCollection-CWTXNZOX-DEVRhbHr.js";import"./HeightModelInfo-C5vFqzyF-CMFLm6qy.js";import"./ReactiveMap-CFk6jPfN-BDIYf1Oi.js";import"./Query-BrwMGK8U-DQSiC4Cc.js";import"./Field-C6hA1tZj-CMbYZi9Y.js";import"./fieldType-CD2CL2hr-CH0Anpbb.js";import"./arcgisLayerUrl-HNYh8jvG-D_2U6us3.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-C9lj-Ovu.js";import"./TileKey-C5IL-JBr-BdeLQOWf.js";import"./QueueProcessor-DbfV9fLy-BmkWX0Xd.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-YjFjk1Om.js";import"./normalizeUtilsCommon-CRJlkfEA-pZvmG5Cu.js";import"./utils-9sQxfkoa-BPdjV6WE.js";import"./utils-Bq23Xwmj-Ck7Ykhi-.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-DcHXUqd-.js";import"./vec32-D9GsKZ1t-Cq3X6syh.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-BmJNygwb.js";import"./imageUtils-BA2D6Uf1-CCnJQPNB.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-t7Esrjr0.js";import"./ColorBackground-gVZldRLm-BuWFqwmB.js";import"./parser-DyDJ-rlI-BSFL6_CY.js";import"./layerViewUtils-DURAPenP-D045xkJx.js";let r=class extends l(n){constructor(t){super(t),this.layerViews=new p}set layerViews(t){this._set("layerViews",m(t,this._get("layerViews")))}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((t,i)=>t+i.updatingProgress,0)/this.layerViews.length}attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",()=>this._updateStageChildren()))}detach(){this.container.removeAllChildren()}update(t){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((t,i)=>this.container.addChildAt(t.container,i))}};o([e({cast:a})],r.prototype,"layerViews",null),o([e({readOnly:!0})],r.prototype,"updatingProgress",null),r=o([s("esri.views.2d.layers.KnowledgeGraphLayerView2D")],r);const yt=r;export{yt as default};
