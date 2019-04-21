<!-- 负margin -->
<template>
  <div>
    <div class="margin-wrap">
      <div class="margin-box1">
        我是内部box1
      </div>
      <div class="margin-box2">
        我是内部box2
      </div>
      <div class="margin-box3">
        我是内部box3
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
.margin-wrap{
  border: 1px solid red;
  // width: 500px;
  height: 300px;
  .margin-box1{
    background-color: pink;
    float: left;
    width: 200px;
    height: 200px;
  }
  .margin-box2{
    background-color: salmon;
    float: left;
    width: 200px;
    height: 200px;
  }
  .margin-box3{
    background-color: yellow;
    float: left;
    width: 200px;
    height: 200px;
    margin-left: -500px;
  }
}
</style>