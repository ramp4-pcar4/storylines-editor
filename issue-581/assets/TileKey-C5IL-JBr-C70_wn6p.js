import{ec as c}from"./main-DpxXUdv2.js";let r=class s{static getId(e,l,t,o){return typeof e=="object"?`${e.level}/${e.row}/${e.col}/${e.world}`:`${e}/${l}/${t}/${o}`}constructor(e,l,t,o){this.set(e,l,t,o)}get key(){return this}get id(){return this.toString()}get normalizedId(){return`${this.level}/${this.row}/${this.col}`}set id(e){this.set(e)}get hash(){const e=4095&this.row,l=4095&this.col,t=63&this.level;return(3&this.world)<<30|l<<22|e<<8|t}acquire(e,l,t,o){this.set(e,l,t,o)}contains(e){const l=e.level-this.level;return l>=0&&this.row===e.row>>l&&this.col===e.col>>l&&this.world===e.world}containsChild(e){const l=e.level-this.level;return l>0&&this.row===e.row>>l&&this.col===e.col>>l&&this.world===e.world}equals(e){return this.level===e.level&&this.row===e.row&&this.col===e.col&&this.world===e.world}clone(){return new s(this)}release(){this.level=0,this.row=0,this.col=0,this.world=0}set(e,l,t,o){if(e==null)this.level=0,this.row=0,this.col=0,this.world=0;else if(typeof e=="object")this.level=e.level||0,this.row=e.row||0,this.col=e.col||0,this.world=e.world||0;else if(typeof e=="string"){const[i,h,w,n]=e.split("/");this.level=parseFloat(i),this.row=parseFloat(h),this.col=parseFloat(w),this.world=parseFloat(n)}else this.level=+e,this.row=+l,this.col=+t,this.world=+o||0;return this}toString(){return`${this.level}/${this.row}/${this.col}/${this.world}`}getParentKey(){return this.level<=0?null:new s(this.level-1,this.row>>1,this.col>>1,this.world)}getNormalizedNeighbor(e,l,t){const o=this.clone();return o.col+=e,o.row+=l,t.normalizeKey(o),o}getChildKeys(){const e=this.level+1,l=this.row<<1,t=this.col<<1,o=this.world;return[new s(e,l,t,o),new s(e,l,t+1,o),new s(e,l+1,t,o),new s(e,l+1,t+1,o)]}compareRowMajor(e){return this.row<e.row?-1:this.row>e.row?1:this.col<e.col?-1:this.col>e.col?1:0}};r.pool=new c(r,null,null,25,50);export{r as s};
