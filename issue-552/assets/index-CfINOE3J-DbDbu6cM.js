import{fD as c,c4 as o,fE as f,cB as r}from"./main-DM2UJ-BA.js";class A extends r{_parseConfig(t){if(t){const e=c(this.$vApp.$pinia);t.alwaysOn&&e.setAlwaysOn(!0);const i=t.extentSetIds;i&&Array.isArray(i)&&i.length>0&&e.setExtentSetIds(i)}}get config(){return super.config}}function p(a,t,e,i){const n=a-t,s=t+n/2,h=Math.min(n,e-i);return s>e?{min:e-h,max:e,changed:!0}:s<i?{min:i,max:i+h,changed:!0}:{min:t,max:a,changed:!1}}class g extends A{schemaEH="";extentEH="";added(){this._parseConfig(this.config);const t=this.$vApp.$watch(()=>this.config,e=>this._parseConfig(e));this.removed=()=>{t(),c(this.$vApp.$pinia).$reset(),this.evtOff("schemaEH"),this.evtOff("extentEH")},this.schemaEH=this.$iApi.event.on(o.MAP_BASEMAPCHANGE,e=>{e.schemaChanged&&this.checkActive()}),this.$iApi.geo.map.created?this.checkActive():this.$iApi.event.once(o.MAP_CREATED,()=>{this.checkActive()})}checkActive(){const t=c(this.$vApp.$pinia);t.alwaysOn||t.extentSetIds.includes(this.$iApi.geo.map.getExtentSet().id)?t.active||(t.setActive(!0),this.extentEH=this.$iApi.event.on(o.MAP_EXTENTCHANGE,e=>{t.enforcing||this.enforceBoundary(e,!1)})):t.active&&(t.setActive(!1),this.evtOff("extentEH"))}evtOff(t){this[t]&&(this.$iApi.event.off(this[t]),this[t]="")}enforceBoundary(t,e){const i=this.$iApi.geo.map.getExtentSet().maximumExtent,n=p(t.xmax,t.xmin,i.xmax,i.xmin),s=p(t.ymax,t.ymin,i.ymax,i.ymin);if(s.changed||n.changed){e&&(this.$iApi.geo.map.esriView.extent=i.toESRI());const h=f.fromParams("extguard",n.min,s.min,n.max,s.max,t.sr),m=c(this.$vApp.$pinia);m.setEnforcing(!0),setTimeout(()=>{this.$iApi.geo.map.zoomMapTo(h,void 0,!0,400,"ease-in-out").then(()=>{m.setEnforcing(!1),this.enforceBoundary(this.$iApi.geo.map.getExtent(),!0)})},150)}}}export{g as default};
