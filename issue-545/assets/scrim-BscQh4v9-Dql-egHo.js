import{p as n,b as o,a as s}from"./themeUtils-YjM7iIiX-C33kMQIO.js";import{K as l,q as r}from"./locale-Cn_GDVD_-VzFDwYRD.js";import{l as d,d as h,h as m,M as f}from"./t9n-C_hcZMZJ-CtW6GMph.js";import{c as g}from"./observers-BigwqTsw-cE4kCxPQ.js";import{a as v}from"./dom-N58V0tYi-DBU3jlah.js";import{v as u}from"./loader-Ch7Jr16w-j-j_mz8n.js";const i={scrim:"scrim",content:"content"},a={s:72,l:480},b=":host{--calcite-scrim-background:var(--calcite-color-transparent-scrim);position:absolute;inset:0px;z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity:0}100%{--tw-text-opacity:1}}.scrim{position:absolute;inset:0px;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}",p=b,y=n(class extends o{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.resizeObserver=g("resize",()=>this.handleResize()),this.handleDefaultSlotChange=e=>{this.hasContent=v(e)},this.storeLoaderEl=e=>{this.loaderEl=e,this.handleResize()},this.loading=!1,this.messages=void 0,this.messageOverrides=void 0,this.loaderScale=void 0,this.defaultMessages=void 0,this.effectiveLocale="",this.hasContent=!1}onMessagesChange(){}effectiveLocaleChange(){d(this,this.effectiveLocale)}connectedCallback(){l(this),h(this),this.resizeObserver?.observe(this.el)}async componentWillLoad(){await m(this)}disconnectedCallback(){r(this),f(this),this.resizeObserver?.disconnect()}render(){const{hasContent:e,loading:t,messages:c}=this;return s("div",{key:"286b03bb4a18b45f1b6914684a5178e952a44127",class:i.scrim},t?s("calcite-loader",{label:c.loading,ref:this.storeLoaderEl,scale:this.loaderScale}):null,s("div",{key:"0f8cd111720239b204d0d201610c4145d5616753",class:i.content,hidden:!e},s("slot",{key:"fe7bbced9871c9179971da0ef7ca07ea1c9ac33e",onSlotchange:this.handleDefaultSlotChange})))}getScale(e){return e<a.s?"s":e>=a.l?"l":"m"}handleResize(){const{loaderEl:e,el:t}=this;e&&(this.loaderScale=this.getScale(Math.min(t.clientHeight,t.clientWidth)??0))}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return p}},[1,"calcite-scrim",{loading:[516],messages:[1040],messageOverrides:[1040],loaderScale:[32],defaultMessages:[32],effectiveLocale:[32],hasContent:[32]},void 0,{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}]);function C(){typeof customElements>"u"||["calcite-scrim","calcite-loader"].forEach(e=>{switch(e){case"calcite-scrim":customElements.get(e)||customElements.define(e,y);break;case"calcite-loader":customElements.get(e)||u();break}})}C();export{C as c};
