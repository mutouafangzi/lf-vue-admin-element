<template>
    <div class="app-main">
      <p>
        这是AppMain
      </p>
      <transition name="fade" mode="out-in">
        <!-- <router-view :key="key"></router-view> -->
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            // key() {
            //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            // }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
