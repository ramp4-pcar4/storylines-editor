import{ag as p,am as m,v as o,S as e,eb as a,i as s}from"./main-DzfxInI5.js";import{X as l,Y as n}from"./LayerView-Bish-E63-BoVexrQJ.js";import"./Container-BcuL1ZEG-DLWxS5at.js";import"./MapView-BGOJJ8ch-BGD8FuVa.js";import"./Cyclical-C_9rKUUQ-Bqb-OG9G.js";import"./CollectionFlattener-DkHuHn5E-DrFK1Eu5.js";import"./workers-PiCjreoO-Dk30h-Pp.js";import"./projection-BA9M1R7d-Dosm3bk0.js";import"./projectBuffer-CvCBvJ6W-D_7p147q.js";import"./TileInfo-CWIRDhZl-BSeypRoM.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-C0kBDOFu.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-DY2fhjNh.js";import"./signal-CETehA7D-B8gx-K0L.js";import"./Map-1zd11DKO-BgHatIto.js";import"./Basemap-BEqqSTw9-BV2xsy4Q.js";import"./loadAll-e978YItg-C6J8PFJn.js";import"./PortalItem-CctGdnxF-BYg2efJN.js";import"./writeUtils-D5qlLkwk-Dt7N11ME.js";import"./compilerUtils-CV1QYWI8-TPYjIB6I.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-C5nDQ40w.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-C0DPemo7.js";import"./Layer-ChoECxvZ-C9s2tUM2.js";import"./TimeExtent-Cn0Jofqr-BgE6uS8e.js";import"./GraphicsCollection-CWTXNZOX-bai4KZEP.js";import"./HeightModelInfo-C5vFqzyF-BsEqPieO.js";import"./ReactiveMap-CFk6jPfN-CYRDVpKv.js";import"./Query-BrwMGK8U-agtWjP-r.js";import"./Field-C6hA1tZj-BM9vgpKy.js";import"./fieldType-CD2CL2hr-BHcILNXd.js";import"./arcgisLayerUrl-HNYh8jvG-BNq8p2qX.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-BnegzLXN.js";import"./TileKey-C5IL-JBr-CaSo4fHl.js";import"./QueueProcessor-DbfV9fLy-BZXHQfcy.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-RkpwzxoG.js";import"./normalizeUtilsCommon-CRJlkfEA-RJgsE4RT.js";import"./utils-9sQxfkoa-DAS0bk5F.js";import"./utils-Bq23Xwmj-CFQ9waXV.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-Dqlf0M4_.js";import"./vec32-D9GsKZ1t-D1rGaw2Q.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-Bj2eqFjq.js";import"./imageUtils-BA2D6Uf1-P9MAnwoH.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-BGvfG1kk.js";import"./ColorBackground-gVZldRLm-HWN3kYSb.js";import"./parser-DyDJ-rlI-B5RyhicL.js";import"./layerViewUtils-DURAPenP-BiWQqQLx.js";let r=class extends l(n){constructor(t){super(t),this.layerViews=new p}set layerViews(t){this._set("layerViews",m(t,this._get("layerViews")))}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((t,i)=>t+i.updatingProgress,0)/this.layerViews.length}attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",()=>this._updateStageChildren()))}detach(){this.container.removeAllChildren()}update(t){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((t,i)=>this.container.addChildAt(t.container,i))}};o([e({cast:a})],r.prototype,"layerViews",null),o([e({readOnly:!0})],r.prototype,"updatingProgress",null),r=o([s("esri.views.2d.layers.KnowledgeGraphLayerView2D")],r);const yt=r;export{yt as default};
