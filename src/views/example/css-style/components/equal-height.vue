<!-- 等高布局 -->
<template>
  <div>
    <div class="parent">
      <div class="left">
        <p>left</p>
        <p>left</p>
        <p>left</p>
        <p>left</p>
        <p>left</p>
        <p>left</p>
        <p>left</p>
      </div>
      <div class="right">
        <p>right</p>
        <p>right</p>
      </div>
    </div>
    <div style="width:100px;height:400px;background:red;"></div>
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
  .parent{
    width: 100%;
    overflow: hidden;
    p{
      margin: 0px;
    }
  }
  .left {
    float: left;
    background-color:pink;
    width: 100px;
  }
  .right {
    background-color: yellow;
    // margin-left: 100px
    /*间距可再加入 margin-left */
  }
  .left,.right {
    padding-bottom: 9999px;
    margin-bottom: -9999px;
  }
</style>