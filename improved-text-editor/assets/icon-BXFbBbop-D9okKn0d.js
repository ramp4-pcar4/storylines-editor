import{p as m,b as v,a as l,D as x,c as g,M as y}from"./themeUtils-YjM7iIiX-YkPJoPxT.js";import{p as w,A as z}from"./dom-N58V0tYi-DBU3jlah.js";import{c as D}from"./observers-BigwqTsw-s9WA8-jz.js";const k={icon:"icon",flipRtl:"flip-rtl"},p={},h={},b={s:16,m:24,l:32};function d({icon:t,scale:i}){const s=b[i],e=I(t),n=e.charAt(e.length-1)==="F";return`${n?e.substring(0,e.length-1):e}${s}${n?"F":""}`}async function $(t){const i=d(t),s=u(i);if(s)return s;h[i]||(h[i]=fetch(y(`./assets/icon/${i}.json`)).then(n=>n.json()).catch(()=>(console.error(`"${i}" is not a valid calcite-ui-icon name`),"")));const e=await h[i];return p[i]=e,e}function O(t){return u(d(t))}function u(t){return p[t]}function I(t){const i=!isNaN(Number(t.charAt(0))),s=t.split("-");if(s.length>0){const e=/[a-z]/i;t=s.map((n,r)=>n.replace(e,function(c,a){return r===0&&a===0?c:c.toUpperCase()})).join("")}return i?`i${t}`:t}const P=":host{display:inline-flex;color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}",C=P,E=m(class extends v{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.icon=null,this.flipRtl=!1,this.scale="m",this.textLabel=void 0,this.pathData=void 0,this.visible=!1}connectedCallback(){this.visible||this.waitUntilVisible(()=>{this.visible=!0,this.loadIconPathData()})}disconnectedCallback(){this.intersectionObserver?.disconnect(),this.intersectionObserver=null}render(){const{el:t,flipRtl:i,pathData:s,scale:e,textLabel:n}=this,r=w(t),c=b[e],a=!!n,f=[].concat(s||"");return l(x,{key:"724265acdc6fb528bf7b25d7ec445c73a63f4c8e","aria-hidden":z(!a),"aria-label":a?n:null,role:a?"img":null},l("svg",{key:"864ee2d80bebd282543ba5d94c57f84b48a6204d","aria-hidden":"true",class:{[k.flipRtl]:r==="rtl"&&i,svg:!0},fill:"currentColor",height:"100%",viewBox:`0 0 ${c} ${c}`,width:"100%",xmlns:"http://www.w3.org/2000/svg"},f.map(o=>typeof o=="string"?l("path",{d:o}):l("path",{d:o.d,opacity:"opacity"in o?o.opacity:1}))))}async loadIconPathData(){const{icon:t,scale:i,visible:s}=this;if(!g()||!t||!s)return;const e={icon:t,scale:i},n=O(e)||await $(e);t===this.icon&&(this.pathData=n)}waitUntilVisible(t){if(this.intersectionObserver=D("intersection",i=>{i.forEach(s=>{s.isIntersecting&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null,t())})},{rootMargin:"50px"}),!this.intersectionObserver){t();return}this.intersectionObserver.observe(this.el)}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{icon:["loadIconPathData"],scale:["loadIconPathData"]}}static get style(){return C}},[1,"calcite-icon",{icon:[513],flipRtl:[516,"flip-rtl"],scale:[513],textLabel:[1,"text-label"],pathData:[32],visible:[32]},void 0,{icon:["loadIconPathData"],scale:["loadIconPathData"]}]);function R(){typeof customElements>"u"||["calcite-icon"].forEach(t=>{switch(t){case"calcite-icon":customElements.get(t)||customElements.define(t,E);break}})}R();export{E as f,R as m};
