<template>
    <div class="navbar-container">
        <div class="side-contain-wrap">
            <el-button type="text">
                <i class="iconfont icon-Row-display-simple"></i>
            </el-button>
        </div>
        <div class="bread-wrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {}
        },
        components: {
            
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .navbar-container {
        width: 1000px;
        height: 30px;
        .side-contain-wrap{
            display: inline-block;
            margin: 0px 10px;
        }
        .bread-wrap{
            display: inline-block;
        }
    }
</style>
