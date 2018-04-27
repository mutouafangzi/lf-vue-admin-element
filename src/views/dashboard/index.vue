<template>
  <div class="dashboard-container">
    <div id="download-container">
      
      <div style="width:300px;height:300px;background: yellow;padding:50px;margin-right:20px;display:inline-block;" class="imgArea">
        <div id="barChart" :style="{width: '300px', height: '300px'}"  class="imgArea"></div>
        <span class="fontArea">这是一个柱状图，关于一个服装的</span>
      </div>
      <div style="width:300px;height:300px;margin-right:20px;display:inline-block;">
        <div id="pieChart" style="width:300px; height:300px"></div>
        <span class="fontArea">这是一个饼图，关于数据来源的</span>
      </div>
      <div style="width:300px;height:300px;background: yellow;padding:50px;margin-right:20px;display:inline-block;">
        <div id="lineChart" :style="{width: '300px', height: '300px'}"  class="imgArea"></div>
        <span class="fontArea">这是一个折先图，退碟区域的</span>
      </div>
    </div>
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    
    <!-- 操作按钮 -->
    <div>
      <el-button type="primary" @click="userJspdfDownLoad">JsPDF+HTML2CANVAS</el-button>
      <el-button type="primary" @click="userPdfmakeDownLoad">PDFmake</el-button>
    </div>
  </div>
</template>

<script>

//引入拖拽
//import VueGridLayout from 'vue-grid-layout'
//let GridLayout = VueGridLayout.GridLayout
//let GridItem = VueGridLayout.GridItem
import { mapGetters } from 'vuex'
//import oPanel from '@/components/panel/panel.vue'
import html2Canvas from "html2canvas"  
import JsPDF from "jspdf" 

require("@/vendor/toPDF/pdfmake.js")


export default {
  name: 'dashboard',
  data () {
    return {
      
    }
  },
  methods:{
    /* 使用JsPDF+HTML2CANVAS点击下载事件 */
    userJspdfDownLoad(){
      var title = 'this.htmlTitle'  
      let PDF = new JsPDF('', 'pt', 'a4') 
      for(let i=0;i<=2;i++){
        html2Canvas(document.getElementsByClassName('imgArea')[0], { 
        //允许跨域 
          allowTaint: true  
        }).then(function (canvas) {
          //转换成canvas后图片的宽度  
          let contentWidth = canvas.width  
          //转换成canvas后图片的高度
          let contentHeight = canvas.height  
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89  
          //未生成pdf的html页面高度
          let leftHeight = contentHeight  
          //页面偏移
          let position = 0  
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28  
          let imgHeight = 592.28 / contentWidth * contentHeight  
          let pageData = canvas.toDataURL('image/jpeg', 1.0)  
          
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {  
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)  
          } else {  
            while (leftHeight > 0) {  
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)  
              leftHeight -= pageHeight  
              position -= 841.89  
              if (leftHeight > 0) {  
                PDF.addPage()  
              }  
            }  
          }
          PDF.save(title + '.pdf')
        })
        
      }
      
      
    },
    /* 使用PDFmake点击下载事件 */
    userPdfmakeDownLoad(){
      console.log(pdfMake)
      var dd = {
        content: [
            'One paragraph',
            'Another paragraph, this time a little bit longer to make  sure, this line will be divided into at least two lines'
            ]
        };
      //导出PDF
      pdfMake.createPdf(dd).download();
    },
      
    /* 绘制图表 */
    drawBar(){
        // 基于准备好的dom，初始化echarts实例
        let barChart = this.$echarts.init(document.getElementById('barChart'))
        // 绘制图表
        barChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
    drawPie(){
      // 基于准备好的dom，初始化echarts实例
        let pieChart = this.$echarts.init(document.getElementById('pieChart'))
        // 绘制图表
        pieChart.setOption(
          {
            title : {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x:'center',
              padding: 0,
            },
            backgroundColor: 'rgb(255,242,204)', //rgba设置透明度0.1
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
              ]
          });
    },
    drawLine(){
      let lineChart = this.$echarts.init(document.getElementById('lineChart'))
      //绘制折线图
      lineChart.setOption({
        title: {
            text: '堆叠区域图',
            textStyle:{
              verticalAlign: 'top'
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
      })
    },
  },
  mounted () {
    this.drawBar();
    this.drawPie();
    this.drawLine()
  },

  components: {
    //oPanel,
    //GridLayout,
    //GridItem,
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
