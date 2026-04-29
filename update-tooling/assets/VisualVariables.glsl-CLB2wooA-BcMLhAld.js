import{t as e}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t}from"./Uniform-Dp2mgLmf-sDlmDzvo.js";import{t as n}from"./Float3PassUniform-BEhcqx4m-lPGwfhIL.js";import{t as r}from"./Float4PassUniform-R_rVPKlL-DaKCoBr0.js";import{c as i,u as a}from"./FloatsPassUniform-VyaOZV1--CcYVB0L4.js";var o=class extends t{constructor(e,t,n){super(e,`mat3`,1,(r,i,a)=>r.setUniformMatrix3fv(e,t(i,a),n))}};function s(t){t.code.add(e`struct MaskedColor {
vec4 color;
bvec4 mask;
};`)}function c(t){t.include(s),t.code.add(e`
    MaskedColor createMaskedFromUInt8NaNColor(vec4 color) {
      return MaskedColor(color * ${e.float(1/254)}, equal(color, vec4(255)));
    }
  `)}function l(t){t.include(s),t.code.add(e`vec4 maskedColorSelectOrOne(MaskedColor color) {
return vec4(
color.mask.r ? 1.0 : color.color.r,
color.mask.g ? 1.0 : color.color.g,
color.mask.b ? 1.0 : color.color.b,
color.mask.a ? 1.0 : color.color.a
);
}
MaskedColor multiplyMaskedColors(MaskedColor color1, MaskedColor color2) {
vec4 masked1 = maskedColorSelectOrOne(color1);
vec4 masked2 = maskedColorSelectOrOne(color2);
return MaskedColor(masked1 * masked2, bvec4(ivec4(color1.mask) & ivec4(color2.mask)));
}`)}function u(t){t.include(s),t.code.add(e`MaskedColor createMaskedFromNaNColor(vec4 color) {
return MaskedColor(color, isnan(color));
}`)}function d(t,c){let{vertex:d,attributes:f}=t;c.hasVVInstancing&&(c.hasVVSize||c.hasVVColor)&&f.add(`instanceFeatureAttribute`,`vec4`),c.hasVVSize?(d.uniforms.add(new n(`vvSizeMinSize`,e=>e.vvSize.minSize)),d.uniforms.add(new n(`vvSizeMaxSize`,e=>e.vvSize.maxSize)),d.uniforms.add(new n(`vvSizeOffset`,e=>e.vvSize.offset)),d.uniforms.add(new n(`vvSizeFactor`,e=>e.vvSize.factor)),d.uniforms.add(new n(`vvSizeFallback`,e=>e.vvSize.fallback)),d.uniforms.add(new o(`vvSymbolRotationMatrix`,e=>e.vvSymbolRotationMatrix)),d.uniforms.add(new n(`vvSymbolAnchor`,e=>e.vvSymbolAnchor)),d.code.add(e`vec3 vvScale(vec4 _featureAttribute) {
if (isnan(_featureAttribute.x)) {
return vvSizeFallback;
}
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),d.code.add(e`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 scale = max(vvScale(_featureAttribute), eps);
        return vec4(vvSymbolRotationMatrix * _normal / scale, 1.0);
      }

      ${c.hasVVInstancing?e`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:``}
    `)):d.code.add(e`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vertex.include(s),c.hasVVColor?(d.constants.add(`vvColorNumber`,`int`,8),d.uniforms.add(new i(`vvColorValues`,8,e=>e.vvColor.values),new a(`vvColorColors`,8,e=>e.vvColor.colors),new r(`vvColorFallback`,e=>e.vvColor.fallback,{supportsNaN:!0})),c.hasVVInstancing&&(t.vertex.include(l),t.vertex.include(u)),d.code.add(e`
      vec4 interpolateVVColor(float value) {
        if (isnan(value)) {
          return vvColorFallback;
        }

        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${c.hasVVInstancing?e`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return multiplyMaskedColors(color, createMaskedFromNaNColor(vvColor()));
            }
            `:e`
            vec4 vvColor() {
              return vec4(1.0);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return color;
            }
            `}
    `)):d.code.add(e`vec4 vvColor() {
return vec4(1.0);
}
MaskedColor applyVVColor(MaskedColor color) {
return color;
}`)}export{d as a,c as i,u as n,o,s as r,l as t};