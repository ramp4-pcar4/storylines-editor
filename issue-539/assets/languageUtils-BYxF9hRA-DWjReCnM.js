import{cF as K,t as kn,w as M,l as V,m as W,G as Q,n as X,d as k,h as cn,F as on,g as On,D as Dn,cL as In,J as Rn,C as wn}from"./main-Ce-R8kMh.js";import{r as I,O as _n,m as vn,u as Un}from"./TimeOnly-DSMefxKy-CvOCfZpK.js";import{n as F}from"./ImmutableArray-CiJxhY8_-Kqx7aWRu.js";import{b as En,h as sn}from"./shared-D1w-26bA-DfzKB2DM.js";import{z as Ln,M as Pn}from"./number-eRKYXfX9-Btphb1-k.js";import{b as zn}from"./Query-BrwMGK8U-Cau8hAio.js";let fn=class{};var o;(function(n){n.AsyncNotEnabled="AsyncNotEnabled",n.ModulesNotSupported="ModulesNotSupported",n.CircularModules="CircularModules",n.CannotCompareDateAndTime="CannotCompareDateAndTime",n.NeverReach="NeverReach",n.UnsupportedHashType="UnsupportedHashType",n.InvalidParameter="InvalidParameter",n.FeatureSetDoesNotHaveSubtypes="FeatureSetDoesNotHaveSubtypes",n.UnexpectedToken="UnexpectedToken",n.Unrecognized="Unrecognized",n.UnrecognizedType="UnrecognizedType",n.MaximumCallDepth="MaximumCallDepth",n.BooleanConditionRequired="BooleanConditionRequired",n.TypeNotAllowedInFeature="TypeNotAllowedInFeature",n.KeyMustBeString="KeyMustBeString",n.WrongNumberOfParameters="WrongNumberOfParameters",n.CallNonFunction="CallNonFunction",n.NoFunctionInTemplateLiteral="NoFunctionInTemplateLiteral",n.NoFunctionInDictionary="NoFunctionInDictionary",n.NoFunctionInArray="NoFunctionInArray",n.AssignModuleFunction="AssignModuleFunction",n.LogicExpressionOrAnd="LogicExpressionOrAnd",n.LogicalExpressionOnlyBoolean="LogicalExpressionOnlyBoolean",n.FunctionNotFound="FunctionNotFound",n.InvalidMemberAccessKey="InvalidMemberAccessKey",n.UnsupportedUnaryOperator="UnsupportUnaryOperator",n.InvalidIdentifier="InvalidIdentifier",n.MemberOfNull="MemberOfNull",n.UnsupportedOperator="UnsupportedOperator",n.Cancelled="Cancelled",n.ModuleAccessorMustBeString="ModuleAccessorMustBeString",n.ModuleExportNotFound="ModuleExportNotFound",n.Immutable="Immutable",n.OutOfBounds="OutOfBounds",n.IllegalResult="IllegalResult",n.FieldNotFound="FieldNotFound",n.PortalRequired="PortalRequired",n.LogicError="LogicError",n.ArrayAccessorMustBeNumber="ArrayAccessMustBeNumber",n.KeyAccessorMustBeString="KeyAccessorMustBeString",n.WrongSpatialReference="WrongSpatialReference",n.CannotChangeTimeZoneTime="CannotChangeTimeZoneTime",n.CannotChangeTimeZoneDateOnly="CannotChangeTimeZoneDateOnly"})(o||(o={}));const dn={[o.TypeNotAllowedInFeature]:"Feature attributes only support dates, numbers, strings, guids.",[o.LogicError]:"Logic error - {reason}",[o.CannotCompareDateAndTime]:"Cannot compare date or dateonly with timeonly types",[o.NeverReach]:"Encountered unreachable logic",[o.AsyncNotEnabled]:"Async Arcade must be enabled for this script",[o.ModuleAccessorMustBeString]:"Module accessor must be a string",[o.ModuleExportNotFound]:"Module has no export with provided identifier",[o.ModulesNotSupported]:"Current profile does not support modules",[o.ArrayAccessorMustBeNumber]:"Array accessor must be a number",[o.FunctionNotFound]:"Function not found",[o.FieldNotFound]:"Key not found - {key}",[o.CircularModules]:"Circular module dependencies are not allowed",[o.Cancelled]:"Execution cancelled",[o.UnsupportedHashType]:"Type not supported in hash function",[o.IllegalResult]:"Value is not a supported return type",[o.PortalRequired]:"Portal is required",[o.InvalidParameter]:"Invalid parameter",[o.WrongNumberOfParameters]:"Call with wrong number of parameters",[o.Unrecognized]:"Unrecognized code structure",[o.UnrecognizedType]:"Unrecognized type",[o.WrongSpatialReference]:"Cannot work with geometry in this spatial reference. It is different to the execution spatial reference",[o.BooleanConditionRequired]:"Conditions must use booleans",[o.NoFunctionInDictionary]:"Dictionaries cannot contain functions.",[o.NoFunctionInArray]:"Arrays cannot contain functions.",[o.NoFunctionInTemplateLiteral]:"Template Literals do not expect functions by value.",[o.KeyAccessorMustBeString]:"Accessor must be a string",[o.KeyMustBeString]:"Object keys must be a string",[o.Immutable]:"Object is immutable",[o.UnexpectedToken]:"Unexpected token",[o.MemberOfNull]:"Cannot access property of null object",[o.MaximumCallDepth]:"Exceeded maximum function depth",[o.OutOfBounds]:"Out of bounds",[o.InvalidIdentifier]:"Identifier not recognized",[o.CallNonFunction]:"Expression is not a function",[o.InvalidMemberAccessKey]:"Cannot access value using a key of this type",[o.AssignModuleFunction]:"Cannot assign function to module variable",[o.UnsupportedUnaryOperator]:"Unsupported unary operator",[o.UnsupportedOperator]:"Unsupported operator",[o.LogicalExpressionOnlyBoolean]:"Logical expressions must be boolean",[o.LogicExpressionOrAnd]:"Logical expression can only be combined with || or &&",[o.CannotChangeTimeZoneTime]:"Cannot change the timezone of a Time",[o.CannotChangeTimeZoneDateOnly]:"Cannot change the timezone of a DateOnly",[o.FeatureSetDoesNotHaveSubtypes]:"FeatureSet does not have subtypes"};let Jn=class extends Error{constructor(...n){super(...n)}};class U extends Jn{constructor(e,r){super($(r)+e.message,{cause:e}),this.loc=null,Error.captureStackTrace&&Error.captureStackTrace(this,U),r?.loc&&(this.loc=r.loc)}}class T extends Error{constructor(e,r,t,a){super("Execution error - "+$(t)+K(dn[r],a)),this.loc=null,this.declaredRootClass="esri.arcade.arcadeexecutionerror",Error.captureStackTrace&&Error.captureStackTrace(this,T),t?.loc&&(this.loc=t.loc)}}function $(n){return n&&n.loc?`Line : ${n.loc.start?.line}, ${n.loc.start?.column}: `:""}class pn extends Error{constructor(e,r,t,a){super("Compilation error - "+$(t)+K(dn[r],a)),this.loc=null,this.declaredRootClass="esri.arcade.arcadecompilationerror",Error.captureStackTrace&&Error.captureStackTrace(this,pn),t?.loc&&(this.loc=t.loc)}}let Re=class mn extends Error{constructor(){super("Uncompilable code structures"),this.declaredRootClass="esri.arcade.arcadeuncompilableerror",Error.captureStackTrace&&Error.captureStackTrace(this,mn)}};function we(n,e,r){return r.declaredRootClass==="esri.arcade.arcadeexecutionerror"||r.declaredRootClass==="esri.arcade.arcadecompilationerror"?r.loc===null&&e?.loc?new U(r,{cause:r}):r:(r.declaredRootClass==="esri.arcade.featureset.support.featureseterror"||r.declaredRootClass==="esri.arcade.featureset.support.sqlerror"||r.declaredRootClass,e?.loc?new U(r,{cause:r}):r)}var E;(function(n){n.UnrecognizedUri="UnrecognizedUri",n.UnsupportedUriProtocol="UnsupportedUriProtocol"})(E||(E={}));const jn={[E.UnrecognizedUri]:"Unrecognized uri - {uri}",[E.UnsupportedUriProtocol]:"Unrecognized uri protocol"};class hn extends Error{constructor(e,r){super(K(jn[e],r)),this.declaredRootClass="esri.arcade.arcademoduleerror",Error.captureStackTrace&&Error.captureStackTrace(this,hn)}}class R{constructor(){}}function un(n,e,r){if(n instanceof R&&!(n instanceof Y)){const t=new Y;return t.fn=n,t.parameterEvaluator=r,t.context=e,t}return n}class _e extends R{constructor(e){super(),this.fn=e}createFunction(e){return(...r)=>this.fn(e,{preparsed:!0,arguments:r})}call(e,r){return this.fn(e,r)}marshalledCall(e,r,t,a){return a(e,r,(s,l,u)=>{u=u.map(c=>c instanceof R&&!(c instanceof Y)?un(c,e,a):c);const p=this.call(t,{args:u});return kn(p)?p.then(c=>un(c,t,a)):p})}}class Y extends R{constructor(){super(...arguments),this.fn=null,this.context=null}createFunction(e){return this.fn.createFunction(this.context)}call(e,r){return this.fn.marshalledCall(e,r,this.context,this.parameterEvaluator)}marshalledCall(e,r,t){return this.fn.marshalledCall(e,r,this.context,this.parameterEvaluator)}}class O extends F{constructor(e,r,t,a,s,l){super(e),this._lazyPt=[],this._hasZ=!1,this._hasM=!1,this._spRef=r,this._hasZ=t,this._hasM=a,this._cacheId=s,this._partId=l}get(e){if(this._lazyPt[e]===void 0){const r=this._elements[e];if(r===void 0)return;const t=this._hasZ,a=this._hasM;let s;s=t&&!a?new M(r[0],r[1],r[2],void 0,this._spRef):a&&!t?new M(r[0],r[1],void 0,r[2],this._spRef):t&&a?new M(r[0],r[1],r[2],r[3],this._spRef):new M(r[0],r[1],this._spRef),s.cache._arcadeCacheId=this._cacheId.toString()+"-"+this._partId.toString()+"-"+e.toString(),this._lazyPt[e]=s}return this._lazyPt[e]}equalityTest(e){return e===this||e!==null&&e instanceof O&&e.getUniqueHash()===this.getUniqueHash()}getUniqueHash(){return this._cacheId.toString()+"-"+this._partId.toString()}}class nn extends F{constructor(e,r,t,a,s){super(e),this._lazyPath=[],this._hasZ=!1,this._hasM=!1,this._hasZ=t,this._hasM=a,this._spRef=r,this._cacheId=s}get(e){if(this._lazyPath[e]===void 0){const r=this._elements[e];if(r===void 0)return;this._lazyPath[e]=new O(r,this._spRef,this._hasZ,this._hasM,this._cacheId,e)}return this._lazyPath[e]}equalityTest(e){return e===this||e!==null&&e instanceof nn&&e.getUniqueHash()===this.getUniqueHash()}getUniqueHash(){return this._cacheId.toString()}}class Bn{constructor(e){this.value=e}}class Gn{constructor(e){this.value=e}}const g={type:"VOID"},Yn=Symbol("BREAK"),qn=Symbol("CONTINUE");function w(n,e,r){return e===""||e==null||e===r||e===r?n:n=n.split(e).join(r)}function J(n){return n instanceof R}function en(n){return n instanceof fn}function L(n){return!!y(n)||!!N(n)||!!f(n)||!!m(n)||!!h(n)||!!b(n)||n===null||n===g||typeof n=="number"}function Hn(n,e){return n===void 0?e:n}function Kn(n){return n==null?"":C(n)||Z(n)?"Array":f(n)?"Date":h(n)?"Time":m(n)?"DateOnly":y(n)?"String":b(n)?"Boolean":N(n)?"Number":n?.declaredClass==="esri.arcade.Attachment"?"Attachment":n?.declaredClass==="esri.arcade.Portal"?"Portal":n?.declaredClass==="esri.arcade.Dictionary"?"Dictionary":Nn(n)?"KnowledgeGraph":n instanceof fn?"Module":yn(n)?"Feature":n instanceof M?"Point":n instanceof V?"Polygon":n instanceof W?"Polyline":n instanceof Q?"Multipoint":n instanceof X?"Extent":J(n)?"Function":gn(n)?"FeatureSet":bn(n)?"FeatureSetCollection":n===g?"":typeof n=="number"&&isNaN(n)?"Number":"Unrecognized Type"}function y(n){return typeof n=="string"||n instanceof String}function b(n){return typeof n=="boolean"}function N(n){return typeof n=="number"}function Vn(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n}function Wn(n){return n instanceof k}function C(n){return Array.isArray(n)}function yn(n){return n?.arcadeDeclaredClass==="esri.arcade.Feature"}function Qn(n){return n?.declaredClass==="esri.Graphic"}function Xn(n){return n instanceof zn}function gn(n){return n?.declaredRootClass==="esri.arcade.featureset.support.FeatureSet"}function $n(n){return n?.declaredClass==="esri.arcade.Dictionary"}function bn(n){return n?.declaredRootClass==="esri.arcade.featureSetCollection"}function Nn(n){return n?.declaredClass==="esri.rest.knowledgeGraph.KnowledgeGraph"}function Z(n){return n instanceof F}function f(n){return n instanceof I}function m(n){return n instanceof _n}function h(n){return n instanceof vn}function q(n){return n!=null&&typeof n=="object"}function P(n){return n instanceof Date}function ne(n,e,r,t,a){if(n.length<e||n.length>r)throw new T(t,o.WrongNumberOfParameters,a)}function ee(n){return n<0?-Math.round(-n):Math.round(n)}function rn(n,e){return isNaN(n)||e==null||e===""?n.toString():(e=w(e,"‰",""),e=w(e,"¤",""),Ln(n,{pattern:e}))}function j(n,e){return e==null||e===""?n.toISOString(!0):n.toFormat(Sn(e),{locale:cn(),numberingSystem:"latn"})}function Sn(n,e=!1){n=n.replaceAll(/LTS|LT|L{1,4}|l{1,4}/g,"[$&]");let r="";const t=/(\[[^[]*\])|(\\)?([Hh]mm(ss)?|Mo|M{1,4}|Do|DDDo|D{1,4}|d{2,4}|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|Z{1,5}|.)/g;for(const a of n.match(t)||[])switch(a){case"D":r+="d";break;case"DD":r+="dd";break;case"DDD":r+="o";break;case"d":r+="c";break;case"ddd":r+="ccc";break;case"dddd":r+="cccc";break;case"M":r+="L";break;case"MM":r+="LL";break;case"MMM":r+="LLL";break;case"MMMM":r+="LLLL";break;case"YY":r+="yy";break;case"Y":case"YYYY":r+="yyyy";break;case"Q":r+="q";break;case"Z":r+="Z";break;case"ZZ":r+="ZZ";break;case"ZZZ":r+="ZZZ";break;case"ZZZZ":r+=e?"[ZZZZ]":"ZZZZ";break;case"ZZZZZ":r+=e?"[ZZZZZ]":"ZZZZZ";break;case"S":r+="'S'";break;case"SS":r+="'SS'";break;case"SSS":r+="u";break;case"A":case"a":r+="a";break;case"m":case"mm":case"h":case"hh":case"H":case"HH":case"s":case"ss":case"X":case"x":r+=a;break;default:a.length>=2&&a.slice(0,1)==="["&&a.slice(-1)==="]"?r+=`'${a.slice(1,-1)}'`:r+=`'${a}'`}return r}function i(n,e,r){switch(r){case">":return n>e;case"<":return n<e;case">=":return n>=e;case"<=":return n<=e}return!1}function re(n,e,r){if(n===null){if(e===null||e===g)return i(null,null,r);if(N(e))return i(0,e,r);if(y(e)||b(e))return i(0,d(e),r);if(f(e))return i(0,e.toNumber(),r);if(h(e)||m(e))return i(n,e.toNumber(),r)}if(n===g){if(e===null||e===g)return i(null,null,r);if(N(e))return i(0,e,r);if(y(e)||b(e))return i(0,d(e),r);if(f(e))return i(0,e.toNumber(),r);if(h(e)||m(e))return i(n,e.toNumber(),r)}else if(N(n)){if(N(e))return i(n,e,r);if(b(e))return i(n,d(e),r);if(e===null||e===g)return i(n,0,r);if(y(e))return i(n,d(e),r);if(f(e)||h(e)||m(e))return i(n,e.toNumber(),r)}else if(y(n)){if(y(e))return i(x(n),x(e),r);if(f(e)||h(e)||m(e))return i(d(n),e.toNumber(),r);if(N(e))return i(d(n),e,r);if(e===null||e===g)return i(d(n),0,r);if(b(e))return i(d(n),d(e),r)}else if(f(n)){if(f(e))return n.timeZone!==e.timeZone&&(n.isUnknownTimeZone?n=I.arcadeDateAndZoneToArcadeDate(n,e.timeZone):e.isUnknownTimeZone&&(e=I.arcadeDateAndZoneToArcadeDate(e,n.timeZone))),i(n.toNumber(),e.toNumber(),r);if(e===null||e===g)return i(n.toNumber(),0,r);if(N(e))return i(n.toNumber(),e,r);if(b(e)||y(e))return i(n.toNumber(),d(e),r);if(h(e))throw new T(null,o.CannotCompareDateAndTime,null);if(m(e))return i(n.toNumber(),e.toNumber(),r)}else if(b(n)){if(b(e))return i(n,e,r);if(N(e))return i(d(n),d(e),r);if(f(e)||h(e)||m(e))return i(d(n),e.toNumber(),r);if(e===null||e===g)return i(d(n),0,r);if(y(e))return i(d(n),d(e),r)}else if(m(n)){if(f(e))return i(n.toNumber(),e.toNumber(),r);if(e===null||e===g)return i(n.toNumber(),0,r);if(N(e))return i(n.toNumber(),e,r);if(b(e)||y(e))return i(n.toNumber(),d(e),r);if(h(e))throw new T(null,o.CannotCompareDateAndTime,null);if(m(e))return i(n.toNumber(),e.toNumber(),r)}else if(h(n)){if(f(e))throw new T(null,o.CannotCompareDateAndTime,null);if(e===null||e===g)return i(n.toNumber(),0,r);if(N(e))return i(n.toNumber(),e,r);if(b(e)||y(e))return i(n.toNumber(),d(e),r);if(h(e))return i(n.toNumber(),e.toNumber(),r);if(m(e))throw new T(null,o.CannotCompareDateAndTime,null)}return!!Cn(n,e)&&(r==="<="||r===">=")}function Cn(n,e){if(n===e||n===null&&e===g||e===null&&n===g)return!0;if(f(n)&&f(e)||h(n)&&h(e)||m(n)&&m(e))return n.equals(e);if(n instanceof nn||n instanceof O)return n.equalityTest(e);if(n instanceof M&&e instanceof M){const r=n.cache._arcadeCacheId,t=e.cache._arcadeCacheId;if(r!=null)return r===t}return!!(q(n)&&q(e)&&(n._arcadeCacheId===e._arcadeCacheId&&n._arcadeCacheId!==void 0&&n._arcadeCacheId!==null||n._underlyingGraphic===e._underlyingGraphic&&n._underlyingGraphic!==void 0&&n._underlyingGraphic!==null))}function x(n,e){if(y(n))return n;if(n===null)return"";if(N(n))return rn(n,e);if(b(n))return n.toString();if(f(n))return j(n,e);if(h(n)||m(n))return n.toFormat(e);if(n instanceof k)return JSON.stringify(n.toJSON());if(C(n)){const r=[];for(let t=0;t<n.length;t++)r[t]=z(n[t]);return"["+r.join(",")+"]"}if(n instanceof F){const r=[];for(let t=0;t<n.length();t++)r[t]=z(n.get(t));return"["+r.join(",")+"]"}return n!==null&&typeof n=="object"&&n.castToText!==void 0?n.castToText():J(n)?"object, Function":n===g?"":en(n)?"object, Module":""}function te(n){const e=[];if(!C(n))return null;if(n instanceof F){for(let r=0;r<n.length();r++)e[r]=d(n.get(r));return e}for(let r=0;r<n.length;r++)e[r]=d(n[r]);return e}function An(n,e,r=!1){if(y(n))return n;if(n===null)return"";if(N(n))return rn(n,e);if(b(n))return n.toString();if(f(n))return j(n,e);if(h(n)||m(n))return n.toFormat(e);if(n instanceof k)return n instanceof X?'{"xmin":'+n.xmin.toString()+',"ymin":'+n.ymin.toString()+","+(n.hasZ?'"zmin":'+n.zmin.toString()+",":"")+(n.hasM?'"mmin":'+n.mmin.toString()+",":"")+'"xmax":'+n.xmax.toString()+',"ymax":'+n.ymax.toString()+","+(n.hasZ?'"zmax":'+n.zmax.toString()+",":"")+(n.hasM?'"mmax":'+n.mmax.toString()+",":"")+'"spatialReference":'+H(n.spatialReference)+"}":H(n.toJSON(),(t,a)=>t.key===a.key?0:t.key==="spatialReference"?1:a.key==="spatialReference"||t.key<a.key?-1:t.key>a.key?1:0);if(C(n)){const t=[];for(let a=0;a<n.length;a++)t[a]=z(n[a],r);return"["+t.join(",")+"]"}if(n instanceof F){const t=[];for(let a=0;a<n.length();a++)t[a]=z(n.get(a),r);return"["+t.join(",")+"]"}return n!==null&&typeof n=="object"&&n.castToText!==void 0?n.castToText(r):J(n)?"object, Function":n===g?"":en(n)?"object, Module":""}function z(n,e=!1){if(n===null)return"null";if(b(n)||N(n)||y(n))return JSON.stringify(n);if(n instanceof k||n instanceof F||Array.isArray(n))return An(n,null,e);if(f(n))return JSON.stringify(e?n.getTime():j(n,""));if(h(n)||m(n))return JSON.stringify(n.toString());if(n!==null&&typeof n=="object"){if(n.castToText!==void 0)return n.castToText(e)}else if(n===g)return"null";return"null"}function d(n,e){return N(n)?n:n===null||n===""?0:f(n)||m(n)||h(n)?NaN:b(n)?n?1:0:C(n)||n===""||n===void 0?NaN:e!==void 0&&y(n)?(e=w(e,"‰",""),e=w(e,"¤",""),Pn(n,{pattern:e})):n===g?0:Number(n)}function ae(n,e){if(f(n))return n;if(y(n)){const r=oe(n,e);if(r)return I.dateTimeToArcadeDate(r)}return null}function oe(n,e){const r=/ (\d\d)/,t=Un(e);let a=on.fromISO(n,{zone:t});return a.isValid||r.test(n)&&(n=n.replace(r,"T$1"),a=on.fromISO(n,{zone:e}),a.isValid)?a:null}function se(n){return b(n)?n:y(n)?(n=n.toLowerCase())==="true":!!N(n)&&n!==0&&!isNaN(n)}function ie(n,e){const r=JSON.parse(n);return r&&!r.spatialReference&&(r.spatialReference=e),On(r)}function ue(n,e){return n==null?null:(n.spatialReference!==null&&n.spatialReference!==void 0||(n.spatialReference=e),n)}function le(n){if(n===null)return null;if(n instanceof M)return n.x==="NaN"||n.x===null||isNaN(n.x)?null:n;if(n instanceof V){if(n.rings.length===0)return null;for(const e of n.rings)if(e.length>0)return n;return null}if(n instanceof W){if(n.paths.length===0)return null;for(const e of n.paths)if(e.length>0)return n;return null}return n instanceof Q?n.points.length===0?null:n:n instanceof X?n.xmin==="NaN"||n.xmin===null||isNaN(n.xmin)?null:n:null}function Tn(n,e){if(!n||!n.domain)return e;let r=null,t=null;if(f(e))r=e.toNumber();else if(m(e))r=e.toString();else if(h(e))r=e.toStorageString();else if(n.field.type==="string"||n.field.type==="esriFieldTypeString")r=x(e);else{if(e==null)return null;if(e==="")return e;r=d(e)}for(let a=0;a<n.domain.codedValues.length;a++){const s=n.domain.codedValues[a];s.code===r&&(t=s)}return t===null?x(e):t.name}function Fn(n,e){if(!n||!n.domain)return e;let r=null;const t=x(e);for(let a=0;a<n.domain.codedValues.length;a++){const s=n.domain.codedValues[a];s.name===t&&(r=s)}return r===null?e:r.code}function B(n,e,r=null,t=null){if(!e||!e.fields)return null;let a,s,l=null;for(let S=0;S<e.fields.length;S++){const A=e.fields[S];A.name.toLowerCase()===n.toString().toLowerCase()&&(l=A)}if(l===null)throw new T(null,o.FieldNotFound,null,{key:n});let u=e.typeIdField,p="id",c=e.types;if(e.subtypeField&&(u=e.subtypeField,p="code",c=e.subtypes??[]),t===null&&r&&u)t=r.hasField(u)?r.field(u):null;else if(u&&t!==null){let S=!1;for(const A of c||[])if(t===A[p]){S=!0;break}if(!S){for(const A of c||[])if(t===A.name){t=A[p],S=!0;break}}S||(t=null,r&&u&&(t=r.hasField(u)?r.field(u):null))}return t!=null&&c.some(S=>S[p]===t&&(a=S.domains?.[l.name],a&&a.type==="inherited"&&(a=ln(l.name,e),s=!0),!0)),s||a||(a=ln(n,e)),{field:l,domain:a}}function ln(n,e){let r;return e.fields.some(t=>(t.name.toLowerCase()===n.toLowerCase()&&(r=t.domain),!!r)),r}function H(n,e){e||(e={}),typeof e=="function"&&(e={cmp:e});const r=typeof e.cycles=="boolean"&&e.cycles,t=e.cmp&&(a=e.cmp,function(l){return function(u,p){const c={key:u,value:l[u]},S={key:p,value:l[p]};return a(c,S)}});var a;const s=[];return function l(u){if(u?.toJSON&&typeof u.toJSON=="function"&&(u=u.toJSON()),u===void 0)return;if(typeof u=="number")return isFinite(u)?""+u:"null";if(typeof u!="object")return JSON.stringify(u);let p,c;if(Array.isArray(u)){for(c="[",p=0;p<u.length;p++)p&&(c+=","),c+=l(u[p])||"null";return c+"]"}if(u===null)return"null";if(s.includes(u)){if(r)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}const S=s.push(u)-1,A=Object.keys(u).sort(t?.(u));for(c="",p=0;p<A.length;p++){const tn=A[p],an=l(u[tn]);an&&(c&&(c+=","),c+=JSON.stringify(tn)+":"+an)}return s.splice(S,1),"{"+c+"}"}(n)}function ce(n){if(n===null)return null;const e=[];for(const r of n)r?.arcadeDeclaredClass&&r.arcadeDeclaredClass==="esri.arcade.Feature"?e.push(r.geometry()):e.push(r);return e}function D(n,e){if(!(e instanceof M))throw new T(null,o.InvalidParameter,null);n.push(e.hasZ?e.hasM?[e.x,e.y,e.z,e.m]:[e.x,e.y,e.z]:[e.x,e.y])}function fe(n,e){if(C(n)||Z(n)){let r=!1,t=!1,a=[],s=e;if(C(n)){for(const l of n)D(a,l);a.length>0&&(s=n[0].spatialReference,r=n[0].hasZ,t=n[0].hasM)}else if(n instanceof O)a=n._elements,a.length>0&&(r=n._hasZ,t=n._hasM,s=n.get(0).spatialReference);else{if(!Z(n))throw new T(null,o.InvalidParameter,null);for(const l of n.toArray())D(a,l);a.length>0&&(s=n.get(0).spatialReference,r=n.get(0).hasZ===!0,t=n.get(0).hasM===!0)}return a.length===0?null:(Dn(a)||(a=a.slice().reverse()),new V({rings:[a],spatialReference:s,hasZ:r,hasM:t}))}return n}function de(n,e){if(C(n)||Z(n)){let r=!1,t=!1,a=[],s=e;if(C(n)){for(const l of n)D(a,l);a.length>0&&(s=n[0].spatialReference,r=n[0].hasZ===!0,t=n[0].hasM===!0)}else if(n instanceof O)a=n._elements,a.length>0&&(r=n._hasZ,t=n._hasM,s=n.get(0).spatialReference);else if(Z(n)){for(const l of n.toArray())D(a,l);a.length>0&&(s=n.get(0).spatialReference,r=n.get(0).hasZ===!0,t=n.get(0).hasM===!0)}return a.length===0?null:new W({paths:[a],spatialReference:s,hasZ:r,hasM:t})}return n}function pe(n,e){if(C(n)||Z(n)){let r=!1,t=!1,a=[],s=e;if(C(n)){for(const l of n)D(a,l);a.length>0&&(s=n[0].spatialReference,r=n[0].hasZ===!0,t=n[0].hasM===!0)}else if(n instanceof O)a=n._elements,a.length>0&&(r=n._hasZ,t=n._hasM,s=n.get(0).spatialReference);else if(Z(n)){for(const l of n.toArray())D(a,l);a.length>0&&(s=n.get(0).spatialReference,r=n.get(0).hasZ===!0,t=n.get(0).hasM===!0)}return a.length===0?null:new Q({points:a,spatialReference:s,hasZ:r,hasM:t})}return n}function me(n,e=!1){const r=[];if(n===null)return r;if(C(n)===!0){for(let t=0;t<n.length;t++){const a=x(n[t]);a===""&&e!==!0||r.push(a)}return r}if(n instanceof F){for(let t=0;t<n.length();t++){const a=x(n.get(t));a===""&&e!==!0||r.push(a)}return r}if(L(n)){const t=x(n);return t===""&&e!==!0||r.push(t),r}return[]}let G=0;function he(n){return G++,G%100==0?(G=0,new Promise(e=>{setTimeout(()=>{e(n)},0)})):n}function ye(n,e,r){switch(r){case"&":return n&e;case"|":return n|e;case"^":return n^e;case"<<":return n<<e;case">>":return n>>e;case">>>":return n>>>e}}function _(n,e=null){return n==null?null:b(n)||N(n)||y(n)?n:n instanceof k?e?.keepGeometryType===!0?n:n.toJSON():n instanceof F?n.toArray().map(r=>_(r,e)):Array.isArray(n)?n.map(r=>_(r,e)):P(n)?n:f(n)?n.toJSDate():h(n)?n.toString():m(n)?n.toJSDate():n!==null&&typeof n=="object"&&n.castAsJson!==void 0?n.castAsJson(e):null}async function ge(n,e,r,t,a){const s=await Mn(n,e,r);a[t]=s}async function Mn(n,e=null,r=null){if(n instanceof F&&(n=n.toArray()),n==null)return null;if(L(n)||n instanceof k||P(n)||f(n))return _(n,r);if(Array.isArray(n)){const t=[],a=[];for(const s of n)s===null||L(s)||s instanceof k||P(s)||f(s)?a.push(_(s,r)):(a.push(null),t.push(ge(s,e,r,a.length-1,a)));return t.length>0&&await Promise.all(t),a}return n!==null&&typeof n=="object"&&n.castAsJsonAsync!==void 0?n.castAsJsonAsync(e,r):null}function v(n){return xn(n)?n.parent:n}function xn(n){return n&&"declaredClass"in n&&n.declaredClass==="esri.layers.support.SubtypeSublayer"}function be(n){return n&&"declaredClass"in n&&n.declaredClass==="esri.layers.SubtypeGroupLayer"}function Ne(n,e,r){const t=v(n.fullSchema());return t===null||!t.fields?null:B(e,t,n,r)}function Se(n){const e=v(n.fullSchema());return e===null?null:e.fields?e.subtypeField?{subtypeField:e.subtypeField,subtypes:e.subtypes?e.subtypes.map(r=>({name:r.name,code:r.code})):[]}:e.typeIdField?{subtypeField:e.typeIdField,subtypes:e.types?e.types.map(r=>({name:r.name,code:r.id})):[]}:null:null}function Ce(n,e,r,t){const a=v(n.fullSchema());if(a===null||!a.fields)return null;const s=B(e,a,n,t);if(r===void 0)try{r=n.field(e)}catch{return null}return Tn(s,r)}function Ae(n,e,r,t){const a=v(n.fullSchema());if(a===null||!a.fields)return null;if(r===void 0){try{r=n.field(e)}catch{return null}return r}return Fn(B(e,a,n,t),r)}function Te(n){return n?.timeZone??"system"}function Fe(n){const e=v(n.fullSchema());if(e===null||!e.fields)return null;const r=[];for(const t of e.fields)r.push(En(t));return{objectIdField:e.objectIdField,globalIdField:e.globalIdField??"",geometryType:sn[e.geometryType]===void 0?"":sn[e.geometryType],fields:r}}function Me(n,e){return n==="system"&&(n=I.systemTimeZoneCanonicalName),{version:Zn,engineVersion:In,timeZone:n,spatialReference:e instanceof Rn?e.toJSON():e,application:wn.applicationName??"",engine:"web",locale:cn()}}const Zn="1.28",ve=Object.freeze(Object.defineProperty({__proto__:null,ImplicitResult:Gn,ReturnResult:Bn,absRound:ee,arcadeVersion:Zn,autoCastArrayOfPointsToMultiPoint:pe,autoCastArrayOfPointsToPolygon:fe,autoCastArrayOfPointsToPolyline:de,autoCastFeatureToGeometry:ce,binaryOperator:ye,breakResult:Yn,castAsJson:_,castAsJsonAsync:Mn,continueResult:qn,defaultExecutingContext:Me,defaultTimeZone:Te,defaultUndefined:Hn,equalityTest:Cn,featureDomainCodeLookup:Ae,featureDomainValueLookup:Ce,featureFullDomain:Ne,featureSchema:Fe,featureSubtypes:Se,fixNullGeometry:le,fixSpatialReference:ue,formatDate:j,formatNumber:rn,getDomain:B,getDomainCode:Fn,getDomainValue:Tn,getType:Kn,greaterThanLessThan:re,isArray:C,isBoolean:b,isDate:f,isDateOnly:m,isDictionary:$n,isFeature:yn,isFeatureSet:gn,isFeatureSetCollection:bn,isFunctionParameter:J,isGeometry:Wn,isGraphic:Qn,isImmutableArray:Z,isInteger:Vn,isJsDate:P,isKnowledgeGraph:Nn,isModule:en,isNumber:N,isObject:q,isQuery:Xn,isSimpleType:L,isString:y,isSubtypeGrouplayer:be,isSubtypeSublayer:xn,isTime:h,multiReplace:w,parseGeometryFromJson:ie,pcCheck:ne,stableStringify:H,standardiseDateFormat:Sn,tick:he,toBoolean:se,toDate:ae,toNumber:d,toNumberArray:te,toString:x,toStringArray:me,toStringExplicit:An,voidOperation:g},Symbol.toStringTag,{value:"Module"}));export{Se as $,Me as A,_e as B,C,bn as D,L as E,Nn as F,nn as G,fn as H,Kn as I,ce as J,pe as K,se as L,x as M,we as N,Vn as O,ae as P,Ce as Q,Wn as R,N as S,T,J as U,re as V,Ne as W,Ae as X,fe as Y,Z,ee as _,$n as a,ye as a0,pn as a1,hn as a2,E as a3,Y as a4,Bn as a5,Yn as a6,qn as a7,Qn as a8,Gn as a9,ve as aa,Re as ab,R as ac,un as ad,he as ae,xn as af,me as ag,B as ah,Tn as ai,Fn as aj,P as ak,b,m as c,f as d,Te as e,d as f,Hn as g,h,Sn as i,le as j,O as k,g as l,Mn as m,o as n,Cn as o,de as p,w as q,gn as r,te as s,yn as t,An as u,_ as v,ne as w,Fe as x,y,ue as z};
