import{J as o,hi as k,e3 as d,e4 as u,e1 as C,hj as l,hk as p}from"./main-CJueYQxD.js";const h=new o(k),e=new o(d),n=new o(u),U=new o(C);function g(t){const r=c.get(t);if(r)return r;let s=h;if(t)if(t===e)s=e;else if(t===n)s=n;else{const a=t.wkid,i=t.latestWkid;if(a!=null||i!=null)l(a)||l(i)?s=e:(p(a)||p(i))&&(s=n);else{const w=t.wkt2??t.wkt;if(w){const f=w.toUpperCase();f===m?s=e:f===x&&(s=n)}}}return c.set(t,s),s}const c=new Map,m=e.wkt.toUpperCase(),x=n.wkt.toUpperCase();export{U as m,g as x};
