import{a as s}from"./fabric-Df28hv38-CALSiefX.js";import{cB as a,fz as n}from"./main-B45ONSYR.js";class x extends a{get config(){return this.$iApi.fixture.get("export").config?.footnote}make(i){const t=this.config,e={text:"RAMP-PCAR",fontFamily:"Montserrat, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",fill:"#000",fontSize:20,top:0};t?.value!==void 0&&(e.text=t.value);const o=n(e,i||{}),r=new s.fabric.Textbox(o.text,o);return Promise.resolve(r)}}export{x as default};
