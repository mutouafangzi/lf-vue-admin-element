<template>
  <div class="panel">
    <div class="panel-heading" v-if="header">
      <slot name="header"></slot>
    </div>
    <div class="panel-body" v-if="body">
      <slot name="body"></slot>
    </div>
    <div class="panel-footer" v-if="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script type="es6">
  export default {
    name: 'layout',
    data() {
      return {
        header: this.$slots.header,
        body: this.$slots.body,
        footer: this.$slots.footer,
      }
    },
    components: {},
    created() {

    },
    methods: {},
    mounted() {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  .panel {
    padding: 0 20px;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .panel-heading {
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: red;
    border-bottom: 1px solid fuchsia;
    z-index: 10;
  }

  .panel-body {
    padding: 15px 0;
    display: inline-block;
    width: 100%;
  }

  .panel-footer {
    height: 52px;
    text-align: right;
    line-height: 52px;
    border-top: 1px solid fuchsia;
  }
</style>
