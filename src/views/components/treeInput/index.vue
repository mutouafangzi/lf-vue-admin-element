<template>
    <div class="input-select" v-clickoutside="handleClose">
      <el-input
        v-model="visibleData"
        readonly="readonly"
        @click.native="isShowReportTypeTree=!isShowReportTypeTree">
        <!--
        @blur= "isShowReportTypeTree=false"-->
        <i slot="suffix" :class="objectClass"></i>
      </el-input>
      <transition name="el-zoom-in-top">
        <div class="tree-box">
          <el-tree
            v-if="isShowReportTypeTree"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            default-expand-all
            :data = "treeData"
            @check="handleTreeChange"></el-tree>
        </div>
      </transition>

    </div>
</template>
