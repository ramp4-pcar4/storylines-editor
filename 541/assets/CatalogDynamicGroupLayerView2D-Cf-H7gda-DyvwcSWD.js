import{ag as f,v as i,i as V,S as a,bp as F,bo as C,a2 as U,b9 as H,a1 as _,bV as w}from"./main-B-qqJ5ov.js";import{X as x,Y as I}from"./LayerView-Bish-E63-B3t2STnz.js";import"./Container-BcuL1ZEG-eFqRz1Fv.js";import"./MapView-BGOJJ8ch-RBEkjehQ.js";import"./Cyclical-C_9rKUUQ-Cho4ih7V.js";import"./CollectionFlattener-DkHuHn5E-Bg67MlaP.js";import"./workers-PiCjreoO-DJYvxXtl.js";import"./projection-BA9M1R7d-BrWcDNEF.js";import"./projectBuffer-CvCBvJ6W-D4VBeyna.js";import"./TileInfo-CWIRDhZl-Bhhxrbtd.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-B6kY6GUl.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-HMNQlS0m.js";import"./signal-CETehA7D-DKHdUMxd.js";import"./Map-1zd11DKO-T8pE1fte.js";import"./Basemap-BEqqSTw9-RRlL9tT1.js";import"./loadAll-e978YItg-fzRL7yQg.js";import"./PortalItem-CctGdnxF-CGvGDFAo.js";import"./writeUtils-D5qlLkwk--aMa2nHm.js";import"./compilerUtils-CV1QYWI8-DaNCNvT1.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-wsQhA476.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-D26TS8Sr.js";import"./Layer-ChoECxvZ-Bet1V6UW.js";import"./TimeExtent-Cn0Jofqr-1iB3KTqK.js";import"./GraphicsCollection-CWTXNZOX-CNRwzKrA.js";import"./HeightModelInfo-C5vFqzyF-DO96zinI.js";import"./ReactiveMap-CFk6jPfN-Dn1cGCMX.js";import"./Query-BrwMGK8U-CyKS3Qe-.js";import"./Field-C6hA1tZj-7h8v-exC.js";import"./fieldType-CD2CL2hr-B0GoEBDi.js";import"./arcgisLayerUrl-HNYh8jvG-B2O143Ys.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-C3MLariM.js";import"./TileKey-C5IL-JBr-DkZT6W2U.js";import"./QueueProcessor-DbfV9fLy-BkAb7mV-.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-CeIR1clc.js";import"./normalizeUtilsCommon-CRJlkfEA-CfUHeklq.js";import"./utils-9sQxfkoa-CrB3apxj.js";import"./utils-Bq23Xwmj-ubNLJvr4.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-BLeBwT6v.js";import"./vec32-D9GsKZ1t-Cpv9XLxo.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-DvUofMVc.js";import"./imageUtils-BA2D6Uf1-BmZoJuj0.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-MlNsQfpJ.js";import"./ColorBackground-gVZldRLm-DXkRr50W.js";import"./parser-DyDJ-rlI-DLxk7ym2.js";import"./layerViewUtils-DURAPenP-CiWQP0sU.js";const y=Symbol(),O=n=>{let e=class extends n{constructor(){super(...arguments),this.layerViews=new f,this._debouncedUpdate=F(async()=>{const{layer:r,parent:o}=this,s=o?.footprintLayerView;let p=[];const d=this._createQuery();if(d&&s){const{features:h}=await s.queryFeatures(d);this.suspended||(p=h.map(u=>r.acquireLayer(u)))}this.removeHandles(y),this.addHandles(p,y)})}get creatingLayerViews(){return this.view?.layerViewManager.isCreatingLayerViewsForLayer(this.layer)??!1}isUpdating(){return this.creatingLayerViews||this.layer.updating||this.layerViews.some(r=>r.updating)}enableLayerUpdates(){return C([this._updatingHandles.addWhen(()=>this.parent?.footprintLayerView?.dataUpdating===!1,()=>this.updateLayers()),this._updatingHandles.add(()=>[this.layer.maximumVisibleSublayers,this.layer.parent?.orderBy,this.parent?.footprintLayerView?.filter,this.parent?.footprintLayerView?.timeExtent,this.suspended],()=>this.updateLayers()),U(()=>this.removeHandles(y))])}updateLayers(){this.suspended?this.removeHandles(y):this._updatingHandles.addPromise(H(this._debouncedUpdate()).catch(r=>{_.getLogger(this).error(r)}))}_createQuery(){const r=this.parent?.footprintLayerView,o=this.layer?.parent;if(!r||!o||o.destroyed)return null;const{layer:{maximumVisibleSublayers:s},view:{scale:p}}=this;if(!s)return null;const{itemTypeField:d,itemSourceField:h,itemNameField:u,minScaleField:c,maxScaleField:L,objectIdField:v,orderBy:S}=o,$=w(`${c} IS NULL OR ${p} <= ${c} OR ${c} = 0`,`${L} IS NULL OR ${p} >= ${L}`),m=S?.find(l=>l.field&&!l.valueExpression),t=r.createQuery();if(t.returnGeometry=!1,t.num=s,t.outFields=[v,h,u],t.where=w(t.where,$),this.unsupportedItemTypes!=null){const l=`${d} NOT IN (${this.unsupportedItemTypes.map(b=>`'${b}'`)})`;t.where=w(t.where,l)}return m?.field&&(t.orderByFields=[`${m.field} ${m.order==="descending"?"DESC":"ASC"}`],t.outFields.push(m.field)),t}};return i([a({readOnly:!0})],e.prototype,"creatingLayerViews",null),i([a()],e.prototype,"layer",void 0),i([a()],e.prototype,"layerViews",void 0),i([a({readOnly:!0})],e.prototype,"unsupportedItemTypes",void 0),i([a()],e.prototype,"parent",void 0),i([a({readOnly:!0})],e.prototype,"isUpdating",null),e=i([V("esri.views.layers.CatalogDynamicGroupLayerView")],e),e};let g=class extends O(x(I)){constructor(){super(...arguments),this.unsupportedItemTypes=["Scene Service"],this.layerViews=new f}attach(){this.addAttachHandles([this.layerViews.on("after-changes",()=>this._updateStageChildren()),this.enableLayerUpdates()])}detach(){this.container.removeAllChildren()}update(n){this.updateLayers()}viewChange(){}moveEnd(){this.requestUpdate()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((n,e)=>this.container.addChildAt(n.container,e))}};g=i([V("esri.views.2d.layers.CatalogDynamicGroupLayerView2D")],g);const qe=g;export{qe as default};
