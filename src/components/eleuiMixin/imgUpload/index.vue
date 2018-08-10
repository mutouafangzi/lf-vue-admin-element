<!-- 图片上传的组件 -->
<template>
  <div class='img-uploader-wrap'>
    <el-button type="primary" icon='el-icon-upload' size="mini"  @click="dialogVisible=true">上传图片</el-button>
    <el-dialog :visible.sync="dialogVisible" class="upload-dialog-wrap">

      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="float-wrap">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    };
  },

  methods: {},

  computed: {},

  components: {},
}

</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  .img-uploader-wrap{
    .float-wrap{
      float: right;
    }
    .upload-dialog-wrap{
      .el-dialog__body{
        &:after{
          display:block;
          clear:both;
          content:"";
          visibility:hidden;
          height:0
        }
      }
    }
    
  }
  

</style>