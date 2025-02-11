import{P as a,dL as O,v as t,S as s,ac as X,i as _,ar as w,ad as ae,eB as G,eC as ue,bz as L,bB as pe,aa as K,e as T,eo as W,eD as ee,aq as ye,a1 as M,d4 as ce,b0 as de,aU as he,cN as me,cO as fe,f as Y,ex as ge,o as be,eE as ve,eF as we,ev as Se,ey as xe}from"./main-BS_S-e9u.js";import{$ as A,h as je,E as R,L as _e,A as Ie,d as te,o as ie,a as Ee,G as Ve,B as Re}from"./UniqueValueRenderer-fS5V0Ej1-BsIfU08s.js";import{b as De}from"./LRUCache-C3erQTWv-LAE718Ut.js";import{m as Ne}from"./Version-CoKzbupV-C6RARytV.js";import{o as Me}from"./FieldsIndex-HmzMbJQG-7QEvHAg2.js";import{c as Pe}from"./OverrideHelper-DWRbVlj1-BTFkct6k.js";import{V as $e,v as Te}from"./utils-SPbpQbmm-Ctva5VNj.js";import{d as qe,y as Ce,c as Oe}from"./heatmapUtils-seiMkkkR-CP6NTe4S.js";import{w as Le}from"./RendererLegendOptions-K3md58-X-C0QQMYNI.js";import"./diffUtils-Cz3Fi8Xb-DF_vMei_.js";import"./colorRamps-q0bZVhs2-Bm-pAASz.js";import"./sizeVariableUtils-t52KcLLi-D0hbQF8b.js";import"./visualVariableUtils-D3kZJRyn-BeGaJ4cr.js";import"./compilerUtils-CV1QYWI8-ea-VbZeJ.js";import"./lengthUtils-DKpMe5qR-tCnx8Kt_.js";import"./styleUtils-BtpNqZyT-Di0b40-e.js";import"./UnknownTimeZone-C--TOcPG-B_2oVHOl.js";import"./colorUtils-Cthpxcks-B7ZG6XFV.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import"./common-CYWrYyJl-E8-sukrT.js";import"./vec4f64-hf2nxvhQ-CaAr8PTM.js";import"./quantizationUtils-bJy1cRwp-tFD0yOo9.js";import"./enums-CpSG_SL3-BMD3Tb1v.js";const Z="esri.renderers.support.DictionaryLoader",Ae={type:"CIMSimpleLineCallout",lineSymbol:{type:"CIMLineSymbol",symbolLayers:[{type:"CIMSolidStroke",width:.5,color:[0,0,0,255]}]}};let se=class{constructor(e,i,r){this.config=null,this.fieldMap=null,this.url=null,this._ongoingRequests=new Map,this._symbolCache=new De(100),this._dictionaryVersion=null,this._fieldIndex=null,this._dictionaryPromise=null,this.url=e,this.config=i,this.fieldMap=r}getSymbolFields(){return this._symbolFields}async getSymbolAsync(e,i){let r;this._dictionaryPromise||(this._dictionaryPromise=this.fetchResources(i));try{r=await this._dictionaryPromise}catch(y){if(he(y))return this._dictionaryPromise=null,null}const o=this._dictionaryVersion?.greaterEqual(4,0),u={};if(this.fieldMap)for(const y of this._symbolFields){const d=$e(this.fieldMap[y],this._fieldIndex);if(d){const n=e.attributes[d];u[y]=o?n:n!=null?""+e.attributes[d]:""}else u[y]=""}let l=null;try{l=r?.(u,i)}catch{return null}if(!l||typeof l!="string"||l==="invalid")return null;const c=l.split(";"),b=[],f=[];for(let y=0;y<c.length;y++){const d=c[y];if(d){if(d.includes("po:")){const n=d.slice(3).split("|");if(n.length===3){const x=n[0],j=n[1];let g=n[2];const P="countrylabel";if(x===P&&j==="TextString"){if(this.fieldMap!=null){let v=this.fieldMap[P];v==null&&(v=P,this.fieldMap[v]=v),e.attributes[v]=g}continue}if(j==="DashTemplate")g=g.split(" ").map(v=>Number(v));else if(j==="Color"){const v=new w(g).toRgba();g=[v[0],v[1],v[2],255*v[3]]}else g=Number(g);f.push({primitiveName:x,propertyName:j,value:g,defaultValue:null})}}else if(d.includes("|")){for(const n of d.split("|"))if(this._itemNames.has(n)){b.push(n);break}}else if(this._itemNames.has(d))b.push(d);else if(y===0){b.length=0;let n="Invalid_P";e.geometry!=null&&(me(e.geometry)?n="Invalid_A":fe(e.geometry)&&(n="Invalid_L")),b.push(n);break}}}const D=e.geometry==null||!e.geometry.hasZ&&e.geometry.type==="point";return this._cimPartsToCIMSymbol(e,b,f,D,i)}async fetchResources(e){if(this._dictionaryPromise)return this._dictionaryPromise;if(!this.url)return void M.getLogger(Z).error("no valid URL!");const i=Y(this.url+"/resources/styles/dictionary-info.json",{responseType:"json",query:{f:"json"},signal:e!=null?e.signal:null}),[{data:r}]=await Promise.all([i,ge()]);if(!r)throw this._dictionaryPromise=null,new be("esri.renderers.DictionaryRenderer","Bad dictionary data!");const{authoringInfo:o,dictionary_version:u,expression:l,itemsNames:c}=r,b=l;let f=!1;u&&(this._dictionaryVersion=Ne.parse(u),f=this._dictionaryVersion.greaterEqual(4,0)),this._refSymbolUrlTemplate=this.url+"/"+r.cimRefTemplateUrl,this._itemNames=new Set(c),this._symbolFields=o.symbol;const D={};if(this.config){const n=this.config;for(const x in n)D[x]=n[x]}if(o.configuration)for(const n of o.configuration)D.hasOwnProperty(n.name)||(D[n.name]=n.value);const y=[];if(e?.fields&&this.fieldMap)for(const n in this.fieldMap){const x=this.fieldMap[n],j=e.fields.filter(g=>g.name.toLowerCase()===x?.toLowerCase());j.length>0&&y.push({...j[0],type:f?j[0].type:"esriFieldTypeString"})}y.length>0&&(this._fieldIndex=new Me(y));const d=ve(b,e!=null?e.spatialReference:null,y,D).then(n=>{const x={scale:0};return(j,g)=>{if(n==null)return null;const P=n.repurposeFeature({geometry:null,attributes:j});return x.scale=g!=null?g.scale??void 0:void 0,n.evaluate({$feature:P,$view:x},n.services)}}).catch(n=>(M.getLogger(Z).error("Creating dictionary expression failed:",n),null));return this._dictionaryPromise=d,d}async _cimPartsToCIMSymbol(e,i,r,o,u){const l=new Array(i.length);for(let f=0;f<i.length;f++)l[f]=this._getSymbolPart(i[f],u);let c=await Promise.all(l);const b=this.fieldMap;if(b){c=a(c);for(const f of c)Pe.applyDictionaryTextOverrides(f,e,b,this._fieldIndex,Te(f))}return new we({data:Fe(c,r,o)})}async _getSymbolPart(e,i){const r=this._symbolCache.get(e);if(r)return r;if(this._ongoingRequests.has(e))return this._ongoingRequests.get(e).then(l=>l.data);const o=this._refSymbolUrlTemplate.replaceAll(/\{itemName\}/gi,e),u=Y(o,{responseType:"json",query:{f:"json"},...i});this._ongoingRequests.set(e,u),u.finally(()=>this._ongoingRequests.delete(e));try{const l=await u;return this._symbolCache.put(e,l.data),l.data}catch(l){throw l}}};function Fe(e,i,r){if(!e||e.length===0)return null;const o={...e[0]};if(e.length>1){o.effects=null,o.symbolLayers=[];for(const u of e){const l=u;if(l.effects!=null)for(const c of l.symbolLayers)c.effects==null?c.effects=l.effects:c.effects.unshift(...l.effects);o.symbolLayers.unshift(...l.symbolLayers)}}return r&&(o.callout=Ae),{type:"CIMSymbolReference",symbol:o,primitiveOverrides:i}}var F;let S=F=class extends A(R){constructor(e){super(e),this.config=null,this.fieldMap=null,this.scaleExpression=null,this.scaleExpressionTitle=null,this.url=null,this.type="dictionary"}get _loader(){return new se(this.url,this.config,this.fieldMap)}writeData(e,i){e&&(i.scalingExpressionInfo={expression:e,returnType:"number"})}writeVisualVariables(e,i,r,o){o?.origin||super.writeVisualVariables(e,i,r,o)}clone(){return new F({config:a(this.config),scaleExpression:this.scaleExpression,scaleExpressionTitle:this.scaleExpressionTitle,fieldMap:a(this.fieldMap),url:a(this.url),visualVariables:a(this.visualVariables)})}async getSymbolAsync(e,i){return this._loader.getSymbolAsync(e,i)}async collectRequiredFields(e,i){await this.collectVVRequiredFields(e,i),this.scaleExpression&&await O(e,i,this.scaleExpression);for(const r in this.fieldMap){const o=this.fieldMap[r];i.has(o)&&e.add(o)}}get arcadeRequired(){return!0}getSymbol(){return null}getSymbols(){return[]}getAttributeHash(){return this.visualVariables?.reduce((e,i)=>e+i.getAttributeHash(),"")??""}getMeshHash(){return`${this.url}-${JSON.stringify(this.fieldMap)}`}getSymbolFields(){return this._loader.getSymbolFields()}};t([s({type:se})],S.prototype,"_loader",null),t([s({type:Object,json:{read:{source:"configuration"},write:{target:"configuration"}}})],S.prototype,"config",void 0),t([s({type:Object,json:{write:!0}})],S.prototype,"fieldMap",void 0),t([s({type:String,json:{read:{source:"scalingExpressionInfo.expression"},write:!0}})],S.prototype,"scaleExpression",void 0),t([X("scaleExpression")],S.prototype,"writeData",null),t([s({type:String,json:{read:{source:"scalingExpressionInfo.title"},write:{target:"scalingExpressionInfo.title",overridePolicy(e){return{enabled:!!e&&!!this.scaleExpression}}}}})],S.prototype,"scaleExpressionTitle",void 0),t([s({type:String,json:{write:!0}})],S.prototype,"url",void 0),t([X("visualVariables")],S.prototype,"writeVisualVariables",null),S=F=t([_("esri.renderers.DictionaryRenderer")],S);const He=S;var H;let I=H=class extends T{constructor(e){super(e),this.color=null,this.field=null,this.label=null,this.valueExpression=null,this.valueExpressionTitle=null}castField(e){return e==null?e:typeof e=="function"?(M.getLogger(this).error(".field: field must be a string value"),null):Se(e)}getAttributeHash(){return`${this.field}-${this.valueExpression}`}clone(){return new H({color:this.color?.clone(),field:this.field,label:this.label,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle})}};t([s({type:w,json:{type:[Number],write:!0}})],I.prototype,"color",void 0),t([s({type:String,json:{write:!0}})],I.prototype,"field",void 0),t([ae("field")],I.prototype,"castField",null),t([s({type:String,json:{write:!0}})],I.prototype,"label",void 0),t([s({type:String,json:{write:!0}})],I.prototype,"valueExpression",void 0),t([s({type:String,json:{write:!0}})],I.prototype,"valueExpressionTitle",void 0),I=H=t([_("esri.renderers.support.AttributeColorInfo")],I);const re=I;var k;let q=k=class extends T{constructor(){super(...arguments),this.unit=null}clone(){return new k({unit:this.unit})}};t([s({type:String,json:{write:!0}})],q.prototype,"unit",void 0),q=k=t([_("esri.renderers.support.DotDensityLegendOptions")],q);const ke=q;var z;let h=z=class extends A(R){constructor(e){super(e),this.attributes=null,this.backgroundColor=new w([0,0,0,0]),this.dotBlendingEnabled=!0,this.dotShape="square",this.dotSize=1,this.legendOptions=null,this.outline=new G,this.dotValue=null,this.referenceScale=null,this.seed=1,this.type="dot-density"}calculateDotValue(e){if(this.referenceScale==null)return this.dotValue;const i=e/this.referenceScale*this.dotValue;return i<1?1:i}getSymbol(){return new ue({outline:this.outline})}async getSymbolAsync(){return this.getSymbol()}getSymbols(){return[this.getSymbol()]}getAttributeHash(){return this.attributes?.reduce((e,i)=>e+i.getAttributeHash(),"")??""}getMeshHash(){return JSON.stringify(this.outline)}clone(){return new z({attributes:a(this.attributes),backgroundColor:a(this.backgroundColor),dotBlendingEnabled:a(this.dotBlendingEnabled),dotShape:a(this.dotShape),dotSize:a(this.dotSize),dotValue:a(this.dotValue),legendOptions:a(this.legendOptions),outline:a(this.outline),referenceScale:a(this.referenceScale),seed:a(this.seed),visualVariables:a(this.visualVariables),authoringInfo:a(this.authoringInfo)})}getControllerHash(){return`${this.attributes?.map(e=>e.field||e.valueExpression||"")}-${this.outline&&JSON.stringify(this.outline.toJSON())||""}`}async collectRequiredFields(e,i){await this.collectVVRequiredFields(e,i);for(const r of this.attributes??[])r.valueExpression&&await O(e,i,r.valueExpression),r.field&&e.add(r.field)}};t([s({type:[re],json:{write:!0}})],h.prototype,"attributes",void 0),t([s({type:w,json:{write:!0}})],h.prototype,"backgroundColor",void 0),t([s({type:Boolean,json:{write:!0}})],h.prototype,"dotBlendingEnabled",void 0),t([s({type:String,json:{write:!1}})],h.prototype,"dotShape",void 0),t([s({type:Number,json:{write:!0}})],h.prototype,"dotSize",void 0),t([s({type:ke,json:{write:!0}})],h.prototype,"legendOptions",void 0),t([s({type:G,json:{default:null,write:!0}})],h.prototype,"outline",void 0),t([s({type:Number,json:{write:!0}})],h.prototype,"dotValue",void 0),t([s({type:Number,json:{write:!0}})],h.prototype,"referenceScale",void 0),t([s({type:Number,json:{write:!0}})],h.prototype,"seed",void 0),t([L({dotDensity:"dot-density"})],h.prototype,"type",void 0),h=z=t([_("esri.renderers.DotDensityRenderer")],h);const ze=h;var B;let $=B=class extends T{constructor(e){super(e),this.color=null,this.ratio=null}clone(){return new B({color:this.color&&this.color.clone(),ratio:this.ratio})}};t([s({type:w,json:{type:[pe],default:null,write:!0}})],$.prototype,"color",void 0),t([s({type:Number,json:{write:!0}})],$.prototype,"ratio",void 0),$=B=t([_("esri.renderers.support.HeatmapColorStop")],$);const C=$;let N=class extends K(T){constructor(){super(...arguments),this.minLabel=null,this.maxLabel=null,this.title=null}};t([s({type:String,json:{write:!0}})],N.prototype,"minLabel",void 0),t([s({type:String,json:{write:!0}})],N.prototype,"maxLabel",void 0),t([s({type:String,json:{write:!0}})],N.prototype,"title",void 0),N=t([_("esri.renderers.support.HeatmapLegendOptions")],N);var J;function Q(e){if(e!=null){const{maxDensity:i,minDensity:r,radius:o}=e;if(i!=null||r!=null||o!=null){const{blurRadius:u,maxPixelIntensity:l,minPixelIntensity:c,...b}=e;return b}}return e}let p=J=class extends R{constructor(e){super(e),this.authoringInfo=null,this.colorStops=[new C({ratio:0,color:new w("rgba(255, 140, 0, 0)")}),new C({ratio:.75,color:new w("rgba(255, 140, 0, 1)")}),new C({ratio:.9,color:new w("rgba(255, 0,   0, 1)")})],this.field=null,this.legendOptions=null,this.maxDensity=.04,this.minDensity=0,this.radius=18,this.referenceScale=0,this.type="heatmap",this.valueExpression=null,this.valueExpressionTitle=null}normalizeCtorArgs(e){return Q(e)}get blurRadius(){return qe(this.radius)}set blurRadius(e){const i=this.maxPixelIntensity,r=this.minPixelIntensity;this._set("radius",Ce(e)),this._set("maxDensity",i*this._pixelIntensityToDensity),this._set("minDensity",r*this._pixelIntensityToDensity)}get maxPixelIntensity(){return this.maxDensity/this._pixelIntensityToDensity}set maxPixelIntensity(e){this._set("maxDensity",e*this._pixelIntensityToDensity)}get minPixelIntensity(){return this.minDensity/this._pixelIntensityToDensity}set minPixelIntensity(e){this._set("minDensity",e*this._pixelIntensityToDensity)}get _pixelIntensityToDensity(){return 24/(Oe**2*this.blurRadius**4)}read(e,i){e=Q(e),super.read(e,i)}getSymbol(){return new ee}async getSymbolAsync(){return this.getSymbol()}getSymbols(){return[this.getSymbol()]}async collectRequiredFields(e,i){const r=this.field,o=this.valueExpression;r&&typeof r=="string"&&xe(e,i,r),o&&typeof o=="string"&&await O(e,i,o)}getAttributeHash(){return""}getMeshHash(){return`${JSON.stringify(this.colorStops)}.${this.blurRadius}.${this.field}`}clone(){return new J({authoringInfo:this.authoringInfo&&this.authoringInfo.clone(),colorStops:a(this.colorStops),field:this.field,legendOptions:a(this.legendOptions),maxDensity:this.maxDensity,minDensity:this.minDensity,radius:this.radius,referenceScale:this.referenceScale,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle})}};t([s({type:je,json:{write:!0,origins:{"web-scene":{write:!1,read:!1}}}})],p.prototype,"authoringInfo",void 0),t([s({type:Number,json:{origins:{"portal-item":{write:!0},"web-map":{write:!0}}}})],p.prototype,"blurRadius",null),t([s({type:[C],json:{write:!0}})],p.prototype,"colorStops",void 0),t([s({type:String,json:{write:!0}})],p.prototype,"field",void 0),t([s({type:N,json:{write:!0}})],p.prototype,"legendOptions",void 0),t([s({type:Number,json:{write:!0}})],p.prototype,"maxDensity",void 0),t([s({type:Number,json:{origins:{"portal-item":{write:!0},"web-map":{write:!0}}}})],p.prototype,"maxPixelIntensity",null),t([s({type:Number,json:{write:!0}})],p.prototype,"minDensity",void 0),t([s({type:Number,json:{origins:{"portal-item":{write:!0},"web-map":{write:!0}}}})],p.prototype,"minPixelIntensity",null),t([s({type:Number,cast:W,json:{write:!0}})],p.prototype,"radius",void 0),t([s({type:Number,range:{min:0},json:{default:0,write:!0}})],p.prototype,"referenceScale",void 0),t([L({heatmap:"heatmap"})],p.prototype,"type",void 0),t([s({type:String,json:{write:!0,origins:{"web-document":{write:!1},"portal-item":{write:!1}}}})],p.prototype,"valueExpression",void 0),t([s({type:String})],p.prototype,"valueExpressionTitle",void 0),t([s({readOnly:!0})],p.prototype,"_pixelIntensityToDensity",null),p=J=t([_("esri.renderers.HeatmapRenderer")],p);const oe=p;let V=class extends K(T){constructor(){super(...arguments),this.color=new w([0,0,0,0]),this.label=null,this.threshold=0}};t([s({type:w,json:{write:!0}})],V.prototype,"color",void 0),t([s({type:String,json:{write:!0}})],V.prototype,"label",void 0),t([s({type:Number,range:{min:0,max:1},json:{write:!0}})],V.prototype,"threshold",void 0),V=t([_("esri.renderers.support.OthersCategory")],V);const Be={base:Ee,key:"type",typeMap:{size:Ve,opacity:Re}};let m=class extends A(K(R)){constructor(e){super(e),this.attributes=null,this.backgroundFillSymbol=null,this.defaultColor=new w([0,0,0,0]),this.defaultLabel=null,this.holePercentage=0,this.othersCategory=new V,this.legendOptions=null,this.outline=null,this.size=12,this.type="pie-chart",this.visualVariables=null}getSymbol(){return new ee({size:this.size?this.size/2+(this.outline?.width||0):0})}async getSymbolAsync(){return this.getSymbol()}getSymbols(){return[this.getSymbol(),this.backgroundFillSymbol].filter(ye)}getAttributeHash(){return this.visualVariables?.reduce((e,i)=>e+i.getAttributeHash(),"")??""}getMeshHash(){return this.getSymbols().reduce((e,i)=>e+JSON.stringify(i),"")}async collectRequiredFields(e,i){await this.collectVVRequiredFields(e,i);for(const r of this.attributes)r.valueExpression&&await O(e,i,r.valueExpression),r.field&&e.add(r.field)}};t([s({type:[re],json:{write:!0}})],m.prototype,"attributes",void 0),t([s(_e)],m.prototype,"backgroundFillSymbol",void 0),t([s({type:w,json:{write:!0}})],m.prototype,"defaultColor",void 0),t([s({type:String,json:{write:!0}})],m.prototype,"defaultLabel",void 0),t([s({type:Number,range:{min:0,max:1},json:{write:!0}})],m.prototype,"holePercentage",void 0),t([s({type:V,json:{write:!0}})],m.prototype,"othersCategory",void 0),t([s({type:Le,json:{write:!0}})],m.prototype,"legendOptions",void 0),t([s({type:G,json:{default:null,write:!0}})],m.prototype,"outline",void 0),t([s({type:Number,cast:W,json:{write:!0}})],m.prototype,"size",void 0),t([L({pieChart:"pie-chart"})],m.prototype,"type",void 0),t([s({types:[Be]})],m.prototype,"visualVariables",void 0),m=t([_("esri.renderers.PieChartRenderer")],m);const Je=m;var U;let E=U=class extends A(R){constructor(e){super(e),this.description=null,this.label=null,this.symbol=null,this.type="simple"}async collectRequiredFields(e,i){await Promise.all([this.collectSymbolFields(e,i),this.collectVVRequiredFields(e,i)])}async collectSymbolFields(e,i){await Promise.all(this.getSymbols().map(r=>r.collectRequiredFields(e,i)))}getSymbol(e,i){return this.symbol}async getSymbolAsync(e,i){return this.symbol}getSymbols(){return this.symbol?[this.symbol]:[]}getAttributeHash(){return this.visualVariables?.reduce((e,i)=>e+i.getAttributeHash(),"")??""}getMeshHash(){return this.getSymbols().reduce((e,i)=>e+JSON.stringify(i),"")}get arcadeRequired(){return this.arcadeRequiredForVisualVariables}clone(){return new U({description:this.description,label:this.label,symbol:a(this.symbol),visualVariables:a(this.visualVariables),authoringInfo:a(this.authoringInfo)})}};t([s({type:String,json:{write:!0}})],E.prototype,"description",void 0),t([s({type:String,json:{write:!0}})],E.prototype,"label",void 0),t([s(Ie)],E.prototype,"symbol",void 0),t([L({simple:"simple"})],E.prototype,"type",void 0),E=U=t([_("esri.renderers.SimpleRenderer")],E);const ne=E,Ue={key:"type",base:R,typeMap:{heatmap:oe,simple:ne,"unique-value":te,"class-breaks":ie,"dot-density":ze,dictionary:He,"pie-chart":Je},errorContext:"renderer"},xt={key:"type",base:R,typeMap:{simple:ne,"unique-value":te,"class-breaks":ie,heatmap:oe},errorContext:"renderer",validate:Ge};function Ge(e){switch(e.type){case"simple":return Ke(e);case"unique-value":return Xe(e);case"class-breaks":return Ye(e);case"heatmap":return e}}function Ke(e){if(e.symbol)return e;M.getLogger("esri.renderers.support.types").error("Removed invalid 'simple' renderer without a symbol from web scene.")}function Xe(e){const i=e.uniqueValueInfos,r=i?.filter(({symbol:o,label:u},l)=>(o||M.getLogger("esri.renderers.support.types").error(`Removed invalid unique value info ([${l}] ${u}) without a symbol from web scene.`),!!o));return r?.length!==i?.length&&(e.uniqueValueInfos=r),e}function Ye(e){const i=e.classBreakInfos,r=i?.filter(({symbol:o,label:u},l)=>(o||M.getLogger("esri.renderers.support.types").error(`Removed invalid class break info ([${l}] ${u}) without a symbol from web scene.`),!!o));return r?.length!==i?.length&&(e.classBreakInfos=r),e}function Ze(e,i){return le(e,null,i)}const Qe=ce({types:Ue});function le(e,i,r){return e?e&&(e.styleName||e.styleUrl)&&e.type!=="uniqueValue"?(r?.messages&&r.messages.push(new de("renderer:unsupported","Only UniqueValueRenderer can be referenced from a web style, but found '"+e.type+"'",{definition:e,context:r})),null):Qe(e,i,r):null}const jt=Object.freeze(Object.defineProperty({__proto__:null,fromJSON:Ze,read:le},Symbol.toStringTag,{value:"Module"}));export{jt as j,C as l,Ue as m,le as o,ne as p,Ze as t,xt as u};
