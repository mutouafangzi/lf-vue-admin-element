<!-- 双飞翼布局 -->
<template>
  <div class="wrap">
    <div id="header">header</div>
    <div id="content">
      <div id="middle">
        <div class="middle-inner">
          middle
        </div>
      </div>
      <div id="left">left</div>
      <div id="right">right</div>
    </div>
    <div id="footer">footer</div>
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
  min-width: 600px;
}
#header,#footer{
    height: 50px;
    width: 100%;
    border: 1px solid;
    background-color: grey;
}
#left,#right{
  width: 200px;
  height: 200px;
  background-color:pink;
}
#middle{
  background-color: green;
  width: 100%;
  float: left;
}
#content{
  overflow: hidden;
}
#left{
  float: left;
  margin-left: -100%;
}
#right{
  float: left;
  margin-left: -200px;
}
.middle-inner{
  margin: 0 200px;
}
</style>