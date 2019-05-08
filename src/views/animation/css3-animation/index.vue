<!--  -->
<template>
  <div class="wrap">
    <div class='left'>
      <div class="transition-wrap">css3的过渡效果transition
        <div class="bgc-change"></div>
      </div>
      <div class="grandient-wrap">css3的渐变TODO
        <div class="bgc-grandient"></div>
      </div>
    </div>
    <div class="right">
      <div class="animation-wrap">css3的动画效果animation
        <div class="bounce-element">弹跳元素</div>
        <div class="bouncein-element">弹入元素</div>
        <div class="bounceinL-element">左弹入元素</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.wrap{
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 1fr;
}
.left{
  .transition-wrap{
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px solid red;
    .bgc-change{
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      margin: auto;
      width: 100px;
      height: 100px;
      background-color: salmon;
      transition: background-color 2s ease-in-out;
      &:hover{
        background-color: red;
      }
    }
  }
  .grandient-wrap{
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px solid rgb(84, 151, 252);
    .bgc-grandient{
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      margin: auto;
      width: 100px;
      height: 100px;
      background-color: rgb(82, 216, 250);
    }
  }
}

.right{
  background-color: #fef4ad;
  .animation-wrap{
    position: relative;
    width: 100%;
    height: 600px;
    .bounce-element{
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(82, 216, 250);
      animation: a-bounce 5s cubic-bezier(.26,.78,.6,.97);
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
    .bouncein-element{
      position: absolute;
      left: 0px;
      right: 0px;
      top: 100px;
      bottom: 0px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fd903d;
      animation: a-bouncein 5s cubic-bezier(.26,.78,.6,.97);
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
    .bounceinL-element{
      position: absolute;
      left: 0px;
      right: 0px;
      top: 200px;
      bottom: 0px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #dd6d7c;
      animation: a-bounceinL 5s cubic-bezier(.26,.78,.6,.97);
      animation-iteration-count: infinite;
    }
  }
}

@keyframes a-bounce {
  0%,20%,50%,80%,100%{transform: translateX(0);}
  10%{transform: translateX(150px)}
  40%{transform: translateX(130px);}
  60%{transform: translateX(115px);}
}
@-moz-keyframes a-bounce {
  0%,20%,50%,80%,100%{-ms-transform: translateX(0);}
  10%{-ms-transform: translateX(150px)}
  40%{-ms-transform: translateX(130px);}
  60%{-ms-transform: translateX(115px);}
}
@keyframes a-bouncein {
  0%{opacity: 0;transform: scale(0.3)}
  50%{opacity: 1;transform: scale(1.05)}
  70%{transform: scale(0.9)}
  100%{transform: scale(1)}
}
@keyframes a-bounceinL {
  0%{opacity: 0;transform: translateX(-100px)}
  60%{opacity: 1;transform: translateX(80px)}
  80%{transform: translateX(-40px)}
  100%{transform: translateX(0)}
}

</style>