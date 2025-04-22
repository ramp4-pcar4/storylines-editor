import{a as A}from"./WGLContainer-LxgEo4I_-CLS4cGDP.js";import{r as X}from"./BufferObject-BM_7mcDb-D2eG9PsQ.js";import{G as p,M as g,n as v,R as f,T as Q,U as I,F as M}from"./enums-DBi1-Mm2-CUS1pvQe.js";import{G as R}from"./Program-DLVwTiPA-DuNh6CwL.js";import{H as l,V as U}from"./Texture-BCt2hphT-B3fQk9VU.js";import{c as P}from"./VertexArrayObject-M4iRGGoi-MVzHGmfo.js";import{hT as S}from"./main-BNyfiy7F.js";class c{constructor(i,e,r,o,u,E,n,_,T){this.createQuery=i,this.deleteQuery=e,this.resultAvailable=r,this.getResult=o,this.disjoint=u,this.beginTimeElapsed=E,this.endTimeElapsed=n,this.createTimestamp=_,this.timestampBits=T}}let s=!1;function N(t,i){if(i.disjointTimerQuery)return null;let e=t.getExtension("EXT_disjoint_timer_query_webgl2");return e?new c(()=>t.createQuery(),r=>{t.deleteQuery(r),s=!1},r=>t.getQueryParameter(r,t.QUERY_RESULT_AVAILABLE),r=>t.getQueryParameter(r,t.QUERY_RESULT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{s||(s=!0,t.beginQuery(e.TIME_ELAPSED_EXT,r))},()=>{t.endQuery(e.TIME_ELAPSED_EXT),s=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>t.getQuery(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):(e=t.getExtension("EXT_disjoint_timer_query"),e?new c(()=>e.createQueryEXT(),r=>{e.deleteQueryEXT(r),s=!1},r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_AVAILABLE_EXT),r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_EXT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{s||(s=!0,e.beginQueryEXT(e.TIME_ELAPSED_EXT,r))},()=>{e.endQueryEXT(e.TIME_ELAPSED_EXT),s=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>e.getQueryEXT(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):null)}class b{constructor(){this._result=!1}dispose(){this._program=S(this._program)}get result(){return this._program!=null&&(this._result=this._test(this._program),this.dispose()),this._result}}class j extends b{constructor(i){super(),this._rctx=i;const e=`
    precision highp float;

    attribute vec2 a_pos;
    varying vec2 v_uv;

    void main() {
      v_uv = a_pos;
      gl_Position = vec4(a_pos * 2.0 - 1.0, 0.0, 1.0);
    }
    `,r=`
    precision highp float;

    varying vec2 v_uv;

    uniform sampler2D u_texture;

    void main() {
      gl_FragColor = texture2D(u_texture, v_uv);
    }
    `;this._program=i.programCache.acquire(e,r,new Map([["a_pos",0]]))}dispose(){super.dispose()}_test(i){const e=this._rctx;if(!e.gl)return i.dispose(),!0;const r=new l(1);r.wrapMode=p.CLAMP_TO_EDGE,r.samplingMode=g.NEAREST;const o=new R(e,r),u=X.createVertex(e,v.STATIC_DRAW,new Uint16Array([0,0,1,0,0,1,1,1])),E=new P(e,new Map([["a_pos",0]]),A,new Map([["geometry",u]])),n=new l;n.samplingMode=g.LINEAR,n.wrapMode=p.CLAMP_TO_EDGE;const _=new U(e,n,a);e.useProgram(i),e.bindTexture(_,0),i.setUniform1i("u_texture",0);const T=e.getBoundFramebufferObject(),{x:d,y:h,width:w,height:y}=e.getViewport();e.bindFramebuffer(o),e.setViewport(0,0,1,1),e.setClearColor(0,0,0,0),e.setBlendingEnabled(!1),e.clear(f.COLOR),e.bindVAO(E),e.drawArrays(Q.TRIANGLE_STRIP,0,4);const m=new Uint8Array(4);return o.readPixels(0,0,1,1,I.RGBA,M.UNSIGNED_BYTE,m),E.dispose(),o.dispose(),_.dispose(),e.setViewport(d,h,w,y),e.bindFramebuffer(T),m[0]!==255}}const a=new Image;a.src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='5' height='5' version='1.1' viewBox='0 0 5 5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23f00' fill-opacity='.5'/%3E%3C/svg%3E%0A",a.width=5,a.height=5,a.decode();export{j as L,N as b,b as c};
