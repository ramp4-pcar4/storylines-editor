import{c2 as w,c3 as E,cB as y,c6 as _,c7 as M,ch as h,fY as m,cj as T,c4 as r,ck as A,ca as x,cm as R,cd as I,cr as P,cf as $}from"./main-Cs_aiUdl.js";const D={en:{"panguard.instructions":"Use two fingers to pan the map"},fr:{"panguard.instructions":"Utilisez deux doigts pour faire un panoramique de la carte"}},L={class:"pg-label"},S=w({__name:"map-panguard",setup(v){const{t:p}=_(),t=M("iApi"),s=h(),c=h(-1),o=m([]),n=m([]);T(()=>{u(),n.push(t.event.on(r.MAP_CREATED,()=>{u()})),n.push(t.event.on(r.MAP_DESTROYED,()=>{o.forEach(e=>e.remove())})),n.push(t.event.on(r.MAP_REFRESH_START,()=>{o.forEach(e=>e.remove())})),n.push(t.event.on(r.MAP_REFRESH_END,()=>{u()}))}),A(()=>{n.forEach(e=>t.event.off(e)),o.forEach(e=>e.remove())});const u=()=>{const e=new Map;t.geo.map.viewPromise.then(()=>{o.push(t.geo.map.esriView.on("pointer-down",a=>{a.pointerType==="touch"&&e.set(a.pointerId,{x:a.x,y:a.y})})),o.push(t.geo.map.esriView.on(["pointer-up","pointer-leave"],a=>{a.pointerType==="touch"&&window.setTimeout(()=>{e.delete(a.pointerId)},200)})),o.push(t.geo.map.esriView.on("pointer-move",a=>{const{pointerId:f,pointerType:g,x:d,y:l}=a,i=e.get(f);if(!i||g!=="touch"||e.size!==1){s.value.classList.remove("pg-active");return}Math.sqrt(Math.pow(d-i.x,2)+Math.pow(l-i.y,2))<20||(s.value.classList.add("pg-active"),c.value!==-1&&clearTimeout(c.value),c.value=window.setTimeout(()=>{s.value.classList.remove("pg-active")},2e3),window.scrollBy(i.x-d,i.y-l))}))})};return(e,a)=>(x(),R("div",{class:"pg",ref_key:"panGuard",ref:s},[I("p",L,P($(p)("panguard.instructions")),1)],512))}}),C=E(S,[["__scopeId","data-v-e91f9000"]]);class b extends y{added(){Object.entries(D).forEach(s=>this.$iApi.$i18n.mergeLocaleMessage(...s));const{destroy:p,el:t}=this.mount(C,{app:this.$element});this.$vApp.$el.getElementsByClassName("inner-shell")[0].appendChild(t.childNodes[0]),this.removed=()=>{p()}}}export{b as default};
