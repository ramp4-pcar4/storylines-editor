import{ch as u,a2 as i}from"./main-D8UjLOIQ.js";import{e as s}from"./glsl-Z5uYj8ka-BRgh2Cgo.js";import{T as d}from"./VertexAttribute-hUz6pozM-Bx3V-z96.js";var a;function T(e){switch(e){case"multiply":default:return a.Multiply;case"ignore":return a.Ignore;case"replace":return a.Replace;case"tint":return a.Tint}}function h(e,t,n){if(e==null||t===a.Ignore)return n[0]=255,n[1]=255,n[2]=255,void(n[3]=255);const l=i(Math.round(e[3]*c),0,c),m=l===0||t===a.Tint?0:t===a.Replace?p:v;n[0]=i(Math.round(e[0]*r),0,r),n[1]=i(Math.round(e[1]*r),0,r),n[2]=i(Math.round(e[2]*r),0,r),n[3]=l+m}(function(e){e[e.Multiply=1]="Multiply",e[e.Ignore=2]="Ignore",e[e.Replace=3]="Replace",e[e.Tint=4]="Tint"})(a||(a={}));const r=255,c=85,p=c,v=2*c;function y(e,t){switch(t.normalType){case o.Compressed:e.attributes.add(d.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(s`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case o.Attribute:e.attributes.add(d.NORMAL,"vec3"),e.vertex.code.add(s`vec3 normalModel() {
return normal;
}`);break;case o.ScreenDerivative:e.fragment.code.add(s`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:u(t.normalType);case o.COUNT:}}var o;(function(e){e[e.Attribute=0]="Attribute",e[e.Compressed=1]="Compressed",e[e.ScreenDerivative=2]="ScreenDerivative",e[e.COUNT=3]="COUNT"})(o||(o={}));export{o as a,y as b,a as e,T as p,h as v};
