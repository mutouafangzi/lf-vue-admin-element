<!-- 垂直居中 -->
<template>
  <div>
    <div style="overflow:hidden">
      <div class="parent-wrap">
        父相对子绝对，left,right等为0
        子元素margin设为auto
        <div class="child-box">
          我是要居中的元素
        </div>
      </div>
      <div class="parent-wrap2">
        <div style="float:left">
          flex
        </div>
        <div class="child-box2">
          我是要居中的元素2
        </div>
      </div>
      <div class="parent-wrap3">
          我是要居中的文本3
      </div>
    </div>
    <div class="parent-wrap4">
      table + incline-block
      <div class="child-box4">
        我是要居中的元素4
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
<style scoped>
.parent-wrap{
  float: left;
  border: 1px solid red;
  width: 200px;
  height: 200px;
  position: relative;
}
.child-box{
  background-color: pink;
  position: absolute;
  height: 100px;
  width: 100px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.parent-wrap2{
  float: left;
  border: 1px solid red;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.child-box2{
  background-color: pink;
  height: 100px;
  width: 100px;
}
.parent-wrap3{
  border: 1px solid sandybrown;
  float: left;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.parent-wrap4{
  border: 1px solid red;
  width: 200px;
  height: 200px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.child-box4{
  background-color: pink;
  height: 100px;
  width: 100px;
  display: inline-block;
}
</style>