import{ag as f,v as i,i as V,S as a,bp as F,bo as C,a2 as U,b9 as H,a1 as _,bV as w}from"./main-DMS0m9I5.js";import{X as x,Y as I}from"./LayerView-Bish-E63-F3IwfiO2.js";import"./Container-BcuL1ZEG-B2LYvC4U.js";import"./MapView-BGOJJ8ch-Ae7aDAwn.js";import"./Cyclical-C_9rKUUQ-D-oBV2jp.js";import"./CollectionFlattener-DkHuHn5E-C3vGoGT9.js";import"./workers-PiCjreoO-BTkQTpWC.js";import"./projection-BA9M1R7d-9x1PsaFU.js";import"./projectBuffer-CvCBvJ6W-Wi8hw3ok.js";import"./TileInfo-CWIRDhZl-MHCFVcer.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-CJOu9wo9.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-CS329Km8.js";import"./signal-CETehA7D-DzMNcpjC.js";import"./Map-1zd11DKO-DLx14FjF.js";import"./Basemap-BEqqSTw9-DT1cSrk6.js";import"./loadAll-e978YItg-B9Hkr0yV.js";import"./PortalItem-CctGdnxF-CAOPDG2E.js";import"./writeUtils-D5qlLkwk-EJTBASxY.js";import"./compilerUtils-CV1QYWI8-CNdyTq7Y.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-LGc5tcLd.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-DHy8rOfj.js";import"./Layer-ChoECxvZ-K9ZMiecJ.js";import"./TimeExtent-Cn0Jofqr-DT_DeRjv.js";import"./GraphicsCollection-CWTXNZOX-DIPvSL7N.js";import"./HeightModelInfo-C5vFqzyF-D_dR4LBi.js";import"./ReactiveMap-CFk6jPfN-DpcaECAt.js";import"./Query-BrwMGK8U-BlQR0MjS.js";import"./Field-C6hA1tZj-DeD-rUkw.js";import"./fieldType-CD2CL2hr-CGRVeitF.js";import"./arcgisLayerUrl-HNYh8jvG-DuIM7Xfh.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-UX6PaiCZ.js";import"./TileKey-C5IL-JBr-DAi85cmh.js";import"./QueueProcessor-DbfV9fLy-D7g7djsb.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-rywKVRXs.js";import"./normalizeUtilsCommon-CRJlkfEA-a_as5EjO.js";import"./utils-9sQxfkoa-DHIGqreG.js";import"./utils-Bq23Xwmj-PZn5ij1v.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-CfrKRl8l.js";import"./vec32-D9GsKZ1t-Cxyibv7P.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-GEVQVsRN.js";import"./imageUtils-BA2D6Uf1-BbbhYfAb.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-DO0eaP_o.js";import"./ColorBackground-gVZldRLm-aAYgCsef.js";import"./parser-DyDJ-rlI-CeHcNjL1.js";import"./layerViewUtils-DURAPenP-qC1w4h37.js";const y=Symbol(),O=n=>{let e=class extends n{constructor(){super(...arguments),this.layerViews=new f,this._debouncedUpdate=F(async()=>{const{layer:r,parent:o}=this,s=o?.footprintLayerView;let p=[];const d=this._createQuery();if(d&&s){const{features:h}=await s.queryFeatures(d);this.suspended||(p=h.map(u=>r.acquireLayer(u)))}this.removeHandles(y),this.addHandles(p,y)})}get creatingLayerViews(){return this.view?.layerViewManager.isCreatingLayerViewsForLayer(this.layer)??!1}isUpdating(){return this.creatingLayerViews||this.layer.updating||this.layerViews.some(r=>r.updating)}enableLayerUpdates(){return C([this._updatingHandles.addWhen(()=>this.parent?.footprintLayerView?.dataUpdating===!1,()=>this.updateLayers()),this._updatingHandles.add(()=>[this.layer.maximumVisibleSublayers,this.layer.parent?.orderBy,this.parent?.footprintLayerView?.filter,this.parent?.footprintLayerView?.timeExtent,this.suspended],()=>this.updateLayers()),U(()=>this.removeHandles(y))])}updateLayers(){this.suspended?this.removeHandles(y):this._updatingHandles.addPromise(H(this._debouncedUpdate()).catch(r=>{_.getLogger(this).error(r)}))}_createQuery(){const r=this.parent?.footprintLayerView,o=this.layer?.parent;if(!r||!o||o.destroyed)return null;const{layer:{maximumVisibleSublayers:s},view:{scale:p}}=this;if(!s)return null;const{itemTypeField:d,itemSourceField:h,itemNameField:u,minScaleField:c,maxScaleField:L,objectIdField:v,orderBy:S}=o,$=w(`${c} IS NULL OR ${p} <= ${c} OR ${c} = 0`,`${L} IS NULL OR ${p} >= ${L}`),m=S?.find(l=>l.field&&!l.valueExpression),t=r.createQuery();if(t.returnGeometry=!1,t.num=s,t.outFields=[v,h,u],t.where=w(t.where,$),this.unsupportedItemTypes!=null){const l=`${d} NOT IN (${this.unsupportedItemTypes.map(b=>`'${b}'`)})`;t.where=w(t.where,l)}return m?.field&&(t.orderByFields=[`${m.field} ${m.order==="descending"?"DESC":"ASC"}`],t.outFields.push(m.field)),t}};return i([a({readOnly:!0})],e.prototype,"creatingLayerViews",null),i([a()],e.prototype,"layer",void 0),i([a()],e.prototype,"layerViews",void 0),i([a({readOnly:!0})],e.prototype,"unsupportedItemTypes",void 0),i([a()],e.prototype,"parent",void 0),i([a({readOnly:!0})],e.prototype,"isUpdating",null),e=i([V("esri.views.layers.CatalogDynamicGroupLayerView")],e),e};let g=class extends O(x(I)){constructor(){super(...arguments),this.unsupportedItemTypes=["Scene Service"],this.layerViews=new f}attach(){this.addAttachHandles([this.layerViews.on("after-changes",()=>this._updateStageChildren()),this.enableLayerUpdates()])}detach(){this.container.removeAllChildren()}update(n){this.updateLayers()}viewChange(){}moveEnd(){this.requestUpdate()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((n,e)=>this.container.addChildAt(n.container,e))}};g=i([V("esri.views.2d.layers.CatalogDynamicGroupLayerView2D")],g);const qe=g;export{qe as default};
