import{c2 as p,c3 as d,g6 as i,c6 as h,c7 as u,ch as v,c8 as g,cj as $,c4 as m,ck as f,ca as A,cm as w,cd as b,cr as _,cf as C,cB as E}from"./main-Dph3xG49.js";const y={en:{"scrollguard.instructions":"Use ctrl + scroll to zoom the map"},fr:{"scrollguard.instructions":"Utilisez les touches Ctrl et + pour faire un zoom de la carte"}},L={class:"sg-label"},q=p({__name:"map-scrollguard",setup(c){const e=i(),{t:r}=h(),s=u("iApi"),t=v(),o=g(()=>e.enabled);$(()=>{s.$vApp.$el.querySelector(".inner-shell + .esri-view")?.addEventListener("wheel",l,{capture:!0}),s.event.on(m.MAP_CREATED,()=>{s.$vApp.$el.querySelector(".inner-shell + .esri-view")?.addEventListener("wheel",l,{capture:!0})})}),f(()=>{s.$vApp.$el.querySelector(".inner-shell + .esri-view")?.removeEventListener("wheel",l,{capture:!0})});const l=n=>{if(!o.value)return;const a=t.value.classList;n.ctrlKey?(a.remove("sg-active"),a.add("sg-scrolling")):(n.stopPropagation(),a.remove("sg-scrolling"),a.add("sg-active"),window.setTimeout(()=>a.remove("sg-active"),2e3))};return(n,a)=>(A(),w("div",{class:"sg",ref_key:"scrollGuard",ref:t},[b("p",L,_(C(r)("scrollguard.instructions")),1)],512))}}),x=d(q,[["__scopeId","data-v-bf6386a4"]]);class z extends E{setEnabled(e){i(this.$vApp.$pinia).enabled=e}_parseConfig(e){i(this.$vApp.$pinia).enabled=e?.enabled||!1}get config(){return super.config}}class S extends z{added(){Object.entries(y).forEach(t=>this.$iApi.$i18n.mergeLocaleMessage(...t)),this._parseConfig(this.config);const e=this.$vApp.$watch(()=>this.config,t=>this._parseConfig(t)),{destroy:r,el:s}=this.mount(x,{app:this.$element});this.$vApp.$el.getElementsByClassName("inner-shell")[0].appendChild(s.childNodes[0]),this.removed=()=>{e(),r(),i(this.$vApp.$pinia).$reset()}}}export{S as default};
