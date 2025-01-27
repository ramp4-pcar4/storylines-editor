import{bA as x,aa as A,dM as y,v as e,S as i,w as b,i as h,ag as g,eb as P,ah as w,ax as O,am as j,j as T,aP as $,ip as C,it as F,jn as H}from"./main-CSyv-l2o.js";import{y as M}from"./Analysis-BPgJ-FCw-B_4BsOKF.js";import{n as q,u as L}from"./featureReferenceUtils-Ct4KY5u7-zENeDS-w.js";import{C as m}from"./persistable-C6RBwzJi-DrE1ZCIk.js";import{q as R}from"./ElevationInfo-yv2-9tj6-go9IXol_.js";import{V as N}from"./projection-BA9M1R7d-8HGEzInK.js";import{l as X}from"./elevationInfoUtils-mOZsPH2J-93qR9uka.js";import{m as Y}from"./MultiOriginJSONSupport-DKRh9P6w-DQv6nscl.js";import{D}from"./Layer-ChoECxvZ-v9CZxaUh.js";import{E as U}from"./OperationalLayer-B5IXiMa2-DdrhEaxJ.js";import"./vec32-D9GsKZ1t-DekPPkYE.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./sphere-BenPORjV-Ce1-Ilsm.js";import"./mat4-DX7gBViE-BxCN6HxU.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./mat3-CC4Foazl-BWjyqE2v.js";import"./mat3f64-Dh9_zhFu-BIT-k8Dm.js";import"./plane-Dt8R0KeE-BEpWLswq.js";import"./mat4f64-Dn1WEGBx-C99QVUMW.js";import"./quatf64-C16JxGFv-BKWK1F8U.js";import"./vec2f64-CeODonrJ-CkkJCdRC.js";import"./IntersectorInterfaces-CrXe7z5S-tY6PKd-m.js";import"./boundedPlane-DlvE0eNx-CSJrMttn.js";import"./lineSegment-CcqvCARM-DrK5l7xW.js";import"./MD5-CHHr-oed-SuyrCYQ0.js";import"./multiOriginJSONSupportUtils-DGETddQl-BrWaY9_8.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./resourceExtension-CdQvIDKV-D2lDDnKf.js";import"./lengthUtils-DKpMe5qR-CRbb5w2T.js";import"./projectBuffer-CvCBvJ6W-CfBgzyx5.js";import"./TimeExtent-Cn0Jofqr-BhabZhIE.js";import"./commonProperties-BtIqvFU_-DSDOd5Jr.js";let a=class extends x(A(T)){constructor(t){super(t),this.position=null,this.elevationInfo=null,this.feature=null}equals(t){return y(this.position,t.position)&&y(this.elevationInfo,t.elevationInfo)&&q(this.feature,t.feature)}};e([i({type:b,json:{write:{isRequired:!0}}})],a.prototype,"position",void 0),e([i({type:R}),m()],a.prototype,"elevationInfo",void 0),e([i(L)],a.prototype,"feature",void 0),a=e([h("esri.analysis.LineOfSightAnalysisObserver")],a);const E=a;let l=class extends x($){constructor(t){super(t),this.position=null,this.elevationInfo=null,this.feature=null}equals(t){return y(this.position,t.position)&&y(this.elevationInfo,t.elevationInfo)&&q(this.feature,t.feature)}};e([i({type:b}),m()],l.prototype,"position",void 0),e([i({type:R}),m()],l.prototype,"elevationInfo",void 0),e([i(L)],l.prototype,"feature",void 0),l=e([h("esri.analysis.LineOfSightAnalysisTarget")],l);const I=l,f=g.ofType(I);let o=class extends M{constructor(t){super(t),this.type="line-of-sight",this.observer=null,this.extent=null}initialize(){this.addHandles(w(()=>this._computeExtent(),t=>{t?.pending==null&&this._set("extent",t!=null?t.extent:null)},O))}get targets(){return this._get("targets")||new f}set targets(t){this._set("targets",j(t,this.targets,f))}get spatialReference(){return this.observer?.position!=null?this.observer.position.spatialReference:null}get requiredPropertiesForEditing(){return[this.observer?.position]}async waitComputeExtent(){const t=this._computeExtent();return t!=null?t.pending:Promise.resolve()}_computeExtent(){const t=this.spatialReference;if(this.observer?.position==null||t==null)return null;const r=p=>X(p.position,p.elevationInfo)==="absolute-height",n=this.observer.position,v=C(n.x,n.y,n.z,n.x,n.y,n.z);for(const p of this.targets)if(p.position!=null){const u=N(p.position,t);if(u.pending!=null)return{pending:u.pending,extent:null};if(u.geometry!=null){const{x:z,y:S,z:_}=u.geometry;F(v,[z,S,_])}}const d=H(v,t);return r(this.observer)&&this.targets.every(r)||(d.zmin=void 0,d.zmax=void 0),{pending:null,extent:d}}clear(){this.observer=null,this.targets.removeAll()}};e([i({type:["line-of-sight"]})],o.prototype,"type",void 0),e([i({type:E,json:{read:!0,write:!0}})],o.prototype,"observer",void 0),e([i({cast:P,type:f,nonNullable:!0,json:{read:!0,write:!0}})],o.prototype,"targets",null),e([i({value:null,readOnly:!0})],o.prototype,"extent",void 0),e([i({readOnly:!0})],o.prototype,"spatialReference",null),e([i({readOnly:!0})],o.prototype,"requiredPropertiesForEditing",null),o=e([h("esri.analysis.LineOfSightAnalysis")],o);const c=o,V=g.ofType(I);let s=class extends U(Y(D)){constructor(t){super(t),this.type="line-of-sight",this.operationalLayerType="LineOfSightLayer",this.analysis=new c,this.opacity=1}initialize(){this.addHandles(w(()=>this.analysis,(t,r)=>{r!=null&&r.parent===this&&(r.parent=null),t!=null&&(t.parent=this)},O))}async load(){return this.analysis!=null&&this.addResolvingPromise(this.analysis.waitComputeExtent()),this}get observer(){return this.analysis?.observer}set observer(t){const{analysis:r}=this;r&&(r.observer=t)}get targets(){return this.analysis!=null?this.analysis.targets:new g}set targets(t){j(t,this.analysis?.targets)}get fullExtent(){return this.analysis!=null?this.analysis.extent:null}get spatialReference(){return this.analysis!=null?this.analysis.spatialReference:null}releaseAnalysis(t){this.analysis===t&&(this.analysis=new c)}};e([i({json:{read:!1},readOnly:!0})],s.prototype,"type",void 0),e([i({type:["LineOfSightLayer"]})],s.prototype,"operationalLayerType",void 0),e([i({type:E,json:{read:!0,write:{isRequired:!0,ignoreOrigin:!0}}})],s.prototype,"observer",null),e([i({type:V,json:{read:!0,write:{ignoreOrigin:!0}}})],s.prototype,"targets",null),e([i({nonNullable:!0,json:{read:!1,write:!1}})],s.prototype,"analysis",void 0),e([i({readOnly:!0})],s.prototype,"fullExtent",null),e([i({readOnly:!0})],s.prototype,"spatialReference",null),e([i({readOnly:!0,json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],s.prototype,"opacity",void 0),e([i({type:["show","hide"]})],s.prototype,"listMode",void 0),s=e([h("esri.layers.LineOfSightLayer")],s);const Lt=s;export{Lt as default};
