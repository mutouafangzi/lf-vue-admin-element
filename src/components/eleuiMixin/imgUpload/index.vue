<!-- 图片上传的组件 -->
<template>
  <div class='img-uploader-wrap'>
    <!-- :style="{background:color,borderColor:color}" -->
    <el-button 
      type="primary" 
      icon='el-icon-upload' 
      size="mini"  
      @click="dialogVisible=true">上传图片</el-button>
    <el-dialog :visible.sync="dialogVisible" class="upload-dialog-wrap">
      <el-upload
        ref="uploadeImg"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :show-file-list="true"
        :mutiple="true"
        :file-list="fileList"
        :auto-upload="false"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="handleSuccess">
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
  /* name: 'imgUpload',
  props:{
    color:{
      type: String,
      default: '#1890ff'
    }
  }, */
  data () {
    return {
      // 上传文件的弹窗
      dialogVisible: false,
      // 上传的列表类型
      fileList:[],
      // 这个应该是一个中间存储上传图片的容器数组
      listObj: {}
    };
  },

  methods: {
    handleRemove(file, fileList){
      console.log('删除的文件', file, fileList)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file){
      console.log('上传前的钩子', file)
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    // 检查所有图片是否上传成功
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit(){
      console.log('点击确定',this.fileList,arguments)
      // this.$refs.uploadeImg.submit();
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      console.log(arr)
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = [] 
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      console.log("上传成功",response,file)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    
  },

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