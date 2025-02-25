import{dD as w,gZ as D,h2 as v}from"./main-PWjwnDMV.js";import{b as J}from"./quickselect-DHTstthl-Ds_Aj0x5.js";class T{constructor(t=9,n){this._compareMinX=y,this._compareMinY=A,this._toBBox=i=>i,this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),n&&(typeof n=="function"?this._toBBox=n:this._initFormat(n)),this.clear()}destroy(){this.clear(),d.prune(),Y.prune(),m.prune(),X.prune()}all(t){F(this._data,t)}search(t,n){let i=this._data;const a=this._toBBox;if(M(t,i))for(d.clear();i;){for(let s=0,r=i.children.length;s<r;s++){const h=i.children[s],o=i.leaf?a(h):h;M(t,o)&&(i.leaf?n(h):b(t,o)?F(h,n):d.push(h))}i=d.pop()}}collides(t){let n=this._data;const i=this._toBBox;if(!M(t,n))return!1;for(d.clear();n;){for(let a=0,s=n.children.length;a<s;a++){const r=n.children[a],h=n.leaf?i(r):r;if(M(t,h)){if(n.leaf||b(t,h))return!0;d.push(r)}}n=d.pop()}return!1}load(t){if(!t.length)return this;if(t.length<this._minEntries){for(let i=0,a=t.length;i<a;i++)this.insert(t[i]);return this}let n=this._build(t.slice(),0,t.length-1,0);if(this._data.children.length)if(this._data.height===n.height)this._splitRoot(this._data,n);else{if(this._data.height<n.height){const i=this._data;this._data=n,n=i}this._insert(n,this._data.height-n.height-1,!0)}else this._data=n;return this}insert(t){return t&&this._insert(t,this._data.height-1),this}clear(){return this._data=new B([]),this}remove(t){if(!t)return this;let n,i=this._data,a=null,s=0,r=!1;const h=this._toBBox(t);for(m.clear(),X.clear();i||m.length>0;){if(i||(i=m.pop(),a=m.data[m.length-1],s=X.pop()??0,r=!0),i.leaf&&(n=D(i.children,t,i.children.length,i.indexHint),n!==-1))return i.children.splice(n,1),m.push(i),this._condense(m),this;r||i.leaf||!b(i,h)?a?(s++,i=a.children[s],r=!1):i=null:(m.push(i),X.push(s),s=0,a=i,i=i.children[0])}return this}toJSON(){return this._data}fromJSON(t){return this._data=t,this}_build(t,n,i,a){const s=i-n+1;let r=this._maxEntries;if(s<=r){const l=new B(t.slice(n,i+1));return f(l,this._toBBox),l}a||(a=Math.ceil(Math.log(s)/Math.log(r)),r=Math.ceil(s/r**(a-1)));const h=new E([]);h.height=a;const o=Math.ceil(s/r),c=o*Math.ceil(Math.sqrt(r));H(t,n,i,c,this._compareMinX);for(let l=n;l<=i;l+=c){const u=Math.min(l+c-1,i);H(t,l,u,o,this._compareMinY);for(let p=l;p<=u;p+=o){const j=Math.min(p+o-1,u);h.children.push(this._build(t,p,j,a-1))}}return f(h,this._toBBox),h}_insert(t,n,i){const a=this._toBBox,s=i?t:a(t);m.clear();const r=N(s,this._data,n,m);for(r.children.push(t),_(r,s);n>=0&&m.data[n].children.length>this._maxEntries;)this._split(m,n),n--;O(s,m,n)}_split(t,n){const i=t.data[n],a=i.children.length,s=this._minEntries;this._chooseSplitAxis(i,s,a);const r=this._chooseSplitIndex(i,s,a);if(!r)return;const h=i.children.splice(r,i.children.length-r),o=i.leaf?new B(h):new E(h);o.height=i.height,f(i,this._toBBox),f(o,this._toBBox),n?t.data[n-1].children.push(o):this._splitRoot(i,o)}_splitRoot(t,n){this._data=new E([t,n]),this._data.height=t.height+1,f(this._data,this._toBBox)}_chooseSplitIndex(t,n,i){let a,s,r;a=s=1/0;for(let h=n;h<=i-n;h++){const o=x(t,0,h,this._toBBox),c=x(t,h,i,this._toBBox),l=I(o,c),u=S(o)+S(c);l<a?(a=l,r=h,s=u<s?u:s):l===a&&u<s&&(s=u,r=h)}return r}_chooseSplitAxis(t,n,i){const a=t.leaf?this._compareMinX:y,s=t.leaf?this._compareMinY:A;this._allDistMargin(t,n,i,a)<this._allDistMargin(t,n,i,s)&&t.children.sort(a)}_allDistMargin(t,n,i,a){t.children.sort(a);const s=this._toBBox,r=x(t,0,n,s),h=x(t,i-n,i,s);let o=g(r)+g(h);for(let c=n;c<i-n;c++){const l=t.children[c];_(r,t.leaf?s(l):l),o+=g(r)}for(let c=i-n-1;c>=n;c--){const l=t.children[c];_(h,t.leaf?s(l):l),o+=g(h)}return o}_condense(t){for(let n=t.length-1;n>=0;n--){const i=t.data[n];if(i.children.length===0)if(n>0){const a=t.data[n-1],s=a.children;s.splice(D(s,i,s.length,a.indexHint),1)}else this.clear();else f(i,this._toBBox)}}_initFormat(t){const n=["return a"," - b",";"];this._compareMinX=new Function("a","b",n.join(t[0])),this._compareMinY=new Function("a","b",n.join(t[1])),this._toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}function N(e,t,n,i){for(;i.push(t),t.leaf!==!0&&i.length-1!==n;){let a,s=1/0,r=1/0;for(let h=0,o=t.children.length;h<o;h++){const c=t.children[h],l=S(c),u=q(e,c)-l;u<r?(r=u,s=l<s?l:s,a=c):u===r&&l<s&&(s=l,a=c)}t=a||t.children[0]}return t}function F(e,t){let n=e;for(Y.clear();n;){if(n.leaf===!0)for(const i of n.children)t(i);else Y.pushArray(n.children);n=Y.pop()??null}}function O(e,t,n){for(let i=n;i>=0;i--)_(t.data[i],e)}function f(e,t){x(e,0,e.children.length,t,e)}function x(e,t,n,i,a){a||(a=new B([])),a.minX=1/0,a.minY=1/0,a.maxX=-1/0,a.maxY=-1/0;for(let s,r=t;r<n;r++)s=e.children[r],_(a,e.leaf?i(s):s);return a}function _(e,t){e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY)}function y(e,t){return e.minX-t.minX}function A(e,t){return e.minY-t.minY}function S(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function g(e){return e.maxX-e.minX+(e.maxY-e.minY)}function q(e,t){return(Math.max(t.maxX,e.maxX)-Math.min(t.minX,e.minX))*(Math.max(t.maxY,e.maxY)-Math.min(t.minY,e.minY))}function I(e,t){const n=Math.max(e.minX,t.minX),i=Math.max(e.minY,t.minY),a=Math.min(e.maxX,t.maxX),s=Math.min(e.maxY,t.maxY);return Math.max(0,a-n)*Math.max(0,s-i)}function b(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function M(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function H(e,t,n,i,a){const s=[t,n];for(;s.length;){const r=s.pop(),h=s.pop();if(r-h<=i)continue;const o=h+Math.ceil((r-h)/i/2)*i;J(e,o,h,r,a),s.push(h,o,o,r)}}const d=new w,Y=new w,m=new w,X=new w({deallocator:void 0});class Z{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}}class R extends Z{constructor(){super(...arguments),this.height=1,this.indexHint=new v}}class B extends R{constructor(t){super(),this.children=t,this.leaf=!0}}class E extends R{constructor(t){super(),this.children=t,this.leaf=!1}}export{T as N,Z as R};
