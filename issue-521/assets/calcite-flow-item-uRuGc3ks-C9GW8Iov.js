import{p as w,b as C,W as l,a as t,D as B}from"./themeUtils-YjM7iIiX-D3bfa_hB.js";import{p as E}from"./dom-N58V0tYi-DBU3jlah.js";import{l as I,p as F}from"./interactive-DqhNilgd-DXixzXjj.js";import{o as L,r as P,f as S}from"./loadable-DbNDKH4r-p62OvQbx.js";import{K as x,q as A}from"./locale-Cn_GDVD_-kXH43kh_.js";import{d as T,h as O,M as D,l as M}from"./t9n-C_hcZMZJ-DAuqjepX.js";import{s as o,y as $}from"./panel-DRUEhsxp-DKk9Huo-.js";import{m as R}from"./action-GCQoufcz-Bi-L9uG5.js";import{K as z,O as K}from"./action-menu-DTIJuZNc-kH0YzIv7.js";import{m as _}from"./icon-BXFbBbop-CNe1iTKI.js";import{v as W}from"./loader-Ch7Jr16w-BfPG6Ccf.js";import{c as H}from"./scrim-BscQh4v9-DmO26eS3.js";import"./main-CF9Cdcsk.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./key-CZySMiwx-kmS7VeUz.js";import"./observers-BigwqTsw-Cl_vAXuj.js";import"./floating-ui-DKFFlLv3-CukHqj9t.js";import"./debounce-27Hmkkyg-Th7bw3mg.js";import"./guid-Dls486Er-CBh637k4.js";import"./component-CWGf1hug-BASJpoEG.js";import"./openCloseComponent-BGQ6h7vg-BYpes1iz.js";import"./FloatingArrow-BG9llDYg-CATCST_m.js";const q={backButton:"back-button"},h={backLeft:"chevron-left",backRight:"chevron-right"},a={actionBar:"action-bar",alerts:"alerts",contentTop:"content-top",contentBottom:"content-bottom",headerActionsStart:"header-actions-start",headerActionsEnd:"header-actions-end",headerMenuActions:"header-menu-actions",headerContent:"header-content",fab:"fab",footer:"footer",footerActions:"footer-actions",footerEnd:"footer-end",footerStart:"footer-start"},G=":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}calcite-panel{--calcite-panel-footer-padding:var(--calcite-flow-item-footer-padding);--calcite-panel-header-border-block-end:var(--calcite-flow-item-header-border-block-end)}:host([hidden]){display:none}[hidden]{display:none}",J=G,f=w(class extends C{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteFlowItemBack=l(this,"calciteFlowItemBack",7),this.calciteFlowItemScroll=l(this,"calciteFlowItemScroll",6),this.calciteFlowItemClose=l(this,"calciteFlowItemClose",6),this.calciteFlowItemToggle=l(this,"calciteFlowItemToggle",6),this.handleInternalPanelScroll=e=>{e.target===this.containerEl&&(e.stopPropagation(),this.calciteFlowItemScroll.emit())},this.handleInternalPanelClose=e=>{e.target===this.containerEl&&(e.stopPropagation(),this.closed=!0,this.calciteFlowItemClose.emit())},this.handleInternalPanelToggle=e=>{e.target===this.containerEl&&(e.stopPropagation(),this.collapsed=e.target.collapsed,this.calciteFlowItemToggle.emit())},this.backButtonClick=()=>{this.calciteFlowItemBack.emit()},this.setBackRef=e=>{this.backButtonEl=e},this.setContainerRef=e=>{this.containerEl=e},this.closable=!1,this.closed=!1,this.collapsed=!1,this.collapseDirection="down",this.collapsible=!1,this.beforeBack=void 0,this.beforeClose=void 0,this.description=void 0,this.disabled=!1,this.heading=void 0,this.headingLevel=void 0,this.loading=!1,this.menuOpen=!1,this.messageOverrides=void 0,this.messages=void 0,this.overlayPositioning="absolute",this.scale="m",this.showBackButton=!1,this.defaultMessages=void 0,this.effectiveLocale=""}onMessagesChange(){}connectedCallback(){x(this),T(this)}async componentWillLoad(){await O(this),L(this)}componentDidRender(){I(this)}disconnectedCallback(){A(this),D(this)}componentDidLoad(){P(this)}effectiveLocaleChange(){M(this,this.effectiveLocale)}async setFocus(){await S(this);const{backButtonEl:e,containerEl:s}=this;if(e)return e.setFocus();if(s)return s.setFocus()}async scrollContentTo(e){await this.containerEl?.scrollContentTo(e)}renderBackButton(){const{el:e}=this,s=E(e)==="rtl",{showBackButton:n,backButtonClick:r,messages:d}=this,c=d.back,i=s?h.backRight:h.backLeft;return n?t("calcite-action",{"aria-label":c,class:q.backButton,icon:i,key:"flow-back-button",onClick:r,ref:this.setBackRef,scale:"s",slot:"header-actions-start",text:c,title:c}):null}render(){const{collapsed:e,collapseDirection:s,collapsible:n,closable:r,closed:d,description:c,disabled:i,heading:m,headingLevel:p,loading:g,menuOpen:u,messages:k,overlayPositioning:v,beforeClose:y}=this;return t(B,{key:"2e7872bb2687db0b67ddbf375f8ec0beaabbda36"},t(F,{key:"a9418954405a2cec2092bae3be5d77f02306e3c9",disabled:i},t("calcite-panel",{key:"d563c751421bf2d66c03286deaa613e09f585546",beforeClose:y,closable:r,closed:d,collapseDirection:s,collapsed:e,collapsible:n,description:c,disabled:i,heading:m,headingLevel:p,loading:g,menuOpen:u,messageOverrides:k,onCalcitePanelClose:this.handleInternalPanelClose,onCalcitePanelScroll:this.handleInternalPanelScroll,onCalcitePanelToggle:this.handleInternalPanelToggle,overlayPositioning:v,ref:this.setContainerRef,scale:this.scale},this.renderBackButton(),t("slot",{key:"c506ec8bb4debbd6a9da6c7941878de49776f614",name:a.actionBar,slot:o.actionBar}),t("slot",{key:"e76e55e654ff878acff734bdf387402a9e262159",name:a.alerts,slot:o.alerts}),t("slot",{key:"f7ab8839d7b101e31087130ebf3e36af1ec7da24",name:a.headerActionsStart,slot:o.headerActionsStart}),t("slot",{key:"2932c4c15b168732356b8e55fcc3064f5b3f4cf5",name:a.headerActionsEnd,slot:o.headerActionsEnd}),t("slot",{key:"1ef8a9050683022733695445092f8c626487d87b",name:a.headerContent,slot:o.headerContent}),t("slot",{key:"24c0ab570a601a6c0edfb0c820e580fd24b158ce",name:a.headerMenuActions,slot:o.headerMenuActions}),t("slot",{key:"ec55bbe7ba939a6efb35225850c37a1aadb97275",name:a.fab,slot:o.fab}),t("slot",{key:"aa0bfec47656ef9f7f575cd933897a7909e5badc",name:a.contentTop,slot:o.contentTop}),t("slot",{key:"e23532d080e2df529c2aeb6af043c6efe7a0ab6d",name:a.contentBottom,slot:o.contentBottom}),t("slot",{key:"db6ffc0d9300c77067a4c88ab277de685c7713af",name:a.footerStart,slot:o.footerStart}),t("slot",{key:"5f249356da9292f34c4036d0d0741f048fe999e9",name:a.footer,slot:o.footer}),t("slot",{key:"7476137bacc0f3be5c97682c5027f74d73254765",name:a.footerEnd,slot:o.footerEnd}),t("slot",{key:"58f60a46c42a05abe9b100a57d478d991e4f25bc",name:a.footerActions,slot:o.footerActions}),t("slot",{key:"926a8d94b76b6fcdef6dfd219ba8180c44f81c35"}))))}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return J}},[1,"calcite-flow-item",{closable:[516],closed:[516],collapsed:[516],collapseDirection:[1,"collapse-direction"],collapsible:[516],beforeBack:[16],beforeClose:[16],description:[1],disabled:[516],heading:[1],headingLevel:[514,"heading-level"],loading:[516],menuOpen:[516,"menu-open"],messageOverrides:[1040],messages:[1040],overlayPositioning:[513,"overlay-positioning"],scale:[513],showBackButton:[4,"show-back-button"],defaultMessages:[32],effectiveLocale:[32],setFocus:[64],scrollContentTo:[64]},void 0,{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}]);function b(){typeof customElements>"u"||["calcite-flow-item","calcite-action","calcite-action-menu","calcite-icon","calcite-loader","calcite-panel","calcite-popover","calcite-scrim"].forEach(e=>{switch(e){case"calcite-flow-item":customElements.get(e)||customElements.define(e,f);break;case"calcite-action":customElements.get(e)||R();break;case"calcite-action-menu":customElements.get(e)||K();break;case"calcite-icon":customElements.get(e)||_();break;case"calcite-loader":customElements.get(e)||W();break;case"calcite-panel":customElements.get(e)||$();break;case"calcite-popover":customElements.get(e)||z();break;case"calcite-scrim":customElements.get(e)||H();break}})}b();const me=f,pe=b;export{me as CalciteFlowItem,pe as defineCustomElement};
