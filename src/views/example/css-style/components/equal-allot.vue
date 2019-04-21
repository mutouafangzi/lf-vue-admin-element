<!-- 等分布局 -->
<template>
  <div style="width:100%;border:1px solid blue;">
    <div class="parent">
      <div class="column">
        <p>1</p>
      </div>
      <div class="column">
        <p>2</p>
      </div>
      <div class="column">
        <p>3</p>
      </div>
      <div class="column">
        <p>4</p>
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
.parent{
  display: table;
  table-layout: fixed;
  p{
    margin: 0px;
  }
  .column{
    border: 1px solid red;
    width: 200px;
    display: table-cell;
  }
}
</style>