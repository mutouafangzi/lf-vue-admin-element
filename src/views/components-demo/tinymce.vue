<!--  -->
<template>
  <div>
    <tiny-mce
    :config           = "Config"
    v-model          = "Value"
    :url              = "Url"
    :max-size         = "MaxSize"
    :accept           = "Accept"
    :with-credentials = false
    @on-ready         = "onEditorReady"
    @on-destroy       = "onEditorDestroy"
    @on-upload-success= "onEditorUploadComplete"
    @on-upload-fail   = "onEditorUploadFail">
    </tiny-mce>
  </div>
</template>

<script>

import TinyMce from '@/components/tinymce/index'

export default {
    name: "editor-demo",
    data: function () {
      return {
        Config:{
          theme: 'modern',
          // 编辑区高度
          height: 300,
          // 工具栏，可以在调用时配置
          toolbar: 
          // 一种配置
          'styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | blockquote  subscript superscript codesample | charmap	anchor pagebreak insertdatetime emoticons fullscreen',
          // 菜单栏
          menubar: 'file edit insert view format table',
        },
        Value:''
      }
    },
    methods: {
      onEditorReady(){
        console.log('这是onEditorReady')
      },
      onEditorDestroy(){
        console.log('这是onEditorDestroy')
      },
      onEditorUploadComplete(){
        console.log('这是onEditorUploadComplete')
      },
      onEditorUploadFail(){
        console.log('这是onEditorUploadFail')
      }
    },
    components:{
      TinyMce
    }
}

</script>
<style rel="stylesheet/scss" lang="scss">

  @import "src/styles/mixin.scss";

</style>