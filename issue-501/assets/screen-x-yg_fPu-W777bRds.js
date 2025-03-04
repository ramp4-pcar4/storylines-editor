import{c2 as C,c3 as T,c6 as H,cl as V,ca as d,cm as g,cd as s,cn as k,cf as r,cr as L,ce as q,cz as A,cc as S,co as B,gt as G,cg as R,c7 as K,fJ as J,c8 as P,ch as x,ct as U,ci as W,ck as Z,c9 as D,cb as O,fG as F,gh as N,gu as Q,gc as X,gb as Y,cx as ee,cw as ne,g8 as ae}from"./main-BLGVPR4E.js";import{u as $}from"./marked.esm-DgqJBp_S-CCvGNfAT.js";const te={key:0},le=["content"],se={class:"text-lg text-left flex-grow"},oe=["innerHTML"],ce=C({__name:"section",props:{helpSection:{type:Object,required:!0}},setup(c){const{t:w}=H();return(b,o)=>{const u=V("tippy");return c.helpSection.drawn?(d(),g("div",te,[s("div",null,[k((d(),g("button",{type:"button",class:"help-section-header flex items-center py-15 px-25 hover:bg-gray-200 cursor-pointer select-none w-full",onClick:o[0]||(o[0]=p=>b.$emit("expand")),content:r(w)(c.helpSection.expanded?"help.section.collapse":"help.section.expand")},[s("span",se,L(c.helpSection.header),1),s("div",{class:q(["dropdown-icon",{"transform -rotate-180":c.helpSection.expanded}])},o[1]||(o[1]=[s("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24"},[s("path",{d:"M0 0h24v24H0V0z",fill:"none"}),s("path",{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"})],-1)]),2)],8,le)),[[u,{placement:"top-end",hideOnClick:!1}]]),A(G,{name:"help-item",mode:"out-in"},{default:S(()=>[k(s("div",{innerHTML:c.helpSection.info,class:"ramp-markdown section-body px-20 pt-5 ml-10 overflow-hidden"},null,8,oe),[[B,c.helpSection.expanded]])]),_:1})])])):R("",!0)}}}),re=T(ce,[["__scopeId","data-v-7dc61532"]]),pe={class:"h-26 mb-8 mx-8"},ie=["placeholder","aria-label"],de={key:0},fe=C({__name:"screen",props:{panel:{type:Object,required:!0}},setup(c){const w=K("iApi"),b=J(),{t:o}=H(),u=P(()=>b.location),p=x([]),y=x([]),_=x([]),E=x(!1);let h,f;function j(e,t){const n=t.info.split(/(<[^>]*>)/);for(const[a,l]of n.entries())if(a%2===0&&l.toLowerCase().indexOf(e.toLowerCase())>-1)return!0;return!1}function z(e,t){const n=y.value[t].split(/(<[^>]*>)/);let a="";for(const[l,i]of n.entries())l%2===0?a+=i.replace(new RegExp(e,"gi"),m=>`<mark>${m}</mark>`):a+=i;p.value[t].info=a}function I(e,t){h=0,t.forEach((n,a)=>{n.info=y.value[a],n.drawn=j(e,n)||n.header.toLowerCase().indexOf(e.toLowerCase())>-1,h=n.drawn?h+1:h,n.expanded=n.drawn&&e.length>2,n.drawn&&e.length>2&&z(e,a)}),E.value=h===0}function M(e){e.expanded=!e.expanded}return U(()=>{_.value.push(W(()=>w.language,(e,t)=>{if(e===t)return;const n=new $.Renderer,a=u.value.slice(-1)==="/"?u.value:`${u.value}/`;n.image=(l,i,m)=>(l.indexOf("http")===-1&&(l=`${a}images/`+l),`<img src="${l}" alt="${m}">`),ae.get(`${a}${e}.md`).then(l=>{const i=/^#\s(.*)\n{2}(?:.+|\n(?!\n{2,}))*/gm;let m=l.data.replace(new RegExp("\r","g"),"");p.value=[];let v;for(;v=i.exec(m);)p.value.push({header:v[1],info:$(v[0].split(`
`).splice(2).join(`
`),{renderer:n}),drawn:!0,expanded:!1}),y.value.push($(v[0].split(`
`).splice(2).join(`
`),{renderer:n}))})},{immediate:!0}))}),Z(()=>{_.value.forEach(e=>e())}),(e,t)=>{const n=D("panel-screen");return d(),O(n,{panel:c.panel},{header:S(()=>[F(L(r(o)("help.title")),1)]),content:S(()=>[s("div",pe,[k(s("input",{type:"search",class:"rv-help-search-bar border-b w-full text-base py-8 outline-none focus:shadow-outline border-gray-600 h-full min-w-0",placeholder:r(o)("help.search"),"onUpdate:modelValue":t[0]||(t[0]=a=>Q(f)?f.value=a:f=a),"aria-label":r(o)("help.search"),onInput:t[1]||(t[1]=a=>I(r(f),p.value)),onKeypress:t[2]||(t[2]=X(Y(()=>{},["prevent"]),["enter"])),enterkeyhint:"done"},null,40,ie),[[N,r(f)]])]),E.value?(d(),g("div",de,[s("p",null,L(r(o)("help.noResults")),1)])):R("",!0),(d(!0),g(ne,null,ee(p.value,(a,l)=>(d(),O(re,{helpSection:a,key:l,onExpand:i=>M(a)},null,8,["helpSection","onExpand"]))),128))]),_:1},8,["panel"])}}});export{fe as default};
