import{p as G,b as k,W as T,a as d,D as B,n as M,h as W}from"./themeUtils-YjM7iIiX-CeOOgDDc.js";import{s as $,c as q}from"./conditionalSlot-DsCzytJ4-DLlDylV5.js";import{V as A,G as w,g as P,p as _}from"./dom-N58V0tYi-DBU3jlah.js";import{r as K,o as R,f as F}from"./loadable-DbNDKH4r-DltR4zte.js";import{K as j,q as V}from"./locale-Cn_GDVD_-DCnUUXuJ.js";import{c as E}from"./observers-BigwqTsw-CUaxmPi7.js";import{l as I,d as J,h as N,M as Q}from"./t9n-C_hcZMZJ-DdMUz-vX.js";import{o as g,l as U}from"./action-group-DhwU7QZv-aMGPq8tH.js";import{K as X,O as Y,_ as Z}from"./action-menu-DTIJuZNc-C3H3ADp_.js";import{m as ee}from"./action-GCQoufcz-VEaMbrJ1.js";import{m as te}from"./icon-BXFbBbop-oSToG1yK.js";import{v as oe}from"./loader-Ch7Jr16w-VKUn5WHi.js";import{l as ie}from"./debounce-27Hmkkyg-Th7bw3mg.js";import"./main-CBEjgtGo.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./key-CZySMiwx-kmS7VeUz.js";import"./guid-Dls486Er-CBh637k4.js";import"./floating-ui-DKFFlLv3-DsRj57Mu.js";import"./openCloseComponent-BGQ6h7vg-C8h6oxs0.js";import"./FloatingArrow-BG9llDYg-DyArDRAi.js";import"./component-CWGf1hug-BASJpoEG.js";import"./interactive-DqhNilgd-vVEvP-N5.js";const ae=2,C=e=>e.reduce((t,o)=>t+o,0)/e.length,se=e=>{const t=e.filter(i=>i.slot!==g.menuActions),o=t?.length;return{actionWidth:o?C(t.map(i=>i.clientWidth||0)):0,actionHeight:o?C(t.map(i=>i.clientHeight||0)):0}},ne=({width:e,actionWidth:t,layout:o,height:i,actionHeight:l,groupCount:s})=>{const n=o==="horizontal"?e:i,a=o==="horizontal"?t:l;return Math.floor((n-s*ae)/a)},le=({layout:e,actionCount:t,actionWidth:o,width:i,actionHeight:l,height:s,groupCount:n})=>Math.max(t-ne({width:i,actionWidth:o,layout:e,height:s,actionHeight:l,groupCount:n}),0),x=e=>Array.from(e.querySelectorAll("calcite-action")).filter(t=>t.closest("calcite-action-menu")?t.slot===Z.trigger:!0),ce=({actionGroups:e,expanded:t,overflowCount:o})=>{let i=o;e.reverse().forEach(l=>{let s=0;const n=x(l).reverse();n.forEach(a=>{a.slot===g.menuActions&&(a.removeAttribute("slot"),a.textEnabled=t)}),i>0&&n.some(a=>(n.filter(c=>!c.slot).length>1&&n.length>2&&!a.closest("calcite-action-menu")&&(a.textEnabled=!0,a.setAttribute("slot",g.menuActions),s++,s>1&&i--),i<1)),M(l)})},H={chevronsLeft:"chevrons-left",chevronsRight:"chevrons-right"};function re(e,t){return e||t.closest("calcite-shell-panel")?.position||"start"}function m({el:e,expanded:t}){x(e).filter(o=>o.slot!==g.menuActions).forEach(o=>o.textEnabled=t),e.querySelectorAll("calcite-action-group, calcite-action-menu").forEach(o=>o.expanded=t)}const de=({tooltip:e,referenceElement:t,expanded:o,ref:i})=>(e&&(e.referenceElement=!o&&t?t:null),i&&i(t),t),he=({expanded:e,expandText:t,collapseText:o,expandLabel:i,collapseLabel:l,toggle:s,el:n,position:a,tooltip:c,ref:r,scale:h})=>{const f=_(n)==="rtl",u=e?o:t,b=e?l:i,p=[H.chevronsLeft,H.chevronsRight];f&&p.reverse();const y=re(a,n)==="end",D=y?p[1]:p[0],O=y?p[0]:p[1];return d("calcite-action",{icon:e?D:O,id:"expand-toggle",label:b,onClick:s,ref:S=>de({tooltip:c,referenceElement:S,expanded:e,ref:r}),scale:h,text:u,textEnabled:e,title:!e&&!c?u:null})},pe={actionGroupEnd:"action-group--end"},v={actionsEnd:"actions-end",bottomActions:"bottom-actions",expandTooltip:"expand-tooltip"},ue=":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{pointer-events:auto;display:inline-flex;align-self:stretch;gap:var(--calcite-action-bar-items-space, 0)}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]){overflow-y:auto}:host([layout=vertical]):host([expanded]){max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]){overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:var(--calcite-border-width-sm)}.action-group--end{justify-content:flex-end}:host([hidden]){display:none}[hidden]{display:none}",me=ue,z=G(class extends k{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteActionBarToggle=T(this,"calciteActionBarToggle",6),this.mutationObserver=E("mutation",()=>{const{el:e,expanded:t}=this;m({el:e,expanded:t}),this.overflowActions()}),this.resizeObserver=E("resize",e=>this.resizeHandlerEntries(e)),this.actionMenuOpenHandler=e=>{if(e.target.menuOpen){const t=e.composedPath();Array.from(this.el.querySelectorAll("calcite-action-group")).forEach(o=>{t.includes(o)||(o.menuOpen=!1)})}},this.resizeHandlerEntries=e=>{e.forEach(this.resizeHandler)},this.resizeHandler=e=>{const{width:t,height:o}=e.contentRect;this.resize({width:t,height:o})},this.resize=ie(({width:e,height:t})=>{const{el:o,expanded:i,expandDisabled:l,layout:s,overflowActionsDisabled:n}=this;if(n||s==="vertical"&&!t||s==="horizontal"&&!e)return;const a=x(o),c=l?a.length:a.length+1,r=Array.from(o.querySelectorAll("calcite-action-group"));this.setGroupLayout(r);const h=this.hasActionsEnd||this.hasBottomActions||!l?r.length+1:r.length,{actionHeight:f,actionWidth:u}=se(a),b=le({layout:s,actionCount:c,actionHeight:f,actionWidth:u,height:t,width:e,groupCount:h});ce({actionGroups:r,expanded:i,overflowCount:b})},W.resize),this.toggleExpand=()=>{this.expanded=!this.expanded,this.calciteActionBarToggle.emit()},this.handleDefaultSlotChange=e=>{const t=A(e).filter(o=>o.matches("calcite-action-group"));this.setGroupLayout(t)},this.handleActionsEndSlotChange=e=>{this.hasActionsEnd=w(e)},this.handleBottomActionsSlotChange=e=>{this.hasBottomActions=w(e)},this.handleTooltipSlotChange=e=>{const t=A(e).filter(o=>o?.matches("calcite-tooltip"));this.expandTooltip=t[0]},this.actionsEndGroupLabel=void 0,this.expandDisabled=!1,this.expanded=!1,this.layout="vertical",this.overflowActionsDisabled=!1,this.overlayPositioning="absolute",this.position=void 0,this.scale=void 0,this.messages=void 0,this.messageOverrides=void 0,this.effectiveLocale=void 0,this.hasActionsEnd=!1,this.hasBottomActions=!1,this.expandTooltip=void 0,this.defaultMessages=void 0}expandHandler(){this.overflowActions()}expandedHandler(){const{el:e,expanded:t}=this;m({el:e,expanded:t}),this.overflowActions()}layoutHandler(){this.updateGroups()}overflowDisabledHandler(e){if(e){this.resizeObserver?.disconnect();return}this.resizeObserver?.observe(this.el),this.overflowActions()}onMessagesChange(){}effectiveLocaleChange(){I(this,this.effectiveLocale)}componentDidLoad(){const{el:e,expanded:t}=this;K(this),m({el:e,expanded:t}),this.overflowActions()}connectedCallback(){const{el:e,expanded:t}=this;j(this),J(this),m({el:e,expanded:t}),this.mutationObserver?.observe(e,{childList:!0,subtree:!0}),this.overflowActionsDisabled||this.resizeObserver?.observe(e),this.overflowActions(),$(this)}async componentWillLoad(){R(this),await N(this)}disconnectedCallback(){this.mutationObserver?.disconnect(),this.resizeObserver?.disconnect(),q(this),V(this),Q(this)}async overflowActions(){this.resize({width:this.el.clientWidth,height:this.el.clientHeight})}async setFocus(){await F(this),P(this.el)}updateGroups(){this.setGroupLayout(Array.from(this.el.querySelectorAll("calcite-action-group")))}setGroupLayout(e){e.forEach(t=>t.layout=this.layout)}renderBottomActionGroup(){const{expanded:e,expandDisabled:t,el:o,position:i,toggleExpand:l,scale:s,layout:n,messages:a,actionsEndGroupLabel:c,overlayPositioning:r}=this,h=t?null:d(he,{collapseLabel:a.collapseLabel,collapseText:a.collapse,el:o,expandLabel:a.expandLabel,expandText:a.expand,expanded:e,position:i,scale:s,toggle:l,tooltip:this.expandTooltip});return d("calcite-action-group",{class:pe.actionGroupEnd,hidden:this.expandDisabled&&!(this.hasActionsEnd||this.hasBottomActions),label:c,layout:n,overlayPositioning:r,scale:s},d("slot",{name:v.actionsEnd,onSlotchange:this.handleActionsEndSlotChange}),d("slot",{name:v.bottomActions,onSlotchange:this.handleBottomActionsSlotChange}),d("slot",{name:v.expandTooltip,onSlotchange:this.handleTooltipSlotChange}),h)}render(){return d(B,{key:"ff6e365531a0ed2032864bb0777910c3932e9c6b",onCalciteActionMenuOpen:this.actionMenuOpenHandler},d("slot",{key:"f12b2f455752a62ee32b65224bed385940135a49",onSlotchange:this.handleDefaultSlotChange}),this.renderBottomActionGroup())}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{expandDisabled:["expandHandler"],expanded:["expandedHandler"],layout:["layoutHandler"],overflowActionsDisabled:["overflowDisabledHandler"],messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return me}},[1,"calcite-action-bar",{actionsEndGroupLabel:[1,"actions-end-group-label"],expandDisabled:[516,"expand-disabled"],expanded:[1540],layout:[513],overflowActionsDisabled:[516,"overflow-actions-disabled"],overlayPositioning:[513,"overlay-positioning"],position:[513],scale:[513],messages:[1040],messageOverrides:[1040],effectiveLocale:[32],hasActionsEnd:[32],hasBottomActions:[32],expandTooltip:[32],defaultMessages:[32],overflowActions:[64],setFocus:[64]},void 0,{expandDisabled:["expandHandler"],expanded:["expandedHandler"],layout:["layoutHandler"],overflowActionsDisabled:["overflowDisabledHandler"],messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}]);function L(){typeof customElements>"u"||["calcite-action-bar","calcite-action","calcite-action-group","calcite-action-menu","calcite-icon","calcite-loader","calcite-popover"].forEach(e=>{switch(e){case"calcite-action-bar":customElements.get(e)||customElements.define(e,z);break;case"calcite-action":customElements.get(e)||ee();break;case"calcite-action-group":customElements.get(e)||U();break;case"calcite-action-menu":customElements.get(e)||Y();break;case"calcite-icon":customElements.get(e)||te();break;case"calcite-loader":customElements.get(e)||oe();break;case"calcite-popover":customElements.get(e)||X();break}})}L();const $e=z,qe=L;export{$e as CalciteActionBar,qe as defineCustomElement};
