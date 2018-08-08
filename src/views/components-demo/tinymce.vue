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
          height: 300
        },
        Value:'请输入内容'
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