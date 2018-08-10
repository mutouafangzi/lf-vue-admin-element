<!-- 富文本编辑器组件 -->
<template>
  <div>
    <textarea :id="Id"></textarea>
    <img-uploader></img-uploader>
    <!-- <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor> -->
  </div>
</template>

<script>

import ImgUploader from '../eleuiMixin/imgUpload/index'

import "../../../static/tinymce/tinymce.min.js";
// import "../../../static/tinymce/langs/zh_CN";

export default {
  data: function() {
    const Id = Date.now();
    return {
      /* tinymceHtml: '请输入内容',
        init: {
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:eeeeeeeeeeee
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        }, */

      Id: Id,
      Editor: null,
      // 富文本编辑器一些其他配置
      DefaultConfig: {
        // GLOBAL
        // 父组件传入参数进行配置
        /* height: 500,
          theme: 'modern',
          // 富文本菜单栏的配置
          menubar: 'file edit insert view format table',
          // 自定义工具栏
          toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `, */
        language: 'zh_CN',
        plugins: `
            paste
            importcss
            image
            code
            table
            advlist
            fullscreen
            link
            media
            lists
            textcolor
            colorpicker
            hr
            preview
          `,

        // CONFIG

        forced_root_block: "p",
        force_p_newlines: true,
        importcss_append: true,

        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,

        insert_button_items: "image link | inserttable",

        // CONFIG: Paste
        paste_retain_style_properties: "all",
        paste_word_valid_elements: "*[*]", // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: "all",
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,

        // CONFIG: Font
        fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px",

        // CONFIG: StyleSelect
        style_formats: [
          {
            title: "首行缩进",
            block: "p",
            styles: { "text-indent": "2em" }
          },
          {
            title: "行高",
            items: [
              { title: "1", styles: { "line-height": "1" }, inline: "span" },
              {
                title: "1.5",
                styles: { "line-height": "1.5" },
                inline: "span"
              },
              { title: "2", styles: { "line-height": "2" }, inline: "span" },
              {
                title: "2.5",
                styles: { "line-height": "2.5" },
                inline: "span"
              },
              { title: "3", styles: { "line-height": "3" }, inline: "span" }
            ]
          }
        ],

        // FontSelect
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,

        // Tab
        tabfocus_elements: ":prev,:next",
        object_resizing: true,

        // Image
        imagetools_toolbar:
          "rotateleft rotateright | flipv fliph | editimage imageoptions"
      }
    };
  },

  props: {
    // 富文本的内容区显示内容
    value: {
      type: String,
      default: "请在此输入内容"
    },
    // 富文本编辑器某些需要配置的选项，直接放置config中
    config: {
      type: Object,
      default: () => {
        return {
          theme: "modern",
          // 编辑区高度，可以在调用插件时配置
          height: {
            type: Number,
            required: false,
            default: 300
          },
          // 工具栏，可以在调用时配置
          toolbar: {
            type: String,
            required: false,
            default: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `
          },
          // 菜单栏
          menubar: {
            type: String,
            required: false,
            default: "file edit insert view format table tools help"
          }
        };
      }
    }

    // 以下都是上传图片的相关配置参数
    /* url: {
        default: '',
        type: String
      },
      accept: {
        default: 'image/jpeg, image/png',
        type: String
      },
      maxSize: {
        default: 2097152,
        type: Number
      },
      withCredentials: {
        default: false,
        type: Boolean
      } */
  },

  methods: {
    init() {
      const that = this;
      // webpack打包时解决theme的路径问题
      window.tinymce.baseURL = '/static/tinymce';
      window.tinymce.suffix = '.min';

      this.Editor = window.tinymce.init({
        // 默认配置
        ...this.DefaultConfig,

        /* // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {
            if (blobInfo.blob().size > that.maxSize) {
              failure('文件体积过大')
            }
            
            if (that.accept.indexOf(blobInfo.blob().type) >= 0) {
              uploadPic()
            } else {
              // console.log('这是图片格式', blobInfo.blob().type,that.accept,that.accept.indexOf(blobInfo.blob().type))
              failure('图片格式错误')
            }
            function uploadPic () {
              const xhr = new XMLHttpRequest()
              const formData = new FormData()
              xhr.withCredentials = that.withCredentials
              xhr.open('POST', that.url)
              xhr.onload = function () {

                if (xhr.status !== 200) {
                  // 抛出 'on-upload-fail' 钩子
                  that.$emit('on-upload-fail')
                  failure('上传失败: ' + xhr.status)
                  return
                }

                const json = JSON.parse(xhr.responseText)
                // 抛出 'on-upload-complete' 钩子
                that.$emit('on-upload-complete' , [
                  json, success, failure
                ])
              }
              formData.append('file', blobInfo.blob())
              xhr.send(formData)
            }
          }, */

        // prop内传入的config
        ...this.config,
        // 挂载的DOM的对象
        selector: `#${this.Id}`,

        setup: editor => {
          // 抛出 'on-ready' 事件钩子
          editor.on("init", () => {
            that.loading = false;
            that.$emit("on-ready");
            editor.setContent(that.value);
          });
          // 抛出 'input' 事件钩子，同步value数据
          editor.on("input change undo redo", () => {
            that.$emit("input", editor.getContent());
          });
        }
      });
    }
  },

  mounted() {
    this.init();
  },
  watch: {},
  components: {
    /* Editor */
    ImgUploader
  },
  beforeDestroy() {
    // 销毁tinymce
    this.$emit("on-destroy");
    window.tinymce.remove(`#${this.Id}`);
  }
};
</script>
<style scoped>
</style>