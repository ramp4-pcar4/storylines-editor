import{c2 as r,cB as i,ch as p,cj as l,ca as c,cm as m,cd as u,c7 as d,c9 as h,cb as b,cc as v}from"./main-Ce-R8kMh.js";const f=["src"],g=r({__name:"snowman",props:{fixture:{type:i,required:!0},message:String},setup(s){const e=s,t=p(),n=p("https://i.imgur.com/p13yknD.png");return l(()=>{setTimeout(()=>{t.value.parentNode.removeChild(t.value),e.fixture.remove()},6e3)}),(a,o)=>(c(),m("div",{class:"absolute top-0 right-0",ref_key:"el",ref:t},[u("img",{style:{width:"250px"},src:n.value,alt:"Snowman",srcset:""},null,8,f)],512))}}),w=r({__name:"appbar-button",setup(s){const e=d("iApi"),t=()=>{e.fixture.add("snowman")};return(n,a)=>{const o=h("appbar-button",!0);return c(),b(o,{onClickFunction:t,tooltip:"⛄"},{default:v(()=>a[0]||(a[0]=[u("span",{class:"block h-24"},"⛄",-1)])),_:1})}}});class _ extends i{added(){this.$iApi.component("snowman-appbar-button",w);const{el:e}=this.mount(g,{app:this.$element,props:{message:"This is a snowman prop.",fixture:this}});this.$vApp.$el.appendChild(e.childNodes[0])}removed(){}}export{_ as default};
