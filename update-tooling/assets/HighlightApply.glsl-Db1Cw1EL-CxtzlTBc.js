import{t as e}from"./ShaderBuilder-aUMFb5cS-QIZt__97.js";import{t}from"./glsl-EDZkDhgF-BmlD_e8i.js";import{t as n}from"./FloatPassUniform-gHcGW-mi-DcUQ2f5D.js";import{t as r}from"./Texture2DPassUniform-RVTT2Sjh-CghdmKcr.js";import{t as i}from"./HighlightReadBitmap.glsl-O45u9_r0-CoGpZ0P1.js";import{t as a}from"./IntegerPassUniform-EGe6J__S-BV9yqNAU.js";import{t as o}from"./Float2DrawUniform-LhTbmE_3-CZCsNSsD.js";import{s,t as c}from"./HighlightDownsample.glsl-SwhlLHGA-DlNFmPZl.js";import{t as l}from"./HighlightCellGridScreenSpacePass.glsl-CEHgSnAG-Ds2dRHhw.js";function u(){let u=new e;u.include(l);let{fragment:d}=u;return d.uniforms.add(new r(`blurInput`,e=>e.highlightBlurTexture),new o(`blurSize`,e=>e.blurSize),new c(`highlightTexture`,e=>e.highlightTexture),new r(`highlightOptionsTexture`,e=>e.highlightOptionsTexture),new a(`highlightLevel`,e=>e.highlightLevel),new n(`occludedIntensityFactor`,e=>e.occludedFactor)),d.constants.add(`inner`,`float`,1-(9-s)/9),u.include(i),d.main.add(t`vec2 highlightTextureSize = vec2(textureSize(highlightTexture,0));
vec2 uv = sUV;
vec2 center = texture(blurInput, uv).rg;
vec2 blurredHighlightValue = (vOutlinePossible == 0.0)
? center
: center * 0.204164
+ texture(blurInput, uv + blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv - blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv + blurSize * 3.294215).rg * 0.093913
+ texture(blurInput, uv - blurSize * 3.294215).rg * 0.093913;
float highlightIntensity = blurredHighlightValue.r;
float occlusionWeight = blurredHighlightValue.g;
if (highlightIntensity <= 0.01) {
discard;
}
vec4 fillColor    = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 0), 0);
vec4 outlineColor = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 1), 0);
uvec2 centerTexel = texelFetch(highlightTexture, ivec2(uv * highlightTextureSize), 0).rg;
uint centerBits = readLevelBits(centerTexel, highlightLevel);
bool centerFilled = (centerBits & 1u) == 1u;
bool centerOccluded = (centerBits & 3u) == 3u;
bool occluded = centerOccluded || (0.5 * highlightIntensity < occlusionWeight);
float occlusionFactor = occluded ? occludedIntensityFactor : 1.0;
float outlineFactor = centerFilled ? 1.0 : smoothstep(0.0, inner, highlightIntensity);
float fillFactor = centerFilled ? 1.0 : 0.0;
vec4 baseColor = mix(outlineColor, fillColor, fillFactor);
float intensity = baseColor.a * occlusionFactor * outlineFactor;
fragColor = vec4(baseColor.rgb, intensity);`),u}var d=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:`Module`}));export{u as n,d as t};