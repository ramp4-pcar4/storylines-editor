import{p as n,b as l,W as o,a as t,D as s}from"./themeUtils-YjM7iIiX-C33kMQIO.js";import{y as c,d as r,u as d}from"./label-Dys24PJn-BCewo2Re.js";import"./main-BnX5fuW-.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./dom-N58V0tYi-DBU3jlah.js";import"./component-CWGf1hug-BASJpoEG.js";const h={container:"container"},m=":host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{gap:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.5rem)}:host([scale=m]) .container{gap:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.75rem)}:host([scale=l]) .container{gap:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-block-end:var(--calcite-label-margin-bottom, 1rem)}:host .container{margin-inline:0px;margin-block-start:0px;inline-size:100%;line-height:1.375;color:var(--calcite-color-text-1)}:host([layout=default]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:0.5rem}:host([layout=inline][scale=l]) .container{gap:0.75rem}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([disabled])>.container{opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted(*[disabled]),:host([disabled]) ::slotted(*[disabled] *){--tw-bg-opacity:1}:host([disabled]) ::slotted(calcite-input-message:not([active])){--tw-bg-opacity:0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}",b=m,a=n(class extends l{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteInternalLabelClick=o(this,"calciteInternalLabelClick",2),this.labelClickHandler=e=>{window.getSelection()?.type!=="Range"&&this.calciteInternalLabelClick.emit({sourceEvent:e})},this.alignment="start",this.for=void 0,this.scale="m",this.layout="default"}handleForChange(){c(this.el)}connectedCallback(){document.dispatchEvent(new CustomEvent(r))}disconnectedCallback(){document.dispatchEvent(new CustomEvent(d))}render(){return t(s,{key:"c3eff09792519c9e5a76ee28e3754db83b536f99",onClick:this.labelClickHandler},t("div",{key:"387902edd9b59be290f95ad6c2721584037d7256",class:h.container},t("slot",{key:"b54d782522e95323333040e40e1a6dd06b52a575"})))}get el(){return this}static get watchers(){return{for:["handleForChange"]}}static get style(){return b}},[1,"calcite-label",{alignment:[513],for:[513],scale:[513],layout:[513]},void 0,{for:["handleForChange"]}]);function i(){typeof customElements>"u"||["calcite-label"].forEach(e=>{switch(e){case"calcite-label":customElements.get(e)||customElements.define(e,a);break}})}i();const k=a,C=i;export{k as CalciteLabel,C as defineCustomElement};
