import{cF as p}from"./main-CBEjgtGo.js";const s="__begin__",l="__end__",u=new RegExp(s,"ig"),c=new RegExp(l,"ig"),t=new RegExp("^"+s,"i"),o=new RegExp(l+"$","i"),r='"',x=r+" + ",f=" + "+r;function g(n){return n.replaceAll(new RegExp("\\[","g"),"{").replaceAll(new RegExp("\\]","g"),"}")}function y(n){return n.replaceAll(new RegExp("\\{","g"),"[").replaceAll(new RegExp("\\}","g"),"]")}function i(n){const e={expression:"",type:"none"};return n.labelExpressionInfo?n.labelExpressionInfo.value?(e.expression=n.labelExpressionInfo.value,e.type="conventional"):n.labelExpressionInfo.expression&&(e.expression=n.labelExpressionInfo.expression,e.type="arcade"):n.labelExpression!=null&&(e.expression=g(n.labelExpression),e.type="conventional"),e}function A(n){const e=i(n);if(!e)return null;switch(e.type){case"conventional":return E(e.expression);case"arcade":return e.expression}return null}function I(n){const e=i(n);if(!e)return null;switch(e.type){case"conventional":return $(e.expression);case"arcade":return _(e.expression)}return null}function E(n){let e;return n?(e=p(n,a=>s+'$feature["'+a+'"]'+l),e=t.test(e)?e.replace(t,""):r+e,e=o.test(e)?e.replace(o,""):e+r,e=e.replaceAll(u,x).replaceAll(c,f)):e='""',e}const w=/^\s*\{([^}]+)\}\s*$/i;function $(n){return n?.match(w)?.[1].trim()||null}const b=/^\s*(?:(?:\$feature\.(\w+))|(?:\$feature\[(["'])(.+)(\2)\]));?\s*$/i,m=/^\s*(?:(?:\$feature\.(\w+))|(?:\$feature\[(["'])(.+)(\2)\]));?\s*(?:DomainName\(\s*\$feature\s*,\s*(["'])(\1|\3)(\5)\s*\));?\s*$/i,R=/^\s*(?:DomainName\(\s*\$feature\s*,\s*(["'])(.+)(\1)\s*\));?\s*$/i;function _(n){if(!n)return null;let e=b.exec(n)||m.exec(n);return e?e[1]||e[3]:(e=R.exec(n),e?e[2]:null)}export{y as $,A as b,g as i,I as m,E as p,i as t,_ as u};
