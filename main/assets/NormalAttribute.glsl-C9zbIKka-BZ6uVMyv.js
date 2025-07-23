import{eR as u,ct as i}from"./main-D7vwjMDX.js";import{e as s}from"./glsl-o28TenZV-B0eZUNn3.js";import{T as d}from"./VertexAttribute-DFC3a3eR-BhmQtMsu.js";var n;function T(e){switch(e){case"multiply":default:return n.Multiply;case"ignore":return n.Ignore;case"replace":return n.Replace;case"tint":return n.Tint}}function y(e,t,a){if(e==null||t===n.Ignore)return a[0]=255,a[1]=255,a[2]=255,void(a[3]=255);const l=i(Math.round(e[3]*c),0,c),m=l===0||t===n.Tint?0:t===n.Replace?p:v;a[0]=i(Math.round(e[0]*r),0,r),a[1]=i(Math.round(e[1]*r),0,r),a[2]=i(Math.round(e[2]*r),0,r),a[3]=l+m}(function(e){e[e.Multiply=1]="Multiply",e[e.Ignore=2]="Ignore",e[e.Replace=3]="Replace",e[e.Tint=4]="Tint"})(n||(n={}));const r=255,c=85,p=c,v=2*c;function C(e,t){switch(t.normalType){case o.Compressed:e.attributes.add(d.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(s`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case o.Attribute:e.attributes.add(d.NORMAL,"vec3"),e.vertex.code.add(s`vec3 normalModel() {
return normal;
}`);break;case o.ScreenDerivative:e.fragment.code.add(s`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:u(t.normalType);case o.COUNT:}}var o;(function(e){e[e.Attribute=0]="Attribute",e[e.Compressed=1]="Compressed",e[e.ScreenDerivative=2]="ScreenDerivative",e[e.COUNT=3]="COUNT"})(o||(o={}));export{o as a,C as b,n as e,T as p,y as v};
