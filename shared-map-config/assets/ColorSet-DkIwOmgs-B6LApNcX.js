import{E as c,a8 as h}from"./Theme-rblUnB2V-DtOsHuBt.js";class u extends c{_afterNew(){super._afterNewApplyThemes(),this._dirty.colors=!1}_beforeChanged(){this.isDirty("colors")&&this.reset()}generateColors(){this.setPrivate("currentPass",this.getPrivate("currentPass",0)+1);const e=this.getPrivate("currentPass"),t=this.get("colors",[this.get("baseColor",h.fromHex(16711680))]);this.getPrivate("numColors")||this.setPrivate("numColors",t.length);const r=this.getPrivate("numColors"),g=0,a=this.get("passOptions"),P=this.get("reuse");for(let i=g;i<r;i++)if(P)t.push(t[i]);else{const o=t[i].toHSL();let n=o.h+(a.hue||0)*e;for(;n>1;)n-=1;let s=o.s+(a.saturation||0)*e;s>1&&(s=1),s<0&&(s=0);let l=o.l+(a.lightness||0)*e;for(;l>1;)l-=1;t.push(h.fromHSL(n,s,l))}}getIndex(e){const t=this.get("colors",[]),r=this.get("saturation");return e>=t.length?(this.generateColors(),this.getIndex(e)):r!=null?h.saturate(t[e],r):t[e]}next(){let e=this.getPrivate("currentStep",this.get("startIndex",0));return this.setPrivate("currentStep",e+this.get("step",1)),this.getIndex(e)}reset(){this.setPrivate("currentStep",this.get("startIndex",0)),this.setPrivate("currentPass",0)}}Object.defineProperty(u,"className",{enumerable:!0,configurable:!0,writable:!0,value:"ColorSet"}),Object.defineProperty(u,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:c.classNames.concat([u.className])});export{u as i};
