import{c2 as l,c6 as b,c9 as g,ca as i,cb as u,cc as s,fG as o,cr as r,cf as f,cd as n}from"./main-Csa2lEpO.js";const h={class:"flex flex-row justify-center items-center mt-16"},m={class:"mt-16"},y=l({__name:"p2-screen-1",props:{panel:{type:Object,required:!0},greeting:{type:String}},setup(t){const{t:c}=b();return(d,e)=>{const a=g("panel-screen");return i(),u(a,{panel:t.panel},{header:s(()=>e[2]||(e[2]=[o(" Gazebo/Panel 2/Screen A ")])),content:s(()=>[o(r(f(c)("gz.hello"))+" ",1),n("div",h,[n("button",{type:"button",onClick:e[0]||(e[0]=p=>t.panel.show({screen:"p-2-screen-2",props:{greeting:"Howdy?"}})),class:"bg-green-500 hover:bg-green-700 text-white font-bold py-8 px-16 m-2"}," Go back to B "),n("button",{type:"button",onClick:e[1]||(e[1]=p=>t.panel.show("p-2-screen-3")),class:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-16 m-2"}," Go to C ")]),n("p",m,r(t.greeting),1)]),_:1},8,["panel"])}}});export{y as default};
