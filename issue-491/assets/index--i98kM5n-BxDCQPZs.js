import{a as o}from"./fabric-Df28hv38-C-J1DhvU.js";import{cB as s}from"./main-ljaACljU.js";class p extends s{get config(){return this.$iApi.fixture.get("export").config?.map}async make(t){const e=await this.$iApi.geo.map.takeScreenshot({quality:1,format:"png"}),a=new Image;a.src=e.dataUrl;const r=await new Promise(i=>a.onload=()=>i(a));return new o.fabric.Image(r,t)}}export{p as default};
