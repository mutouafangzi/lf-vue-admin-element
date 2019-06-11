<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {};
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
</style>
