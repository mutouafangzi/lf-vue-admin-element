/**
 * Created by lifang01
 * 2018/5/15
 * 报表模板
 */
import template from './index.vue'
import './style.less'
import oPanel from '../../../../components/panel/main'
import treeSelectInput from '../components/treeInput/main'
// 创建组件的方法
// import { getTemplate } from '../components/utils/getTemplate.js'
// import mount from '../components/utils/mount.js'
// 引入图片
import barThumbnai from '@/assets/images/chart/white/bar-1.jpg'
import bar2Thumbnai from '@/assets/images/chart/white/bar-2.jpg'
import pieThumbnai from '@/assets/images/chart/white/pie-1.jpg'
import scatterThumbnai from '@/assets/images/chart/white/scatter.jpg'
import ployThumbnai from '@/assets/images/chart/white/ploy-1.jpg'
import tableThumbnai from '@/assets/images/chart/white/table.jpg'
import bubbleThumbnai from '@/assets/images/chart/white/bubble-1.jpg'
import bubble2Thumbnai from '@/assets/images/chart/white/bubble-2.jpg'
import numberThumbnai from '@/assets/images/chart/white/numeral.jpg'

export default {
  ...template,
  name: 'quickReport',
  data () {
    return {
      // 搜索区域数据
      // 数据来源树
      dataSourceTree: [],
      // 数据来源选择
      dataSource: [],
      // 模板类型树
      reportClassTree: [],
      // 模板类型选择
      templeteType: [],
      // 搜索关键字
      searchText: '',

      // 新增报表弹窗数据
      // 弹窗是否显示
      isVisibleAddReportDialog: false,
      // 新增表单数据
      addTemplateform: {
        // 模板名称
        templeteName: '',
        // 模板类型
        appType: 1
      },
      // 新增的dom节点
      components: [],
      insertPosition: {
        position: null,
        component: null
      },
      // 已配图表列表
      chartInfoList: [
        {
          id: 'echart1',
          name: '告警趋势图',
          // 柱状图：bar, 条形图：barY, 折线图：line ，面积图：area , 饼图：pie , 仪表盘：gauge , 散点图：scatter， 气泡图：bubble ，数字图：number ，表格：table
          type: 'line',
          mdesc: '这是一个告警趋势图'
        }, {
          id: 'echart2',
          name: '漏洞分类占比',
          type: 'pie',
          mdesc: '这是一个饼状图'
        }, {
          id: 'echart3',
          name: '攻击来源统计',
          type: 'bar',
          mdesc: '这是一个柱状图'
        }, {
          id: 'echart4',
          name: '被攻击资产TOP10',
          type: 'area',
          mdesc: '这是一个面积图'
        }
      ],
      // 模板类型下拉列表
      appTypes: [],
      // 缩略图的路径地址
      echartThumbnail: '',

      // 编辑弹窗数据
      isVisibleEditReportDialog: false,

      // 查看弹窗中的数据
      isVisibleWatchReportDialog: false,

      // 主要区域数据 主表格
      // 表格数据
      tableData: [ ],
      // 表格多选行
      multipleSelection: [],
      // 分页信息
      // 总的条目数
      total: 0,
      // 每页显示的信息个数
      pageSize: 10,
      // 当前显示的是第几页的数据
      pageNum: 1

    }
  },
  props: { },
  methods: {
    // 获取基本数据
    getInitData () {
      this.$http('get', `/api/report_templetes/before_query`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 报表类型树
            this.reportClassTree = result.templeteTypeTree
            // 执行状态树
            this.dataSourceTree = result.sourceTypeTree
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 获取表格信息，或者说是筛选信息
    getMainData () {
      /* 获取角色信息 */
      let data = {
        page: {
          pageNumber: this.pageNum,
          pageSize: this.pageSize
        },
        filterCnds: [
          {
            // 任务执行状态
            field: 'sourceType',
            fieldValues: this.dataSource
          },
          {
            // 报表模板类型
            field: 'templeteType',
            fieldValues: this.templeteType
          }
        ],
        fuzzyValue: this.searchText
      }
      // 请求数据
      this.$http('post', `/api/report_templetes/query`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            // console.log(data)
            let result = res.data
            // 表格里呈现的数据
            this.tableData = result.tableResult
            // 分页里的总的信息的条目数
            this.total = result.total
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },

    // 筛选区域
    // 搜索 报表类型input中的数据
    getReportClassData (msg) {
      this.templeteType = msg.filter(function (val) {
        return !(!val || val === '')
      })
    },
    // 搜索 执行状态input中数据
    getDataSourceData (msg) {
      this.dataSource = msg.filter(function (val) {
        return !(!val || val === '')
      })
    },
    // 点击搜索按钮
    handleClickSearch () {
      this.getMainData()
    },

    // 主要内容区方法
    // 表格中 是否引入列 格式化
    isReferedFormatter (row, column) {
      return !row.isRefered ? '否' : '是'
    },
    // 表格选中
    handleSelectionChange (selection) {
      this.multipleSelection = selection
    },
    // 新增按钮
    addReportBtn () {
      // 打开新增弹窗
      this.isVisibleAddReportDialog = true
      this.$http('get', `/api/report_templetes/before_insert`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 获取左边缩略图列表和模板类型的下拉列表
            this.chartInfoList = result.chartInfos
            this.appTypes = result.appTypes
            // 缩略图路径定位
            this.echartThumbnail = 'icon iconfont icon-Sever'
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 删除按钮
    deleteReportbtn () {
      if (this.multipleSelection.length === 0) { return }
      let arrId = this.multipleSelection.map(item => item.id)
      // console.log('字符串', array, array.join())
      this.$confirm('确定要删除角色信息吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        let deleteData = {
          ids: arrId
        }
        this.$http('post', '/api/report_templetes/delete', {queryParams: deleteData})
          .then((res) => {
            if (res.statusCode === 200) {
              this.$message({
                showClose: true,
                message: res.message[0],
                type: 'success'
              })
              // 每次删除之后需要重复渲染页面，所以要再次发送请求
              this.getMainData()
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
    // 表格中每行查看按钮
    watchReportRow (index, row) {
      this.isVisibleWatchReportDialog = true
      console.log(row.id)
      this.$http('get', `/api/report_templetes/view/${row.id}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            console.log(result)
            // 获取查看弹窗的数据 wait
          }
        })
    },
    // 表格中每行编辑按钮
    editReportRow (index, row) {
      this.isVisibleEditReportDialog = true
      // 获取基础数据
      this.$http('get', `/api/report_templetes/before_update/${row.id}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // console.log(result)
            // 获取编辑弹窗的初始数据 wait
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },

    // 新增弹窗的方法
    // 新增弹窗的确定按钮
    addDialogOkBtn () {
      let data = {
        // 模板类型 wait
        appType: '##',
        // 图表类型
        chartType: '##',
        // 模板名称
        templeteName: '##',
        // 模板配置
        templeteConfig: {
          // 图表的id顺序,id顺序为展示顺序
          chartsInfo: [],
          // 布局信息
          layout: { one: '###'}
        }
      }
      this.$http('post', `/api/report_templetes/insert`, {queryParams: data})
        .then((res) => {
          // console.log('传后台的数据',data)
          if (res.statusCode === 200) {
            // 关闭新增弹窗
            this.isVisibleAddReportDialog = false
            this.$message({
              showClose: true,
              type: 'success',
              message: res.message
            })
            this.$refs.addTemplateform.resetFields()
            // 刷新页面
            this.getMainData()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 新增弹窗的取消按钮
    addDialogCancelBtn () {
      // 关闭弹窗
      this.isVisibleAddReportDialog = false
    },
    // 新增弹窗中的拖拽
    dragStart (e) {
      let componentName = e.target.getAttribute('data-name')
      let componentId = e.target.getAttribute('id')
      // console.log(componentName, e.dataTransfer)
      let info = {
        name: componentName,
        id: componentId,
        type: 'type'
      }
      e.dataTransfer.setData('info', JSON.stringify(info))
    },
    // 图标转换
    iconTranform (data) {
      // 柱状图：bar, 条形图：stripe, 折线图：line ，面积图：area , 饼图：pie , 仪表盘：gauge , 散点图：scatter， 气泡图：bubble ，数字图：number ，表格：table
      switch (data) {
        case 'bar':
          return 'icon iconfont icon-Host'
          break
        case 'stripe':
          return 'icon iconfont icon-IP-external-network'
          break
        case 'line':
          return 'icon iconfont icon-Bar'
          break
        case 'stripe':
          return 'icon iconfont icon-Host'
          break
        case 'area':
          return 'icon iconfont icon-yibiaoban'
          break
        case 'pie':
          return 'icon iconfont icon-Area'
          break
        case 'gauge':
          return 'icon iconfont icon-Middleware'
          break
        case 'scatter':
          return 'icon iconfont icon-Database-f'
          break
        case 'bubble':
          return 'icon iconfont icon-Ring'
          break
        case 'number':
          return 'icon iconfont icon-Knowledge-base'
          break
        case 'table':
          return 'icon iconfont icon-Search-list'
          break
        default:
          return 'icon iconfont icon-IP-internal-network'
      }
    },
    // 图片转换
    imageTranform(data){
      // 柱状图：bar, 条形图：stripe, 折线图：line ，面积图：area , 饼图：pie , 仪表盘：gauge , 散点图：scatter， 气泡图：bubble ，数字图：number ，表格：table
      switch (data) {
        case 'bar':
          return barThumbnai
          break
        case 'stripe':
          return bar2Thumbnai
          break
        case 'line':
          return pieThumbnai
          break
        case 'stripe':
          return scatterThumbnai
          break
        case 'area':
          return ployThumbnai
          break
        case 'pie':
          return pieThumbnai
          break
        case 'gauge':
          return tableThumbnai
          break
        case 'scatter':
          return bubbleThumbnai
          break
        case 'bubble':
          return bubbleThumbnai
          break
        case 'number':
          return numberThumbnai
          break
        case 'table':
          return tableThumbnai
          break
        default:
          return bubble2Thumbnai
      }
    },
    dragOver (e) {
      e.preventDefault()
    },
    drop (e) {
      e.preventDefault()
      var preview = document.getElementById('preview')
      var data = JSON.parse(e.dataTransfer.getData('info'))
      // 图片
      var newImag = document.createElement('img')
      newImag.src = this.imageTranform(data.name)
      newImag.style = 'width:100%;height:100%'
      // div
      var newEle = document.createElement('div')
      newEle.id = data.id
      newEle.style = 'width: 100%;height: 300px;'
      newEle.appendChild(newImag)

      newEle.draggable = 'true'
      newEle.setAttribute('v-on:dragstart', function (evt) {
        console.log('______')
        evt.dataTransfer.setData('text/plain', '<remove>' + newEle.id)
      })
      console.log(newEle)
      preview.appendChild(newEle)

      // e.target.appendChild(document.getElementById(data))
      // 松开拖放,e是容器元素
      /*let info = JSON.parse(e.dataTransfer.getData('info'))
      info.id = info.id
      let name = info.name // 拖动的组件名字
      let component

      component = getTemplate(info)

      // let components = JSON.parse(JSON.stringify(this.components))
      let components = this.components
      components.push(component)
      this.components = components
      this.mount()*/
      /*if (!this.insertPosition.position) {
        components.push(component)
        this.components = components
        this.mount()
      } else {
        let index = components.findIndex(component => component.info.id === this.insertPosition.component.info.id)
        // let position = this.insertPosition.position
        let position = '下方'
        if (position === '下方' || position === '右方') { index++ }
        components.splice(index, 0, component)
        // 占位虚线框删除后，把这个也重置为null，为null时就是默认将拖动组件添加到components最后
        this.insertPosition = {
          component: null,
          position: null
        }
        this.components = components
      }*/
    },
    /*mount () {
      // 挂载及更新视图中组件的位置信息
      // let components = JSON.parse(JSON.stringify(this.$store.state.components))
      let components = this.components
      components.filter(component => !component.parentId).forEach(component => {
        mount(component.info.id, component).then(vm => {
          let el = document.getElementById(component.info.id)
          component.position = {
            offsetLeft: el.offsetLeft,
            offsetRight: el.offsetLeft + el.clientWidth,
            offsetTop: el.offsetTop,
            offsetBottom: el.offsetTop + el.clientHeight
          }
        })
      })
      setTimeout(() => {
        this.components = components
      }, 0)
    },*/

    // 查看弹窗的方法
    // 取消
    watchDialogCancelBtn () {
      this.isVisibleWatchReportDialog = false
    },
    // 确定
    watchDialogOkBtn () {
      this.isVisibleWatchReportDialog = false
    },

    // 编辑弹窗的方法
    // 编辑后取消按钮
    editDialogCancelBtn () {
      this.isVisibleEditReportDialog = false
    },
    // 编辑后确定按钮
    editDialogOkBtn () {
      let data = {
        // 编辑后的数据 wait
        id: '',
        appType: '', // 模板类型
        chartType: '', // 图表类型
        templeteName: '', // 模板名称
        templeteConfig: {// 模板配置
          chartsInfo: ['##1', '##2', '##3'], // 图表的id顺序,id顺序为展示顺序
          layout: {one: '###'}
        }
      }
      this.$http('post', `/api/circle_reports/update`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            // console.log(data)
            this.isVisibleEditReportDialog = false
            this.$message({
              type: 'info',
              message: res.message[0]
            })
            // 清空表单
            // this.$refs.editReportForm.resetFields()
            // 刷一下页面
            this.getMainData()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },

    // 以下都是分页内容
    // 当前页显示信息数变化，就是选择当前页显示条数的时候触发
    handleSizeChange (val) {
      this.pageSize = val
      // 刷新页面
      this.getMainData()
      console.log('每页显示多少条', `每页 ${val} 条`)
    },
    // 当前页发生变动了，就是点击不同页的时候触发
    handleCurrentChange (val) {
      this.pageNum = val
      // 刷新页面
      this.getMainData()
      console.log(`当前页: ${val}`)
    }

  },
  created () {
    this.getInitData()
    this.getMainData()
  },
  mounted () {

  },
  computed: { },
  watch: { },
  components: {
    treeSelectInput,
    oPanel
  }
}
