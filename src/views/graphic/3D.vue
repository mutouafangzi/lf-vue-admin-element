<!--  -->
<template>
  <div id='wrap'>
    dsfddd
    <div class='box' style="width:1500px;height:500px;">
      <div style="transform-origin:center center -130px;transform: rotateY(30deg);background:red;"></div>
      <div style="transform-origin:center center 130px;transform: rotateY(60deg);background:red;"></div>
      <div style="transform-origin:center center 130px;transform: rotateY(90deg);background:red;"></div>
      <div style="transform-origin:center center 130px;transform: rotateY(120deg);background:red;"></div>
      <div style="transform-origin:center center 130px;transform: rotateY(150deg);background:red;"></div>
      <div style="transform-origin:center center 130px;transform: rotateY(180deg);background:red;"></div>
      <div style="transform-origin:center center 130px;transform: rotateY(210deg);background:red;"></div>
      <div style="transform-origin:center center 130px;transform: rotateY(240deg);background:red;"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  methods: {},

  computed: {},

  components: {},
}

</script>

<style rel="stylesheet/scss" lang="scss">

  @import "src/styles/mixin.scss";

  #wrap{
    perspective: 800px;
    width: 100px;
    height: 100px;
    padding: 100px;
    margin: 100px auto;
    .box{
      position: relative;
      transform-style: preserve-3d;
      width: 100px;
      height: 100px;
      transition: 10s transform;
      div{
				position: absolute;
				width: 100px;
				height: 100px;
				line-height: 100px;
				text-align: center;
				/*transform-origin: center center -28.8675134594812870px;*/ 
				/*backface-visibility: hidden;*/
				background: pink;
				border: 1px solid;
			}
    }
    &:hover #box{
      transform: rotateY(360deg);
    }
  }

</style>