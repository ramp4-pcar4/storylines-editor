import{c2 as I,c3 as P,g1 as m,cB as O,c6 as R,c7 as F,fN as $,ch as y,c8 as l,fY as M,cj as k,c4 as d,fZ as T,ck as z,cl as D,ca as g,cm as f,cd as c,ce as H,cn as N,cf as x,fF as L,g2 as W,fK as j,fu as G,g3 as q,f$ as K,g4 as Z,g5 as Y}from"./main-BeHOkNcW.js";class J extends W{overviewGraphicLayer;overviewmapStore;constructor(e){super(e),this.overviewGraphicLayer=this.$iApi.geo.layer.createLayer({id:"RampOverviewGraphic",layerType:j.GRAPHIC,url:"",cosmetic:!0}),this.overviewmapStore=m(this.$vApp.$pinia)}async createMapView(e){if(!e)throw new Error("Attempted to create overview map view without a basemap");const t=typeof e=="string"?await this.findBasemap(e):e;await this.applyBasemap(t),this._rampExtentSet=this.$iApi.geo.map.getExtentSet().clone(),this._rampSR=this._rampExtentSet.sr.clone();const i=this.overviewmapStore.expandFactor;this.esriView=G(await q.MapView({map:this.esriMap,container:this._targetDiv,constraints:{rotationEnabled:!1},spatialReference:this._rampSR.toESRI(),extent:this.$iApi.geo.map.getExtent().toESRI().expand(i)})),this.esriView.ui.components=[],this.handlers.push({type:"mouse-wheel",handler:this.esriView.on("mouse-wheel",a=>{a.stopPropagation()})}),this.handlers.push({type:"double-click",handler:this.esriView.on("double-click",a=>{a.stopPropagation()})}),this.handlers.push({type:"key-down",handler:this.esriView.on("key-down",a=>{a.stopPropagation()})}),this.handlers.push({type:"key-up",handler:this.esriView.on("key-up",a=>{a.stopPropagation()})}),this.handlers.push({type:"drag",handler:this.esriView.on("drag",a=>{a.stopPropagation(),this.mapDrag(a)})}),this.esriView.container.addEventListener("touchmove",a=>{a.preventDefault()}),this.esriView.watch("fatalError",()=>{const a=new IntersectionObserver(h=>{h.forEach(n=>{n.isIntersecting&&(this.esriView?.tryFatalErrorRecovery(),a.disconnect())})});a.observe(this.esriView.container)}),this.esriView.when(()=>{this._viewPromise.resolveMe(),this.created=!0})}async addMapGraphicLayer(){if(!this.esriMap){this.noMapErr();return}const e=new K(this.$iApi.geo.map.getExtent(),"overview-graphic"),t=this.overviewmapStore.borderColour??"#FF0000",i=this.overviewmapStore.borderWidth??1,a=this.overviewmapStore.areaColour??"#000000",h=this.overviewmapStore.areaOpacity??.25,n=`${a}${Math.round(h*255).toString(16)}`;e.style=new Z({fill:{colour:n},outline:{colour:t,width:i}}),await this.overviewGraphicLayer.initiate(),await this.overviewGraphicLayer.addGraphic(e),this.esriMap?.add(this.overviewGraphicLayer.esriLayer)}async removeMapGraphicLayer(){if(!this.esriMap){this.noMapErr();return}if(!this.overviewGraphicLayer.esriLayer)throw new Error("Attempted to remove layer from the map without an esri layer. Likely layer.initiate() was not called or had not finished.");this.overviewGraphicLayer.removeGraphic(),this.esriMap.remove(this.overviewGraphicLayer.esriLayer),await this.overviewGraphicLayer.terminate()}destroyMapView(){this.esriView?.container.removeEventListener("touchmove",e=>{e.preventDefault()}),super.destroyMapView()}async findBasemap(e){const t=this._basemapStore.find(i=>i.id===e);if(t)return t;{const i=$(this.$vApp.$pinia).config.map;if(i){const a=i.basemaps.find(h=>h.id===e);if(a)return Y.create(a)}}throw new Error(`Invalid basemap id requested: ${e}`)}async setBasemap(e){if(!this.esriView||!this.esriMap)return this.noMapErr(),!1;const t=await this.findBasemap(e),i=(this.getCurrentBasemapId()?await this.findBasemap(this.getCurrentBasemapId()):void 0)?.tileSchemaId!==t.tileSchemaId;return i?(this.destroyMapView(),await this.createMapView(t)):await this.applyBasemap(t),i}startExtent=null;async mapDrag(e){if(e.native.pointerType==="mouse"){if(e.action==="start")await this.cursorHitTest(e)&&(this.startExtent=G(this.overviewGraphicLayer.getEsriGraphic("overview-graphic").geometry));else if(this.startExtent){const t=this.esriView.toMap(e.origin),i=this.esriView.toMap({x:e.x,y:e.y}),a=this.startExtent.clone().offset(i.x-t.x,i.y-t.y,0);this.overviewGraphicLayer.getEsriGraphic("overview-graphic").geometry=a,e.action==="end"&&(this.$iApi.geo.map.zoomMapTo(this.$iApi.geo.geom.geomEsriToRamp(a),void 0,!1),this.startExtent=null)}}}updateOverview(e){const t=this.overviewmapStore.expandFactor,i=this.zoomMapTo(e.expand(t),void 0,!1),a=this.overviewGraphicLayer.getLocalGraphic("overview-graphic");return this.overviewGraphicLayer.removeGraphic(a),a.geometry=e,this.overviewGraphicLayer.addGraphic(a),i}async cursorHitTest(e){return(await this.esriView.hitTest(e)).results.length>0}}class U extends O{_parseConfig(e){const t=m(this.$vApp.$pinia);t.basemaps=e?.basemaps||{},t.mapConfig.basemaps=e?Object.values(e.basemaps):[],t.startMinimized=e?.startMinimized??!0,t.expandFactor=e?.expandFactor??1.5,t.borderColour=e?.borderColour??"#FF0000",t.borderWidth=e?.borderWidth??1,t.areaColour=e?.areaColour??"#000000",t.areaOpacity=e?.areaOpacity??.25}get config(){return super.config}}const X={class:"relative h-full w-full overflow-hidden"},Q={class:"absolute h-30 w-30 top-0 right-0"},ee=["content","aria-label"],ae=I({__name:"overviewmap",setup(w){const e=m(),{t}=R(),i=F("iApi"),a=$(),h=y(),n=l(()=>a.activeBasemapConfig),A=l(()=>e.mapConfig),b=l(()=>e.basemaps),S=l(()=>e.startMinimized);let r=M(new J(i));const o=y(!0),E=y(!1),v=M([]);k(async()=>{await i.geo.map.viewPromise,u(),await r.createMap(A.value,h.value.querySelector(".overviewmap")),await r.viewPromise,await r.addMapGraphicLayer(),o.value=S.value;let p=r.updateOverview(i.geo.map.getExtent());v.push(i.event.on(d.MAP_EXTENTCHANGE,T(100,s=>{p.then(()=>{r.updateOverview(s)})}))),v.push(i.event.on(d.MAP_CREATED,()=>{u()})),v.push(i.event.on(d.MAP_REFRESH_END,()=>{u()})),v.push(i.event.on(d.MAP_BASEMAPCHANGE,async s=>{!s.schemaChanged&&r.created&&n.value&&b.value[n.value.tileSchemaId]===void 0&&(await r.removeMapGraphicLayer(),await r.setBasemap(s.basemapId),await r.addMapGraphicLayer())}))}),z(()=>{v.forEach(p=>i.event.off(p)),r.destroyMap()});const C=async p=>{E.value=!o.value&&await r.cursorHitTest(p)},V=()=>({height:`${o.value?48:200}px`,width:`${o.value?48:200}px`}),_=()=>({top:`${o.value?-6:-3}px`,right:`${o.value?-6:-3}px`,transform:`rotate(${o.value?225:45}deg)`}),u=()=>{if(!n.value){console.error("Overview Map could not obtain the basemap config used by the main map");return}try{const p=n.value?.tileSchemaId;if(!p)throw new Error("Overview Map could not obtain the tile schema of the main map");const s=b.value[p];if(!s)throw new Error("Overview Map could not find a suitable basemap that matches the tile schema of the main map");r.created?r.viewPromise.then(()=>r.setBasemap(s.id)):e.updateInitialBasemap(s.id)}catch{r.created||e.updateInitialBasemap(n.value.id),r.viewPromise.then(()=>r.setBasemap(n.value.id))}};return(p,s)=>{const B=D("tippy");return g(),f("div",{class:"relative",ref_key:"el",ref:h},[c("div",{style:L(V()),class:"pointer-events-auto absolute top-0 right-0 mt-12 mr-12 shadow-tm border-4 border-solid border-white bg-white transition-all duration-300 ease-out"},[c("div",X,[c("div",{class:H(["overviewmap absolute top-0 right-0 h-192 w-192",{"cursor-move":E.value}]),onMousemove:C},null,34)]),c("div",Q,[N((g(),f("button",{type:"button",tabindex:"0",class:"cursor-pointer absolute h-full w-full",onClick:s[0]||(s[0]=re=>o.value=!o.value),content:x(t)(o.value?"overviewmap.expand":"overviewmap.minimize"),"aria-label":x(t)(o.value?"overviewmap.expand":"overviewmap.minimize")},[(g(),f("svg",{class:"absolute fill-current text-gray-500 transition-all duration-300 ease-out",style:L(_()),xmlns:"http://www.w3.org/2000/svg",fit:"",height:"100%",width:"100%",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",focusable:"false"},s[1]||(s[1]=[c("g",{id:"apple-keyboard-control"},[c("path",{d:"M 19.7782,11.7782L 18.364,13.1924L 12,6.82843L 5.63604,13.1924L 4.22183,11.7782L 12,4L 19.7782,11.7782 Z "})],-1)]),4))],8,ee)),[[B,{placement:"left",hideOnClick:!1}]])])],4)],512)}}}),te=P(ae,[["__scopeId","data-v-cee79589"]]),ie={en:{"overviewmap.expand":"Expand Overview","overviewmap.minimize":"Minimize Overview"},fr:{"overviewmap.expand":"Développer l'aperçu","overviewmap.minimize":"Réduire l'aperçu"}};class oe extends U{added(){Object.entries(ie).forEach(a=>this.$iApi.$i18n.mergeLocaleMessage(...a)),this._parseConfig(this.config);const e=this.$vApp.$watch(()=>this.config,a=>this._parseConfig(a)),{destroy:t,el:i}=this.mount(te,{app:this.$element});this.$vApp.$el.getElementsByClassName("inner-shell")[0].appendChild(i.childNodes[0]),this.removed=()=>{e(),t(),m(this.$vApp.$pinia).$reset()}}}export{oe as default};
