<template>
  <div class="spec-preview">
    <img v-if="skuInfo[0]" :src="skuInfo[index].imgUrl" />
    <div class="event" @mousemove="handler" ref="event" v-if="skuInfo[0]"></div>
    <div class="big">
      <img v-if="skuInfo[0]" :src="skuInfo[index].imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask" v-if="skuInfo[0]"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuInfo"],
  data() {
    return {
      index:0
    }
  },
  mounted(){
    this.$bus.$on('bind',(index)=>{
      this.index = index
    })
  },
  methods:{
    handler(event){
      let mask = this.$refs.mask
      let events = this.$refs.event
      let big = this.$refs.big
      let left = event.offsetX - mask.offsetWidth/2
      let top = event.offsetY - mask.offsetHeight/2
      if(left <= 0) left = 0
      if(left > events.offsetWidth - mask.offsetWidth) left = events.offsetWidth - mask.offsetWidth
      if(top <= 0) top = 0
      if(top > events.offsetHeight - mask.offsetHeight) top = events.offsetHeight - mask.offsetHeight
      mask.style.top = top + 'px'
      mask.style.left = left + 'px'
      big.style.left = - 2*left+ 'px'
      big.style.top = -2 * top+ 'px'
    }
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>