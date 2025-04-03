import{v as A,T as v}from"./dom-N58V0tYi-DBU3jlah.js";import{e as I}from"./key-CZySMiwx-kmS7VeUz.js";import{c as D}from"./observers-BigwqTsw-5MxNkBEt.js";const _=new RegExp("\\.(0+)?$"),y=new RegExp("0+$");class s{constructor(e){if(e instanceof s)return e;const[n,r]=T(e).split(".").concat("");this.value=BigInt(n+r.padEnd(s.DECIMALS,"0").slice(0,s.DECIMALS))+BigInt(s.ROUNDED&&r[s.DECIMALS]>="5"),this.isNegative=e.charAt(0)==="-"}getIntegersAndDecimals(){const e=this.value.toString().replace("-","").padStart(s.DECIMALS+1,"0"),n=e.slice(0,-s.DECIMALS),r=e.slice(-s.DECIMALS).replace(y,"");return{integers:n,decimals:r}}toString(){const{integers:e,decimals:n}=this.getIntegersAndDecimals();return`${this.isNegative?"-":""}${e}${n.length?"."+n:""}`}formatToParts(e){const{integers:n,decimals:r}=this.getIntegersAndDecimals(),i=e.numberFormatter.formatToParts(BigInt(n));return this.isNegative&&i.unshift({type:"minusSign",value:e.minusSign}),r.length&&(i.push({type:"decimal",value:e.decimal}),r.split("").forEach(a=>i.push({type:"fraction",value:a}))),i}format(e){const{integers:n,decimals:r}=this.getIntegersAndDecimals(),i=`${this.isNegative?e.minusSign:""}${e.numberFormatter.format(BigInt(n))}`,a=r.length?`${e.decimal}${r.split("").map(g=>e.numberFormatter.format(Number(g))).join("")}`:"";return`${i}${a}`}add(e){return s.fromBigInt(this.value+new s(e).value)}subtract(e){return s.fromBigInt(this.value-new s(e).value)}multiply(e){return s._divRound(this.value*new s(e).value,s.SHIFT)}divide(e){return s._divRound(this.value*s.SHIFT,new s(e).value)}}s.DECIMALS=100,s.ROUNDED=!0,s.SHIFT=BigInt("1"+"0".repeat(s.DECIMALS)),s._divRound=(t,e)=>s.fromBigInt(t/e+(s.ROUNDED?t*BigInt(2)/e%BigInt(2):BigInt(0))),s.fromBigInt=t=>Object.assign(Object.create(s.prototype),{value:t,isNegative:t<BigInt(0)});function d(t){return!(!t||isNaN(Number(t)))}function q(t){return!t||!L(t)?"":h(t,e=>{let n=!1;const r=e.split("").filter((i,a)=>i.match(/\./g)&&!n?(n=!0,!0):i.match(/-/g)&&a===0?!0:I.includes(i)).join("");return d(r)?new s(r).toString():""})}const S=/^([-0])0+(?=\d)/,C=/(?!^\.)\.$/,B=/(?!^-)-/g,R=/^-\b0\b\.?0*$/,x=/0*$/,Q=t=>h(t,e=>{const n=e.replace(B,"").replace(C,"").replace(S,"$1");return d(n)?R.test(n)?n:z(n):e});function z(t){const e=t.split(".")[1],n=new s(t).toString(),[r,i]=n.split(".");return e&&i!==e?`${r}.${e}`:n}function h(t,e){if(!t)return t;const n=t.toLowerCase().indexOf("e")+1;return n?t.replace(/[eE]*$/g,"").substring(0,n).concat(t.slice(n).replace(/[eE]/g,"")).split(/[eE]/).map((r,i)=>e(i===1?r.replace(/\./g,""):r)).join("e").replace(/^e/,"1e"):e(t)}function T(t){const e=t.split(/[eE]/);if(e.length===1)return t;const n=+t;if(Number.isSafeInteger(n))return`${n}`;const r=t.charAt(0)==="-",i=+e[1],a=e[0].split("."),g=(r?a[0].substring(1):a[0])||"",f=a[1]||"",O=(o,l)=>{const c=Math.abs(l)-o.length,$=c>0?`${"0".repeat(c)}${o}`:o;return`${$.slice(0,l)}.${$.slice(l)}`},N=(o,l)=>{const c=l>o.length?`${o}${"0".repeat(l-o.length)}`:o;return`${c.slice(0,l)}.${c.slice(l)}`},b=i>0?`${g}${N(f,i)}`:`${O(g,i)}${f}`;return`${r?"-":""}${b.charAt(0)==="."?"0":""}${b.replace(_,"").replace(S,"")}`}function L(t){return I.some(e=>t.includes(e))}function V(t,e,n){const r=e.split(".")[1];if(r){const i=r.match(x)[0];if(i&&n.delocalize(t).length!==e.length&&r.indexOf("e")===-1){const a=n.decimal;return t=t.includes(a)?t:`${t}${a}`,t.padEnd(t.length+i.length,n.localize("0"))}}return t}const u="en",M=["ar","bg","bs","ca","cs","da","de","el",u,"es","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","no","nl","pl","pt-BR","pt-PT","ro","ru","sk","sl","sr","sv","th","tr","uk","vi","zh-CN","zh-HK","zh-TW"],j=["ar","bg","bs","ca","cs","da","de","de-AT","de-CH","el",u,"en-AU","en-CA","en-GB","es","es-MX","et","fi","fr","fr-CH","he","hi","hr","hu","id","it","it-CH","ja","ko","lt","lv","mk","no","nl","pl","pt","pt-PT","ro","ru","sk","sl","sr","sv","th","tr","uk","vi","zh-CN","zh-HK","zh-TW"],k=["arab","arabext","latn"],E=t=>k.includes(t),p=new Intl.NumberFormat().resolvedOptions().numberingSystem,F=p==="arab"||!E(p)?"latn":p,H=t=>E(t)?t:F;function G(t,e="cldr"){const n=e==="cldr"?j:M;return t?n.includes(t)?t:(t=t.toLowerCase(),t==="nb"?"no":e==="t9n"&&t==="pt"?"pt-BR":(t.includes("-")&&(t=t.replace(/(\w+)-(\w+)/,(r,i,a)=>`${i}-${a.toUpperCase()}`),n.includes(t)||(t=t.split("-")[0])),t==="zh"?"zh-CN":n.includes(t)?t:(console.warn(`Translations for the "${t}" locale are not available and will fall back to the default, English (en).`),u))):u}const m=new Set;function Y(t){P(t),m.size===0&&w?.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"],subtree:!0}),m.add(t)}function P(t){t.effectiveLocale=U(t)}function Z(t){m.delete(t),m.size===0&&w.disconnect()}const w=D("mutation",t=>{t.forEach(e=>{const n=e.target;m.forEach(r=>{if(!A(n,r.el))return;const i=v(r.el,"[lang]");if(!i){r.effectiveLocale=u;return}const a=i.lang;r.effectiveLocale=i.hasAttribute("lang")&&a===""?u:a})})});function U(t){return t.el.lang||v(t.el,"[lang]")?.lang||document.documentElement.lang||u}class J{constructor(){this.delocalize=e=>this._numberFormatOptions?h(e,n=>n.replace(new RegExp(`[${this._minusSign}]`,"g"),"-").replace(new RegExp(`[${this._group}]`,"g"),"").replace(new RegExp(`[${this._decimal}]`,"g"),".").replace(new RegExp(`[${this._digits.join("")}]`,"g"),this._getDigitIndex)):e,this.localize=e=>this._numberFormatOptions?h(e,n=>d(n.trim())?new s(n.trim()).format(this).replace(new RegExp(`[${this._actualGroup}]`,"g"),this._group):n):e}get group(){return this._group}get decimal(){return this._decimal}get minusSign(){return this._minusSign}get digits(){return this._digits}get numberFormatter(){return this._numberFormatter}get numberFormatOptions(){return this._numberFormatOptions}set numberFormatOptions(e){if(e.locale=G(e?.locale),e.numberingSystem=H(e?.numberingSystem),!this._numberFormatOptions&&e.locale===u&&e.numberingSystem===F&&Object.keys(e).length===2||JSON.stringify(this._numberFormatOptions)===JSON.stringify(e))return;this._numberFormatOptions=e,this._numberFormatter=new Intl.NumberFormat(this._numberFormatOptions.locale,this._numberFormatOptions),this._digits=[...new Intl.NumberFormat(this._numberFormatOptions.locale,{useGrouping:!1,numberingSystem:this._numberFormatOptions.numberingSystem}).format(9876543210)].reverse();const n=new Map(this._digits.map((i,a)=>[i,a])),r=new Intl.NumberFormat(this._numberFormatOptions.locale,{numberingSystem:this._numberFormatOptions.numberingSystem}).formatToParts(-123456789e-1);this._actualGroup=r.find(i=>i.type==="group").value,this._group=this._actualGroup.trim().length===0||this._actualGroup==" "?" ":this._actualGroup,this._decimal=r.find(i=>i.type==="decimal").value,this._minusSign=r.find(i=>i.type==="minusSign").value,this._getDigitIndex=i=>n.get(i)}}const tt=new J;export{q as B,V as H,Y as K,Q as T,tt as X,d as h,Z as q,s,G as w};
