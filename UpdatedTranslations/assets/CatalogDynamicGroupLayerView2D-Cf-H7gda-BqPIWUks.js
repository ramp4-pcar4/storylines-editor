import{ag as f,v as i,i as V,S as a,bp as F,bo as C,a2 as U,b9 as H,a1 as _,bV as w}from"./main-YbCtmqIL.js";import{X as x,Y as I}from"./LayerView-Bish-E63-BABrfoFa.js";import"./Container-BcuL1ZEG-DJLREmjx.js";import"./MapView-BGOJJ8ch-BnMHGhaC.js";import"./Cyclical-C_9rKUUQ-CV2Ycxox.js";import"./CollectionFlattener-DkHuHn5E-C5da7wW6.js";import"./workers-PiCjreoO-DC50vEOk.js";import"./projection-BA9M1R7d-eP4tAA5p.js";import"./projectBuffer-CvCBvJ6W-Cf0LWf3a.js";import"./TileInfo-CWIRDhZl-66TbrFBZ.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-BVwONN5a.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-Dyd48E9b.js";import"./signal-CETehA7D-Mr9fw8uE.js";import"./Map-1zd11DKO-DOLXu1Rn.js";import"./Basemap-BEqqSTw9-CTSy8Jgh.js";import"./loadAll-e978YItg-CiCeWkU5.js";import"./PortalItem-CctGdnxF-CSNfUncK.js";import"./writeUtils-D5qlLkwk-F43J29vJ.js";import"./compilerUtils-CV1QYWI8-aeoqh0pb.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-BSzsvZjb.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-BMGiA8RT.js";import"./Layer-ChoECxvZ-BJD8T8c3.js";import"./TimeExtent-Cn0Jofqr-BAId6ErU.js";import"./GraphicsCollection-CWTXNZOX-3-0Avkf7.js";import"./HeightModelInfo-C5vFqzyF-7QzHmtbJ.js";import"./ReactiveMap-CFk6jPfN-CpXiXNBD.js";import"./Query-BrwMGK8U-DoDZ1rHa.js";import"./Field-C6hA1tZj-CGLgMBgo.js";import"./fieldType-CD2CL2hr-CUmnXuIg.js";import"./arcgisLayerUrl-HNYh8jvG-ie3jq5pL.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-Bb-0Scwb.js";import"./TileKey-C5IL-JBr-BSJlgf1I.js";import"./QueueProcessor-DbfV9fLy-D1Q_DUS_.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-DEYA9Qie.js";import"./normalizeUtilsCommon-CRJlkfEA-C78kdtnR.js";import"./utils-9sQxfkoa-BBQMpA0M.js";import"./utils-Bq23Xwmj-0XzA1ra1.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-XIcthxj3.js";import"./vec32-D9GsKZ1t-yxjREqVu.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-Bw3WeXlx.js";import"./imageUtils-BA2D6Uf1-DNyAQpQk.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-CwXAAAz-.js";import"./ColorBackground-gVZldRLm-iNpAt5S_.js";import"./parser-DyDJ-rlI-DZU0Ag-H.js";import"./layerViewUtils-DURAPenP-DO8Ilrgq.js";const y=Symbol(),O=n=>{let e=class extends n{constructor(){super(...arguments),this.layerViews=new f,this._debouncedUpdate=F(async()=>{const{layer:r,parent:o}=this,s=o?.footprintLayerView;let p=[];const d=this._createQuery();if(d&&s){const{features:h}=await s.queryFeatures(d);this.suspended||(p=h.map(u=>r.acquireLayer(u)))}this.removeHandles(y),this.addHandles(p,y)})}get creatingLayerViews(){return this.view?.layerViewManager.isCreatingLayerViewsForLayer(this.layer)??!1}isUpdating(){return this.creatingLayerViews||this.layer.updating||this.layerViews.some(r=>r.updating)}enableLayerUpdates(){return C([this._updatingHandles.addWhen(()=>this.parent?.footprintLayerView?.dataUpdating===!1,()=>this.updateLayers()),this._updatingHandles.add(()=>[this.layer.maximumVisibleSublayers,this.layer.parent?.orderBy,this.parent?.footprintLayerView?.filter,this.parent?.footprintLayerView?.timeExtent,this.suspended],()=>this.updateLayers()),U(()=>this.removeHandles(y))])}updateLayers(){this.suspended?this.removeHandles(y):this._updatingHandles.addPromise(H(this._debouncedUpdate()).catch(r=>{_.getLogger(this).error(r)}))}_createQuery(){const r=this.parent?.footprintLayerView,o=this.layer?.parent;if(!r||!o||o.destroyed)return null;const{layer:{maximumVisibleSublayers:s},view:{scale:p}}=this;if(!s)return null;const{itemTypeField:d,itemSourceField:h,itemNameField:u,minScaleField:c,maxScaleField:L,objectIdField:v,orderBy:S}=o,$=w(`${c} IS NULL OR ${p} <= ${c} OR ${c} = 0`,`${L} IS NULL OR ${p} >= ${L}`),m=S?.find(l=>l.field&&!l.valueExpression),t=r.createQuery();if(t.returnGeometry=!1,t.num=s,t.outFields=[v,h,u],t.where=w(t.where,$),this.unsupportedItemTypes!=null){const l=`${d} NOT IN (${this.unsupportedItemTypes.map(b=>`'${b}'`)})`;t.where=w(t.where,l)}return m?.field&&(t.orderByFields=[`${m.field} ${m.order==="descending"?"DESC":"ASC"}`],t.outFields.push(m.field)),t}};return i([a({readOnly:!0})],e.prototype,"creatingLayerViews",null),i([a()],e.prototype,"layer",void 0),i([a()],e.prototype,"layerViews",void 0),i([a({readOnly:!0})],e.prototype,"unsupportedItemTypes",void 0),i([a()],e.prototype,"parent",void 0),i([a({readOnly:!0})],e.prototype,"isUpdating",null),e=i([V("esri.views.layers.CatalogDynamicGroupLayerView")],e),e};let g=class extends O(x(I)){constructor(){super(...arguments),this.unsupportedItemTypes=["Scene Service"],this.layerViews=new f}attach(){this.addAttachHandles([this.layerViews.on("after-changes",()=>this._updateStageChildren()),this.enableLayerUpdates()])}detach(){this.container.removeAllChildren()}update(n){this.updateLayers()}viewChange(){}moveEnd(){this.requestUpdate()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((n,e)=>this.container.addChildAt(n.container,e))}};g=i([V("esri.views.2d.layers.CatalogDynamicGroupLayerView2D")],g);const qe=g;export{qe as default};
