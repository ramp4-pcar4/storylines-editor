import{t as Bt}from"./_commonjsHelpers-BITg13Vk-KnjfkSck.js";function Ut(g,b){for(var w=0;w<b.length;w++){const p=b[w];if(typeof p!="string"&&!Array.isArray(p)){for(const h in p)if(h!=="default"&&!(h in g)){const m=Object.getOwnPropertyDescriptor(p,h);m&&Object.defineProperty(g,h,m.get?m:{enumerable:!0,get:()=>p[h]})}}}return Object.freeze(Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}))}var rt,ot={exports:{}};function Dt(){return rt||(rt=1,g=ot,b=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0,w=function(p={}){var h,m,n=p;n.ready=new Promise((t,e)=>{h=t,m=e});var k=Object.assign({},n),L=typeof window=="object",T=typeof importScripts=="function";typeof process=="object"&&typeof process.versions=="object"&&process.versions.node;var B,l="";function at(t){return n.locateFile?n.locateFile(t,l):l+t}(L||T)&&(T?l=self.location.href:typeof document<"u"&&document.currentScript&&(l=document.currentScript.src),b&&(l=b),l=l.indexOf("blob:")!==0?l.substr(0,l.replace(/[?#].*/,"").lastIndexOf("/")+1):"",T&&(B=t=>{var e=new XMLHttpRequest;return e.open("GET",t,!1),e.responseType="arraybuffer",e.send(null),new Uint8Array(e.response)}));var E,j,ut=n.print||console.log.bind(console),A=n.printErr||console.error.bind(console);Object.assign(n,k),k=null,n.arguments&&n.arguments,n.thisProgram&&n.thisProgram,n.quit&&n.quit,n.wasmBinary&&(E=n.wasmBinary),typeof WebAssembly!="object"&&X("no native wasm support detected");var x,O,z=!1;function N(){var t=j.buffer;n.HEAP8=new Int8Array(t),n.HEAP16=new Int16Array(t),n.HEAPU8=x=new Uint8Array(t),n.HEAPU16=new Uint16Array(t),n.HEAP32=new Int32Array(t),n.HEAPU32=O=new Uint32Array(t),n.HEAPF32=new Float32Array(t),n.HEAPF64=new Float64Array(t)}var $=[],Y=[],G=[];function ct(){if(n.preRun)for(typeof n.preRun=="function"&&(n.preRun=[n.preRun]);n.preRun.length;)lt(n.preRun.shift());U($)}function ft(){U(Y)}function st(){if(n.postRun)for(typeof n.postRun=="function"&&(n.postRun=[n.postRun]);n.postRun.length;)ht(n.postRun.shift());U(G)}function lt(t){$.unshift(t)}function pt(t){Y.unshift(t)}function ht(t){G.unshift(t)}var d=0,R=null;function mt(t){d++,n.monitorRunDependencies?.(d)}function yt(t){if(d--,n.monitorRunDependencies?.(d),d==0&&R){var e=R;R=null,e()}}function X(t){n.onAbort?.(t),A(t="Aborted("+t+")"),z=!0,t+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(t);throw m(e),e}var P,dt="data:application/octet-stream;base64,",J=t=>t.startsWith(dt);function K(t){if(t==P&&E)return new Uint8Array(E);if(B)return B(t);throw"both async and sync fetching of the wasm failed"}function vt(t){return E||!L&&!T||typeof fetch!="function"?Promise.resolve().then(()=>K(t)):fetch(t,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw"failed to load wasm binary file at '"+t+"'";return e.arrayBuffer()}).catch(()=>K(t))}function Q(t,e,o){return vt(t).then(r=>WebAssembly.instantiate(r,e)).then(r=>r).then(o,r=>{A(`failed to asynchronously prepare wasm: ${r}`),X(r)})}function gt(t,e,o,r){return t||typeof WebAssembly.instantiateStreaming!="function"||J(e)||typeof fetch!="function"?Q(e,o,r):fetch(e,{credentials:"same-origin"}).then(i=>WebAssembly.instantiateStreaming(i,o).then(r,function(a){return A(`wasm streaming compile failed: ${a}`),A("falling back to ArrayBuffer instantiation"),Q(e,o,r)}))}function bt(){var t={a:It};function e(r,i){return s=r.exports,j=s.i,N(),V=s.m,pt(s.j),yt(),s}function o(r){e(r.instance)}if(mt(),n.instantiateWasm)try{return n.instantiateWasm(t,e)}catch(r){A(`Module.instantiateWasm callback failed with error: ${r}`),m(r)}return gt(E,P,t,o).catch(m),{}}J(P="libtess.wasm")||(P=at(P));var U=t=>{for(;t.length>0;)t.shift()(n)};n.noExitRuntime;var V,wt=()=>{throw 1/0},At=(t,e,o)=>x.copyWithin(t,e,e+o),Et=()=>2147483648,Rt=t=>{var e=(t-j.buffer.byteLength+65535)/65536;try{return j.grow(e),N(),1}catch{}},Pt=t=>{var e=x.length;t>>>=0;var o=Et();if(t>o)return!1;for(var r=(c,f)=>c+(f-c%f)%f,i=1;i<=4;i*=2){var a=e*(1+.2/i);a=Math.min(a,t+100663296);var u=Math.min(o,r(Math.max(t,a),65536));if(Rt(u))return!0}return!1},St=[null,[],[]],Z=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,_t=(t,e,o)=>{for(var r=e+o,i=e;t[i]&&!(i>=r);)++i;if(i-e>16&&t.buffer&&Z)return Z.decode(t.subarray(e,i));for(var a="";e<i;){var u=t[e++];if(128&u){var c=63&t[e++];if((224&u)!=192){var f=63&t[e++];if((u=(240&u)==224?(15&u)<<12|c<<6|f:(7&u)<<18|c<<12|f<<6|63&t[e++])<65536)a+=String.fromCharCode(u);else{var I=u-65536;a+=String.fromCharCode(55296|I>>10,56320|1023&I)}}else a+=String.fromCharCode((31&u)<<6|c)}else a+=String.fromCharCode(u)}return a},Ht=(t,e)=>{var o=St[t];e===0||e===10?((t===1?ut:A)(_t(o,0)),o.length=0):o.push(e)},W=[],C=t=>{var e=W[t];return e||(t>=W.length&&(W.length=t+1),W[t]=e=V.get(t)),e},It={e:wt,g:At,f:Pt,c:(t,e,o,r)=>{for(var i=0,a=0;a<o;a++){var u=O[e>>2],c=O[e+4>>2];e+=8;for(var f=0;f<c;f++)Ht(t,x[u+f]);i+=c}return O[r>>2]=i,0},b:xt,h:Ot,d:jt,a:Tt},s=bt();n._malloc=t=>(n._malloc=s.k)(t),n._free=t=>(n._free=s.l)(t),n._triangulate=(t,e,o,r,i,a)=>(n._triangulate=s.n)(t,e,o,r,i,a);var F,S=(t,e)=>(S=s.o)(t,e),_=()=>(_=s.p)(),H=t=>(H=s.q)(t);function Tt(t,e,o){var r=_();try{C(t)(e,o)}catch(i){if(H(r),i!==i+0)throw i;S(1,0)}}function jt(t,e){var o=_();try{C(t)(e)}catch(r){if(H(o),r!==r+0)throw r;S(1,0)}}function xt(t,e){var o=_();try{return C(t)(e)}catch(r){if(H(o),r!==r+0)throw r;S(1,0)}}function Ot(t,e,o,r){var i=_();try{return C(t)(e,o,r)}catch(a){if(H(i),a!==a+0)throw a;S(1,0)}}function tt(){function t(){F||(F=!0,n.calledRun=!0,z||(ft(),h(n),n.onRuntimeInitialized&&n.onRuntimeInitialized(),st()))}d>0||(ct(),d>0||(n.setStatus?(n.setStatus("Running..."),setTimeout(function(){setTimeout(function(){n.setStatus("")},1),t()},1)):t()))}if(R=function t(){F||tt(),F||(R=t)},n.preInit)for(typeof n.preInit=="function"&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.pop()();tt();let D=null,y=null,v=null,M=null;const Wt=2,nt=4e3;let et=0;const Ct=(t,e,o)=>{D||(D=n._triangulate);let r=n.HEAPF32;const i=n.HEAP32.BYTES_PER_ELEMENT,a=2,u=r.BYTES_PER_ELEMENT;o>et&&(et=o,v&&(n._free(v),v=0),y&&(n._free(y),y=0)),v||(v=n._malloc(o*u)),M||(M=n._malloc(nt*i));const c=o*Wt;y||(y=n._malloc(c*u)),r=n.HEAPF32,r.set(t,v/u),n.HEAP32.set(e,M/i);const f=c/a,I=D(v,M,Math.min(e.length,nt),a,y,f),Ft=I*a;r=n.HEAPF32;const Mt=r.slice(y/u,y/u+Ft),q={};return q.buffer=Mt,q.vertexCount=I,q};return n.triangulate=Ct,p.ready},g.exports=w),ot.exports;var g,b,w}var it=Dt();const kt=Ut({__proto__:null,default:Bt(it)},[it]);export{kt as l};
