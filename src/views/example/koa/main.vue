<!--  -->
<template>
  <div>
    测试数据{{data}}
    <el-button type='primary' @click='handleClick'>发送请求</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: 'XXXX'
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    async handleClick(ctx, next) {
      await next();
      // 设置response的Content-Type:
      ctx.response.type = 'text/html';
      // 设置response的内容:
      ctx.response.body = '<h1>Hello, koa2!</h1>';
    }
  }
}

</script>
<style lang='scss' scoped>
</style>