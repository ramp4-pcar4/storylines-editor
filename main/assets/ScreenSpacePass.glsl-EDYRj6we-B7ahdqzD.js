import{t as e}from"./glsl-EDZkDhgF-BmlD_e8i.js";function t(t,n=!0){t.attributes.add(`position`,`vec2`),n&&t.varyings.add(`uv`,`vec2`),t.vertex.main.add(e`
      gl_Position = vec4(position, 0.0, 1.0);
      ${n?e`uv = position * 0.5 + vec2(0.5);`:``}
  `)}export{t};