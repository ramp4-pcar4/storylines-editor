import{v as o,S as e,i as m,bz as g,ar as c,bB as h,e as v,P as p}from"./main-Dph3xG49.js";let s=class extends v{constructor(t){super(t),this.type=null}};o([e({readOnly:!0,json:{read:!1,write:!0}})],s.prototype,"type",void 0),s=o([m("esri.rest.support.ColorRamp")],s);const n=s;var i;let r=i=class extends n{constructor(t){super(t),this.algorithm=null,this.fromColor=null,this.toColor=null,this.type="algorithmic"}clone(){return new i({fromColor:p(this.fromColor),toColor:p(this.toColor),algorithm:this.algorithm})}};o([g({esriCIELabAlgorithm:"cie-lab",esriHSVAlgorithm:"hsv",esriLabLChAlgorithm:"lab-lch"})],r.prototype,"algorithm",void 0),o([e({type:c,json:{type:[h],write:!0}})],r.prototype,"fromColor",void 0),o([e({type:c,json:{type:[h],write:!0}})],r.prototype,"toColor",void 0),o([e({type:["algorithmic"]})],r.prototype,"type",void 0),r=i=o([m("esri.rest.support.AlgorithmicColorRamp")],r);const y=r;var a;let l=a=class extends n{constructor(t){super(t),this.colorRamps=null,this.type="multipart"}clone(){return new a({colorRamps:p(this.colorRamps)})}};o([e({type:[y],json:{write:!0}})],l.prototype,"colorRamps",void 0),o([e({type:["multipart"]})],l.prototype,"type",void 0),l=a=o([m("esri.rest.support.MultipartColorRamp")],l);const u=l,d={key:"type",base:n,typeMap:{algorithmic:y,multipart:u}};function f(t){return t?.type?t.type==="algorithmic"?y.fromJSON(t):t.type==="multipart"?u.fromJSON(t):null:null}export{u as c,d as g,f as v};
