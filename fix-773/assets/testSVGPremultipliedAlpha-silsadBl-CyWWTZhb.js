import{d as y}from"./WGLContainer-qQmF3DRB-BbEC832P.js";import{u as A,F as X}from"./VertexArrayObject-CieliEx4-BqSHIgxH.js";import{U as g,G as d,f as v,R as Q,T as I,F as U,Y as M}from"./enums-wEDHPbCF-Cf76M5_x.js";import{d as R}from"./FramebufferObject-D3QloItC-BvXrGTNY.js";import{Y as p,_ as P}from"./Texture-D5XWO2GQ-DFkJKk2N.js";import{kf as S}from"./main-D8UjLOIQ.js";class m{constructor(s,e,r,o,u,E,a,_,T){this.createQuery=s,this.deleteQuery=e,this.resultAvailable=r,this.getResult=o,this.disjoint=u,this.beginTimeElapsed=E,this.endTimeElapsed=a,this.createTimestamp=_,this.timestampBits=T}}let i=!1;function F(t,s){if(s.disjointTimerQuery)return null;let e=t.getExtension("EXT_disjoint_timer_query_webgl2");return e?new m(()=>t.createQuery(),r=>{t.deleteQuery(r),i=!1},r=>t.getQueryParameter(r,t.QUERY_RESULT_AVAILABLE),r=>t.getQueryParameter(r,t.QUERY_RESULT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{i||(i=!0,t.beginQuery(e.TIME_ELAPSED_EXT,r))},()=>{t.endQuery(e.TIME_ELAPSED_EXT),i=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>t.getQuery(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):(e=t.getExtension("EXT_disjoint_timer_query"),e?new m(()=>e.createQueryEXT(),r=>{e.deleteQueryEXT(r),i=!1},r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_AVAILABLE_EXT),r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_EXT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{i||(i=!0,e.beginQueryEXT(e.TIME_ELAPSED_EXT,r))},()=>{e.endQueryEXT(e.TIME_ELAPSED_EXT),i=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>e.getQueryEXT(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):null)}class b{constructor(){this._result=!1}dispose(){this._program=S(this._program)}get result(){return this._program!=null&&(this._result=this._test(this._program),this.dispose()),this._result}}class Y extends b{constructor(s){super(),this._rctx=s;const e=`
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
    `;this._program=s.programCache.acquire(e,r,new Map([["a_pos",0]]))}dispose(){super.dispose()}_test(s){const e=this._rctx;if(!e.gl)return s.dispose(),!0;const r=new p(1);r.wrapMode=g.CLAMP_TO_EDGE,r.samplingMode=d.NEAREST;const o=new R(e,r),u=A.createVertex(e,v.STATIC_DRAW,new Uint16Array([0,0,1,0,0,1,1,1])),E=new X(e,new Map([["a_pos",0]]),y,new Map([["geometry",u]])),a=new p;a.samplingMode=d.LINEAR,a.wrapMode=g.CLAMP_TO_EDGE;const _=new P(e,a,n);e.useProgram(s),e.bindTexture(_,0),s.setUniform1i("u_texture",0);const T=e.getBoundFramebufferObject(),{x:c,y:h,width:f,height:w}=e.getViewport();e.bindFramebuffer(o),e.setViewport(0,0,1,1),e.setClearColor(0,0,0,0),e.setBlendingEnabled(!1),e.clear(Q.COLOR),e.bindVAO(E),e.drawArrays(I.TRIANGLE_STRIP,0,4);const l=new Uint8Array(4);return o.readPixels(0,0,1,1,U.RGBA,M.UNSIGNED_BYTE,l),E.dispose(),o.dispose(),_.dispose(),e.setViewport(c,h,f,w),e.bindFramebuffer(T),l[0]!==255}}const n=new Image;n.src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='5' height='5' version='1.1' viewBox='0 0 5 5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23f00' fill-opacity='.5'/%3E%3C/svg%3E%0A",n.width=5,n.height=5,n.decode();export{F as U,Y as b,b as c};
