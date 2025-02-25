import{c2 as k,fQ as I,c6 as M,c7 as _,c8 as A,c9 as E,cl as G,ca as p,cm as v,cd as e,cn as n,co as c,cf as a,cz as m,cc as o,cr as d,c3 as H,c4 as w}from"./main-PWjwnDMV.js";const P={class:"relative legend-header flex align-middle"},j=["content","aria-label"],B=["content","aria-label"],R=k({__name:"header",setup(L){const x=I(),{t:l}=M(),s=_("iApi"),r=A(()=>s.fixture.get("legend")),b=()=>{s.event.emit(w.WIZARD_TOGGLE)},y=()=>{try{return s.fixture.exists("wizard")}catch{return!1}},z=()=>{s.event.emit(w.REORDER_TOGGLE)},C=()=>{try{return s.fixture.exists("layer-reorder")}catch{return!1}},i=u=>x.headerControls.includes(u);return(u,t)=>{const g=E("dropdown-menu"),f=G("tippy");return p(),v("div",P,[e("div",null,[n((p(),v("button",{type:"button",onClick:b,class:"relative mr-auto text-gray-500 hover:text-black",content:a(l)("legend.header.addlayer"),"aria-label":a(l)("legend.header.addlayer")},t[4]||(t[4]=[e("div",{class:"p-8"},[e("svg",{class:"fill-current w-18 h-18 flip",viewBox:"0 0 24 24"},[e("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})])],-1)]),8,j)),[[c,y()&&i("wizard")],[f,{placement:"right"}]])]),e("div",null,[n((p(),v("button",{type:"button",onClick:z,class:"relative mr-auto text-gray-500 hover:text-black flex justify-center items-center",content:a(l)("legend.header.reorderlayers"),"aria-label":a(l)("legend.header.reorderlayers")},t[5]||(t[5]=[e("div",{class:"p-8"},[e("svg",{class:"fill-current w-18 h-18 flip",viewBox:"0 0 24 24"},[e("path",{d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"})])],-1)]),8,B)),[[c,C()&&i("layerReorder")],[f,{placement:"right"}]])]),t[8]||(t[8]=e("span",{class:"flex-1"},null,-1)),n(m(g,{class:"relative",position:"left-start",tooltip:a(l)("legend.header.groups"),tooltipPlacement:"left-start",tooltipPlacementAlt:"bottom-end"},{header:o(()=>t[6]||(t[6]=[e("div",{class:"p-8"},[e("svg",{class:"fill-current w-18 h-18",viewBox:"0 0 24 24"},[e("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})])],-1)])),default:o(()=>[e("a",{href:"javascript:;",class:"flex leading-snug items-center overflow-hidden whitespace-nowrap",onClick:t[0]||(t[0]=h=>r.value.expandItems(!0))},d(a(l)("legend.header.groups.expand")),1),e("a",{href:"javascript:;",class:"flex leading-snug items-center overflow-hidden whitespace-nowrap",onClick:t[1]||(t[1]=h=>r.value.expandItems(!1))},d(a(l)("legend.header.groups.collapse")),1)]),_:1},8,["tooltip"]),[[c,i("groupToggle")]]),n(m(g,{class:"relative",position:"left-start",tooltip:a(l)("legend.header.visible"),tooltipPlacement:"left-start",tooltipPlacementAlt:"bottom-end"},{header:o(()=>t[7]||(t[7]=[e("div",{class:"flex p-8"},[e("svg",{class:"fill-current w-18 h-18",viewBox:"0 0 24 24"},[e("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"})])],-1)])),default:o(()=>[e("a",{href:"javascript:;",class:"flex leading-snug items-center overflow-hidden whitespace-nowrap",onClick:t[2]||(t[2]=h=>r.value.showItems(!0))},d(a(l)("legend.header.visible.show")),1),e("a",{href:"javascript:;",class:"flex leading-snug items-center overflow-hidden whitespace-nowrap",onClick:t[3]||(t[3]=h=>r.value.showItems(!1))},d(a(l)("legend.header.visible.hide")),1)]),_:1},8,["tooltip"]),[[c,i("visibilityToggle")]])])}}}),O=H(R,[["__scopeId","data-v-e8031c30"]]);export{O as default};
