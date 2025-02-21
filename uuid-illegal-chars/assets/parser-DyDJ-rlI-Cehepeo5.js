import{o as b,f7 as Te,f8 as De,f9 as Ze,fa as Be,f3 as He,fb as Le}from"./main-DeZqmqPk.js";import{o as $t}from"./mat4f32-CiZjBg9k-CUm34GoR.js";import{E as J,G as P}from"./mat4-DX7gBViE-7T5uBVFD.js";const Ue=(r,n)=>{const u=J(r,n,0,0,0,0,n,0,0,0,0,n,0,0,0,0,1);return P(u,u)},Qe=(r,n)=>{const u=J(r,n,0,0,.5-.5*n,0,n,0,.5-.5*n,0,0,n,.5-.5*n,0,0,0,1);return P(u,u)},Ve=(r,n)=>{const u=1-n,e=J(r,.2126+.7874*u,.7152-.7152*u,.0722-.0722*u,0,.2126-.2126*u,.7152+.2848*u,.0722-.0722*u,0,.2126-.2126*u,.7152-.7152*u,.0722+.9278*u,0,0,0,0,1);return P(e,e)},We=(r,n)=>{const u=Math.sin(n*Math.PI/180),e=Math.cos(n*Math.PI/180),f=J(r,.213+.787*e-.213*u,.715-.715*e-.715*u,.072-.072*e+.928*u,0,.213-.213*e+.143*u,.715+.285*e+.14*u,.072-.072*e-.283*u,0,.213-.213*e-.787*u,.715-.715*e+.715*u,.072+.928*e+.072*u,0,0,0,0,1);return P(f,f)},Ke=(r,n)=>{const u=1-2*n,e=J(r,u,0,0,n,0,u,0,n,0,0,u,n,0,0,0,1);return P(e,e)},tr=(r,n)=>{const u=J(r,.213+.787*n,.715-.715*n,.072-.072*n,0,.213-.213*n,.715+.285*n,.072-.072*n,0,.213-.213*n,.715-.715*n,.072+.928*n,0,0,0,0,1);return P(u,u)},er=(r,n)=>{const u=1-n,e=J(r,.393+.607*u,.769-.769*u,.189-.189*u,0,.349-.349*u,.686+.314*u,.168-.168*u,0,.272-.272*u,.534-.534*u,.131+.869*u,0,0,0,0,1);return P(e,e)};class B{constructor(n,u,e){this.strength=n,this.radius=u,this.threshold=e,this.type="bloom"}interpolate(n,u,e){this.strength=M(n.strength,u.strength,e),this.radius=M(n.radius,u.radius,e),this.threshold=M(n.threshold,u.threshold,e)}clone(){return new B(this.strength,this.radius,this.threshold)}toJSON(){return{type:"bloom",radius:z(this.radius),strength:this.strength,threshold:this.threshold}}}let Ft=class Ct{constructor(n){this.radius=n,this.type="blur"}interpolate(n,u,e){this.radius=Math.round(M(n.radius,u.radius,e))}clone(){return new Ct(this.radius)}toJSON(){return{type:"blur",radius:z(this.radius)}}};class G{constructor(n,u){this.type=n,this.amount=u,this.type!=="invert"&&this.type!=="grayscale"&&this.type!=="sepia"||(this.amount=Math.min(this.amount,1))}get colorMatrix(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix}interpolate(n,u,e){this.amount=M(n.amount,u.amount,e),this._updateMatrix()}clone(){return new G(this.type,this.amount)}toJSON(){return{type:this.type,amount:this.amount}}_updateMatrix(){const n=this._colorMatrix||$t();switch(this.type){case"brightness":this._colorMatrix=Ue(n,this.amount);break;case"contrast":this._colorMatrix=Qe(n,this.amount);break;case"grayscale":this._colorMatrix=Ve(n,this.amount);break;case"invert":this._colorMatrix=Ke(n,this.amount);break;case"saturate":this._colorMatrix=tr(n,this.amount);break;case"sepia":this._colorMatrix=er(n,this.amount)}}}let Et=class Ot{constructor(n,u,e,f){this.offsetX=n,this.offsetY=u,this.blurRadius=e,this.color=f,this.type="drop-shadow"}interpolate(n,u,e){this.offsetX=M(n.offsetX,u.offsetX,e),this.offsetY=M(n.offsetY,u.offsetY,e),this.blurRadius=M(n.blurRadius,u.blurRadius,e),this.color[0]=Math.round(M(n.color[0],u.color[0],e)),this.color[1]=Math.round(M(n.color[1],u.color[1],e)),this.color[2]=Math.round(M(n.color[2],u.color[2],e)),this.color[3]=M(n.color[3],u.color[3],e)}clone(){return new Ot(this.offsetX,this.offsetY,this.blurRadius,[...this.color])}toJSON(){const n=[...this.color];return n[3]*=255,{type:"drop-shadow",xoffset:z(this.offsetX),yoffset:z(this.offsetY),blurRadius:z(this.blurRadius),color:n}}},_t=class Rt{constructor(n){this.angle=n,this.type="hue-rotate"}get colorMatrix(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix}interpolate(n,u,e){this.angle=M(n.angle,u.angle,e),this._updateMatrix()}clone(){return new Rt(this.angle)}toJSON(){return{type:"hue-rotate",angle:this.angle}}_updateMatrix(){const n=this._colorMatrix||$t();this._colorMatrix=We(n,this.angle)}};class H{constructor(n){this.amount=n,this.type="opacity",this.amount=Math.min(this.amount,1)}interpolate(n,u,e){this.amount=M(n.amount,u.amount,e)}clone(){return new H(this.amount)}toJSON(){return{type:"opacity",amount:this.amount}}}function M(r,n,u){return r+(n-r)*u}function z(r){return Math.round(1e3*He(r))/1e3}function rr(r){switch(r.type){case"grayscale":case"sepia":case"invert":return new G(r.type,0);case"saturate":case"brightness":case"contrast":return new G(r.type,1);case"opacity":return new H(1);case"hue-rotate":return new _t(0);case"blur":return new Ft(0);case"drop-shadow":return new Et(0,0,0,[...Le("transparent")]);case"bloom":return new B(0,0,1)}}function nr(r,n){const u=r.length>n.length?r:n;return(r.length>n.length?n:r).every((e,f)=>e.type===u[f].type)}function or(r,n){const u=r.length>n.length?r:n,e=r.length>n.length?n:r;for(let f=e.length;f<u.length;f++)e.push(rr(u[f]))}function Er(r){const n=r[0];return!!n&&"type"in n}function ur(r,n){function u(){this.constructor=r}u.prototype=n.prototype,r.prototype=new u}function X(r,n,u,e){var f=Error.call(this,r);return Object.setPrototypeOf&&Object.setPrototypeOf(f,X.prototype),f.expected=n,f.found=u,f.location=e,f.name="SyntaxError",f}function V(r,n,u){return u=u||" ",r.length>n?r:(n-=r.length,r+(u+=u.repeat(n)).slice(0,n))}function ar(r,n){var u,e={},f=(n=n!==void 0?n:{}).grammarSource,F={start:bt},k=bt,N="none",Y=")",p=",",d="(",C="%",v="px",et="cm",rt="mm",nt="in",ot="pt",ut="pc",at="deg",st="rad",it="grad",ct="turn",kt="#",Nt=".",Jt="e",lt=/^[ \t\n\r]/,ft=/^[a-z\-]/,ht=/^[0-9a-fA-F]/,pt=/^[+\-]/,R=/^[0-9]/,Pt=_("none"),Yt=w("none",!1),It=w(")",!1),mt=w(",",!1),Xt=_("whitespace"),gt=q([" ","	",`
`,"\r"],!1,!1),jt=_("function"),qt=w("(",!1),zt=_("identifier"),dt=q([["a","z"],"-"],!1,!1),Gt=_("percentage"),Tt=w("%",!1),Dt=_("length"),Zt=w("px",!1),Bt=w("cm",!1),Ht=w("mm",!1),Lt=w("in",!1),Ut=w("pt",!1),Qt=w("pc",!1),Vt=_("angle"),Wt=w("deg",!1),Kt=w("rad",!1),te=w("grad",!1),ee=w("turn",!1),re=_("number"),ne=_("color"),oe=w("#",!1),yt=q([["0","9"],["a","f"],["A","F"]],!1,!1),vt=q(["+","-"],!1,!1),S=q([["0","9"]],!1,!1),ue=w(".",!1),ae=w("e",!1),se=function(){return[]},ie=function(t,a){return{type:"function",name:t,parameters:a||[]}},ce=function(t,a){return a.length>0?Ge(t,a,3):[t]},le=function(t){return{type:"quantity",value:t.value,unit:t.unit}},fe=function(t){return{type:"color",colorType:t.type,value:t.value}},he=function(t){return t},pe=function(){return Z()},me=function(t){return{value:t,unit:"%"}},ge=function(t){return{value:t,unit:"px"}},de=function(t){return{value:t,unit:"cm"}},ye=function(t){return{value:t,unit:"mm"}},ve=function(t){return{value:t,unit:"in"}},we=function(t){return{value:t,unit:"pt"}},xe=function(t){return{value:t,unit:"pc"}},be=function(t){return{value:t,unit:"deg"}},Ae=function(t){return{value:t,unit:"rad"}},Me=function(t){return{value:t,unit:"grad"}},$e=function(t){return{value:t,unit:"turn"}},Fe=function(t){return{value:t,unit:null}},Ce=function(){return{type:"hex",value:Z()}},Ee=function(t){return{type:"function",value:t}},Oe=function(){return{type:"named",value:Z()}},_e=function(){return parseFloat(Z())},o=0|n.peg$currPos,m=o,I=[{line:1,column:1}],E=o,D=n.peg$maxFailExpected||[],i=0|n.peg$silentFails;if(n.startRule){if(!(n.startRule in F))throw new Error(`Can't start parsing from rule "`+n.startRule+'".');k=F[n.startRule]}function Z(){return r.substring(m,o)}function w(t,a){return{type:"literal",text:t,ignoreCase:a}}function q(t,a,s){return{type:"class",parts:t,inverted:a,ignoreCase:s}}function Re(){return{type:"end"}}function _(t){return{type:"other",description:t}}function wt(t){var a,s=I[t];if(s)return s;if(t>=I.length)a=I.length-1;else for(a=t;!I[--a];);for(s={line:(s=I[a]).line,column:s.column};a<t;)r.charCodeAt(a)===10?(s.line++,s.column=1):s.column++,a++;return I[t]=s,s}function xt(t,a,s){var c=wt(t),h=wt(a);return{source:f,start:{offset:t,line:c.line,column:c.column},end:{offset:a,line:h.line,column:h.column}}}function l(t){o<E||(o>E&&(E=o,D=[]),D.push(t))}function Se(t,a,s){return new X(X.buildMessage(t,a),t,a,s)}function bt(){var t;return(t=ke())===e&&(t=Ne()),t}function ke(){var t,a;return i++,t=o,x(),r.substr(o,4)===N?(a=N,o+=4):(a=e,i===0&&l(Yt)),a!==e?(x(),m=t,t=se()):(o=t,t=e),i--,t===e&&i===0&&l(Pt),t}function Ne(){var t,a;if(t=[],(a=U())!==e)for(;a!==e;)t.push(a),a=U();else t=e;return t}function U(){var t,a,s,c;return t=o,x(),(a=Pe())!==e?(x(),(s=Je())===e&&(s=null),x(),r.charCodeAt(o)===41?(c=Y,o++):(c=e,i===0&&l(It)),c!==e?(x(),m=t,t=ie(a,s)):(o=t,t=e)):(o=t,t=e),t}function Je(){var t,a,s,c,h,g,y,A;if(t=o,(a=Q())!==e){for(s=[],c=o,h=x(),r.charCodeAt(o)===44?(g=p,o++):(g=e,i===0&&l(mt)),g===e&&(g=null),y=x(),(A=Q())!==e?c=h=[h,g,y,A]:(o=c,c=e);c!==e;)s.push(c),c=o,h=x(),r.charCodeAt(o)===44?(g=p,o++):(g=e,i===0&&l(mt)),g===e&&(g=null),y=x(),(A=Q())!==e?c=h=[h,g,y,A]:(o=c,c=e);m=t,t=ce(a,s)}else o=t,t=e;return t}function Q(){var t,a;return t=o,(a=Ye())===e&&(a=Ie())===e&&(a=Xe())===e&&(a=je()),a!==e&&(m=t,a=le(a)),(t=a)===e&&(t=o,(a=qe())!==e&&(m=t,a=fe(a)),t=a),t}function x(){var t,a;for(i++,t=[],a=r.charAt(o),lt.test(a)?o++:(a=e,i===0&&l(gt));a!==e;)t.push(a),a=r.charAt(o),lt.test(a)?o++:(a=e,i===0&&l(gt));return i--,a=e,i===0&&l(Xt),t}function Pe(){var t,a,s;return i++,t=o,(a=At())!==e?(r.charCodeAt(o)===40?(s=d,o++):(s=e,i===0&&l(qt)),s!==e?(m=t,t=he(a)):(o=t,t=e)):(o=t,t=e),i--,t===e&&(a=e,i===0&&l(jt)),t}function At(){var t,a,s;if(i++,t=o,a=[],s=r.charAt(o),ft.test(s)?o++:(s=e,i===0&&l(dt)),s!==e)for(;s!==e;)a.push(s),s=r.charAt(o),ft.test(s)?o++:(s=e,i===0&&l(dt));else a=e;return a!==e&&(m=t,a=pe()),i--,(t=a)===e&&(a=e,i===0&&l(zt)),t}function Ye(){var t,a,s;return i++,t=o,x(),(a=$())!==e?(r.charCodeAt(o)===37?(s=C,o++):(s=e,i===0&&l(Tt)),s!==e?(m=t,t=me(a)):(o=t,t=e)):(o=t,t=e),i--,t===e&&i===0&&l(Gt),t}function Ie(){var t,a,s;return i++,t=o,x(),(a=$())!==e?(r.substr(o,2)===v?(s=v,o+=2):(s=e,i===0&&l(Zt)),s!==e?(m=t,t=ge(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,x(),(a=$())!==e?(r.substr(o,2)===et?(s=et,o+=2):(s=e,i===0&&l(Bt)),s!==e?(m=t,t=de(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,x(),(a=$())!==e?(r.substr(o,2)===rt?(s=rt,o+=2):(s=e,i===0&&l(Ht)),s!==e?(m=t,t=ye(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,x(),(a=$())!==e?(r.substr(o,2)===nt?(s=nt,o+=2):(s=e,i===0&&l(Lt)),s!==e?(m=t,t=ve(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,x(),(a=$())!==e?(r.substr(o,2)===ot?(s=ot,o+=2):(s=e,i===0&&l(Ut)),s!==e?(m=t,t=we(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,x(),(a=$())!==e?(r.substr(o,2)===ut?(s=ut,o+=2):(s=e,i===0&&l(Qt)),s!==e?(m=t,t=xe(a)):(o=t,t=e)):(o=t,t=e)))))),i--,t===e&&i===0&&l(Dt),t}function Xe(){var t,a,s;return i++,t=o,(a=$())!==e?(r.substr(o,3)===at?(s=at,o+=3):(s=e,i===0&&l(Wt)),s!==e?(m=t,t=be(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,(a=$())!==e?(r.substr(o,3)===st?(s=st,o+=3):(s=e,i===0&&l(Kt)),s!==e?(m=t,t=Ae(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,(a=$())!==e?(r.substr(o,4)===it?(s=it,o+=4):(s=e,i===0&&l(te)),s!==e?(m=t,t=Me(a)):(o=t,t=e)):(o=t,t=e),t===e&&(t=o,(a=$())!==e?(r.substr(o,4)===ct?(s=ct,o+=4):(s=e,i===0&&l(ee)),s!==e?(m=t,t=$e(a)):(o=t,t=e)):(o=t,t=e)))),i--,t===e&&(a=e,i===0&&l(Vt)),t}function je(){var t,a;return i++,t=o,x(),(a=$())!==e?(m=t,t=Fe(a)):(o=t,t=e),i--,t===e&&i===0&&l(re),t}function qe(){var t,a,s,c;if(i++,t=o,r.charCodeAt(o)===35?(a=kt,o++):(a=e,i===0&&l(oe)),a!==e){if(s=[],c=r.charAt(o),ht.test(c)?o++:(c=e,i===0&&l(yt)),c!==e)for(;c!==e;)s.push(c),c=r.charAt(o),ht.test(c)?o++:(c=e,i===0&&l(yt));else s=e;s!==e?(m=t,t=Ce()):(o=t,t=e)}else o=t,t=e;return t===e&&(t=o,(a=U())!==e&&(m=t,a=Ee(a)),(t=a)===e&&(t=o,(a=At())!==e&&(m=t,a=Oe()),t=a)),i--,t===e&&(a=e,i===0&&l(ne)),t}function $(){var t,a,s,c,h,g,y,A;for(t=o,a=r.charAt(o),pt.test(a)?o++:(a=e,i===0&&l(vt)),a===e&&(a=null),s=o,c=[],h=r.charAt(o),R.test(h)?o++:(h=e,i===0&&l(S));h!==e;)c.push(h),h=r.charAt(o),R.test(h)?o++:(h=e,i===0&&l(S));if(r.charCodeAt(o)===46?(h=Nt,o++):(h=e,i===0&&l(ue)),h!==e){if(g=[],y=r.charAt(o),R.test(y)?o++:(y=e,i===0&&l(S)),y!==e)for(;y!==e;)g.push(y),y=r.charAt(o),R.test(y)?o++:(y=e,i===0&&l(S));else g=e;g!==e?s=c=[c,h,g]:(o=s,s=e)}else o=s,s=e;if(s===e)if(s=[],c=r.charAt(o),R.test(c)?o++:(c=e,i===0&&l(S)),c!==e)for(;c!==e;)s.push(c),c=r.charAt(o),R.test(c)?o++:(c=e,i===0&&l(S));else s=e;if(s!==e){if(c=o,r.charCodeAt(o)===101?(h=Jt,o++):(h=e,i===0&&l(ae)),h!==e){if(g=r.charAt(o),pt.test(g)?o++:(g=e,i===0&&l(vt)),g===e&&(g=null),y=[],A=r.charAt(o),R.test(A)?o++:(A=e,i===0&&l(S)),A!==e)for(;A!==e;)y.push(A),A=r.charAt(o),R.test(A)?o++:(A=e,i===0&&l(S));else y=e;y!==e?c=h=[h,g,y]:(o=c,c=e)}else o=c,c=e;c===e&&(c=null),m=t,t=_e()}else o=t,t=e;return t}function ze(t,a){return t.map(function(s){return s[a]})}function Ge(t,a,s){return[t].concat(ze(a,s))}if(u=k(),n.peg$library)return{peg$result:u,peg$currPos:o,peg$FAILED:e,peg$maxFailExpected:D,peg$maxFailPos:E};if(u!==e&&o===r.length)return u;throw u!==e&&o<r.length&&l(Re()),Se(D,E<r.length?r.charAt(E):null,E<r.length?xt(E,E+1):xt(E,E))}function Or(r){if(!r||r.length===0)return null;if(typeof r=="string"){const u=Mt(r);return u&&u.length!==0?u:null}const n=r.map(u=>{if(!Number.isFinite(u.scale)||u.scale<=0)throw new b("effect:invalid-scale","scale must be finite and greater than 0",{stop:u});return{scale:u.scale,effects:Mt(u.value)}});n.sort((u,e)=>e.effects.length-u.effects.length);for(let u=0;u<n.length-1;u++){if(!nr(n[u].effects,n[u+1].effects))throw new b("effect:interpolation-impossible","Cannot interpolate by scale between 2 lists of mixed effects",{a:n[u].effects,b:n[u+1].effects});or(n[u].effects,n[u+1].effects)}return n.sort((u,e)=>e.scale-u.scale),n}function Mt(r){let n;if(!r)return[];try{n=ar(r)}catch(u){throw new b("effect:invalid-syntax","Invalid effect syntax",{value:r,error:u})}return n.map(u=>sr(u))}function sr(r){try{switch(r.name){case"grayscale":case"sepia":case"saturate":case"invert":case"brightness":case"contrast":return ir(r);case"opacity":return cr(r);case"hue-rotate":return lr(r);case"blur":return fr(r);case"drop-shadow":return hr(r);case"bloom":return pr(r)}}catch(n){throw n.details.filter=r,n}throw new b("effect:unknown-effect",`Effect '${r.name}' is not supported`,{effect:r})}function ir(r){let n=1;return j(r.parameters,1),r.parameters.length===1&&(n=O(r.parameters[0])),new G(r.name,n)}function cr(r){let n=1;return j(r.parameters,1),r.parameters.length===1&&(n=O(r.parameters[0])),new H(n)}function lr(r){let n=0;return j(r.parameters,1),r.parameters.length===1&&(n=wr(r.parameters[0])),new _t(n)}function fr(r){let n=0;return j(r.parameters,1),r.parameters.length===1&&(n=tt(r.parameters[0]),T(n,r.parameters[0])),new Ft(n)}function hr(r){const n=[];let u=null;for(const e of r.parameters)if(e.type==="color"){if(n.length&&Object.freeze(n),u)throw new b("effect:type-error","Accepts only one color",{});u=xr(e)}else{const f=tt(e);if(Object.isFrozen(n))throw new b("effect:type-error","<length> parameters not consecutive",{lengths:n});n.push(f),n.length===3&&T(f,e)}if(n.length<2||n.length>3)throw new b("effect:type-error",`Expected <length>{2,3}, Actual: <length>{${n.length}}`,{lengths:n});return new Et(n[0],n[1],n[2]||0,u||St("black"))}function pr(r){let n=1,u=0,e=0;return j(r.parameters,3),r.parameters[0]&&(n=O(r.parameters[0])),r.parameters[1]&&(u=tt(r.parameters[1]),T(u,r.parameters[1])),r.parameters[2]&&(e=O(r.parameters[2])),new B(n,u,e)}function j(r,n){if(r.length>n)throw new b("effect:type-error",`Function supports up to ${n} parameters, Actual: ${r.length}`,{parameters:r})}function L(r){if(r.type==="color")return"<color>";if(r.unit){if(r.unit in K)return"<length>";if(r.unit in W)return"<angle>";if(r.unit==="%")return"<percentage>"}return"<double>"}function T(r,n){if(r<0)throw new b("effect:type-error",`Negative values are not allowed, Actual: ${r}`,{term:n})}function mr(r){if(r.type!=="quantity"||r.unit!==null)throw new b("effect:type-error",`Expected <double>, Actual: ${L(r)}`,{term:r})}function gr(r){if(r.type!=="quantity"||r.unit!==null&&r.unit!=="%")throw new b("effect:type-error",`Expected <double> or <percentage>, Actual: ${L(r)}`,{term:r})}ur(X,Error),X.prototype.format=function(r){var n="Error: "+this.message;if(this.location){var u,e=null;for(u=0;u<r.length;u++)if(r[u].source===this.location.source){e=r[u].text.split(/\r\n|\n|\r/g);break}var f=this.location.start,F=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(f):f,k=this.location.source+":"+F.line+":"+F.column;if(e){var N=this.location.end,Y=V("",F.line.toString().length," "),p=e[f.line-1],d=(f.line===N.line?N.column:p.length+1)-f.column||1;n+=`
 --> `+k+`
`+Y+` |
`+F.line+" | "+p+`
`+Y+" | "+V("",f.column-1," ")+V("",d,"^")}else n+=`
 at `+k}return n},X.buildMessage=function(r,n){var u={literal:function(p){return'"'+f(p.text)+'"'},class:function(p){var d=p.parts.map(function(C){return Array.isArray(C)?F(C[0])+"-"+F(C[1]):F(C)});return"["+(p.inverted?"^":"")+d.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(p){return p.description}};function e(p){return p.charCodeAt(0).toString(16).toUpperCase()}function f(p){return p.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(d){return"\\x0"+e(d)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(d){return"\\x"+e(d)})}function F(p){return p.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(d){return"\\x0"+e(d)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(d){return"\\x"+e(d)})}function k(p){return u[p.type](p)}function N(p){var d,C,v=p.map(k);if(v.sort(),v.length>0){for(d=1,C=1;d<v.length;d++)v[d-1]!==v[d]&&(v[C]=v[d],C++);v.length=C}switch(v.length){case 1:return v[0];case 2:return v[0]+" or "+v[1];default:return v.slice(0,-1).join(", ")+", or "+v[v.length-1]}}function Y(p){return p?'"'+f(p)+'"':"end of input"}return"Expected "+N(r)+" but "+Y(n)+" found."};const W={deg:1,grad:.9,rad:180/Math.PI,turn:360};function dr(r){if(r.type!=="quantity"||!(r.value===0&&r.unit===null||r.unit&&W[r.unit]!=null))throw new b("effect:type-error",`Expected <angle>, Actual: ${L(r)}`,{term:r})}const K={px:1,cm:96/2.54,mm:96/2.54/10,in:96,pc:16,pt:96/72};function yr(r){if(r.type!=="quantity"||!(r.value===0&&r.unit===null||r.unit&&K[r.unit]!=null))throw new b("effect:type-error",`Expected <length>, Actual: ${L(r)}`,{term:r})}function O(r){gr(r);const n=r.value;return T(n,r),r.unit==="%"?.01*n:n}function vr(r){return mr(r),T(r.value,r),r.value}function wr(r){return dr(r),r.value*W[r.unit]||0}function tt(r){return yr(r),r.value*K[r.unit]||0}function xr(r){switch(r.colorType){case"hex":return Te(r.value);case"named":return St(r.value);case"function":return Mr(r.value)}}function St(r){if(!De(r))throw new b("effect:unknown-color",`color '${r}' isn't valid`,{namedColor:r});return Ze(r)}const br=/^rgba?/i,Ar=/^hsla?/i;function Mr(r){if(j(r.parameters,4),br.test(r.name))return[O(r.parameters[0]),O(r.parameters[1]),O(r.parameters[2]),r.parameters[3]?O(r.parameters[3]):1];if(Ar.test(r.name))return Be(vr(r.parameters[0]),O(r.parameters[1]),O(r.parameters[2]),r.parameters[3]?O(r.parameters[3]):1);throw new b("effect:syntax-error",`Invalid color function '${r.name}'`,{colorFunction:r})}export{nr as C,or as O,Er as a,Or as c};
