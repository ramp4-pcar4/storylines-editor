import{c as i}from"./themeUtils-YjM7iIiX-CJEhVFfs.js";function a(t,n,o){if(!i())return;const e=c(t);return new e(n,o)}function c(t){class n extends window.MutationObserver{constructor(e){super(e),this.observedEntry=[],this.callback=e}observe(e,r){return this.observedEntry.push({target:e,options:r}),super.observe(e,r)}unobserve(e){const r=this.observedEntry.filter(s=>s.target!==e);this.observedEntry=[],this.callback(super.takeRecords(),this),this.disconnect(),r.forEach(s=>this.observe(s.target,s.options))}}return function(){return t==="intersection"?window.IntersectionObserver:t==="mutation"?n:window.ResizeObserver}()}export{a as c};
