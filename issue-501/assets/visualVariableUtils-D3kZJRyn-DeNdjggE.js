import{bi as N,a1 as k,ar as M}from"./main-BLGVPR4E.js";import{t as T}from"./compilerUtils-CV1QYWI8-B_s0Ccxq.js";import{m as U}from"./lengthUtils-DKpMe5qR-uhxHoVhy.js";import{i as x,n as S,s as y,r as q}from"./sizeVariableUtils-t52KcLLi-D0hbQF8b.js";const R=()=>k.getLogger("esri.renderers.visualVariables.support.visualVariableUtils"),w=n=>R().warn(`The visualVariable should be an instance of esri.renderers.visualVariables.${n}`),F=()=>R().error("Use of arcade expressions requires an arcade context");new N;const g=Math.PI,_=/^\s*(return\s+)?\$view\.scale\s*(;)?\s*$/i;function G(n,a,t){const e="visualVariables"in n&&n.visualVariables?n.visualVariables.find(r=>r.type==="color"):n;if(!e)return;if(e.declaredClass!=="esri.renderers.visualVariables.ColorVariable")return void w("ColorVariable");const i=typeof a=="number",s=i?null:a,l=s?.attributes;let o=i?a:null;const c=e.field,{ipData:b,hasExpression:p}=e.cache;let u=e.cache.compiledFunc;if(!c&&!p){const r=e.stops;return r&&r[0]&&r[0].color}if(typeof o!="number")if(p){if(t?.arcade==null)return void F();const r={viewingMode:t.viewingMode,scale:t.scale,spatialReference:t.spatialReference},f=t.arcade.arcadeUtils,v=f.getViewInfo(r),h=f.createExecContext(s,v,t.timeZone);if(!u){const z=f.createSyntaxTree(e.valueExpression);u=f.createFunction(z),e.cache.compiledFunc=u}o=f.executeFunction(u,h)}else l&&(o=l[c]);const d=e.normalizationField,m=l!=null&&d!=null?parseFloat(l[d]):void 0;if(o!=null&&(!d||i||!isNaN(m)&&m!==0)){isNaN(m)||i||(o/=m);const r=C(o,b);if(r){const f=r[0],v=r[1],h=f===v?e.stops[f].color:M.blendColors(e.stops[f].color,e.stops[v].color,r[2],t?.color);return new M(h)}}}function H(n,a,t){const e="visualVariables"in n&&n.visualVariables?n.visualVariables.find(r=>r.type==="opacity"):n;if(!e)return;if(e.declaredClass!=="esri.renderers.visualVariables.OpacityVariable")return void w("OpacityVariable");const i=typeof a=="number",s=i?null:a,l=s?.attributes;let o=i?a:null;const c=e.field,{ipData:b,hasExpression:p}=e.cache;let u=e.cache.compiledFunc;if(!c&&!p){const r=e.stops;return r&&r[0]&&r[0].opacity}if(typeof o!="number")if(p){if(t?.arcade==null)return void F();const r={viewingMode:t.viewingMode,scale:t.scale,spatialReference:t.spatialReference},f=t.arcade.arcadeUtils,v=f.getViewInfo(r),h=f.createExecContext(s,v,t.timeZone);if(!u){const z=f.createSyntaxTree(e.valueExpression);u=f.createFunction(z),e.cache.compiledFunc=u}o=f.executeFunction(u,h)}else l&&(o=l[c]);const d=e.normalizationField,m=l!=null&&d!=null?parseFloat(l[d]):void 0;if(o!=null&&(!d||i||!isNaN(m)&&m!==0)){isNaN(m)||i||(o/=m);const r=C(o,b);if(r){const f=r[0],v=r[1];if(f===v)return e.stops[f].opacity;{const h=e.stops[f].opacity;return h+(e.stops[v].opacity-h)*r[2]}}}}function J(n,a,t){const e="visualVariables"in n&&n.visualVariables?n.visualVariables.find(m=>m.type==="rotation"):n;if(!e)return;if(e.declaredClass!=="esri.renderers.visualVariables.RotationVariable")return void w("RotationVariable");const i=e.axis||"heading",s=i==="heading"&&e.rotationType==="arithmetic"?90:0,l=i==="heading"&&e.rotationType==="arithmetic"?-1:1,o=typeof a=="number"?null:a,c=o?.attributes,b=e.field,{hasExpression:p}=e.cache;let u=e.cache.compiledFunc,d=0;if(!b&&!p)return d;if(p){if(t?.arcade==null)return void F();const m={viewingMode:t.viewingMode,scale:t.scale,spatialReference:t.spatialReference},r=t.arcade.arcadeUtils,f=r.getViewInfo(m),v=r.createExecContext(o,f,t.timeZone);if(!u){const h=r.createSyntaxTree(e.valueExpression);u=r.createFunction(h),e.cache.compiledFunc=u}d=r.executeFunction(u,v)}else c&&(d=c[b]||0);return d=typeof d!="number"||isNaN(d)?null:s+l*d,d}function I(n,a,t){const e=typeof a=="number",i=e?null:a,s=i?.attributes;let l=e?a:null;const{isScaleDriven:o}=n.cache;let c=n.cache.compiledFunc;if(o){const p=t?.scale,u=t?.view;l=p==null||u==="3d"?O(n):p}else if(!e)switch(n.inputValueType){case S.Expression:{if(t?.arcade==null)return void F();const p={viewingMode:t.viewingMode,scale:t.scale,spatialReference:t.spatialReference},u=t.arcade.arcadeUtils,d=u.getViewInfo(p),m=u.createExecContext(i,d,t.timeZone);if(!c){const r=u.createSyntaxTree(n.valueExpression);c=u.createFunction(r),n.cache.compiledFunc=c}l=u.executeFunction(c,m);break}case S.Field:s&&(l=s[n.field]);break;case S.Unknown:l=null}if(!y(l))return null;if(e||!n.normalizationField)return l;const b=s?parseFloat(s[n.normalizationField]):null;return y(b)&&b!==0?l/b:null}function O(n){let a=null,t=null;const e=n.stops;return e?(a=e[0].value,t=e[e.length-1].value):(a=n.minDataValue||0,t=n.maxDataValue||0),(a+t)/2}function D(n,a,t){const e="visualVariables"in n&&n.visualVariables?n.visualVariables.find(s=>s.type==="size"):n;if(!e)return;if(e.declaredClass!=="esri.renderers.visualVariables.SizeVariable")return void w("SizeVariable");const i=$(I(e,a,t),e,a,t,e.cache.ipData);return i==null||isNaN(i)?0:i}function V(n,a,t){return n==null?null:q(n)?D(n,a,t):y(n)?n:null}function E(n,a,t){return y(t)&&n>t?t:y(a)&&n<a?a:n}function Z(n,a,t,e){return n+((V(a.minSize,t,e)||a.minDataValue)??0)}function A(n,a,t){const e=n.stops;let i=e?.length&&e[0].size;return i==null&&(i=n.minSize),V(i,a,t)}function L(n,a,t,e){const i=(n-a.minDataValue)/(a.maxDataValue-a.minDataValue),s=V(a.minSize,t,e),l=V(a.maxSize,t,e),o=e?.shape;if(n<=a.minDataValue)return s;if(n>=a.maxDataValue)return l;if(s==null||l==null)return null;if(a.scaleBy==="area"&&o){const c=o==="circle",b=c?g*(s/2)**2:s*s,p=b+i*((c?g*(l/2)**2:l*l)-b);return c?2*Math.sqrt(p/g):Math.sqrt(p)}return s+i*(l-s)}function P(n,a,t,e){const i=e?.shape,s=n/a.minDataValue,l=V(a.minSize,t,e),o=V(a.maxSize,t,e);let c=null;return c=i==="circle"?2*Math.sqrt(s*(l/2)**2):i==="square"||i==="diamond"||i==="image"?Math.sqrt(s*l**2):s*l,E(c,l,o)}function B(n,a,t,e,i){const[s,l,o]=C(n,i);if(s===l)return V(a.stops?.[s].size,t,e);{const c=V(a.stops?.[s].size,t,e);return c+(V(a.stops?.[l].size,t,e)-c)*o}}function W(n,a,t,e){const i=(e?.resolution??1)*U[a.valueUnit],s=V(a.minSize,t,e),l=V(a.maxSize,t,e),{valueRepresentation:o}=a;let c=null;return c=o==="area"?2*Math.sqrt(n/g)/i:o==="radius"||o==="distance"?2*n/i:n/i,E(c,s,l)}function $(n,a,t,e,i){switch(a.transformationType){case x.Additive:return Z(n,a,t,e);case x.Constant:return A(a,t,e);case x.ClampedLinear:return L(n,a,t,e);case x.Proportional:return P(n,a,t,e);case x.Stops:return B(n,a,t,e,i);case x.RealWorldSize:return W(n,a,t,e);case x.Identity:return n;case x.Unknown:return null}}function C(n,a){if(!a)return;let t=0,e=a.length-1;return a.some((i,s)=>n<i?(e=s,!0):(t=s,!1)),[t,e,(n-a[t])/(a[e]-a[t])]}function K(n,a,t){const e=["proportional","proportional","proportional"];for(const i of n){const s=i.useSymbolValue?"symbol-value":D(i,a,t);switch(i.axis){case"width":e[0]=s;break;case"depth":e[1]=s;break;case"height":e[2]=s;break;case"width-and-depth":e[0]=s,e[1]=s;break;case"all":case void 0:case null:e[0]=s,e[1]=s,e[2]=s;break;default:T(i.axis)}}return e}export{K as getAllSizes,G as getColor,H as getOpacity,J as getRotationAngle,D as getSize,$ as getSizeForValue,V as getSizeFromNumberOrVariable,_ as viewScaleRE};
