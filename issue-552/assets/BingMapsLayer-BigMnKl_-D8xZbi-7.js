import{J as h,n as j,bh as x,f as c,o as u,v as a,S as o,i as M,aK as B,w as U}from"./main-DM2UJ-BA.js";import{m as P}from"./MultiOriginJSONSupport-DKRh9P6w-Cy7lKTFn.js";import{D as R}from"./Layer-ChoECxvZ-C4A6DcKY.js";import{u as T}from"./BlendLayer-D1WkSmwP-Di0c_5tq.js";import{T as k}from"./RefreshableLayer-a8BQ58Xh-2FNcij40.js";import{S as I}from"./ScaleRangeLayer-Bz0DcnvM-y_aO378P.js";import{u as f}from"./imageBitmapUtils-DA36kg39-DbVDow8_.js";import{V as m,d as r}from"./TileInfo-CWIRDhZl-DF-azAtF.js";import{e as L}from"./TileKey-B_6qmYK--BtZdR-Xy.js";import{E as _}from"./OperationalLayer-B5IXiMa2-DqJWAA_H.js";import"./TimeExtent-Cn0Jofqr-BmGqEZkt.js";import"./jsonUtils-wIllKWI4-BoD6rMOJ.js";import"./parser-DyDJ-rlI-CtNtH-Z6.js";import"./mat4f32-CiZjBg9k-CUm34GoR.js";import"./mat4-DX7gBViE-lVC6D7ix.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./commonProperties-BtIqvFU_-D63gTM_v.js";import"./ElevationInfo-yv2-9tj6-C_wnvuFD.js";import"./lengthUtils-DKpMe5qR-dmsmWZ-b.js";var v;const y=new L("0/0/0",0,0,0,void 0);let g=v=class extends T(I(k(R))){constructor(){super(...arguments),this.tileInfo=m.create({spatialReference:h.WebMercator,size:256}),this.type="base-tile",this.fullExtent=new j(-20037508342787e-6,-2003750834278e-5,2003750834278e-5,20037508342787e-6,h.WebMercator),this.spatialReference=h.WebMercator}getTileBounds(e,t,i,l){const s=l||x();return y.level=e,y.row=t,y.col=i,y.extent=s,this.tileInfo.updateTileInfo(y),y.extent=void 0,s}fetchTile(e,t,i,l={}){const{signal:s}=l,p=this.getTileUrl(e,t,i),d={responseType:"image",signal:s,query:{...this.refreshParameters}};return c(p??"",d).then(b=>b.data)}async fetchImageBitmapTile(e,t,i,l={}){const{signal:s}=l;if(this.fetchTile!==v.prototype.fetchTile){const S=await this.fetchTile(e,t,i,l);return f(S,e,t,i,s)}const p=this.getTileUrl(e,t,i)??"",d={responseType:"blob",signal:s,query:{...this.refreshParameters}},{data:b}=await c(p,d);return f(b,e,t,i,s)}getTileUrl(){throw new u("basetilelayer:gettileurl-not-implemented","getTileUrl() is not implemented")}};a([o({type:m})],g.prototype,"tileInfo",void 0),a([o({type:["show","hide"]})],g.prototype,"listMode",void 0),a([o({readOnly:!0,value:"base-tile"})],g.prototype,"type",void 0),a([o({nonNullable:!0})],g.prototype,"fullExtent",void 0),a([o()],g.prototype,"spatialReference",void 0),g=v=a([M("esri.layers.BaseTileLayer")],g);const O=g,w=new B({BingMapsAerial:"aerial",BingMapsRoad:"road",BingMapsHybrid:"hybrid"}),z="https://dev.virtualearth.net";let n=class extends T(_(P(O))){constructor(e){super(e),this.type="bing-maps",this.tileInfo=new m({size:[256,256],dpi:96,origin:new U({x:-20037508342787e-6,y:20037508342787e-6,spatialReference:h.WebMercator}),spatialReference:h.WebMercator,lods:[new r({level:1,resolution:78271.5169639999,scale:295828763795777e-6}),new r({level:2,resolution:39135.7584820001,scale:147914381897889e-6}),new r({level:3,resolution:19567.8792409999,scale:73957190948944e-6}),new r({level:4,resolution:9783.93962049996,scale:36978595474472e-6}),new r({level:5,resolution:4891.96981024998,scale:18489297737236e-6}),new r({level:6,resolution:2445.98490512499,scale:9244648868618e-6}),new r({level:7,resolution:1222.99245256249,scale:4622324434309e-6}),new r({level:8,resolution:611.49622628138,scale:2311162217155e-6}),new r({level:9,resolution:305.748113140558,scale:1155581108577e-6}),new r({level:10,resolution:152.874056570411,scale:577790.554289}),new r({level:11,resolution:76.4370282850732,scale:288895.277144}),new r({level:12,resolution:38.2185141425366,scale:144447.638572}),new r({level:13,resolution:19.1092570712683,scale:72223.819286}),new r({level:14,resolution:9.55462853563415,scale:36111.909643}),new r({level:15,resolution:4.77731426794937,scale:18055.954822}),new r({level:16,resolution:2.38865713397468,scale:9027.977411}),new r({level:17,resolution:1.19432856685505,scale:4513.988705}),new r({level:18,resolution:.597164283559817,scale:2256.994353}),new r({level:19,resolution:.298582141647617,scale:1128.497176}),new r({level:20,resolution:.1492910708238085,scale:564.248588})]}),this.key=null,this.style="road",this.culture="en-US",this.region=null,this.portalUrl=null,this.hasAttributionData=!0}get bingMetadata(){return this._get("bingMetadata")}set bingMetadata(e){this._set("bingMetadata",e)}get copyright(){return this.bingMetadata!=null?this.bingMetadata.copyright:null}get operationalLayerType(){return w.toJSON(this.style)}get bingLogo(){return this.bingMetadata!=null?this.bingMetadata.brandLogoUri:null}load(e){return this.key?this.addResolvingPromise(this._getMetadata()):this.portalUrl?this.addResolvingPromise(this._getPortalBingKey().then(()=>this._getMetadata())):this.addResolvingPromise(Promise.reject(new u("bingmapslayer:load","Bing layer must have bing key."))),Promise.resolve(this)}getTileUrl(e,t,i){if(!this.loaded||this.bingMetadata==null)return null;const l=this.bingMetadata.resourceSets[0].resources[0],s=l.imageUrlSubdomains[t%l.imageUrlSubdomains.length],p=this._getQuadKey(e,t,i);return l.imageUrl.replace("{subdomain}",s).replace("{quadkey}",p)}async fetchAttributionData(){return this.load().then(()=>this.bingMetadata==null?null:{contributors:this.bingMetadata.resourceSets[0].resources[0].imageryProviders.map(e=>({attribution:e.attribution,coverageAreas:e.coverageAreas.map(t=>({zoomMin:t.zoomMin,zoomMax:t.zoomMax,score:1,bbox:[t.bbox[0],t.bbox[1],t.bbox[2],t.bbox[3]]}))}))})}_getMetadata(){const e={road:"roadOnDemand",aerial:"aerial",hybrid:"aerialWithLabelsOnDemand"}[this.style];return c(`${z}/REST/v1/Imagery/Metadata/${e}`,{responseType:"json",query:{include:"ImageryProviders",uriScheme:"https",key:this.key,suppressStatus:!0,output:"json",culture:this.culture,userRegion:this.region}}).then(t=>{const i=t.data;if(i.statusCode!==200)throw new u("bingmapslayer:getmetadata",i.statusDescription);if(this.bingMetadata=i,this.bingMetadata.resourceSets.length===0)throw new u("bingmapslayer:getmetadata","no bing resourcesets");if(this.bingMetadata.resourceSets[0].resources.length===0)throw new u("bingmapslayer:getmetadata","no bing resources")}).catch(t=>{throw new u("bingmapslayer:getmetadata",t.message)})}_getPortalBingKey(){return c(this.portalUrl??"",{responseType:"json",authMode:"no-prompt",query:{f:"json"}}).then(e=>{if(!e.data.bingKey)throw new u("bingmapslayer:getportalbingkey","The referenced Portal does not contain a valid bing key");this.key=e.data.bingKey}).catch(e=>{throw new u("bingmapslayer:getportalbingkey",e.message)})}_getQuadKey(e,t,i){let l="";for(let s=e;s>0;s--){let p=0;const d=1<<s-1;i&d&&(p+=1),t&d&&(p+=2),l+=p.toString()}return l}};a([o({json:{read:!1,write:!1},value:null})],n.prototype,"bingMetadata",null),a([o({json:{read:!1,write:!1},value:"bing-maps",readOnly:!0})],n.prototype,"type",void 0),a([o({type:m})],n.prototype,"tileInfo",void 0),a([o({type:String,readOnly:!0,json:{read:!1,write:!1}})],n.prototype,"copyright",null),a([o({type:String,json:{write:!1,read:!1}})],n.prototype,"key",void 0),a([o({type:w.apiValues,nonNullable:!0,json:{read:{source:"layerType",reader:w.read}}})],n.prototype,"style",void 0),a([o({type:["BingMapsAerial","BingMapsHybrid","BingMapsRoad"]})],n.prototype,"operationalLayerType",null),a([o({type:String,json:{write:!1,read:!1}})],n.prototype,"culture",void 0),a([o({type:String,json:{write:!1,read:!1}})],n.prototype,"region",void 0),a([o({type:String,json:{write:!0,read:!0}})],n.prototype,"portalUrl",void 0),a([o({type:Boolean,json:{write:!1,read:!1}})],n.prototype,"hasAttributionData",void 0),a([o({type:String,readOnly:!0})],n.prototype,"bingLogo",null),n=a([M("esri.layers.BingMapsLayer")],n);const te=n;export{te as default};
