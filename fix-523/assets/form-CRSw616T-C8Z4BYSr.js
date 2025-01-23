import{a as M}from"./themeUtils-YjM7iIiX-BiN_cUUa.js";import{U as L,T as p}from"./dom-N58V0tYi-DBU3jlah.js";const A=["calcite-input","calcite-input-number","calcite-input-text","calcite-text-area"];function w(e){return`${e.split("-").map((n,i)=>i===0?n:`${n[0].toUpperCase()}${n.slice(1)}`).join("")}${A.includes(e)?"Input":"Change"}`}const f="hidden-form-input";function h(e){return"checked"in e}const m=new WeakMap,E=new WeakSet;function q(e,n){if(p(n.parentElement,"[form]"))return!0;const i="calciteInternalFormComponentRegister";let t=!1;return e.addEventListener(i,a=>{t=a.composedPath().some(s=>E.has(s)),a.stopPropagation()},{once:!0}),n.dispatchEvent(new CustomEvent(i,{bubbles:!0,composed:!0})),t}function F(e,{status:n,message:i,icon:t}){"status"in e&&(e.status=n),"validationIcon"in e&&typeof e.validationIcon!="string"&&(e.validationIcon=t),"validationMessage"in e&&!e.validationMessage&&(e.validationMessage=i)}function y(e){return e.nodeName==="CALCITE-RADIO-BUTTON"?p(e,"calcite-radio-button-group"):e}const S=new CustomEvent("calciteInvalid",{bubbles:!0,composed:!0});function g(e){const n=e?.target,i=n?.validationMessage,t=y(n?.parentElement);if(!t)return;const a=t?.nodeName?.toLowerCase(),s=a?.split("-");if(s.length<2||s[0]!=="calcite")return;e?.preventDefault(),"validity"in t&&(t.validity=n?.validity),t.dispatchEvent(S),F(t,{message:i,icon:!0,status:"invalid"});const c=w(a);t.addEventListener(c,()=>{"status"in t&&(t.status="idle"),"validationIcon"in t&&!t.validationIcon&&(t.validationIcon=!1),"validationMessage"in t&&t.validationMessage===i&&(t.validationMessage=""),"validity"in t&&(t.validity=n?.validity)},{once:!0})}function R(e){const{formEl:n}=e;return n?(n.addEventListener("invalid",g,!0),n.requestSubmit(),n.removeEventListener("invalid",g,!0),requestAnimationFrame(()=>{const i=n.querySelectorAll("[status=invalid]");for(const t of i)if(t?.validationMessage){t?.setFocus();break}}),!0):!1}function T(e){e.formEl?.reset()}function O(e){const{el:n,value:i}=e,t=$(e);if(!t||q(t,n))return;e.formEl=t,e.defaultValue=i,h(e)&&(e.defaultChecked=e.checked);const a=(e.onFormReset||x).bind(e);t.addEventListener("reset",a),m.set(e.el,a),E.add(n)}function $(e){const{el:n,form:i}=e;return i?L(n,{id:i}):p(n,"form")}function x(){if("status"in this&&(this.status="idle"),"validationIcon"in this&&(this.validationIcon=!1),"validationMessage"in this&&(this.validationMessage=""),h(this)){this.checked=this.defaultChecked;return}this.value=this.defaultValue}function P(e){const{el:n,formEl:i}=e;if(!i)return;const t=m.get(n);i.removeEventListener("reset",t),m.delete(n),e.formEl=null,E.delete(n)}const D="calciteInternalHiddenInputInput",k=e=>{e.target.dispatchEvent(new CustomEvent(D,{bubbles:!0}))},b=e=>e.removeEventListener("input",k);function V(e){const{el:n,formEl:i,name:t,value:a}=e,{ownerDocument:s}=n,c=n.querySelectorAll(`input[slot="${f}"]`);if(!i||!t){c.forEach(o=>{b(o),o.remove()});return}const v=Array.isArray(a)?a:[a],l=[],d=new Set;c.forEach(o=>{const r=v.find(C=>C==o.value);r!=null?(d.add(r),I(e,o,r)):l.push(o)});let u;v.forEach(o=>{if(d.has(o))return;let r=l.pop();r||(r=s.createElement("input"),r.slot=f),u||(u=s.createDocumentFragment()),u.append(r),r.addEventListener("input",k),I(e,r,o)}),u&&n.append(u),l.forEach(o=>{b(o),o.remove()})}function I(e,n,i){const{defaultValue:t,disabled:a,form:s,name:c,required:v}=e;n.defaultValue=t,n.disabled=a,n.name=c,n.required=v,n.tabIndex=-1,s?n.setAttribute("form",s):n.removeAttribute("form"),h(e)?(n.checked=e.checked,n.defaultChecked=e.defaultChecked,n.value=e.checked?i||"on":""):n.value=i||"",e.syncHiddenFormInput?.(n);const l=y(e.el);if(l&&"validity"in l)for(const d in{...n?.validity})l.validity[d]=n.validity[d]}const U=({component:e})=>(V(e),M("slot",{name:f}));export{R as D,O as H,$ as I,P as N,U as P,T as V,D as y};
