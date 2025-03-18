import{c2 as C,c3 as _,ch as k,fY as B,ci as T,gz as H,ck as M,ca as x,cm as V,cd as f,fG as N,cr as z,cb as A,gc as w,gb as D,cf as E,gA as m,c8 as O,cn as I,co as K,ce as S,cp as W,cg as G,gB as Y}from"./main-CBEjgtGo.js";var j={name:"Toggle",emits:["input","update:modelValue","change"],props:{value:{validator:function(l){return n=>["number","string","boolean"].indexOf(typeof n)!==-1||n==null},required:!1},modelValue:{validator:function(l){return n=>["number","string","boolean"].indexOf(typeof n)!==-1||n==null},required:!1},id:{type:[String,Number],required:!1,default:"toggle"},name:{type:[String,Number],required:!1,default:"toggle"},disabled:{type:Boolean,required:!1,default:!1},required:{type:Boolean,required:!1,default:!1},falseValue:{type:[String,Number,Boolean],required:!1,default:!1},trueValue:{type:[String,Number,Boolean],required:!1,default:!0},onLabel:{type:[String,Object],required:!1,default:""},offLabel:{type:[String,Object],required:!1,default:""},classes:{type:Object,required:!1,default:()=>({})},labelledby:{type:String,required:!1},describedby:{type:String,required:!1},aria:{required:!1,type:Object,default:()=>({})}},setup(l,n){const t=function(d,s,u){const{value:i,modelValue:r,falseValue:a,trueValue:e,disabled:b}=m(d),o=r&&r.value!==void 0?r:i,h=O(()=>o.value===e.value),y=p=>{s.emit("input",p),s.emit("update:modelValue",p),s.emit("change",p)},q=()=>{y(e.value)},L=()=>{y(a.value)};return[null,void 0,!1,0,"0","off"].indexOf(o.value)!==-1&&[a.value,e.value].indexOf(o.value)===-1&&L(),[!0,1,"1","on"].indexOf(o.value)!==-1&&[a.value,e.value].indexOf(o.value)===-1&&q(),{externalValue:o,checked:h,update:y,check:q,uncheck:L,handleInput:p=>{y(p.target.checked?e.value:a.value)},handleClick:()=>{b.value||(h.value?L():q())}}}(l,n),g=function(d,s,u){const{trueValue:i,falseValue:r,onLabel:a,offLabel:e}=m(d),b=u.checked,o=u.update;return{label:O(()=>{let h=b.value?a.value:e.value;return h||(h="&nbsp;"),h}),toggle:()=>{o(b.value?r.value:i.value)},on:()=>{o(i.value)},off:()=>{o(r.value)}}}(l,0,{checked:t.checked,update:t.update}),c=function(d,s,u){const i=m(d),r=i.disabled,a=u.checked,e=O(()=>({container:"toggle-container",toggle:"toggle",toggleOn:"toggle-on",toggleOff:"toggle-off",toggleOnDisabled:"toggle-on-disabled",toggleOffDisabled:"toggle-off-disabled",handle:"toggle-handle",handleOn:"toggle-handle-on",handleOff:"toggle-handle-off",handleOnDisabled:"toggle-handle-on-disabled",handleOffDisabled:"toggle-handle-off-disabled",label:"toggle-label",...i.classes.value}));return{classList:O(()=>({container:e.value.container,toggle:[e.value.toggle,r.value?a.value?e.value.toggleOnDisabled:e.value.toggleOffDisabled:a.value?e.value.toggleOn:e.value.toggleOff],handle:[e.value.handle,r.value?a.value?e.value.handleOnDisabled:e.value.handleOffDisabled:a.value?e.value.handleOn:e.value.handleOff],label:e.value.label}))}}(l,0,{checked:t.checked}),v=function(d,s,u){const{disabled:i}=m(d),r=u.check,a=u.uncheck,e=u.checked;return{handleSpace:()=>{i.value||(e.value?a():r())}}}(l,0,{check:t.check,uncheck:t.uncheck,checked:t.checked});return{...t,...c,...g,...v}}};const $=["tabindex","aria-checked","aria-describedby","aria-labelledby"],F=["id","name","value","checked","disabled"],J=["innerHTML"],P=["checked"];j.render=function(l,n,t,g,c,v){return x(),V("div",Y({class:l.classList.container,tabindex:t.disabled?void 0:0,"aria-checked":l.checked,"aria-describedby":t.describedby,"aria-labelledby":t.labelledby,role:"switch"},t.aria,{onKeypress:n[1]||(n[1]=w(D((...d)=>l.handleSpace&&l.handleSpace(...d),["prevent"]),["space"]))}),[I(f("input",{type:"checkbox",id:t.id,name:t.name,value:t.trueValue,checked:l.checked,disabled:t.disabled},null,8,F),[[K,!1]]),f("div",{class:S(l.classList.toggle),onClick:n[0]||(n[0]=(...d)=>l.handleClick&&l.handleClick(...d))},[f("span",{class:S(l.classList.handle)},null,2),W(l.$slots,"label",{checked:l.checked,classList:l.classList},()=>[f("span",{class:S(l.classList.label),innerHTML:l.label},null,10,J)]),t.required?(x(),V("input",{key:0,type:"checkbox",style:{appearance:"none",height:"1px",margin:"0",padding:"0",fontSize:"0",background:"transparent",position:"absolute",width:"100%",bottom:"0",outline:"none"},checked:l.checked,"aria-hidden":"true",tabindex:"-1",required:""},null,8,P)):G("v-if",!0)],2)],16,$)},j.__file="src/Toggle.vue";const R={class:"flex flex-row rv-label"},U={class:"flex items-center"},X=["innerHTML"],Z=C({__name:"toggle-switch-control",props:{config:{type:Object,required:!0},name:String,icon:String,ariaLabel:String},emits:["toggled"],setup(l,{emit:n}){const t=n,g=l,c=k(g.config.value),v=k(!!g.config.disabled),d=k(0),s=B([]),u=k(null);s.push(T(H(g,"config"),(a,e)=>{c.value=a.value,v.value=!!a.disabled,d.value+=v.value!==e.disabled?1:0},{deep:!0}),T(u,a=>{a&&r()}));const i=()=>{v.value||(c.value=!c.value,t("toggled",c.value))},r=()=>{if(u.value){const a=u.value.querySelector('input[type="checkbox"]');a&&g.ariaLabel&&a.setAttribute("aria-label",g.ariaLabel)}};return M(()=>{s.forEach(a=>a())}),(a,e)=>(x(),V("div",R,[f("div",U,[f("div",{innerHTML:l.icon,class:"p-8 pl-0"},null,8,X),N(" "+z(l.name),1)]),e[2]||(e[2]=f("div",{class:"flex-1"},null,-1)),f("div",{ref_key:"toggleWrapper",ref:u},[(x(),A(E(j),{onChange:e[0]||(e[0]=b=>t("toggled",b)),onKeyupCapture:[w(D(i,["stop"]),["enter"]),w(D(i,["stop"]),["space"])],disabled:v.value,key:d.value,modelValue:c.value,"onUpdate:modelValue":e[1]||(e[1]=b=>c.value=b),classes:{container:"inline-block rounded-full outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-30",toggle:"flex w-40 h-15 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none",toggleOn:"bg-blue-500 border-blue-500 justify-start text-white",toggleOff:"bg-gray-200 border-gray-200 justify-end text-gray-700",toggleOnDisabled:"bg-gray-300 border-gray-300 justify-start text-gray-400 cursor-not-allowed",toggleOffDisabled:"bg-gray-200 border-gray-200 justify-end text-gray-400 cursor-not-allowed",handle:"inline-block bg-white w-15 h-15 top-0 rounded-full absolute transition-all",handleOn:"left-full transform -translate-x-full",handleOff:"left-0",handleOnDisabled:"bg-gray-100 left-full transform -translate-x-full",handleOffDisabled:"bg-gray-100 left-0",label:"text-center w-8 border-box whitespace-nowrap select-none"}},null,8,["onKeyupCapture","disabled","modelValue"]))],512)]))}}),ee=_(Z,[["__scopeId","data-v-188debd2"]]);export{ee as Z};
