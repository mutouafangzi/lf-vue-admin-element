/**
 * Created by lifang01
 * 2018/5/15
 * 报表任务
 */

import template from './index.vue'
import './style.scss'
import oPanel from '../../../../components/panel/main'
// 引入组件
// 图表组件
import aArea from '@/components/a_chart/a_area'
import aBar from '@/components/a_chart/a_bar'
import aBubble from '@/components/a_chart/a_bubble'
import aGauge from '@/components/a_chart/a_gauge'
import aLine from '@/components/a_chart/a_line'
import aNumber from '@/components/a_chart/a_number'
import aPie from '@/components/a_chart/a_pie'
import aScatter from '@/components/a_chart/a_scatter'
import aStripe from '@/components/a_chart/a_stripe'
import aTable from '@/components/a_chart/a_table'
// 默认logo
import defaultPageLogo from '@/assets/images/product_logo.png'

// 自定义事件插件
import treeSelectInput from '../components/treeInput/main'
import aTransfer from '../components/aTransfer/main'

import html2Canvas from 'html2canvas'
// 拖拽插件
import VueGridLayout from 'vue-grid-layout'
var GridLayout = VueGridLayout.GridLayout
var GridItem = VueGridLayout.GridItem

export default {
  ...template,
  name: 'formmodule',
  data () {
    return {
      // 筛选报表类型
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 筛选默认下拉树不显示
      isShowReportTypeTree: false,
      // 报表类型选中
      reportClass: '',
      // 执行状态选中
      dutyStatus: '',
      // 报表模板选中
      reportTemple: '',
      // 报表类型树
      reportTypeTree: [ ],
      reportType: [],
      // 报表周期树reportPeriodTree
      reportPeriodTree: [ ],
      reportPeriodType: [],
      // 报表状态树
      reportStateTree: [ ],
      reportState: [ ],
      // 搜索文本
      searchtext: '',

      // 内容区域
      // 启用按钮是否可用
      // isUseStartBtn: false,
      // 表格数据
      periodReportsTable: [
        {
          creatorName: '',
          execTime: '',
          id: '',
          lastExecTime: '',
          nextExecTime: '',
          reportName: '',
          reportState: '',
          reportTemplete: ''
        }
      ],
      // 表格多选行
      multipleSelection: [],
      // 总的条目数
      total: 0,
      // 每页显示的信息个数
      pageSize: 10,
      // 当前显示的是第几页的数据
      pageNum: 1,

      // 新增弹窗区域数据
      // 默认弹窗不显示
      addReportDialog: false,
      addReportPeriods: [],
      // 准备的基础数据
      // 新增弹窗中报表模板的表格
      addreportTempleteList: [ ],
      // 表单数据中执行周期下拉列表
      addtaskCircleList: [ ],
      // 表单数据中执行周期下拉列表
      addReportTempletes: [ ],

      // 执行类型的选框是否显示
      isVisibleCircleType: false,

      // 新增弹窗表单数据
      addReportForm: {
        'reportName': '', // 任务名称
        'descr': '', // 描述
        'reportTemplete': '', // 报表模板
        'reportPeriodType': '', // 报表周期,
        'reportDownType': [ ], // 报表格式
        'checkedResponsibles': [ ], // 已经选择的收件人
        'extraMailBox': '', // 自定义收件人
        'mailTitle': '', // 邮件标题
        'mailContent': ''// 邮件内容
      },
      // 新增弹窗穿梭框的左边数据
      addresponsible: [ ],
      // 新增弹窗穿梭框的右边数据
      addCheckedUserList: [ ],
      // 新增弹窗穿梭框左边选择
      multipleSourceSelection: [ ],
      // 新增弹窗穿梭框右边选中的
      multipleTargetSelection: [ ],

      // 编辑弹窗数据
      // 默认弹窗不显示
      editReportDialog: false,
      // 准备的基础数据
      // 报表模板下拉列表
      editReportTempletes: [ ],
      // 报表周期下拉列表
      editReportPeriods: [ ],
      // 全部的责任人信息
      allResponsibles: [],
      // 表单数据
      editReportForm: {
        reportName: '', // 任务名称
        descr: '', // 描述
        reportTemplete: '', // 报表模板
        reportPeriodType: '1', // 已选的报表周期
        reportDownType: [], // 已选报表格式
        checkedUserList: [], // 已选责任人
        extraMailBox: '', // 其他收件人
        mailTitle: '', // 邮件标题
        mailContent: ''// 邮件正文
      },
      // 编辑弹窗的穿梭框左边数据
      editOptionalResponsibles: [],
      // 编辑弹窗的穿梭框右边数据
      editCheckedResponsibles: [ ],

      // 查看弹窗数据
      watchReportDialog: false,
      // 查看表单数据
      watchReportForm: {
        id: '',
        stateName: '', // 任务名称
        nextExecTime: '', // 下次执行时间
        descr: '', // 描述
        reportName: '', // 报表名称
        creatorName: '', // 创建人
        reportState: '', // 报表状态
        recentExecTime: '', // 最近执行时间
        timePeriod: '20170209 04:06:07-2017021 04:06:07' // 时间周期
      },
      // 查看表单数据中的表格
      watchReportTable: {
        total: 100,
        pager: { // 分页信息
          pageNumber: 2,
          pageSize: 1
        },
        list: [
          {
            'id': 'id1',
            'reportState': '', // 报表状态
            'reportName': '', // 报表名称
            'reportHistory': '', // 报表历史
            'taskStartTime': '', // 任务开始时间
            'taskEndTime': '', // 任务结束时间
            'downloadFormat': '' // 操作中下载格式
          }
        ]
      },
      watchReportId: '',
      // 查看弹窗中的嵌套弹窗，页眉
      pageHeaderImg: '',
      // 查看弹窗中的嵌套弹窗，效果预览弹窗
      resultPreview: false,
      // 查看弹窗中的嵌套弹窗，图表的配置
      /* configObj: {
        // 折线图的标题名称以及样式位置
        title: ' ',
        // 是否显示数据值
        isShowValue: ' ', // 0 隐藏 1 显示
        // 柱状图类型 0 普通 1：堆叠，默认普通
        chartStyle: ' ',
        // 配色方案，one-six六个颜色主题
        colorTheme: ' ',
        // y轴信息
        yAxisTitle: ' ',
        yAxisRotate: -30,
        // x轴信息
        xAxisTitle: ' ',
        xAxisRotate: 45,
        // 图例信息
        legendLocation: ' '
      }, */
      // 查看弹窗中的嵌套弹窗，布局信息
      resultPreviewLayout: [],
      // 查看弹窗中的嵌套弹窗，所有图表的数据
      allEchartsData: {},

      // pdf中保存的base64数组
      baseArr: []
    }
  },
  props: { },
  methods: {
    // 获取基本数据数据
    init () {
      // 获取报表类型下拉树
      this.$http('get', `/******`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            let treeArr = [
              {
                label: '全部',
                children: []
              }
            ]
            treeArr[0].children = JSON.parse(JSON.stringify(result))
            // 报表类型
            this.reportTypeTree = treeArr
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 获取报表周期下拉树
      this.$http('get', `/*****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            let treeArr = [
              {
                label: '全部',
                children: []
              }
            ]
            treeArr[0].children = result
            // 报表周期
            this.reportPeriodTree = treeArr
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 获取报表状态下拉树
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            let treeArr = [
              {
                label: '全部',
                children: []
              }
            ]
            treeArr[0].children = JSON.parse(JSON.stringify(result))
            // 报表状态
            this.reportStateTree = treeArr
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 获取表格信息，或者说是筛选信息
    getMainList () {
      /* 获取角色信息 */
      let data = {
        page: {
          pageNumber: this.pageNum,
          pageSize: this.pageSize
        },
        fuzzy: { // 模糊查询条件
          fields: ['name'],
          value: this.searchtext // 搜索关键字
        },
        sorts: [], // 排序条件，以下两个条件必须，不必修改
        cnds: [ // 过滤查询
          {
            field: 'reportState', // 报表状态搜索值
            operation: 'in',
            value: this.reportState
          },
          {
            field: 'reportType', // 报表类型搜索值
            operation: 'in',
            value: this.reportType
          },
          {
            field: 'reportPeriodType', // 报表周期搜索值
            operation: 'in',
            values: this.reportPeriodType
          }
        ]
      }
      // 请求数据
      this.$http('post', `/api/****`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            // console.log(res.data)
            let result = res.data
            // 表格里呈现的数据
            this.periodReportsTable = result.list
            // 分页里的总的信息的条目数
            this.total = result.total
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 时间戳转时间
    taskStartTimeFormatter (row, column) {
      let time = new Date(parseInt(row.taskStartTime)).toLocaleString().substr(0, 25)
      return time
    },
    taskEndTimeFormatter (row, column) {
      let time = new Date(parseInt(row.taskEndTime)).toLocaleString().substr(0, 25)
      return time
    },
    lastExecTimeFormatter (row, column) {
      let time = new Date(parseInt(row.lastExecTime)).toLocaleString().substr(0, 25)
      return time
    },
    nextExecTimeFormatter (row, column) {
      let time = new Date(parseInt(row.nextExecTime)).toLocaleString().substr(0, 25)
      return time
    },

    // 筛选区域
    // 接收搜索报表类型input中的数据
    getReportTypeData (msg) {
      this.reportType = msg.filter(function (val) {
        return !(!val || val === '')
      })
    },
    // 接收搜索执行状态input中数据
    getReportPeriodData (msg) {
      this.reportPeriodType = msg.filter(function (val) {
        return !(!val || val === '')
      })
    },
    // 接收搜报表模板input中数据
    getReportStateData (msg) {
      this.reportState = msg.filter(function (val) {
        return !(!val || val === '')
      })
    },
    // 查询按钮
    handleClickSearch () {
      this.getMainList()
    },

    // 内容区域
    // 新增、删除按钮
    addBtn () {
      this.addReportDialog = true
      // 请求基础数据
      // 请求报表模板下拉列表
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 报表模板表格数据
            this.addReportTempletes = result
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 请求报表周期下拉列表
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 报表周期下拉列表
            this.addReportPeriods = result
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 请求所有的可选责任人列表信息
      this.$http('get', `/api/*****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 邮件通知的可选责任人
            this.addresponsible = result
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    deletebtn () {
      if (this.multipleSelection.length === 0) { return }
      var array = []
      this.multipleSelection.forEach((item) => {
        array.push(item.id)
      })
      // console.log('字符串', array, array.join())
      this.$confirm('确定要删除角色信息吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        let deleteData = array
        console.log(deleteData)
        this.$http('delete', '/api/****', {queryParams: deleteData})
          .then((res) => {
            if (res.statusCode === 200) {
              this.$message({
                message: res.messages[0],
                type: 'success'
              })
              // 每次删除之后需要重复渲染页面，所以要再次发送请求
              this.getMainList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          showClose: true
        })
      })
    },
    // 启动按钮
    launchBtn () {
      if (this.multipleSelection.length === 0) { return }
      var array = []
      this.multipleSelection.forEach((item) => {
        array.push(item.id)
      })
      // console.log('字符串', array, array.join())
      let deleteData = array
      this.$confirm('此操作将启动任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http('post', '/api/****', {queryParams: deleteData})
          .then((res) => {
            if (res.statusCode === 200) {
              this.$message({
                message: res.messages[0],
                type: 'success'
              })
              // 每次启动之后需要重复渲染页面，所以要再次发送请求
              this.getMainList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启动'
        })
      })
    },
    // 停止按钮
    stopBtn () {
      if (this.multipleSelection.length === 0) { return }
      var array = []
      this.multipleSelection.forEach((item) => {
        array.push(item.id)
      })
      // console.log('字符串', array, array.join())
      let deleteData = array
      this.$confirm('此操作将启动任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http('post', '/api/****', {queryParams: deleteData})
          .then((res) => {
            if (res.statusCode === 200) {
              this.$message({
                message: res.messages[0],
                type: 'success'
              })
              // 每次停止之后需要重复渲染页面，所以要再次发送请求
              this.getMainList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启动'
        })
      })
    },
    // 多项选择时，将选中的删除项id组成一个数组
    handleSelectionChange (selection) {
      this.multipleSelection = selection
    },
    // 表格行编辑详情
    editDetail (index, row) {
      this.editReportDialog = true
      // 请求基础数据
      // 请求报表模板下拉列表
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 报表模板表格数据
            this.editReportTempletes = result
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 请求报表周期下拉列表
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 报表周期下拉列表
            this.editReportPeriods = result
          }
        })
        .catch((e) => {
          console.log(e)
        })

      this.$http('get', `/api/****/${row.id}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            console.log(result)
            // 报表模板表格数据
            this.editReportForm = result
            this.editReportForm.id = row.id
            this.editReportForm.reportName = result.reportName // 任务名称
            this.editReportForm.descr = result.descr // 描述
            this.editReportForm.reportTemplete = result.reportTemplete // 报表模板
            this.editReportForm.reportPeriodType = result.reportPeriodType // 已选的报表周期
            this.editReportForm.reportDownType = result.reportDownType // 已选报表格式
            this.editReportForm.extraMailBox = result.extraMailBox.join(',') // 其他收件人
            this.editReportForm.mailTitle = result.mailTitle // 邮件标题
            this.editReportForm.mailContent = result.mailContent// 邮件正文
            // 右边已选责任人列表
            let checkedResponsibleId = result.checkedResponsibles
            // 左边未选择责任人的列表
            // let optionalResponsibleId = result.optionalResponsibles
            // 请求所有的可选责任人列表信息
            this.$http('get', `/api/****`, {queryParams: null})
              .then((res) => {
                if (res.statusCode === 200) {
                  let result = res.data
                  // 报表周期下拉列表
                  this.allResponsibles = result
                  console.log('所有的责任人', this.allResponsibles)
                  // 穿梭框数据
                  this.editCheckedResponsibles = this.allResponsibles.filter(a => checkedResponsibleId.filter(b => b === a.id).length > 0)
                  console.log('右边人员', this.editCheckedResponsibles)
                  this.editOptionalResponsibles = this.allResponsibles.filter(a => checkedResponsibleId.filter(b => b != a.id).length > 0)
                }
              })
              .catch((e) => {
                console.log(e)
              })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 表格行查看详情
    watchDetail (index, row) {
      this.watchReportDialog = true
      // console.log(row.id)
      this.watchReportId = row.id
      let data = {
        page: { // 分页信息
          pageNumber: this.watchReportTable.pageNumber,
          pageSize: this.watchReportTable.pageSize
        },
        fuzzy: { // 模糊查询条件
          fields: [],
          value: '' // 搜索关键字
        },
        sorts: [ ], // 排序条件，以下两个条件必须，不必修改
        cnds: [ // 过滤查询
          {
            field: 'reportId', // 报表状态搜索值
            operation: 'in',
            value: [ this.watchReportId ]
          }
        ]
      }
      console.log(data)
      // 报表表格数据
      this.$http('post', `/api/****`, {queryParams: data})
        .then((res) => {
          console.log('----', res.data)
          if (res.statusCode === 200) {
            this.watchReportTable = res.data
          }
        })

      this.$http('get', `/api/****/${row.id}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            // console.log(res)
            let result = res.data
            this.watchReportForm = result
            this.watchReportForm.nextExecTime = new Date(parseInt(result.nextExecTime)).toLocaleString().substr(0, 18)
            this.watchReportForm.recentExecTime = new Date(parseInt(result.recentExecTime)).toLocaleString().substr(0, 18)
          }
        })
    },
    // 新增弹窗的方法
    // 穿梭框传递的已选责任人数据
    getAddCheckedData (val) {
      this.addReportForm.checkedResponsibles = val
    },
    // 新增弹窗中的删除和确定按钮
    addDialogCancelBtn () {
      this.addReportDialog = false
      // 清空表单
      this.$refs.addReportForm.resetFields()
    },
    addDialogOkBtn () {
      let data = {
        reportName: this.addReportForm.reportName,
        descr: this.addReportForm.descr,
        reportTemplete: this.addReportForm.reportTemplete,
        // 报表周期
        reportPeriodType: this.addReportForm.reportPeriodType,
        // 报表格式
        reportDownType: this.addReportForm.reportDownType,
        // 已经选择的收件人
        checkedResponsibles: this.addReportForm.checkedResponsibles.map(item => item.id),
        // 自定义收件人
        extraMailBox: this.addReportForm.extraMailBox.split(';'),
        // 邮件标题
        mailTitle: this.addReportForm.mailTitle,
        // 邮件内容
        mailContent: this.addReportForm.mailContent
      }
      this.$http('post', `/api/****`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            this.$message({
              type: 'info',
              showClose: true,
              message: res.messages
            })
            // 关闭弹窗
            this.addReportDialog = false
            // 清空表单
            this.$refs.addReportForm.resetFields()
            // 刷一下页面
            this.getMainList()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },

    // 查看弹窗中的方法
    // 动态组件
    currentView (id) {
      let type = this.allResultPreviewInfos.filter(item => item.id === id)[0].type
      // 柱状图：bar, 条形图：stripe, 折线图：line ，面积图：area , 饼图：pie , 仪表盘：gauge , 散点图：scatter， 气泡图：bubble ，数字图：number ，表格：table
      switch (type) {
        case 'bar':
          return aBar
          break
        case 'stripe':
          return aStripe
          break
        case 'line':
          return aLine
          break
        case 'stripe':
          return aStripe
          break
        case 'area':
          return aArea
          break
        case 'pie':
          return aPie
          break
        case 'gauge':
          return aGauge
          break
        case 'scatter':
          return aScatter
          break
        case 'bubble':
          return aBubble
          break
        case 'number':
          return aNumber
          break
        case 'table':
          return aTable
          break
        default:
          return aBar
      }
    },
    // 点击预览，预览前数据
    reportPreview (index, row) {
      // 请求源哥的接口
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.pageHeaderImg = !result.logoUrl ? defaultPageLogo : result.logoUrl
          }
        })
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.allResultPreviewInfos = result
          }
        })
      this.$http('get', `/api/****/${row.id}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 列表布局
            this.resultPreviewLayout = result.chartsLayout
            this.allEchartsData = result.chartsData
            this.resultPreview = true
          }
        })
    },
    // 获取对应图表的数据
    getEchartsData (id) {
      return this.allEchartsData.filter(item => item.id === id)[0]
    },
    // 获取对应图表的相关配置
    configObj (id) {
      return this.allResultPreviewInfos.filter(item => item.id === id)[0]
    },
    // 预览弹窗中的标题
    getResultEchartsName (id) {
      // console.log(this.allResultPreviewInfos, id)
      return this.allResultPreviewInfos.filter(item => item.id === id)[0].name
    },
    // 图表包裹块的样式
    style (item) {
      return {
        width: Math.floor(840 / 16 * item.w - 50) + 'px',
        height: 300 + 'px'
      }
    },
    // 点击下载，下载pdf
    reportDownloadingPDF (index, row) {
      console.log('点击pdf')
      // 请求源哥的接口
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.pageHeaderImg = !result.logoUrl ? defaultPageLogo : result.logoUrl
          }
        })
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.allResultPreviewInfos = result
          }
        })
      this.$http('get', `/api/****/${row.id}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 列表布局
            this.resultPreviewLayout = result.chartsLayout
            this.allEchartsData = result.chartsData
            // 关闭弹窗
            // this.resultPreview = false
            // 下载
            this.resultPreview = true
            let that = this
            setTimeout(function () {
              that.downloadPdf()
            }, 1000)
            // this.$nextTick( )
          }
        })
    },
    getBase64Image (img) {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      return dataURL
    },
    // pdf方法
    downloadPdf () {
      let that = this
      // 非canvas的图表div转为图片
      function divToPng (outWrap) {
        // 要转化的div
        let content_html = outWrap
        let width = content_html.offsetWidth
        let height = content_html.offsetHeight
        let offsetTop = content_html.offsetTop
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        // console.log(width, height, offsetTop, content_html)
        canvas.width = width
        canvas.height = (height + offsetTop)
        context.scale(1, 1)
        html2Canvas(content_html, {
          allowTaint: true, // 允许加载跨域的图片
          canvas: canvas, // 自定义 canvas
          width: width, // dom 原始宽度
          height: height, // dom 原始高度
          onrendered: function (canvas) {
            // 生成base64图片数据
            var dataUrl = canvas.toDataURL()
            var newImg = document.createElement('img')
            newImg.src = dataUrl
            that.baseArr.push(dataUrl)
          }
        })
        /* var divContent = outWrap.innerHTML
         var data = 'data:image/svg+xml,' +
         "<svg xmlns='http://www.w3.org/2000/svg' width='550' height='300'>" +
         "<foreignObject width='100%' height='100%'>" +
         "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" +
         divContent +
         '</div>' +
         '</foreignObject>' +
         '</svg>'
         var img = new Image()
         img.src = data
         var canvas = document.createElement('canvas')
         var ctx = canvas.getContext('2d')
         img.crossOrigin = 'anonymous'
         img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>"
         ctx.drawImage(img, 0, 0)
         var canvasbase = canvas.toDataURL('image/jepg', 1.0)

         var urlObject = window.URL || window.webkitURL || window
         var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
         saveLink.href = urlObject.createObjectURL(canvasbase)
         saveLink.download = name

         return canvasbase */
      }
      console.log('执行')
      // pdfMake中英文字体转换
      pdfMake.fonts = {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-Italic.ttf'
        },
        微软雅黑: {
          normal: 'msyh.ttf',
          bold: 'msyh.ttf',
          italics: 'msyh.ttf',
          bolditalics: 'msyh.ttf'
        }
      }
      // 页眉图片
      var pageImgWrap = document.getElementById('headerWrap')
      let pageUrl = pageImgWrap.getElementsByTagName('img')[0].src
      var image = new Image()
      image.src = pageUrl
      // 页眉转为base64格式
      var pageImgBase64 = that.getBase64Image(image)
      console.log(pageImgBase64)

      /* context = canvas.getContext('2d');
       // 创建新图片

       // 展示base64位的图片
       getBase64(canvas, function(dataUrl) {
       var newImg = document.createElement("img");
       newImg.src = dataUrl;
       imgs.appendChild(newImg);
       }); */
      // canvas图片
      let divArr = document.getElementsByClassName('echarts-wrap')
      // canvas标题
      let titleText = document.getElementsByClassName('title-wrap')
      let titleArr = []
      // console.log(divArr.length)
      let imgArr = []
      // 循环遍历图表内容，转为可pdf的图片
      for (let i = 0; i <= divArr.length - 1; i++) {
        // 是否含有canvas图表
        if (divArr[i].getElementsByTagName('canvas').length !== 0) {
          // canvas组成的图表
          // 取出全部的canvas宽高
          console.log('是canvas', i)
          let canvas = divArr[i].firstChild.children[0].firstChild
          console.log(canvas.width, canvas.height)
          // 获取宽高
          // canvasArr.push(canvas)
          if (!canvas) {
            return false
          }
          // 取出全部canvas的标题
          let titleT = titleText[i].innerText
          titleArr.push(titleT)
          // 将canvas变成图片后保存
          var imgs = canvas.toDataURL('image/png', 1.0)
          imgArr.push(imgs)
        } else {
          console.log('不是canvas', i)
          let img = divToPng(divArr[i].firstChild.children[0])
          console.log(that.baseArr)
          // 取出全部的标题
          let titleT = titleText[i].innerText
          titleArr.push(titleT)
          imgArr.push(img)
        }
      }
      console.log(titleArr, imgArr)

      // pdf要下载的内容
      var dd = {
        // 页面尺寸方向和边缘
        // a string or { width: number, height: number }
        page0Size: 'A4',
        // by default we use portrait, you can change it to landscape if you wish
        // pageOrientation: 'landscape',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 20, 40, 20, 40 ],
        // 页眉
        header: function (currentPage, pageCount, pageSize) {
          // you can apply any logic and return any valid pdfmake element
          // console.log('ffffff', currentPage, pageCount, pageSize)
          return [
            {
              // if you specify both width and height - image will be stretched
              image: pageImgBase64,
              width: 80,
              absolutePosition: {x: 15, y: 10}
            },
            {
              canvas: [{
                type: 'line',
                x1: 15,
                y1: 30,
                x2: pageSize.width - 15,
                y2: 30,
                lineColor: 'black'
              }],
              margin: [0, 0]
            }
          ]
        },
        // 页脚
        footer: function (currentPage, pageCount, pageSize) {
          // console.log('脚', currentPage, pageCount, pageSize)
          return [
            {
              canvas: [{
                type: 'line',
                x1: 15,
                y1: 0,
                x2: pageSize.width - 15,
                y2: 0,
                lineColor: 'black'
              }],
              margin: [0, 0]
            },
            { text: `共${pageCount}页 第${currentPage}页`, alignment: 'center', margin: [0, 5]}
          ]
        },
        // 页面内容
        content: [
          {
            stack: [
              titleArr[0],
              {
                // if you specify both width and height - image will be stretched
                image: imgArr[0],
                // style: 'canvasImg'
                width: 520,
                height: 200,
                margin: [15, 15, 0, 0]
              }
            ],
            margin: [0, 15, 0, 15],
            alignment: 'justify'
          },
          {
            stack: [
              titleArr[1],
              {
                // if you specify both width and height - image will be stretched
                image: imgArr[1],
                // style: 'canvasImg'
                width: 520,
                height: 200,
                margin: [15, 15, 0, 0]
              }
            ],
            margin: [0, 15, 0, 15],
            alignment: 'justify'
          },
          {
            stack: [
              titleArr[0],
              {
                // if you specify both width and height - image will be stretched
                image: imgArr[0],
                // style: 'canvasImg'
                width: 520,
                height: 200,
                margin: [0, 15, 0, 0]
              }
            ],
            margin: [0, 15, 0, 15],
            alignment: 'justify'
          },
          {
            stack: [
              titleArr[0],
              {
                // if you specify both width and height - image will be stretched
                image: imgArr[0],
                // style: 'canvasImg'
                width: 520,
                height: 200,
                margin: [0, 15, 0, 0]
              }
            ],
            margin: [0, 15, 0, 15],
            alignment: 'justify'
          },
          // 表格
          {
            table: {
              body: [
                ['word1', 'word2', 'word3', 'word4'],
                [{text: 'word', colSpan: 2}, '', '', {text: 'word', rowSpan: 3}],
                [{text: 'word', colSpan: 2, rowSpan: 2}, '', 'word', ''],
                ['', '', 'word', '']
              ]
            }
          }
        ],
        // 样式one
        styles: {
          one: {
            fontSize: 24,
            alignment: 'center'
          },
          header: {
            width: 10,
            fontSize: 16,
            bold: true,
            alignment: 'center',
            padding: 5
          },
          canvasImg: { }
        },
        defaultStyle: {
          font: '微软雅黑'
        }
      }
      pdfMake.createPdf(dd).download()
      // pdfMake.createPdf(dd).open()
      // 关闭弹窗
      this.resultPreview = false
    },

    // 点击按钮，下载html
    reportDownloadingHTML (index, row) {
      console.log('点击pdf')
      // 请求源哥的接口
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.pageHeaderImg = !result.logoUrl ? defaultPageLogo : result.logoUrl
          }
        })
      this.$http('get', `/api/****`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.allResultPreviewInfos = result
          }
        })
      this.$http('get', `/api/****/${row.id}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 列表布局
            this.resultPreviewLayout = result.chartsLayout
            this.allEchartsData = result.chartsData
            // 关闭弹窗
            // this.resultPreview = false
            // 下载
            this.resultPreview = true
            let that = this
            setTimeout(function () {
              that.downloadHtml()
            }, 1000)
            // this.$nextTick( )
          }
        })
    },
    // 下载html
    downloadHtml () {
      let funDownload = function (res) {
        const content = res
        const blob = new Blob([content])
        const fileName = 'www1sss11.html'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      }
      // let content = document.querySelector('#sectWrap')
      let content = document.querySelector('.dragArea').innerHTML
      let htmlStr = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><\/head><body id="app">' +
        content +
        '<\/body>' +
        '<script src="https://unpkg.com/vue/dist/vue.js"><\/script><script src="https://unpkg.com/element-ui/lib/index.js"><\/script><script>new Vue({el: "#app",data: function() {return {visible: false}}})<\/script><\/html>'
      console.log(content, htmlStr)
      funDownload(htmlStr)
      // 关闭弹窗
      this.resultPreview = false
    },

    // 编辑弹窗中的方法
    // 编辑穿梭框选择的已选责任人
    getEditCheckedData (val) {
      // console.log('lll',val)
      this.editReportForm.checkedUserList = val
    },
    // 编辑弹窗的确定按钮，往后台传数据
    editDialogOkBtn () {
      let data = {
        // 报表模板表格数据
        id: this.editReportForm.id,
        reportName: this.editReportForm.reportName, // 任务名称
        descr: this.editReportForm.descr, // 描述
        reportTemplete: this.editReportForm.reportTemplete, // 报表模板
        reportPeriodType: this.editReportForm.reportPeriodType, // 已选的报表周期
        reportDownType: this.editReportForm.reportDownType, // 已选报表格式
        extraMailBox: this.editReportForm.extraMailBox.split(';'), // 其他收件人
        mailTitle: this.editReportForm.mailTitle, // 邮件标题
        mailContent: this.editReportForm.mailContent, // 邮件正文
        // 已经选择的收件人
        checkedResponsibles: !this.editReportForm.checkedUserList ? '' : this.editReportForm.checkedUserList.map(item => item.id)
      }
      this.$http('post', `/api/****`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            this.$message({
              type: 'info',
              message: res.messages
            })
            this.editReportDialog = false
            // 清空表单中内容
            this.$refs.editReportForm.resetFields()
            // this.$refs.editreportTemplete.clearSelection()
            // 刷一下页面
            this.getMainList()
          }
        })
        .catch((e) => {
          // console.log(e)
        })
    },
    // 编辑弹窗的取消按钮
    editDialogCancelBtn () {
      this.editReportDialog = false
      // 清空表单中内容
      this.$refs.editReportForm.resetFields()
    },

    // 以下都是分页内容
    // 查看弹窗的表格分页
    // 查看表单的报表表格分页信息
    reportTableSizeChange (val) {
      this.watchReportTable.pageSize = val
      let data = {
        page: { // 分页信息
          pageNumber: this.watchReportTable.pageNumber,
          pageSize: this.watchReportTable.pageSize
        },
        fuzzy: { // 模糊查询条件
          fields: [],
          value: '' // 搜索关键字
        },
        sorts: [ ], // 排序条件，以下两个条件必须，不必修改
        cnds: [ // 过滤查询
          {
            field: 'reportId', // 报表状态搜索值
            operation: 'in',
            value: [ this.watchReportId ]
          }
        ]
      }
      this.$http('get', `/api/****`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            this.watchReportTable = res.data
          }
        })
      console.log('每页显示多少条', `每页 ${val} 条`)
    },
    reportTableCurrentChange (val) {
      this.watchReportTable.pageNumber = val
      let data = {
        page: { // 分页信息
          pageNumber: this.watchReportTable.pageNumber,
          pageSize: this.watchReportTable.pageSize
        },
        fuzzy: { // 模糊查询条件
          fields: [],
          value: '' // 搜索关键字
        },
        sorts: [ ], // 排序条件，以下两个条件必须，不必修改
        cnds: [ // 过滤查询
          {
            field: 'reportId', // 报表状态搜索值
            operation: 'in',
            value: [ this.watchReportId ]
          }
        ]
      }
      this.$http('get', `/api/****`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            this.watchReportTable = res.data
          }
        })
      console.log(`当前页: ${val}`)
    },
    // 当前页显示信息数变化，就是选择当前页显示条数的时候触发
    handleSizeChange (val) {
      this.pageSize = val
      this.getMainList()
      console.log('每页显示多少条', `每页 ${val} 条`)
    },
    // 当前页发生变动了，就是点击不同页的时候触发
    handleCurrentChange (val) {
      this.pageNum = val
      this.getMainList()
      console.log(`当前页: ${val}`)
    }

  },
  created () {
    this.init()
    this.getMainList()
  },
  mounted () {

  },
  computed: { },
  watch: {
    isShowReportTypeTree () {
      this.objectClass = {
        'icon': true,
        'iconfont': true,
        'icon-Angle-down': !this.isShowReportTypeTree,
        'icon-Angle-up': this.isShowReportTypeTree
      }
    }
  },
  components: {
    treeSelectInput,
    aTransfer,
    oPanel,
    // 图表组件
    aArea,
    aBar,
    aBubble,
    aGauge,
    aLine,
    aNumber,
    aPie,
    aScatter,
    aStripe,
    aTable,
    GridLayout,
    GridItem
  }
}
