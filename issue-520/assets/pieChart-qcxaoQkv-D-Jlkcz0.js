import{k0 as Q}from"./main-CsB5uMDq.js";import{B as Te,U as Le,A as je,u as Ie,n as M}from"./Tick-DUHqbpyB-CnntSzUJ.js";import{m as Ne,ap as Ce,V as Oe,at as v,am as Re,n as ae,ax as Me,aw as F,ay as pe,az as ye,ao as me,c as A,aA as H,aB as S,aC as ve,ai as Se,H as be,aD as Be,U as we,B as re,ar as Fe,s as He}from"./Theme-rblUnB2V-BKxW-_KK.js";import{i as Ve}from"./ColorSet-DkIwOmgs-yJcXdrAA.js";import{o as Ye}from"./DefaultTheme-Bt5OI-Ht-D_C9fW55.js";class te extends Ne{constructor(){super(...arguments),Object.defineProperty(this,"_display",{enumerable:!0,configurable:!0,writable:!0,value:this._root._renderer.makeRadialText("",this.textStyle)})}_afterNew(){super._afterNew()}_beforeChanged(){super._beforeChanged(),this._display.clear(),this.isDirty("textType")&&(this._display.textType=this.get("textType"),this.markDirtyBounds()),this.isDirty("radius")&&(this._display.radius=this.get("radius"),this.markDirtyBounds()),this.isDirty("startAngle")&&(this._display.startAngle=(this.get("startAngle",0)+90)*ve,this.markDirtyBounds()),this.isDirty("inside")&&(this._display.inside=this.get("inside"),this.markDirtyBounds()),this.isDirty("orientation")&&(this._display.orientation=this.get("orientation"),this.markDirtyBounds()),this.isDirty("kerning")&&(this._display.kerning=this.get("kerning"),this.markDirtyBounds())}}Object.defineProperty(te,"className",{enumerable:!0,configurable:!0,writable:!0,value:"RadialText"}),Object.defineProperty(te,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:Ne.classNames.concat([te.className])});class ie extends Ce{constructor(){super(...arguments),Object.defineProperty(this,"_flipped",{enumerable:!0,configurable:!0,writable:!0,value:!1})}_afterNew(){this._textKeys.push("textType","kerning"),super._afterNew()}_makeText(){this._text=this.children.push(te.new(this._root,{}))}baseRadius(){const t=this.getPrivate("radius",0),e=this.getPrivate("innerRadius",0),i=this.get("baseRadius",0);return e+F(i,t-e)}radius(){const t=this.get("inside",!1);return this.baseRadius()+this.get("radius",0)*(t?-1:1)}_updateChildren(){if(super._updateChildren(),this.isDirty("baseRadius")||this.isPrivateDirty("radius")||this.isPrivateDirty("innerRadius")||this.isDirty("labelAngle")||this.isDirty("radius")||this.isDirty("inside")||this.isDirty("orientation")||this.isDirty("textType")){const t=this.get("textType","adjusted"),e=this.get("inside",!1),i=this.get("orientation");let s=Se(this.get("labelAngle",0));this._text.set("startAngle",this.get("labelAngle",0)),this._text.set("inside",e);const r=S(s),l=H(s);let a=this.baseRadius(),y=this.radius();if(this._display.angle=0,t=="circular")this.setAll({paddingTop:0,paddingBottom:0,paddingLeft:0,paddingRight:0}),this.setRaw("x",void 0),this.setRaw("y",void 0),this._text.set("orientation",i),this._text.set("radius",y);else{a==0&&(s=0,y=0);let o=y*l,n=y*r;t=="radial"?(this.setRaw("x",o),this.setRaw("y",n),s<90||s>270||i!="auto"?(this._display.angle=s,this._flipped=!1):(this._display.angle=s+180,this._flipped=!0),this._dirty.rotation=!1):t=="adjusted"?(this.setRaw("centerX",v),this.setRaw("centerY",v),this.setRaw("x",o),this.setRaw("y",n)):t=="regular"&&(this.setRaw("x",o),this.setRaw("y",n))}this.markDirtyPosition(),this.markDirtyBounds()}}_updatePosition(){const t=this.get("textType","regular"),e=this.get("inside",!1);let i=0,s=0,r=this.get("labelAngle",0),l=this.localBounds(),a=l.right-l.left,y=l.bottom-l.top;if(t=="radial"){if(this._flipped){let o=this.get("centerX");o instanceof ae&&(a*=1-2*o.value),i=a*H(r),s=a*S(r)}}else e||t!="adjusted"||(i=a/2*H(r),s=y/2*S(r));this.setRaw("dx",i),this.setRaw("dy",s),super._updatePosition()}get text(){return this._text}}Object.defineProperty(ie,"className",{enumerable:!0,configurable:!0,writable:!0,value:"RadialLabel"}),Object.defineProperty(ie,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:Ce.classNames.concat([ie.className])});const Ae=Math.abs,_=Math.atan2,B=Math.cos,Xe=Math.max,fe=Math.min,C=Math.sin,q=Math.sqrt,x=1e-12,K=Math.PI,ne=K/2,ze=2*K;function We(d){return d>1?0:d<-1?K:Math.acos(d)}function Pe(d){return d>=1?ne:d<=-1?-ne:Math.asin(d)}function qe(d){return d.innerRadius}function Ee(d){return d.outerRadius}function Ue(d){return d.startAngle}function Ke(d){return d.endAngle}function $e(d){return d&&d.padAngle}function Ze(d,t,e,i,s,r,l,a){var y=e-d,o=i-t,n=l-s,g=a-r,c=g*y-n*o;if(!(c*c<x))return[d+(c=(n*(t-r)-g*(d-s))/c)*y,t+c*o]}function ee(d,t,e,i,s,r,l){var a=d-e,y=t-i,o=(l?r:-r)/q(a*a+y*y),n=o*y,g=-o*a,c=d+n,h=t+g,m=e+n,f=i+g,P=(c+m)/2,b=(h+f)/2,u=m-c,p=f-h,R=u*u+p*p,T=s-r,w=c*f-m*h,L=(p<0?-1:1)*q(Xe(0,T*T*R-w*w)),j=(w*p-u*L)/R,I=(-w*u-p*L)/R,V=(w*p+u*L)/R,Y=(-w*u+p*L)/R,N=j-P,k=I-b,D=V-P,X=Y-b;return N*N+k*k>D*D+X*X&&(j=V,I=Y),{cx:j,cy:I,x01:-n,y01:-g,x11:j*(s/T-1),y11:I*(s/T-1)}}function Ge(){var d=qe,t=Ee,e=M(0),i=null,s=Ue,r=Ke,l=$e,a=null,y=Ie(o);function o(){var n,g,c=+d.apply(this,arguments),h=+t.apply(this,arguments),m=s.apply(this,arguments)-ne,f=r.apply(this,arguments)-ne,P=Ae(f-m),b=f>m;if(a||(a=n=y()),h<c&&(g=h,h=c,c=g),h>x)if(P>ze-x)a.moveTo(h*B(m),h*C(m)),a.arc(0,0,h,m,f,!b),c>x&&(a.moveTo(c*B(f),c*C(f)),a.arc(0,0,c,f,m,b));else{var u,p,R=m,T=f,w=m,L=f,j=P,I=P,V=l.apply(this,arguments)/2,Y=V>x&&(i?+i.apply(this,arguments):q(c*c+h*h)),N=fe(Ae(h-c)/2,+e.apply(this,arguments)),k=N,D=N;if(Y>x){var X=Pe(Y/c*C(V)),le=Pe(Y/h*C(V));(j-=2*X)>x?(w+=X*=b?1:-1,L-=X):(j=0,w=L=(m+f)/2),(I-=2*le)>x?(R+=le*=b?1:-1,T-=le):(I=0,R=T=(m+f)/2)}var z=h*B(R),W=h*C(R),$=c*B(L),Z=c*C(L);if(N>x){var O,G=h*B(T),J=h*C(T),oe=c*B(w),ue=c*C(w);if(P<K)if(O=Ze(z,W,oe,ue,G,J,$,Z)){var ce=z-O[0],he=W-O[1],de=G-O[0],ge=J-O[1],ke=1/C(We((ce*de+he*ge)/(q(ce*ce+he*he)*q(de*de+ge*ge)))/2),De=q(O[0]*O[0]+O[1]*O[1]);k=fe(N,(c-De)/(ke-1)),D=fe(N,(h-De)/(ke+1))}else k=D=0}I>x?D>x?(u=ee(oe,ue,z,W,h,D,b),p=ee(G,J,$,Z,h,D,b),a.moveTo(u.cx+u.x01,u.cy+u.y01),D<N?a.arc(u.cx,u.cy,D,_(u.y01,u.x01),_(p.y01,p.x01),!b):(a.arc(u.cx,u.cy,D,_(u.y01,u.x01),_(u.y11,u.x11),!b),a.arc(0,0,h,_(u.cy+u.y11,u.cx+u.x11),_(p.cy+p.y11,p.cx+p.x11),!b),a.arc(p.cx,p.cy,D,_(p.y11,p.x11),_(p.y01,p.x01),!b))):(a.moveTo(z,W),a.arc(0,0,h,R,T,!b)):a.moveTo(z,W),c>x&&j>x?k>x?(u=ee($,Z,G,J,c,-k,b),p=ee(z,W,oe,ue,c,-k,b),a.lineTo(u.cx+u.x01,u.cy+u.y01),k<N?a.arc(u.cx,u.cy,k,_(u.y01,u.x01),_(p.y01,p.x01),!b):(a.arc(u.cx,u.cy,k,_(u.y01,u.x01),_(u.y11,u.x11),!b),a.arc(0,0,c,_(u.cy+u.y11,u.cx+u.x11),_(p.cy+p.y11,p.cx+p.x11),b),a.arc(p.cx,p.cy,k,_(p.y11,p.x11),_(p.y01,p.x01),!b))):a.arc(0,0,c,L,w,b):a.lineTo($,Z)}else a.moveTo(0,0);if(a.closePath(),n)return a=null,n+""||null}return o.centroid=function(){var n=(+d.apply(this,arguments)+ +t.apply(this,arguments))/2,g=(+s.apply(this,arguments)+ +r.apply(this,arguments))/2-K/2;return[B(g)*n,C(g)*n]},o.innerRadius=function(n){return arguments.length?(d=typeof n=="function"?n:M(+n),o):d},o.outerRadius=function(n){return arguments.length?(t=typeof n=="function"?n:M(+n),o):t},o.cornerRadius=function(n){return arguments.length?(e=typeof n=="function"?n:M(+n),o):e},o.padRadius=function(n){return arguments.length?(i=n==null?null:typeof n=="function"?n:M(+n),o):i},o.startAngle=function(n){return arguments.length?(s=typeof n=="function"?n:M(+n),o):s},o.endAngle=function(n){return arguments.length?(r=typeof n=="function"?n:M(+n),o):r},o.padAngle=function(n){return arguments.length?(l=typeof n=="function"?n:M(+n),o):l},o.context=function(n){return arguments.length?(a=n??null,o):a},o}class se extends Oe{constructor(){super(...arguments),Object.defineProperty(this,"ix",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"iy",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_generator",{enumerable:!0,configurable:!0,writable:!0,value:Ge()})}_getTooltipPoint(){let t=this.get("tooltipX"),e=this.get("tooltipY"),i=0,s=0;re(t)&&(i=t),re(e)&&(s=e);let r=this.get("radius",0),l=this.get("innerRadius",0);return r+=this.get("dRadius",0),l+=this.get("dInnerRadius",0),l<0&&(l=r+l),t instanceof ae&&(i=this.ix*(l+(r-l)*t.value)),e instanceof ae&&(s=this.iy*(l+(r-l)*e.value)),this.get("arc")>=360&&l==0&&(i=0,s=0),{x:i,y:s}}_beforeChanged(){super._beforeChanged(),(this.isDirty("radius")||this.isDirty("arc")||this.isDirty("innerRadius")||this.isDirty("startAngle")||this.isDirty("dRadius")||this.isDirty("dInnerRadius")||this.isDirty("cornerRadius")||this.isDirty("shiftRadius"))&&(this._clear=!0)}_changed(){if(super._changed(),this._clear){let t=this.get("startAngle",0),e=this.get("arc",0);const i=this._generator;e<0&&(t+=e,e*=-1),e>.1&&i.cornerRadius(this.get("cornerRadius",0)),i.context(this._display);let s=this.get("radius",0),r=this.get("innerRadius",0);s+=this.get("dRadius",0),r+=this.get("dInnerRadius",0),r<0&&(r=s+r),i({innerRadius:r,outerRadius:s,startAngle:(t+90)*ve,endAngle:(t+e+90)*ve});let l=t+e/2;this.ix=H(l),this.iy=S(l);const a=this.get("shiftRadius",0);this.setRaw("dx",this.ix*a),this.setRaw("dy",this.iy*a),this.markDirtyPosition()}}}Object.defineProperty(se,"className",{enumerable:!0,configurable:!0,writable:!0,value:"Slice"}),Object.defineProperty(se,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:Oe.classNames.concat([se.className])});class Je extends Fe{setupDefaultRules(){super.setupDefaultRules();const t=this._root.interfaceColors,e=this.rule.bind(this);e("PercentSeries").setAll({legendLabelText:"{category}",legendValueText:"{valuePercentTotal.formatNumber('0.00p')}",colors:Ve.new(this._root,{}),width:we,height:we}),e("PieChart").setAll({radius:He(80),startAngle:-90,endAngle:270}),e("PieSeries").setAll({alignLabels:!0,startAngle:-90,endAngle:270}),e("PieSeries").states.create("hidden",{endAngle:-90,opacity:0}),e("Slice",["pie"]).setAll({position:"absolute",isMeasured:!1,x:0,y:0,toggleKey:"active",tooltipText:"{category}: {valuePercentTotal.formatNumber('0.00p')}",strokeWidth:1,strokeOpacity:1,role:"figure",lineJoin:"round"}),e("Slice",["pie"]).states.create("active",{shiftRadius:20,scale:1}),e("Slice",["pie"]).states.create("hoverActive",{scale:1.04}),e("Slice",["pie"]).states.create("hover",{scale:1.04}),e("RadialLabel",["pie"]).setAll({textType:"aligned",radius:10,text:"{category}: {valuePercentTotal.formatNumber('0.00p')}",paddingTop:5,paddingBottom:5,populateText:!0}),e("Tick",["pie"]).setAll({location:1}),e("SlicedChart").setAll({paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10}),e("FunnelSeries").setAll({startLocation:0,endLocation:1,orientation:"vertical",alignLabels:!0,sequencedInterpolation:!0}),e("FunnelSlice").setAll({interactive:!0,expandDistance:0}),e("FunnelSlice").states.create("hover",{expandDistance:.15}),e("Label",["funnel"]).setAll({populateText:!0,text:"{category}: {valuePercentTotal.formatNumber('0.00p')}",centerY:v}),e("Label",["funnel","horizontal"]).setAll({centerX:0,centerY:v,rotation:-90}),e("Label",["funnel","vertical"]).setAll({centerY:v,centerX:0}),e("Tick",["funnel"]).setAll({location:1}),e("FunnelSlice",["funnel","link"]).setAll({fillOpacity:.5,strokeOpacity:0,expandDistance:-.1}),e("FunnelSlice",["funnel","link","vertical"]).setAll({height:10}),e("FunnelSlice",["funnel","link","horizontal"]).setAll({width:10}),e("PyramidSeries").setAll({valueIs:"area"}),e("FunnelSlice",["pyramid","link"]).setAll({fillOpacity:.5}),e("FunnelSlice",["pyramid","link","vertical"]).setAll({height:0}),e("FunnelSlice",["pyramid","link","horizontal"]).setAll({width:0}),e("FunnelSlice",["pyramid"]).setAll({interactive:!0,expandDistance:0}),e("FunnelSlice",["pyramid"]).states.create("hover",{expandDistance:.15}),e("Label",["pyramid"]).setAll({populateText:!0,text:"{category}: {valuePercentTotal.formatNumber('0.00p')}",centerY:v}),e("Label",["pyramid","horizontal"]).setAll({centerX:0,centerY:v,rotation:-90}),e("Label",["pyramid","vertical"]).setAll({centerY:v,centerX:0}),e("Tick",["pyramid"]).setAll({location:1}),e("FunnelSlice",["pictorial"]).setAll({interactive:!0,tooltipText:"{category}: {valuePercentTotal.formatNumber('0.00p')}"}),e("Label",["pictorial"]).setAll({populateText:!0,text:"{category}: {valuePercentTotal.formatNumber('0.00p')}",centerY:v}),e("Label",["pictorial","horizontal"]).setAll({centerX:0,centerY:v,rotation:-90}),e("Label",["pictorial","vertical"]).setAll({centerY:v,centerX:0}),e("FunnelSlice",["pictorial","link"]).setAll({fillOpacity:.5,width:0,height:0}),e("Tick",["pictorial"]).setAll({location:.5});{const i=e("Graphics",["pictorial","background"]);i.setAll({fillOpacity:.2}),Ye(i,"fill",t,"alternativeBackground")}}}class E extends Te{_afterNew(){this._defaultThemes.push(Je.new(this._root)),super._afterNew(),this.chartContainer.children.push(this.seriesContainer),this.seriesContainer.children.push(this.bulletsContainer)}_processSeries(t){super._processSeries(t),this.seriesContainer.children.moveValue(this.bulletsContainer,this.seriesContainer.children.length-1)}}Object.defineProperty(E,"className",{enumerable:!0,configurable:!0,writable:!0,value:"PercentChart"}),Object.defineProperty(E,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:Te.classNames.concat([E.className])});class U extends Le{constructor(){super(...arguments),Object.defineProperty(this,"slicesContainer",{enumerable:!0,configurable:!0,writable:!0,value:this.children.push(be.new(this._root,{position:"absolute",isMeasured:!1}))}),Object.defineProperty(this,"labelsContainer",{enumerable:!0,configurable:!0,writable:!0,value:this.children.push(be.new(this._root,{position:"absolute",isMeasured:!1}))}),Object.defineProperty(this,"ticksContainer",{enumerable:!0,configurable:!0,writable:!0,value:this.children.push(be.new(this._root,{position:"absolute",isMeasured:!1}))}),Object.defineProperty(this,"_lLabels",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_rLabels",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_hLabels",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"slices",{enumerable:!0,configurable:!0,writable:!0,value:this.addDisposer(this._makeSlices())}),Object.defineProperty(this,"labels",{enumerable:!0,configurable:!0,writable:!0,value:this.addDisposer(this._makeLabels())}),Object.defineProperty(this,"ticks",{enumerable:!0,configurable:!0,writable:!0,value:this.addDisposer(this._makeTicks())})}makeSlice(t){const e=this.slicesContainer.children.push(this.slices.make());return e.on("fill",()=>{this.updateLegendMarker(t)}),e.on("fillPattern",()=>{this.updateLegendMarker(t)}),e.on("stroke",()=>{this.updateLegendMarker(t)}),e._setDataItem(t),t.set("slice",e),this.slices.push(e),e}makeLabel(t){const e=this.labelsContainer.children.push(this.labels.make());return e._setDataItem(t),t.set("label",e),this.labels.push(e),e}_shouldMakeBullet(t){return t.get("value")!=null}makeTick(t){const e=this.ticksContainer.children.push(this.ticks.make());return e._setDataItem(t),t.set("tick",e),this.ticks.push(e),e}_afterNew(){this.fields.push("category","fill"),super._afterNew()}_onDataClear(){const t=this.get("colors");t&&t.reset();const e=this.get("patterns");e&&e.reset()}_prepareChildren(){if(super._prepareChildren(),this._lLabels=[],this._rLabels=[],this._hLabels=[],this._valuesDirty){let t=0,e=0,i=0,s=1/0,r=0;A(this._dataItems,l=>{let a=l.get("valueWorking",0);t+=a,e+=Math.abs(a)}),A(this._dataItems,l=>{let a=l.get("valueWorking",0);a>i&&(i=a),a<s&&(s=a),r++;let y=a/e;e==0&&(y=0),l.setRaw("valuePercentTotal",100*y)}),this.setPrivateRaw("valueLow",s),this.setPrivateRaw("valueHigh",i),this.setPrivateRaw("valueSum",t),this.setPrivateRaw("valueAverage",t/r),this.setPrivateRaw("valueAbsoluteSum",e)}}show(t){const e=Object.create(null,{show:{get:()=>super.show}});return Q(this,void 0,void 0,function*(){let i=[];i.push(e.show.call(this,t)),i.push(this._sequencedShowHide(!0,t)),yield Promise.all(i)})}hide(t){const e=Object.create(null,{hide:{get:()=>super.hide}});return Q(this,void 0,void 0,function*(){let i=[];i.push(e.hide.call(this,t)),i.push(this._sequencedShowHide(!1,t)),yield Promise.all(i)})}_updateChildren(){super._updateChildren(),this._valuesDirty&&A(this._dataItems,t=>{t.get("label").text.markDirtyText()}),(this.isDirty("legendLabelText")||this.isDirty("legendValueText"))&&A(this._dataItems,t=>{this.updateLegendValue(t)}),this._arrange()}_arrange(){this._arrangeDown(this._lLabels),this._arrangeUp(this._lLabels),this._arrangeDown(this._rLabels),this._arrangeUp(this._rLabels),this._arrangeLeft(this._hLabels),this._arrangeRight(this._hLabels),A(this.dataItems,t=>{this._updateTick(t)})}_afterChanged(){super._afterChanged(),this._arrange()}processDataItem(t){if(super.processDataItem(t),t.get("fill")==null){let e=this.get("colors");e&&t.setRaw("fill",e.next())}if(t.get("fillPattern")==null){let e=this.get("patterns");e&&t.setRaw("fillPattern",e.next())}}showDataItem(t,e){const i=Object.create(null,{showDataItem:{get:()=>super.showDataItem}});return Q(this,void 0,void 0,function*(){const s=[i.showDataItem.call(this,t,e)];re(e)||(e=this.get("stateAnimationDuration",0));const r=this.get("stateAnimationEasing");let l=t.get("value");const a=t.animate({key:"valueWorking",to:l,duration:e,easing:r});a&&s.push(a.waitForStop());const y=t.get("tick");y&&s.push(y.show(e));const o=t.get("label");o&&s.push(o.show(e));const n=t.get("slice");n&&s.push(n.show(e)),n.get("active")&&n.states.applyAnimate("active"),yield Promise.all(s)})}hideDataItem(t,e){const i=Object.create(null,{hideDataItem:{get:()=>super.hideDataItem}});return Q(this,void 0,void 0,function*(){const s=[i.hideDataItem.call(this,t,e)],r=this.states.create("hidden",{});re(e)||(e=r.get("stateAnimationDuration",this.get("stateAnimationDuration",0)));const l=r.get("stateAnimationEasing",this.get("stateAnimationEasing")),a=t.animate({key:"valueWorking",to:0,duration:e,easing:l});a&&s.push(a.waitForStop());const y=t.get("tick");y&&s.push(y.hide(e));const o=t.get("label");o&&s.push(o.hide(e));const n=t.get("slice");n.hideTooltip(),n&&s.push(n.hide(e)),yield Promise.all(s)})}disposeDataItem(t){super.disposeDataItem(t);let e=t.get("label");e&&(this.labels.removeValue(e),e.dispose());let i=t.get("tick");i&&(this.ticks.removeValue(i),i.dispose());let s=t.get("slice");s&&(this.slices.removeValue(s),s.dispose())}hoverDataItem(t){const e=t.get("slice");e&&!e.isHidden()&&e.hover()}unhoverDataItem(t){const e=t.get("slice");e&&e.unhover()}updateLegendMarker(t){if(t){const e=t.get("slice");if(e){const i=t.get("legendDataItem");if(i){const s=i.get("markerRectangle");A(Be,r=>{e.get(r)!=null&&s.set(r,e.get(r))})}}}}_arrangeDown(t){if(t){let e=this._getNextDown();t.sort((i,s)=>i.y>s.y?1:i.y<s.y?-1:0),A(t,i=>{const s=i.label.adjustedLocalBounds();let r=s.top;i.y+r<e&&(i.y=e-r),i.label.set("y",i.y),e=i.y+s.bottom})}}_getNextUp(){return this.labelsContainer.maxHeight()}_getNextDown(){return 0}_arrangeUp(t){if(t){let e=this._getNextUp();t.sort((i,s)=>i.y<s.y?1:i.y>s.y?-1:0),A(t,i=>{const s=i.label.adjustedLocalBounds();let r=s.bottom;i.y+r>e&&(i.y=e-r),i.label.set("y",i.y),e=i.y+s.top})}}_arrangeRight(t){if(t){let e=0;t.sort((i,s)=>i.y>s.y?1:i.y<s.y?-1:0),A(t,i=>{const s=i.label.adjustedLocalBounds();let r=s.left;i.y+r<e&&(i.y=e-r),i.label.set("x",i.y),e=i.y+s.right})}}_arrangeLeft(t){if(t){let e=this.labelsContainer.maxWidth();t.sort((i,s)=>i.y<s.y?1:i.y>s.y?-1:0),A(t,i=>{const s=i.label.adjustedLocalBounds();let r=s.right;i.y+r>e&&(i.y=e-r),i.label.set("x",i.y),e=i.y+s.left})}}_updateSize(){super._updateSize(),this.markDirty()}_updateTick(t){}_dispose(){super._dispose();const t=this.chart;t&&t.series.removeValue(this)}}Object.defineProperty(U,"className",{enumerable:!0,configurable:!0,writable:!0,value:"PercentSeries"}),Object.defineProperty(U,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:Le.classNames.concat([U.className])});class _e extends E{constructor(){super(...arguments),Object.defineProperty(this,"_maxRadius",{enumerable:!0,configurable:!0,writable:!0,value:1})}_afterNew(){super._afterNew(),this.seriesContainer.setAll({x:v,y:v})}_prepareChildren(){super._prepareChildren();const t=this.chartContainer,e=t.innerWidth(),i=t.innerHeight(),s=this.get("startAngle",0),r=this.get("endAngle",0),l=this.get("innerRadius");let a=Re(0,0,s,r,1);const y=e/(a.right-a.left),o=i/(a.bottom-a.top);let n={left:0,right:0,top:0,bottom:0};if(l instanceof ae){let h=l.value,m=Math.min(y,o);h=Math.max(m*h,m-Math.min(i,e))/m,n=Re(0,0,s,r,h),this.setPrivateRaw("irModifyer",h/l.value)}a=Me([a,n]);const g=this._maxRadius;this._maxRadius=Math.min(y,o);const c=F(this.get("radius",0),this._maxRadius);this.seriesContainer.setAll({dy:-c*(a.bottom+a.top)/2,dx:-c*(a.right+a.left)/2}),(this.isDirty("startAngle")||this.isDirty("endAngle")||g!=this._maxRadius)&&this.series.each(h=>{h._markDirtyKey("startAngle")}),(this.isDirty("innerRadius")||this.isDirty("radius"))&&this.series.each(h=>{h._markDirtyKey("innerRadius")})}radius(t){let e=F(this.get("radius",0),this._maxRadius),i=F(this.get("innerRadius",0),e);if(t){let s=this.series.indexOf(t),r=this.series.length,l=t.get("radius");return l!=null?i+F(l,e-i):i+(e-i)/r*(s+1)}return e}innerRadius(t){const e=this.radius();let i=F(this.get("innerRadius",0),e);if(i<0&&(i=e+i),t){let s=this.series.indexOf(t),r=this.series.length,l=t.get("innerRadius");return l!=null?i+F(l,e-i):i+(e-i)/r*s}return i}_updateSize(){super._updateSize(),this.markDirtyKey("radius")}}Object.defineProperty(_e,"className",{enumerable:!0,configurable:!0,writable:!0,value:"PieChart"}),Object.defineProperty(_e,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:E.classNames.concat([_e.className])});class xe extends U{_makeSlices(){return new pe(ye.new({}),()=>se._new(this._root,{themeTags:me(this.slices.template.get("themeTags",[]),["pie","series"])},[this.slices.template]))}_makeLabels(){return new pe(ye.new({}),()=>ie._new(this._root,{themeTags:me(this.labels.template.get("themeTags",[]),["pie","series"])},[this.labels.template]))}_makeTicks(){return new pe(ye.new({}),()=>je._new(this._root,{themeTags:me(this.ticks.template.get("themeTags",[]),["pie","series"])},[this.ticks.template]))}processDataItem(t){super.processDataItem(t);const e=this.makeSlice(t);e.on("scale",()=>{this._updateTick(t)}),e.on("shiftRadius",()=>{this._updateTick(t)}),e.events.on("positionchanged",()=>{this._updateTick(t)});const i=this.makeLabel(t);i.events.on("positionchanged",()=>{this._updateTick(t)}),this.makeTick(t),e.events.on("positionchanged",()=>{i.markDirty()})}_getNextUp(){const t=this.chart;return t?t._maxRadius:this.labelsContainer.maxHeight()/2}_getNextDown(){const t=this.chart;return t?-t._maxRadius:-this.labelsContainer.maxHeight()/2}_prepareChildren(){super._prepareChildren();const t=this.chart;if(t){if(this.isDirty("alignLabels")){let e=this.labels.template;if(this.get("alignLabels"))e.set("textType","aligned");else{let i=e.get("textType");i!=null&&i!="aligned"||e.set("textType","adjusted")}}if(this._valuesDirty||this.isDirty("radius")||this.isDirty("innerRadius")||this.isDirty("startAngle")||this.isDirty("endAngle")||this.isDirty("alignLabels")){this.markDirtyBounds();const e=this.get("startAngle",t.get("startAngle",-90)),i=this.get("endAngle",t.get("endAngle",270))-e;let s=e;const r=t.radius(this);this.setPrivateRaw("radius",r);let l=t.innerRadius(this)*t.getPrivate("irModifyer",1);l<0&&(l=r+l),A(this._dataItems,a=>{this.updateLegendValue(a);let y=i*a.get("valuePercentTotal")/100;const o=a.get("slice");if(o){o.set("radius",r),o.set("innerRadius",l),o.set("startAngle",s),o.set("arc",y);const c=a.get("fill");o._setDefault("fill",c),o._setDefault("stroke",c);const h=a.get("fillPattern");o._setDefault("fillPattern",h)}let n=Se(s+y/2);const g=a.get("label");if(g&&(g.setPrivate("radius",r),g.setPrivate("innerRadius",l),g.set("labelAngle",n),g.get("textType")=="aligned")){let c=r+g.get("radius",0),h=r*S(n);n>90&&n<=270?(g.isHidden()||g.isHiding()||this._lLabels.push({label:g,y:h}),c*=-1,c-=this.labelsContainer.get("paddingLeft",0),g.set("centerX",we),g.setPrivateRaw("left",!0)):(g.isHidden()||g.isHiding()||this._rLabels.push({label:g,y:h}),c+=this.labelsContainer.get("paddingRight",0),g.set("centerX",0),g.setPrivateRaw("left",!1)),g.set("x",c),g.set("y",r*S(n))}s+=y,this._updateTick(a)})}}}_updateTick(t){const e=t.get("tick"),i=t.get("label"),s=t.get("slice"),r=e.get("location",1);if(e&&i&&s){const l=(s.get("shiftRadius",0)+s.get("radius",0))*s.get("scale",1)*r,a=i.get("labelAngle",0),y=H(a),o=S(a),n=this.labelsContainer,g=n.get("paddingLeft",0),c=n.get("paddingRight",0);let h=0,m=0;h=i.x(),m=i.y();let f=[];if(h!=0||m!=0){if(i.get("textType")=="circular"){const b=i.radius()-i.get("paddingBottom",0),u=i.get("labelAngle",0);h=b*H(u),m=b*S(u)}let P=-c;i.getPrivate("left")&&(P=g),f=[{x:s.x()+l*y,y:s.y()+l*o},{x:h+P,y:m},{x:h,y:m}]}e.set("points",f)}}_positionBullet(t){const e=t.get("sprite");if(e){const i=e.dataItem.get("slice");if(i){const s=i.get("innerRadius",0),r=i.get("radius",0),l=i.get("startAngle",0)+i.get("arc",0)*t.get("locationX",.5),a=s+(r-s)*t.get("locationY",.5);e.setAll({x:H(l)*a,y:S(l)*a})}}}}Object.defineProperty(xe,"className",{enumerable:!0,configurable:!0,writable:!0,value:"PieSeries"}),Object.defineProperty(xe,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:U.classNames.concat([xe.className])});export{_e as PieChartAm5,xe as PieSeriesAm5};
