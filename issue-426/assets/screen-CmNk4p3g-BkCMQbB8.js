import{c2 as C,c6 as L,cs as q,fC as E,c8 as h,c9 as O,cl as M,cn as B,ca as p,cb as z,cc as d,cd as e,cm as S,cx as G,ce as k,cr as g,cf as s,cw as I,c7 as R,ch as f,ga as A,fZ as F,ct as H,ci as K,cj as P,ck as V,fG as W,cg as Z}from"./main-Dph3xG49.js";const D=["onClick","aria-label"],J={class:"md-icon-small inline"},T=C({__name:"settings-button",props:{componentSelectedState:{type:Object,required:!0}},setup(m){const{t:x}=L(),n=q(),i=E(),w=h(()=>n.mobileView?"top-end":"left-end"),a=o=>{o.selectable&&i.toggleSelected({name:o.name})};return(o,c)=>{const b=O("dropdown-menu"),u=M("focus-item");return B((p(),z(b,{position:w.value,tooltip:s(x)("export.menu"),tooltipPlacement:"top"},{header:d(()=>c[0]||(c[0]=[e("div",{class:"flex items-center text-gray-400 w-full h-full hover:text-black p-4 sm:p-8"},[e("svg",{class:"fill-current w-24 h-24 m-auto",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[e("g",null,[e("path",{d:"M0,0h24v24H0V0z",fill:"none"}),e("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})])])],-1)])),default:d(()=>[(p(!0),S(I,null,G(m.componentSelectedState,l=>(p(),S("a",{key:l.name,onClick:y=>a(l),href:"javascript:;",class:k(`text-left text-sm sm:text-base ${l.selectable?"cursor-pointer":"cursor-default"}`),"aria-label":l.name},[e("div",J,[(p(),S("svg",{height:"20",width:"20",viewBox:"0 0 24 24",class:k(`inline mx-8 ${l.selected?"":"invisible"}`)},c[1]||(c[1]=[e("g",null,[e("path",{d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"})],-1)]),2)),e("span",{class:k(`inline ${l.selectable?"":"text-gray-300"}
                    `)},g(s(x)(`export.menu.component.${l.name}`)),3)])],10,D))),128))]),_:1},8,["position","tooltip"])),[[u]])}}}),U={class:"overflow-hidden border border-gray-200",ref:"componentEl"},X={class:"flex"},Y=["aria-label"],N=["aria-label"],ee=C({__name:"screen",props:{panel:{type:Object,required:!0}},setup(m){const x=m,{t:n}=L(),i=R("iApi"),w=E(),a=f(),o=f(void 0),c=f(void 0),b=f([]),u=A("componentEl"),l=h(()=>w.componentSelectedState),y=h(()=>{let r={};return a.value&&Object.keys(l.value).forEach(t=>{r[t]={name:t,selected:l.value[t]??!1,selectable:(a.value?.config)[t]?.selectable??!0}}),r}),$=h(()=>!!a.value?.customRendererFunc),v=F(300,()=>{if(!a.value||!u.value)return;const r=u.value.querySelector(".export-canvas");a.value.make(r,u.value.clientWidth)});return H(()=>{x.panel.exportMake=v,b.value.push(K(y,()=>{v()}))}),P(()=>{a.value=i.fixture.get("export"),o.value=new ResizeObserver(v),c.value=new ResizeObserver(v),o.value.observe(i.$rootEl),c.value.observe(i.$rootEl.querySelector('[data-cy="export"]'))}),V(()=>{o.value.disconnect(),c.value.disconnect(),b.value.forEach(r=>r())}),(r,t)=>{const _=O("panel-screen");return p(),z(_,{panel:m.panel,footer:!0},{header:d(()=>[W(g(s(n)("export.title")),1)]),content:d(()=>[e("div",U,t[2]||(t[2]=[e("canvas",{class:"export-canvas !w-[100%]"},null,-1)]),512)]),footer:d(()=>[e("div",X,[e("button",{type:"button",onClick:t[0]||(t[0]=j=>a.value?.export()),class:"bg-green-700 hover:bg-green-800 text-white font-bold py-8 px-4 sm:px-16 mr-8 sm:mr-16","aria-label":s(n)("export.download")},g(s(n)("export.download")),9,Y),e("button",{type:"button",onClick:t[1]||(t[1]=j=>s(v)()),class:"py-8 px-4 sm:px-16","aria-label":s(n)("export.refresh")},g(s(n)("export.refresh")),9,N),$.value?Z("",!0):(p(),z(T,{key:0,componentSelectedState:y.value,class:"ml-auto flex px-4 sm:px-8"},null,8,["componentSelectedState"]))])]),_:1},8,["panel"])}}});export{ee as default};
