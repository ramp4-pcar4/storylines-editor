import{cB as k}from"./main-BS_S-e9u.js";import{a}from"./fabric-Df28hv38-8AiBkEyC.js";const _=30,C=20,T=16,F=12,P=8,f=32,S=32,G=350,w=20,g="Montserrat, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif";class v extends k{get config(){return this.$iApi.fixture.get("export").config?.legend}async make(r){const n=this.$iApi.geo.layer.allLayersOnMap().filter(o=>!o.isCosmetic);if(n.length===0)return new a.fabric.Group([],{originX:"left"});const t=Math.min(n.length,Math.floor(r.width/(G+w))||1),e=(r.width-(t-1)*w)/t;let i=0;const s=(await Promise.all(this._makeSegments(n,e))).map(({title:o,items:m},c)=>{c>0&&(i+=_),o.top=i,i+=o.height+C;const b=m.map(({title:h,items:u},x)=>{const y=[];return h&&!(m.length===1&&h.text===o.text)&&(x>0&&(i+=T),h.top=i,i+=h.height+F,y.push(h)),u.forEach(p=>{p.top=i,i+=p.height+P}),[...y,...u].filter(p=>p)});return new a.fabric.Group([o,...b.flat()])}).flat(),l=this._makeColumns(s,e,t);return Promise.resolve(l)}_makeColumns(r,n,t){let e=0,i=0,s=0;const l=r[r.length-1].aCoords.bl.y/t;return r.forEach((o,m)=>{const c=m!==r.length-1?r[m+1].top-o.top:o.height,b=s>l*(e+1),h=i!==0&&c>l,u=t-e>r.length-m;(b||h||u)&&e<t&&(++e,i=0),o.left=e*(n+w),o.top=i,i+=c,s+=c}),new a.fabric.Group(r,{originX:"left"})}_makeSegments(r,n){return r.map(async t=>{const e=new a.fabric.Textbox(t.name,{fontSize:24,fontFamily:g,width:n}),i=this._getLayerTreeIds(t);let s=[];return s=t.supportsSublayers?await Promise.all(this._makeSegmentChunks(i,t,n)):await Promise.all(this._makeSegmentChunks([-1],t,n)),{title:e,items:s}})}_makeSegmentChunks(r,n,t){const e=n;return r.map(async i=>{const s=i===-1?e:e.getSublayer(i);if(!s)return{title:new a.fabric.Textbox("ERROR",{fontSize:20,fontFamily:g,width:t}),items:[]};await Promise.all(s.legend.map(c=>c.drawPromise));const l=s.legend,o=new a.fabric.Textbox(s.name,{fontSize:20,fontFamily:g,width:t}),m=await Promise.all(this._makeChunkItems(l,t));return{title:o,items:m}})}_makeChunkItems(r,n){return r.map(async t=>{const e=(await I(a.fabric.loadSVGFromString)(t.svgcode))[0];if(t.esriStandard){e.originY="center",e.top=f/2;const i=new a.fabric.Textbox(t.label,{fontSize:12,fontFamily:g,originY:"center",left:S+20,top:f/2,width:n-S-20});return new a.fabric.Group([e,i],{height:f})}else{const i=new a.fabric.Textbox(t.label,{fontSize:12,fontFamily:g,originY:"center",left:0,top:f/2,width:n}),s=Number(t.imgWidth),l=Number(t.imgHeight),o=Math.min(1,n/s);return e&&(e.originY="center",e.top=l*o/2+f,e.scaleToHeight(l*o),e.scaleToWidth(s*o)),new a.fabric.Group([i,e].filter(Boolean),{height:l*o+f})}})}_getLayerTreeIds(r){const n=[],t=[...r.sublayers];for(;t.length>0;){const e=t.shift();e&&(e.visibility&&n.push(e.layerIdx),t.push(...e.sublayers))}return n}}const I=d=>r=>new Promise(n=>{d(r,t=>{n(t)})});export{v as default};
