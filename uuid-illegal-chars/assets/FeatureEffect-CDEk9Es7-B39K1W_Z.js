import{v as i,S as o,el as c,i as b,e as y,o as f}from"./main-DeZqmqPk.js";import{l as u,p as d}from"./jsonUtils-wIllKWI4-CVEmuXmN.js";import m from"./FeatureFilter-BCFHgLVU-CDCLwIQR.js";var a;const p={read:{reader:u},write:{writer:d,overridePolicy(){return{allowNull:this.excludedEffect!=null,isRequired:this.excludedEffect==null}}}},w={read:{reader:u},write:{writer:d,overridePolicy(){return{allowNull:this.includedEffect!=null,isRequired:this.includedEffect==null}}}},h={name:"showExcludedLabels",default:!0};let t=a=class extends y{constructor(r){super(r),this.filter=null,this.includedEffect=null,this.excludedEffect=null,this.excludedLabelsVisible=!1}write(r,e){const l=super.write(r,e);if(e?.origin){if(l.filter){const s=Object.keys(l.filter);if(s.length>1||s[0]!=="where")return e.messages?.push(new f("web-document-write:unsupported-feature-effect","Invalid feature effect 'filter'. A filter can only contain a 'where' property",{layer:e.layer,effect:this})),null}if("showExcludedLabels"in l)return e.messages?.push(new f("web-document-write:unsupported-feature-effect","Invalid value for property 'excludedLabelsVisible' which should always be 'true'",{layer:e.layer,effect:this})),null}return l}clone(){return new a({filter:this.filter!=null?this.filter.clone():null,includedEffect:this.includedEffect,excludedEffect:this.excludedEffect,excludedLabelsVisible:this.excludedLabelsVisible})}};i([o({type:m,json:{write:{allowNull:!0,writer(r,e,l,s){const n=r?.write({},s);n&&Object.keys(n).length!==0?c(l,n,e):c(l,null,e)}}}})],t.prototype,"filter",void 0),i([o({json:{read:u,write:{writer:d,allowNull:!0},origins:{"web-map":p,"portal-item":p}}})],t.prototype,"includedEffect",void 0),i([o({json:{read:u,write:{writer:d,allowNull:!0},origins:{"web-map":w,"portal-item":w}}})],t.prototype,"excludedEffect",void 0),i([o({type:Boolean,json:{write:!0,name:"showExcludedLabels",origins:{"web-map":h,"portal-item":h}}})],t.prototype,"excludedLabelsVisible",void 0),t=a=i([b("esri.layers.support.FeatureEffect")],t);const g=t;export{g as x};
