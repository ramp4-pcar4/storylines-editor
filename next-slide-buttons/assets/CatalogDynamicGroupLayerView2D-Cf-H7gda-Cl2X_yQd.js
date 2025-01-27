import{ag as f,v as i,i as V,S as a,bp as F,bo as C,a2 as U,b9 as H,a1 as _,bV as w}from"./main-CSyv-l2o.js";import{X as x,Y as I}from"./LayerView-Bish-E63-CWZFEe8u.js";import"./Container-BcuL1ZEG-tsMYLCbQ.js";import"./MapView-BGOJJ8ch-nT-NWb9C.js";import"./Cyclical-C_9rKUUQ-CeaCeUzW.js";import"./CollectionFlattener-DkHuHn5E-DwQBKn9r.js";import"./workers-PiCjreoO-DUNkHRl-.js";import"./projection-BA9M1R7d-8HGEzInK.js";import"./projectBuffer-CvCBvJ6W-CfBgzyx5.js";import"./TileInfo-CWIRDhZl-DdWGEd2C.js";import"./TileKey-B_6qmYK--BtZdR-Xy.js";import"./themeUtils-YjM7iIiX-D3WyYE6Z.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./UpdatingHandles-CUu3u1ms-CwTS9ZoY.js";import"./signal-CETehA7D-CtmQsIzG.js";import"./Map-1zd11DKO-BK0Duige.js";import"./Basemap-BEqqSTw9-DbL0K-rW.js";import"./loadAll-e978YItg-BsUhaDhp.js";import"./PortalItem-CctGdnxF-B-MpVERN.js";import"./writeUtils-D5qlLkwk-BKnxPe2w.js";import"./compilerUtils-CV1QYWI8-Bk3Iuos8.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-BxCN6HxU.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./TablesMixin-C8RojhYs-ClKRz9b0.js";import"./Layer-ChoECxvZ-v9CZxaUh.js";import"./TimeExtent-Cn0Jofqr-BhabZhIE.js";import"./GraphicsCollection-CWTXNZOX-BFK5fPZa.js";import"./HeightModelInfo-C5vFqzyF-jSW1G0U2.js";import"./ReactiveMap-CFk6jPfN-BtUZG60a.js";import"./Query-BrwMGK8U-DQQU-sJm.js";import"./Field-C6hA1tZj-CllHE1WT.js";import"./fieldType-CD2CL2hr-BC7pt10u.js";import"./arcgisLayerUrl-HNYh8jvG-CyUNbPxH.js";import"./ViewingMode-CyR_b1T8-_s7_Gbsk.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./vec2-tHZ6OaOy-xCj1obDt.js";import"./Tile-D75RMC64-CNma6O8-.js";import"./TileKey-C5IL-JBr-CfM0KuuT.js";import"./QueueProcessor-DbfV9fLy-CoISen0P.js";import"./quickselect-DHTstthl-Ds_Aj0x5.js";import"./normalizeUtils-Bxmy9MNI-DPyXixfZ.js";import"./normalizeUtilsCommon-CRJlkfEA-BAOUdLbS.js";import"./utils-9sQxfkoa-DviREFnb.js";import"./utils-Bq23Xwmj-Lu1e5M63.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./vec2f32-CVhmN3Me-DxoqVD7C.js";import"./unitBezier-CGtWxaCq-BRwEDigF.js";import"./Scheduler-B7UX7Wr5-8gVAKbcQ.js";import"./vec32-D9GsKZ1t-DekPPkYE.js";import"./definitions-DJSdSb77-DkoRHaVx.js";import"./enums-DBi1-Mm2-CUS1pvQe.js";import"./Texture-BCt2hphT-BsDSPr02.js";import"./imageUtils-BA2D6Uf1-CImV0YV_.js";import"./capabilities-agoTWNzb-CtsNgRyk.js";import"./Version-CoKzbupV-zMVzMXA9.js";import"./ColorBackground-gVZldRLm-D4YJxm4a.js";import"./parser-DyDJ-rlI-uTNCpt_z.js";import"./layerViewUtils-DURAPenP-DJj0Gbd3.js";const y=Symbol(),O=n=>{let e=class extends n{constructor(){super(...arguments),this.layerViews=new f,this._debouncedUpdate=F(async()=>{const{layer:r,parent:o}=this,s=o?.footprintLayerView;let p=[];const d=this._createQuery();if(d&&s){const{features:h}=await s.queryFeatures(d);this.suspended||(p=h.map(u=>r.acquireLayer(u)))}this.removeHandles(y),this.addHandles(p,y)})}get creatingLayerViews(){return this.view?.layerViewManager.isCreatingLayerViewsForLayer(this.layer)??!1}isUpdating(){return this.creatingLayerViews||this.layer.updating||this.layerViews.some(r=>r.updating)}enableLayerUpdates(){return C([this._updatingHandles.addWhen(()=>this.parent?.footprintLayerView?.dataUpdating===!1,()=>this.updateLayers()),this._updatingHandles.add(()=>[this.layer.maximumVisibleSublayers,this.layer.parent?.orderBy,this.parent?.footprintLayerView?.filter,this.parent?.footprintLayerView?.timeExtent,this.suspended],()=>this.updateLayers()),U(()=>this.removeHandles(y))])}updateLayers(){this.suspended?this.removeHandles(y):this._updatingHandles.addPromise(H(this._debouncedUpdate()).catch(r=>{_.getLogger(this).error(r)}))}_createQuery(){const r=this.parent?.footprintLayerView,o=this.layer?.parent;if(!r||!o||o.destroyed)return null;const{layer:{maximumVisibleSublayers:s},view:{scale:p}}=this;if(!s)return null;const{itemTypeField:d,itemSourceField:h,itemNameField:u,minScaleField:c,maxScaleField:L,objectIdField:v,orderBy:S}=o,$=w(`${c} IS NULL OR ${p} <= ${c} OR ${c} = 0`,`${L} IS NULL OR ${p} >= ${L}`),m=S?.find(l=>l.field&&!l.valueExpression),t=r.createQuery();if(t.returnGeometry=!1,t.num=s,t.outFields=[v,h,u],t.where=w(t.where,$),this.unsupportedItemTypes!=null){const l=`${d} NOT IN (${this.unsupportedItemTypes.map(b=>`'${b}'`)})`;t.where=w(t.where,l)}return m?.field&&(t.orderByFields=[`${m.field} ${m.order==="descending"?"DESC":"ASC"}`],t.outFields.push(m.field)),t}};return i([a({readOnly:!0})],e.prototype,"creatingLayerViews",null),i([a()],e.prototype,"layer",void 0),i([a()],e.prototype,"layerViews",void 0),i([a({readOnly:!0})],e.prototype,"unsupportedItemTypes",void 0),i([a()],e.prototype,"parent",void 0),i([a({readOnly:!0})],e.prototype,"isUpdating",null),e=i([V("esri.views.layers.CatalogDynamicGroupLayerView")],e),e};let g=class extends O(x(I)){constructor(){super(...arguments),this.unsupportedItemTypes=["Scene Service"],this.layerViews=new f}attach(){this.addAttachHandles([this.layerViews.on("after-changes",()=>this._updateStageChildren()),this.enableLayerUpdates()])}detach(){this.container.removeAllChildren()}update(n){this.updateLayers()}viewChange(){}moveEnd(){this.requestUpdate()}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((n,e)=>this.container.addChildAt(n.container,e))}};g=i([V("esri.views.2d.layers.CatalogDynamicGroupLayerView2D")],g);const qe=g;export{qe as default};
