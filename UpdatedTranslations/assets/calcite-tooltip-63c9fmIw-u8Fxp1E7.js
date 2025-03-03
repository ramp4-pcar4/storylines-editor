import{p as g,b as T,W as l,a as s,D as E}from"./themeUtils-YjM7iIiX-BVwONN5a.js";import{A as w,U as b,m as H}from"./dom-N58V0tYi-DBU3jlah.js";import{U as y,X as k,q as R,_ as C,j as d}from"./floating-ui-DKFFlLv3-BKa1qdCl.js";import{i as L}from"./guid-Dls486Er-CBh637k4.js";import{p as c}from"./openCloseComponent-BGQ6h7vg-DUNFpbuJ.js";import{$ as x}from"./FloatingArrow-BG9llDYg-BvCi4oNm.js";import"./main-YbCtmqIL.js";import"./uuid-Dj9mdEVg-BaKSCiyT.js";import"./debounce-27Hmkkyg-Th7bw3mg.js";const O={container:"container"},S=300,A=500,h="aria-describedby";function f(o){const{referenceElement:e}=o;return(typeof e=="string"?b(o,{id:e}):e)||null}class D{constructor(){this.registeredElements=new WeakMap,this.registeredShadowRootCounts=new WeakMap,this.hoverOpenTimeout=null,this.hoverCloseTimeout=null,this.activeTooltip=null,this.registeredElementCount=0,this.clickedTooltip=null,this.queryTooltip=e=>{const{registeredElements:t}=this,i=e.find(n=>t.has(n));return t.get(i)},this.keyDownHandler=e=>{if(e.key==="Escape"&&!e.defaultPrevented){const{activeTooltip:t}=this;if(t?.open){this.clearHoverTimeout(),this.closeActiveTooltip();const i=f(t);i instanceof Element&&i.contains(e.target)&&e.preventDefault()}}},this.pointerMoveHandler=e=>{const t=e.composedPath(),{activeTooltip:i}=this,n=this.queryTooltip(t);if(this.pathHasOpenTooltip(n,t)){this.clearHoverTimeout();return}n!==this.clickedTooltip&&(n?this.openHoveredTooltip(n):i?.open&&this.closeHoveredTooltip(),this.clickedTooltip=null)},this.clickHandler=e=>{this.clickedTooltip=null;const t=e.composedPath(),i=this.queryTooltip(t);if(this.pathHasOpenTooltip(i,t)){this.clearHoverTimeout();return}if(this.closeActiveTooltip(),!!i){if(this.clearHoverTimeout(),i.closeOnClick){this.clickedTooltip=i,this.toggleTooltip(i,!1);return}this.toggleTooltip(i,!0)}},this.blurHandler=()=>{this.closeActiveTooltip()},this.focusInHandler=e=>{const t=e.composedPath(),i=this.queryTooltip(t);if(this.pathHasOpenTooltip(i,t)){this.clearHoverTimeout();return}this.closeTooltipIfNotActive(i),i&&this.toggleFocusedTooltip(i,!0)},this.openHoveredTooltip=e=>{this.hoverOpenTimeout=window.setTimeout(()=>{this.hoverOpenTimeout!==null&&(this.clearHoverCloseTimeout(),this.closeTooltipIfNotActive(e),this.toggleTooltip(e,!0))},this.activeTooltip?.open?0:S)},this.closeHoveredTooltip=()=>{this.hoverCloseTimeout=window.setTimeout(()=>{this.hoverCloseTimeout!==null&&this.closeActiveTooltip()},A)}}registerElement(e,t){this.registeredElementCount++,this.registeredElements.set(e,t);const i=this.getReferenceElShadowRootNode(e);i&&this.registerShadowRoot(i),this.registeredElementCount===1&&this.addListeners()}unregisterElement(e){const t=this.getReferenceElShadowRootNode(e);t&&this.unregisterShadowRoot(t),this.registeredElements.delete(e)&&this.registeredElementCount--,this.registeredElementCount===0&&this.removeListeners()}pathHasOpenTooltip(e,t){const{activeTooltip:i}=this;return i?.open&&t.includes(i)||e?.open&&t.includes(e)}addShadowListeners(e){e.addEventListener("focusin",this.focusInHandler,{capture:!0})}removeShadowListeners(e){e.removeEventListener("focusin",this.focusInHandler,{capture:!0})}addListeners(){window.addEventListener("keydown",this.keyDownHandler,{capture:!0}),window.addEventListener("pointermove",this.pointerMoveHandler,{capture:!0}),window.addEventListener("click",this.clickHandler,{capture:!0}),window.addEventListener("focusin",this.focusInHandler,{capture:!0}),window.addEventListener("blur",this.blurHandler)}removeListeners(){window.removeEventListener("keydown",this.keyDownHandler,{capture:!0}),window.removeEventListener("pointermove",this.pointerMoveHandler,{capture:!0}),window.removeEventListener("click",this.clickHandler,{capture:!0}),window.removeEventListener("focusin",this.focusInHandler,{capture:!0}),window.removeEventListener("blur",this.blurHandler)}clearHoverOpenTimeout(){window.clearTimeout(this.hoverOpenTimeout),this.hoverOpenTimeout=null}clearHoverCloseTimeout(){window.clearTimeout(this.hoverCloseTimeout),this.hoverCloseTimeout=null}clearHoverTimeout(){this.clearHoverOpenTimeout(),this.clearHoverCloseTimeout()}closeTooltipIfNotActive(e){this.activeTooltip!==e&&this.closeActiveTooltip()}closeActiveTooltip(){const{activeTooltip:e}=this;e?.open&&this.toggleTooltip(e,!1)}toggleFocusedTooltip(e,t){t&&this.clearHoverTimeout(),this.toggleTooltip(e,t)}toggleTooltip(e,t){e.open=t,this.activeTooltip=t?e:null}registerShadowRoot(e){const{registeredShadowRootCounts:t}=this,i=t.get(e),n=Math.min((typeof i=="number"?i:0)+1,1);n===1&&this.addShadowListeners(e),t.set(e,n)}unregisterShadowRoot(e){const{registeredShadowRootCounts:t}=this,i=t.get(e),n=Math.max((typeof i=="number"?i:1)-1,0);n===0&&this.removeShadowListeners(e),t.set(e,n)}getReferenceElShadowRootNode(e){return e instanceof Element?H(e):null}}const P=":host{--calcite-floating-ui-z-index:var(--calcite-tooltip-z-index, var(--calcite-z-index-tooltip));display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index)}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{inset-block-start:-5px}:host([data-placement^=top]) .calcite-floating-ui-anim{inset-block-start:5px}:host([data-placement^=left]) .calcite-floating-ui-anim{left:5px}:host([data-placement^=right]) .calcite-floating-ui-anim{left:-5px}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}.container{position:relative;overflow:hidden;border-radius:0.25rem;padding-block:0.75rem;padding-inline:1rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);max-inline-size:20rem;max-block-size:20rem;text-align:start}.calcite-floating-ui-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.arrow::before{outline:1px solid var(--calcite-color-border-3)}:host([hidden]){display:none}[hidden]{display:none}",z=P,p=new D,m=g(class extends T{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteTooltipBeforeClose=l(this,"calciteTooltipBeforeClose",6),this.calciteTooltipClose=l(this,"calciteTooltipClose",6),this.calciteTooltipBeforeOpen=l(this,"calciteTooltipBeforeOpen",6),this.calciteTooltipOpen=l(this,"calciteTooltipOpen",6),this.guid=`calcite-tooltip-${L()}`,this.openTransitionProp="opacity",this.setTransitionEl=o=>{this.transitionEl=o},this.setUpReferenceElement=(o=!0)=>{this.removeReferences(),this.effectiveReferenceElement=f(this.el),y(this,this.effectiveReferenceElement,this.el);const{el:e,referenceElement:t,effectiveReferenceElement:i}=this;o&&t&&!i&&console.warn(`${e.tagName}: reference-element id "${t}" was not found.`,{el:e}),this.addReferences()},this.getId=()=>this.el.id||this.guid,this.addReferences=()=>{const{effectiveReferenceElement:o}=this;if(!o)return;const e=this.getId();"setAttribute"in o&&o.setAttribute(h,e),p.registerElement(o,this.el)},this.removeReferences=()=>{const{effectiveReferenceElement:o}=this;o&&("removeAttribute"in o&&o.removeAttribute(h),p.unregisterElement(o))},this.closeOnClick=!1,this.label=void 0,this.offsetDistance=k,this.offsetSkidding=0,this.open=!1,this.overlayPositioning="absolute",this.placement="auto",this.referenceElement=void 0,this.effectiveReferenceElement=void 0,this.floatingLayout="vertical"}offsetDistanceOffsetHandler(){this.reposition(!0)}offsetSkiddingHandler(){this.reposition(!0)}openHandler(){c(this),this.reposition(!0)}overlayPositioningHandler(){this.reposition(!0)}placementHandler(){this.reposition(!0)}referenceElementHandler(){this.setUpReferenceElement()}connectedCallback(){this.setUpReferenceElement(!0),this.open&&c(this)}async componentWillLoad(){this.open&&c(this)}componentDidLoad(){this.referenceElement&&!this.effectiveReferenceElement&&this.setUpReferenceElement()}disconnectedCallback(){this.removeReferences(),R(this,this.effectiveReferenceElement,this.el)}async reposition(o=!1){const{el:e,effectiveReferenceElement:t,placement:i,overlayPositioning:n,offsetDistance:r,offsetSkidding:a,arrowEl:v}=this;return C(this,{floatingEl:e,referenceEl:t,overlayPositioning:n,placement:i,offsetDistance:r,offsetSkidding:a,arrowEl:v,type:"tooltip"},o)}onBeforeOpen(){this.calciteTooltipBeforeOpen.emit()}onOpen(){this.calciteTooltipOpen.emit()}onBeforeClose(){this.calciteTooltipBeforeClose.emit()}onClose(){this.calciteTooltipClose.emit()}render(){const{effectiveReferenceElement:o,label:e,open:t,floatingLayout:i}=this,n=o&&t,r=!n;return s(E,{key:"4f097fd8c6eda6dfcd5734e5aaea1f52092501e7","aria-hidden":w(r),"aria-label":e,"aria-live":"polite","calcite-hydrated-hidden":r,id:this.getId(),role:"tooltip"},s("div",{key:"6b5055ab6f95277dd4daeaaff15cb9848d85eea0",class:{[d.animation]:!0,[d.animationActive]:n},ref:this.setTransitionEl},s(x,{key:"57f68bea5a7bb369d82437f10535cab9753677ea",floatingLayout:i,ref:a=>this.arrowEl=a}),s("div",{key:"100b8318173849508952f996acaeb5bf81b8af43",class:O.container},s("slot",{key:"f89d3ae9313d9555e6a7acdc32c323de85319a3a"}))))}get el(){return this}static get watchers(){return{offsetDistance:["offsetDistanceOffsetHandler"],offsetSkidding:["offsetSkiddingHandler"],open:["openHandler"],overlayPositioning:["overlayPositioningHandler"],placement:["placementHandler"],referenceElement:["referenceElementHandler"]}}static get style(){return z}},[1,"calcite-tooltip",{closeOnClick:[516,"close-on-click"],label:[1],offsetDistance:[514,"offset-distance"],offsetSkidding:[514,"offset-skidding"],open:[516],overlayPositioning:[513,"overlay-positioning"],placement:[513],referenceElement:[1,"reference-element"],effectiveReferenceElement:[32],floatingLayout:[32],reposition:[64]},void 0,{offsetDistance:["offsetDistanceOffsetHandler"],offsetSkidding:["offsetSkiddingHandler"],open:["openHandler"],overlayPositioning:["overlayPositioningHandler"],placement:["placementHandler"],referenceElement:["referenceElementHandler"]}]);function u(){typeof customElements>"u"||["calcite-tooltip"].forEach(o=>{switch(o){case"calcite-tooltip":customElements.get(o)||customElements.define(o,m);break}})}u();const j=m,F=u;export{j as CalciteTooltip,F as defineCustomElement};
