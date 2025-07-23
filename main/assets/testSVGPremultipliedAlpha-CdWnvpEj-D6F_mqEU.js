import{i as A}from"./WGLContainer-CF3AeUnM-dqa8yMQG.js";import{u as X,N as v}from"./VertexArrayObject-DTkLCIKs-B_ItinRY.js";import{G as g,M as m,n as f,R as Q,T as I,U as M,F as R}from"./enums-DBi1-Mm2-CUS1pvQe.js";import{f as U}from"./FramebufferObject-DQw0QX3p-CB4beI4H.js";import{H as l,O as P}from"./Texture-DXSFJsEu-02_Cw8VC.js";import{jX as S}from"./main-D7vwjMDX.js";class d{constructor(i,e,r,o,u,a,n,_,T){this.createQuery=i,this.deleteQuery=e,this.resultAvailable=r,this.getResult=o,this.disjoint=u,this.beginTimeElapsed=a,this.endTimeElapsed=n,this.createTimestamp=_,this.timestampBits=T}}let s=!1;function N(t,i){if(i.disjointTimerQuery)return null;let e=t.getExtension("EXT_disjoint_timer_query_webgl2");return e?new d(()=>t.createQuery(),r=>{t.deleteQuery(r),s=!1},r=>t.getQueryParameter(r,t.QUERY_RESULT_AVAILABLE),r=>t.getQueryParameter(r,t.QUERY_RESULT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{s||(s=!0,t.beginQuery(e.TIME_ELAPSED_EXT,r))},()=>{t.endQuery(e.TIME_ELAPSED_EXT),s=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>t.getQuery(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):(e=t.getExtension("EXT_disjoint_timer_query"),e?new d(()=>e.createQueryEXT(),r=>{e.deleteQueryEXT(r),s=!1},r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_AVAILABLE_EXT),r=>e.getQueryObjectEXT(r,e.QUERY_RESULT_EXT),()=>t.getParameter(e.GPU_DISJOINT_EXT),r=>{s||(s=!0,e.beginQueryEXT(e.TIME_ELAPSED_EXT,r))},()=>{e.endQueryEXT(e.TIME_ELAPSED_EXT),s=!1},r=>e.queryCounterEXT(r,e.TIMESTAMP_EXT),()=>e.getQueryEXT(e.TIMESTAMP_EXT,e.QUERY_COUNTER_BITS_EXT)):null)}class b{constructor(){this._result=!1}dispose(){this._program=S(this._program)}get result(){return this._program!=null&&(this._result=this._test(this._program),this.dispose()),this._result}}class G extends b{constructor(i){super(),this._rctx=i;const e=`
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
    `;this._program=i.programCache.acquire(e,r,new Map([["a_pos",0]]))}dispose(){super.dispose()}_test(i){const e=this._rctx;if(!e.gl)return i.dispose(),!0;const r=new l(1);r.wrapMode=g.CLAMP_TO_EDGE,r.samplingMode=m.NEAREST;const o=new U(e,r),u=X.createVertex(e,f.STATIC_DRAW,new Uint16Array([0,0,1,0,0,1,1,1])),a=new v(e,new Map([["a_pos",0]]),A,new Map([["geometry",u]])),n=new l;n.samplingMode=m.LINEAR,n.wrapMode=g.CLAMP_TO_EDGE;const _=new P(e,n,E);e.useProgram(i),e.bindTexture(_,0),i.setUniform1i("u_texture",0);const T=e.getBoundFramebufferObject(),{x:c,y:h,width:w,height:y}=e.getViewport();e.bindFramebuffer(o),e.setViewport(0,0,1,1),e.setClearColor(0,0,0,0),e.setBlendingEnabled(!1),e.clear(Q.COLOR),e.bindVAO(a),e.drawArrays(I.TRIANGLE_STRIP,0,4);const p=new Uint8Array(4);return o.readPixels(0,0,1,1,M.RGBA,R.UNSIGNED_BYTE,p),a.dispose(),o.dispose(),_.dispose(),e.setViewport(c,h,w,y),e.bindFramebuffer(T),p[0]!==255}}const E=new Image;E.src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='5' height='5' version='1.1' viewBox='0 0 5 5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23f00' fill-opacity='.5'/%3E%3C/svg%3E%0A",E.width=5,E.height=5,E.decode();export{N as L,G as b,b as c};
