<!--  -->
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="等高布局" name="first">
        <equal-height></equal-height>
      </el-tab-pane>
      <el-tab-pane label="等分布局" name="second">
        <equal-allot></equal-allot>
      </el-tab-pane>
      <el-tab-pane label="垂直居中" name="third">
        <vertical-center></vertical-center>
      </el-tab-pane>
      <el-tab-pane label="三列之圣杯" name="fourth">
        <grail-layout></grail-layout>
      </el-tab-pane>
      <el-tab-pane label="三列之双飞翼" name="five">
        <bird-layout></bird-layout>
      </el-tab-pane>
      <el-tab-pane label="黏连布局" name="six">黏连布局</el-tab-pane>
      <el-tab-pane label="负margin" name="seven">
        <minus-margin></minus-margin>
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import equalHeight from './components/equal-height.vue'
import equalAllot from './components/equal-allot.vue'
import verticalCenter from './components/vertical-center.vue'
import minusMargin from './components/minus-margin.vue'
import grailLayout from './components/grail-layout.vue'
import birdLayout from './components/bird-layout.vue'
export default {
  data () {
    return {
      activeName: 'five'
    };
  },

  components: {
    equalHeight,
    equalAllot,
    verticalCenter,
    minusMargin,
    grailLayout,
    birdLayout
  },

  computed: {},

  mounted: {},

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}

</script>
<style lang='scss' scoped>

</style>