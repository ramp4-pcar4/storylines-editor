import{v as n,S as i,i as S}from"./main-Dph3xG49.js";const s=a=>{let e=class extends a{constructor(){super(...arguments),this.minScale=0,this.maxScale=0}get effectiveScaleRange(){const c={minScale:this.minScale,maxScale:this.maxScale},t=this.parent;t&&"effectiveScaleRange"in t&&m(c,t.effectiveScaleRange);const l=this._get("effectiveScaleRange");return l&&l.minScale===c.minScale&&l.maxScale===c.maxScale?l:c}};return n([i({type:Number,nonNullable:!0,json:{write:!0}})],e.prototype,"minScale",void 0),n([i({type:Number,nonNullable:!0,json:{write:!0}})],e.prototype,"maxScale",void 0),n([i({readOnly:!0})],e.prototype,"effectiveScaleRange",null),e=n([S("esri.layers.mixins.ScaleRangeLayer")],e),e};function m(a,e){return a.minScale=a.minScale>0?e.minScale>0?Math.min(a.minScale,e.minScale):a.minScale:e.minScale,a.maxScale=a.maxScale>0?e.maxScale>0?Math.max(a.maxScale,e.maxScale):a.maxScale:e.maxScale,a}export{s as S};
