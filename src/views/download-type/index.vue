<template>
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
    
    <!-- 操作按钮 -->
    <div>
      <el-button type="primary" @click="userJspdfDownLoad">JsPDF+HTML2CANVAS</el-button>
      <el-button type="primary" @click="userPdfmakeDownLoad">PDFmake</el-button>
    </div>
</template>
