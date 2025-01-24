import{v as t,S as o,i as l,aK as j,bz as p,a0 as f,bB as x,e as b,P as T}from"./main-gpNb-fIA.js";import{i as D}from"./fieldType-CD2CL2hr-B3_83FRa.js";var m;let s=m=class extends b{constructor(e){super(e),this.name=null,this.code=null}clone(){return new m({name:this.name,code:this.code})}};t([o({type:String,json:{write:!0}})],s.prototype,"name",void 0),t([o({type:[String,Number],json:{write:!0}})],s.prototype,"code",void 0),s=m=t([l("esri.layers.support.CodedValue")],s);const J=new j({inherited:"inherited",codedValue:"coded-value",range:"range"});let d=class extends b{constructor(e){super(e),this.name=null,this.type=null}};t([o({type:String,json:{write:!0}})],d.prototype,"name",void 0),t([p(J)],d.prototype,"type",void 0),d=t([l("esri.layers.support.Domain")],d);const y=d;var h;let u=h=class extends y{constructor(e){super(e),this.codedValues=null,this.type="coded-value"}getName(e){let r=null;if(this.codedValues){const i=String(e);this.codedValues.some(w=>(String(w.code)===i&&(r=w.name),!!r))}return r}clone(){return new h({codedValues:T(this.codedValues),name:this.name})}};t([o({type:[s],json:{write:!0}})],u.prototype,"codedValues",void 0),t([p({codedValue:"coded-value"})],u.prototype,"type",void 0),u=h=t([l("esri.layers.support.CodedValueDomain")],u);const S=u;var v;let c=v=class extends y{constructor(e){super(e),this.type="inherited"}clone(){return new v}};t([p({inherited:"inherited"})],c.prototype,"type",void 0),c=v=t([l("esri.layers.support.InheritedDomain")],c);const O=c;var g;let a=g=class extends y{constructor(e){super(e),this.maxValue=null,this.minValue=null,this.type="range"}clone(){return new g({maxValue:this.maxValue,minValue:this.minValue,name:this.name})}};t([o({json:{type:[Number],read:{source:"range",reader:(e,r)=>r.range?.[1]},write:{enabled:!1,overridePolicy(){return{enabled:this.maxValue!=null&&this.minValue==null}},target:"range",writer(e,r,i){r[i]=[this.minValue||0,e]}}}})],a.prototype,"maxValue",void 0),t([o({json:{type:[Number],read:{source:"range",reader:(e,r)=>r.range?.[0]},write:{target:"range",writer(e,r,i){r[i]=[e,this.maxValue||0]}}}})],a.prototype,"minValue",void 0),t([p({range:"range"})],a.prototype,"type",void 0),a=g=t([l("esri.layers.support.RangeDomain")],a);const N=a,B={key:"type",base:y,typeMap:{range:N,"coded-value":S,inherited:O}};function P(e){if(!e?.type)return null;switch(e.type){case"range":return N.fromJSON(e);case"codedValue":return S.fromJSON(e);case"inherited":return O.fromJSON(e)}return null}var V;const _=new j({binary:"binary",coordinate:"coordinate",countOrAmount:"count-or-amount",dateAndTime:"date-and-time",description:"description",locationOrPlaceName:"location-or-place-name",measurement:"measurement",nameOrTitle:"name-or-title",none:"none",orderedOrRanked:"ordered-or-ranked",percentageOrRatio:"percentage-or-ratio",typeOrCategory:"type-or-category",uniqueIdentifier:"unique-identifier"});let n=V=class extends b{constructor(e){super(e),this.alias=null,this.defaultValue=void 0,this.description=null,this.domain=null,this.editable=!0,this.length=void 0,this.name=null,this.nullable=!0,this.type=null,this.valueType=null,this.visible=!0}readDescription(e,{description:r}){let i=null;try{i=r?JSON.parse(r):null}catch{}return i?.value??null}readValueType(e,{description:r}){let i=null;try{i=r?JSON.parse(r):null}catch{}return i?_.fromJSON(i.fieldValueType):null}clone(){return new V({alias:this.alias,defaultValue:this.defaultValue,description:this.description,domain:this.domain?.clone()??null,editable:this.editable,length:this.length,name:this.name,nullable:this.nullable,type:this.type,valueType:this.valueType,visible:this.visible})}};t([o({type:String,json:{write:!0}})],n.prototype,"alias",void 0),t([o({type:[String,Number],json:{write:{allowNull:!0}}})],n.prototype,"defaultValue",void 0),t([o()],n.prototype,"description",void 0),t([f("description")],n.prototype,"readDescription",null),t([o({types:B,json:{read:{reader:P},write:!0}})],n.prototype,"domain",void 0),t([o({type:Boolean,json:{write:!0}})],n.prototype,"editable",void 0),t([o({type:x,json:{write:{overridePolicy:e=>({enabled:Number.isFinite(e)})}}})],n.prototype,"length",void 0),t([o({type:String,json:{write:!0}})],n.prototype,"name",void 0),t([o({type:Boolean,json:{write:!0}})],n.prototype,"nullable",void 0),t([p(D)],n.prototype,"type",void 0),t([o()],n.prototype,"valueType",void 0),t([f("valueType",["description"])],n.prototype,"readValueType",null),t([o({type:Boolean,json:{read:!1}})],n.prototype,"visible",void 0),n=V=t([l("esri.layers.support.Field")],n);const F=n,R=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));export{R as F,S as a,P as i,B as n,s as p,F as y};
