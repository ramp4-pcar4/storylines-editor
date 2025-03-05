import{ag as f,v as i,i as V,S as a,bp as F,bo as C,a2 as U,b9 as H,a1 as _,bV as w}from"./main-Cs_aiUdl.js";import{X as x,Y as I}from"./LayerView-Bish-E63-vHSal4H4.js";import"./Container-BcuL1ZEG-D1JqktUr.js";import"./MapView-BGOJJ8ch-DuvHsReP.js";import"./Cyclical-C_9rKUUQ-CS9wpO7T.js";import"./CollectionFlattener-DkHuHn5E-igQXiAHe.js";import"./workers-PiCjreoO-CplQWBwY.js";import"./projection-BA9M1R7d-BWvhhUoV.js";import"./projectBuffer-CvCBvJ6W-7_j_g4FI.js";import"./TileInfo-CWIRDhZl-GF_uUznO.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-CtY5ccrQ.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-D0UN9u8j.js";import"./signal-CETehA7D-C84fUPHe.js";import"./Map-1zd11DKO-Bs-0v5vl.js";import"./Basemap-BEqqSTw9-CMimbyYx.js";import"./loadAll-e978YItg-Crr1bqUJ.js";import"./PortalItem-CctGdnxF-BtTD9Sgk.js";import"./writeUtils-D5qlLkwk-B53fDe66.js";import"./compilerUtils-CV1QYWI8-JHgFGjx8.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-CYYetRgj.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-DSdHVDGG.js";import"./Layer-ChoECxvZ-CC9CEywo.js";import"./TimeExtent-Cn0Jofqr-CAgh_uO-.js";import"./GraphicsCollection-CWTXNZOX-DEVRhbHr.js";import"./HeightModelInfo-C5vFqzyF-CMFLm6qy.js";import"./ReactiveMap-CFk6jPfN-BDIYf1Oi.js";import"./Query-BrwMGK8U-DQSiC4Cc.js";import"./Field-C6hA1tZj-CMbYZi9Y.js";import"./fieldType-CD2CL2hr-CH0Anpbb.js";import"./arcgisLayerUrl-HNYh8jvG-D_2U6us3.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-C9lj-Ovu.js";import"./TileKey-C5IL-JBr-BdeLQOWf.js";import"./QueueProcessor-DbfV9fLy-BmkWX0Xd.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-YjFjk1Om.js";import"./normalizeUtilsCommon-CRJlkfEA-pZvmG5Cu.js";import"./utils-9sQxfkoa-BPdjV6WE.js";import"./utils-Bq23Xwmj-Ck7Ykhi-.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-DcHXUqd-.js";import"./vec32-D9GsKZ1t-Cq3X6syh.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-BmJNygwb.js";import"./imageUtils-BA2D6Uf1-CCnJQPNB.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-t7Esrjr0.js";import"./ColorBackground-gVZldRLm-BuWFqwmB.js";import"./parser-DyDJ-rlI-BSFL6_CY.js";import"./layerViewUtils-DURAPenP-D045xkJx.js";const y=Symbol(),O=n=>{let e=class extends n{constructor(){super(...arguments),this.layerViews=new f,this._debouncedUpdate=F(async()=>{const{layer:r,parent:o}=this,s=o?.footprintLayerView;let p=[];const d=this._createQuery();if(d&&s){const{features:h}=await s.queryFeatures(d);this.suspended||(p=h.map(u=>r.acquireLayer(u)))}this.removeHandles(y),this.addHandles(p,y)})}get creatingLayerViews(){return this.view?.layerViewManager.isCreatingLayerViewsForLayer(this.layer)??!1}isUpdating(){return this.creatingLayerViews||this.layer.updating||this.layerViews.some(r=>r.updating)}enableLayerUpdates(){return C([this._updatingHandles.addWhen(()=>this.parent?.footprintLayerView?.dataUpdating===!1,()=>this.updateLayers()),this._updatingHandles.add(()=>[this.layer.maximumVisibleSublayers,this.layer.parent?.orderBy,this.parent?.footprintLayerView?.filter,this.parent?.footprintLayerView?.timeExtent,this.suspended],()=>this.updateLayers()),U(()=>this.removeHandles(y))])}updateLayers(){this.suspended?this.removeHandles(y):this._updatingHandles.addPromise(H(this._debouncedUpdate()).catch(r=>{_.getLogger(this).error(r)}))}_createQuery(){const r=this.parent?.footprintLayerView,o=this.layer?.parent;if(!r||!o||o.destroyed)return null;const{layer:{maximumVisibleSublayers:s},view:{scale:p}}=this;if(!s)return null;const{itemTypeField:d,itemSourceField:h,itemNameField:u,minScaleField:c,maxScaleField:L,objectIdField:v,orderBy:S}=o,$=w(`${c} IS NULL OR ${p} <= ${c} OR ${c} = 0`,`${L} IS NULL OR ${p} >= ${L}`),m=S?.find(l=>l.field&&!l.valueExpression),t=r.createQuery();if(t.returnGeometry=!1,t.num=s,t.outFields=[v,h,u],t.where=w(t.where,$),this.unsupportedItemTypes!=null){const l=`${d} NOT IN (${this.unsupportedItemTypes.map(b=>`'${b}'`)})`;t.where=w(t.where,l)}return m?.field&&(t.orderByFields=[`${m.field} ${m.order==="descending"?"DESC":"ASC"}`],t.outFields.push(m.field)),t}};return i([a({readOnly:!0})],e.prototype,"creatingLayerViews",null),i([a()],e.prototype,"layer",void 0),i([a()],e.prototype,"layerViews",void 0),i([a({readOnly:!0})],e.prototype,"unsupportedItemTypes",void 0),i([a()],e.prototype,"parent",void 0),i([a({readOnly:!0})],e.prototype,"isUpdating",null),e=i([V("esri.views.layers.CatalogDynamicGroupLayerView")],e),e};let g=class extends O(x(I)){constructor(){super(...arguments),this.unsupportedItemTypes=["Scene Service"],this.layerViews=new f}attach(){this.addAttachHandles([this.layerViews.on("after-changes",()=>this._updateStageChildren()),this.enableLayerUpdates()])}detach(){this.container.removeAllChildren()}update(n){this.updateLayers()}viewChange(){}moveEnd(){this.requestUpdate()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((n,e)=>this.container.addChildAt(n.container,e))}};g=i([V("esri.views.2d.layers.CatalogDynamicGroupLayerView2D")],g);const qe=g;export{qe as default};
