import{bA as C,dM as H,v as t,S as i,w as J,ad as K,ab as U,i as F,ag as A,eb as X,ah as L,ax as P,ac as Y,aP as G,am as Z,n as k,bj as N,ae as q}from"./main-Dph3xG49.js";import{n as B,u as I}from"./featureReferenceUtils-Ct4KY5u7-D7ggQF1D.js";import{c as g}from"./Cyclical-C_9rKUUQ-B6In6GpN.js";import{y as Q}from"./Analysis-BPgJ-FCw-Clz8Vrig.js";import{X as W}from"./projection-BA9M1R7d-DAEw6OHS.js";import{m as ee}from"./MultiOriginJSONSupport-DKRh9P6w-CcBdpzuV.js";import{D as te}from"./Layer-ChoECxvZ-CpN4NAR4.js";import{E as ie}from"./OperationalLayer-B5IXiMa2-BkC_oDRC.js";import"./vec32-D9GsKZ1t-LlXW_l-c.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./sphere-BenPORjV-BWJHebaS.js";import"./mat4-DX7gBViE-B0bPyw7w.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./plane-Dt8R0KeE-BlBzJfbd.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./quatf64-C16JxGFv-BKWK1F8U.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./IntersectorInterfaces-CrXe7z5S-tY6PKd-m.js";import"./boundedPlane-DlvE0eNx-CsMdCctq.js";import"./lineSegment-CcqvCARM-DycafsUB.js";import"./projectBuffer-CvCBvJ6W-BFUqJjz1.js";import"./TimeExtent-Cn0Jofqr-DUFEaBxg.js";import"./commonProperties-BtIqvFU_-Cyb72Zor.js";import"./ElevationInfo-yv2-9tj6-bf_S-OZq.js";import"./lengthUtils-DKpMe5qR-Bf-xcnND.js";let o=class extends C(G){constructor(e){super(e),this.observer=null,this.farDistance=1e3,this.heading=0,this.tilt=90,this.horizontalFieldOfView=45,this.verticalFieldOfView=45,this.feature=null}isValid(){return this.observer!=null&&this.farDistance>0}equals(e){return H(this.observer,e.observer)&&this.farDistance===e.farDistance&&this.heading===e.heading&&this.tilt===e.tilt&&this.horizontalFieldOfView===e.horizontalFieldOfView&&this.verticalFieldOfView===e.verticalFieldOfView&&B(this.feature,e.feature)}};t([i({type:J,json:{write:!0}})],o.prototype,"observer",void 0),t([i({type:Number,nonNullable:!0,range:{min:0},json:{write:{isRequired:!0}}})],o.prototype,"farDistance",void 0),t([i({type:Number,nonNullable:!0,json:{write:{isRequired:!0}}}),K(e=>g.normalize(U(e),void 0,!0))],o.prototype,"heading",void 0),t([i({type:Number,nonNullable:!0,range:{min:0,max:180},json:{write:{isRequired:!0}}})],o.prototype,"tilt",void 0),t([i({type:Number,nonNullable:!0,range:{min:0,max:360},json:{write:{isRequired:!0}}})],o.prototype,"horizontalFieldOfView",void 0),t([i({type:Number,nonNullable:!0,range:{min:0,max:180},json:{write:{isRequired:!0}}})],o.prototype,"verticalFieldOfView",void 0),t([i(I)],o.prototype,"feature",void 0),t([i({json:{read:!1}})],o.prototype,"isValid",null),o=t([F("esri.analysis.Viewshed")],o);const T=o,E=A.ofType(T);let p=class extends Q{constructor(e){super(e),this.type="viewshed",this._extent=null}initialize(){this.addHandles(L(()=>this._computeExtent(),e=>{e.pending==null&&(this._extent=e.extent)},P))}get viewsheds(){return this._get("viewsheds")||new E}set viewsheds(e){this._set("viewsheds",Z(e,this.viewsheds,E))}get spatialReference(){for(const e of this.viewsheds)if(e.observer!=null)return e.observer.spatialReference;return null}get extent(){return this._extent}get requiredPropertiesForEditing(){return this.viewsheds.items.map(({observer:e})=>e)}async waitComputeExtent(){const e=this._computeExtent();e.pending!=null&&await e.pending}_computeExtent(){const{spatialReference:e}=this;if(e==null)return{pending:null,extent:null};const s=this.viewsheds.filter(r=>r.observer!=null),c=s.map(r=>r.observer).toArray(),l=W(c,e);return l.pending!=null?{pending:l.pending,extent:null}:{pending:null,extent:l.geometries.map((r,u)=>{const x=s.at(u);return r!=null&&x!=null?this._computeViewshedExtent(this.viewsheds.at(u),r):null}).filter(r=>r!=null).reduce((r,u)=>re(r,u),null)}}_computeViewshedExtent(e,s){const{farDistance:c,heading:l,tilt:r,horizontalFieldOfView:u,verticalFieldOfView:x}=e,{spatialReference:j}=s,b=u/2,V=x/2,O=c/j.metersPerUnit,$=[g.normalize(l-b),l,g.normalize(l+b)],d=k.fromPoint(s),f=w=>{const h=$.map(a=>g.normalize(a-w));if(h[0]>h[2]||u===360)return O;const m=h.map(a=>Math.abs(a>180?360-a:a)).reduce((a,v)=>a>v?v:a);return m>90?0:O*Math.cos(N(m))};d.xmax+=f(90),d.xmin-=f(-90),d.ymax+=f(0),d.ymin-=f(180);const y=s.z;if(y!=null){let w=y,h=y;const m=r-90,a=q(m+V,-90,90),v=q(m-V,-90,90),z=j?.isGeographic?c:O;w+=z*R(a),h+=z*R(v);const S=M(V)*z,_=R(m)*S*(1-M(b));r<90&&(w-=_),r>90&&(h-=_),d.zmax=Math.max(w,y),d.zmin=Math.min(h,y)}return d}clear(){this.viewsheds.removeAll()}};function re(e,s){return e==null?s:s==null?e:e.union(s)}function M(e){return Math.cos(N(e))}function R(e){return Math.sin(N(e))}t([i({type:["viewshed"]})],p.prototype,"type",void 0),t([i({cast:X,type:E,nonNullable:!0})],p.prototype,"viewsheds",null),t([i({readOnly:!0})],p.prototype,"spatialReference",null),t([i()],p.prototype,"_extent",void 0),t([i({readOnly:!0})],p.prototype,"extent",null),t([i({readOnly:!0})],p.prototype,"requiredPropertiesForEditing",null),p=t([F("esri.analysis.ViewshedAnalysis")],p);const D=p;let n=class extends ie(ee(te)){constructor(e){super(e),this.type="viewshed",this.operationalLayerType="ViewshedLayer",this.source=new D,this.opacity=1}initialize(){this.addHandles(L(()=>this.source,(e,s)=>{s!=null&&s.parent===this&&(s.parent=null),e!=null&&(e.parent=this)},P))}async load(){return this.addResolvingPromise(this.source.waitComputeExtent()),this}get spatialReference(){return this.source.spatialReference}get fullExtent(){return this.source.extent}releaseAnalysis(e){this.source===e&&(this.source=new D)}get analysis(){return this.source}set analysis(e){this.source=e}get viewsheds(){return this.source.viewsheds}set viewsheds(e){this.source.viewsheds=e}writeViewsheds(e,s,c,l){s.viewsheds=e.filter(r=>r.isValid()).map(r=>r.toJSON(l)).toJSON()}};t([i({json:{read:!1},readOnly:!0})],n.prototype,"type",void 0),t([i({type:["ViewshedLayer"]})],n.prototype,"operationalLayerType",void 0),t([i({nonNullable:!0})],n.prototype,"source",void 0),t([i({readOnly:!0})],n.prototype,"spatialReference",null),t([i({readOnly:!0})],n.prototype,"fullExtent",null),t([i({readOnly:!0,json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],n.prototype,"opacity",void 0),t([i({type:["show","hide"]})],n.prototype,"listMode",void 0),t([i({type:A.ofType(T),json:{write:{ignoreOrigin:!0},origins:{"web-scene":{write:{ignoreOrigin:!0}}}}})],n.prototype,"viewsheds",null),t([Y("web-scene","viewsheds")],n.prototype,"writeViewsheds",null),n=t([F("esri.layers.ViewshedLayer")],n);const Me=n;export{Me as default};
