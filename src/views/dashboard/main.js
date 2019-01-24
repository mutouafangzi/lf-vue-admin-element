// 态势大屏缩略图
import imgUserAction from '@/assets/images/situation-user-action.png'
import imgNetworkAttack from '@/assets/images/situation-network-attack.png'
import template from './index.vue'
// import './theme.scss'
import './css/base.scss'

// 组件
import oPanel from '@/components/base-panel/main.js'

// 引入方法
import { formatDate,chartIcon } from '@/assets/js/utils.js'
import situationUtils from './components/utils/situationUtils.js'
// 拖拽插件
import draggable from 'vuedraggable'
import VueGridLayout from 'vue-grid-layout'
var GridLayout = VueGridLayout.GridLayout
var GridItem = VueGridLayout.GridItem

// test 
import { LOGIN } from "@/api/login.js";

export default {
  ...template,
  name: 'situation',
  data () {
    return {
      // TEST
      user: {
        username: 'admin',
        pass: '1234321'
      },
      user_info: {},
      resDataOne: '',
      resDataTwo: '',
      // 顶部区域的数据
      // 态势标签列表
      tabLists: [ ],
      // 默认选中的态势标签项
      checkedTab: '',
      // 搜索选择的时间
      searchTime: 'relative:7d',
      // 设置的刷新时间间隔
      refreshInterval: '30s',
      // 写死，设置刷新间隔的下拉列表
      refreshIntervals: [
        {
          value: '30s',
          label: '每30秒'
        }, {
          value: '1m',
          label: '每1分钟'
        }, {
          value: '5m',
          label: '每5分钟'
        }, {
          value: '10m',
          label: '每10分钟'
        }, {
          value: '30m',
          label: '每30分钟'
        }, {
          value: '1h',
          label: '每1小时'
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // 刷新行为开始
      refreshFlag: {},
      // 主题皮肤状态
      themeColor: 'theme-white',
      // 全部的图表信息，包括布局，配置，数据
      allEchartsInfos: [],
      // 态势大屏
      situationScreenDialog: false,
      // 态势大屏1
      situationUserAction: '',
      // 态势大屏2
      situationNetworkAttack: '',
      // 态势大屏弹窗中数据
      /* situationScreen: [
        {
          'id': 'echart1',
          'title': '告警趋势图heheheh'
        },
        {
          'id': 'echart2',
          'title': '漏洞分类占比'
        }
      ], */
      // 更多按钮点击后，已有场景的列表
      situationLists: [
        /*{
          id: 1,
          name: '一级 1',
          creatorName: '2创建人名字',
          children: [{
            id: 4,
            name: '二级 1-1',
            creatorName: '2创建人名字',
            children: [{
              id: 9,
              name: '三级 1-1-1',
              creatorName: '2创建人名字'
            }, {
              id: 10,
              name: '三级 1-1-2',
              creatorName: '2创建人名字'
            }]
          }]
        },
        {
          id: 2,
          name: '一级 2',
          creatorName: '2创建人名字',
          children: [
            {
              id: 5,
              name: '二级 2-1',
              creatorName: '2创建人名字'
            }, {
              id: 6,
              name: '二级 2-2',
              creatorName: '2创建人名字'
            }
          ]
        }*/
      ],
      situationTreeProps: {
        children: 'children',
        label: 'name'
      },
      // 更多按钮点击后，弹出框场景搜索
      sceneSearch: '',
      // 更多下拉列表显示
      popoverShow: false,
      // 更多按钮点击后，点击新增的弹窗内表单数据
      addSceneForm: {
        name: '', // 场景名称
        descr: '', // 场景描述
        isShared: '', // 全部 共享 不共享
        sharedRole: [] // 共享角色
      },
      addSceneRules: {
        name: [
          { required: true, message: '请输入态势名称', trigger: 'blur' }
        ],
        isShared: [
          { required: true, message: '请选择是否共享', trigger: 'change' }
        ]
      },
      // 更多按钮点击后，点击新增的弹窗 默认不显示
      addSceneDialog: false,
      // 新增和编辑弹窗的角色
      roles: [ ],
      // 写死，更多按钮点击后，点击新增的弹窗内表单数据的单选项
      isSharedList: [
        {
          label: '0',
          name: '全部'
        },
        {
          label: '1',
          name: '共享'
        },
        {
          label: '2',
          name: '不共享'
        }
      ],
      // 更多按钮点击后，点击编辑的弹窗内表单数据
      editSceneForm: {
        id: '', // 主键
        name: '', // 场景名称
        descr: '', // 场景描述
        isShared: '', // 全部 共享 不共享
        sharedRole: [] // 共享角色
      },
      // 更多按钮点击后，点击编辑的弹窗 默认不显示
      editSceneDialog: false,
      // 更多按钮点击后，点击编辑弹窗
      isSharedEditList: [
        {
          label: 'id1',
          name: '全部'
        },
        {
          label: 'id2',
          name: '共享'
        },
        {
          label: 'id3',
          name: '不同享'
        }
      ],
      // 操作设置按钮
      // 操作按钮点击后的图表列表弹窗，默认不显示
      addEchartsDialog: false,
      // 操作弹窗内的所有图表
      echartsIconList: [ ],
      // 操作弹窗内的搜索表单
      echartsSearchForm: {
        classify: ''
      },
      echartsSearchText: '',
      // 图表类型的下拉列表
      echartsClassifyList: [ ],
      // 图表类型的默认值
      addEchartsClass: '请选择图表类型',
      // 选中的图表
      checkedEchartIds: [],
      // 后台获取的已经选中的图表
      getCheckedIds: [],
      // 选中图表后添加时的布局信息
      newChartLayout: {},
      // 批量添加时的数组信息
      newChartLayoutArr: [],

      // 内容区所有图表的信息
      echartsLayout: [ ],
      // 新增图表后布局信息
      updateEchartsLayout: [],
      // 图标加载的遮罩
      // loading: true,
      echartsData: {
        // 图例信息
        thead: [ ],
        tbody: [ ]
      },
      // 下钻弹窗
      drillDownLoading: true,
      dialogDrillDown: false,
      drillDownTable: [],
      formThead: [],
      // 图表的配置
      // configObj: { }
      // 页面标识
      pageFlag: 'dashboard'
    }
  },
  props: { },
  methods: {
    async login(){
      let user_info = await LOGIN(this.user)
      this.user_info = user_info
      console.log('请求回来的值是', user_info)
    },

    // 顶部方法
    // 页面初始化
    init () {
      // 设置当前页标识
      this.$store.dispatch('setCurrentPageFlag', this.pageFlag)
      // 常用仪表板标签组的获取
      this.$https('get', `/api/situation/dashboard/labels/list`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 常用仪表板类型
            this.tabLists = !result ? [] : result
            this.checkedTab = !this.tabLists ? '' : this.tabLists[0].id
            // console.log(this.checkedTab)
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 当前主题的获取
      this.$https('get', `/api/situation/dashboard/skin/config`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 当前皮肤的获取
            this.themeColor = !result ? (window.localStorage.getItem('skinInfo') || 'theme-white') : result
            // this.themeColor = result
            // console.log(this.themeColor,window.localStorage.getItem('skinInfo'))
            this.$store.dispatch('setThemeColor', this.themeColor)
            window.localStorage.setItem('skinInfo', this.themeColor)
            // console.log('皮肤', this.themeColor)
          } else {
            // 当前皮肤的获取
            this.themeColor = window.localStorage.getItem('skinInfo') || 'theme-white'
            // console.log(window.localStorage.getItem('skinInfo'))
            // this.themeColor = result
            // console.log(this.themeColor)
            this.$store.dispatch('setThemeColor', this.themeColor)
            window.localStorage.setItem('skinInfo', this.themeColor)
          }
        })
        .catch((e) => {
          // 如果请求没有皮肤状态时，那么从本地请求
          // 皮肤请求出错时，直接设置白色皮肤
          this.themeColor = window.localStorage.getItem('skinInfo') || 'theme-white'
          this.$store.dispatch('setThemeColor', this.themeColor)
          console.log(e)
        })
      // 获取全部的图表信息
      this.$https('get', `/api/resource/common/chart-info-custom`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.allEchartsInfos = result
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    clickTag (value) {
      this.checkedTab = value
    },
    // 点击更多
    clickMore () {
      console.log('点击更多')
      this.sceneSearch = ''
      this.clickEnterSearch()
    },
    // 搜索点击回车
    clickEnterSearch () {
      let getDashboardMoreListParam = {
        page: {
          pageNumber: 1,
          pageSize: 20
        },
        cnds: [ ],
        fuzzy: {
          fields: ['name'],
          value: this.sceneSearch
        },
        sorts: [ ]
      }
      // console.log('搜索的列表', this.sceneSearch)
      // 获取全部仪表板信息（安全态势列表，即更多的下拉列表）
      // 1230版本改为了树结构
      request('post', `/api/situation/dashboard/list`, {queryParams: getDashboardMoreListParam})
        .then((res) => {
          if (res.statusCode === 200) {
            // this.moreDialog = true
            let result = res.data
            // console.log('请求回来的书', result)
            // 更多仪表板显示
            this.situationLists = result
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 更多列表中是否可点击
    isSituationClick (data) {
      // 全部的列表situationLists
      // 已上去的列表tabLists
      if (!data.children) {
        let id = data.id
        let arr = !this.tabLists ? [] : this.tabLists.map(item => item.id)
        let flag = arr.indexOf(id)
        // console.log(id, arr, flag)
        // data.children.length !== 0
        return flag !== -1
      } else {
        return true
      }
    },
    // 添加，更多下拉框中，点击某一项，常用标签的添加
    clickSituationList (row) {
      const MAX_SHOW_CHECKED_TAB_LENGTH = 5
      if (this.tabLists && this.tabLists.length >= MAX_SHOW_CHECKED_TAB_LENGTH) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '最多只能显示五项'
        })
        return false
      } else if (row.children && row.children.length >= 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '禁止点击父节点'
        })
        return false
      } else {
        // 常用列表中添加
        !this.tabLists ? [].unshift(row) : this.tabLists.unshift(row)
        // 点击项设为默认选中项
        this.checkedTab = row.id
        // 在常用列表中添加该项
        let data = !this.tabLists ? [] : this.tabLists.map(i => i.id)
        request('post', `/api/situation/dashboard/labels/update`, {queryParams: data})
          .then((res) => {
            if (res.statusCode === 200) {
              console.log('添加成功，常用标签为', data)
            }
          })
          .catch((e) => {
            console.log(e)
          })
        // 关闭下拉窗
        this.popoverShow = false
      }
    },
    // 删除，常用仪表板标签中，常用标签的删除
    clickCommonTabsDelete (value) {
      // console.log('点击某一项', value, this.tabLists)
      // 将常用标签列表中的删除项删除
      let currentArr = this.tabLists
      let index = this.tabLists.map(
        function (item, index) {
          if (item.id === value.id) { return index }
        }
      ).filter(i => i)[0]
      currentArr.splice(index, 1)
      this.tabLists = currentArr
      // 如果当前标签页正好是选中的标签，删除后就将默认选中第一个标签
      if (this.checkedTab === value.id) {
        if (this.tabLists.length === 0) {
          this.checkedTab = ''
        } else {
          this.checkedTab = this.tabLists[0].id
        }
      }
      // 在常用列表中删除了该项
      let data = this.tabLists.map(i => i.id)
      console.log(data)
      request('post', `/api/situation/dashboard/labels/update`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            this.$message({
              showClose: true,
              type: 'info',
              message: res.messages[0]
            })
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 修改，常用标签组相互之间的移动
    getdata (evt) {
      // console.log(evt.draggedContext.element.id)
    },
    datadragEnd (evt) {
      // 在常用列表中调整顺序后的数组
      let dragEndOrder = this.tabLists.map(i => i.id)
      // 默认是中选择的是常用列表中的第一项
      this.checkedTab = this.tabLists[0].id
      request('post', `/api/situation/dashboard/labels/update`, {queryParams: dragEndOrder})
        .then((res) => {
          if (res.statusCode === 200) {
            // console.log('新增后', this.tabLists)
            this.$message({
              showClose: true,
              type: 'info',
              message: res.messages[0]
            })
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 更多列表的获取
    getSituationLists () {
      // 获取全部仪表板信息（安全态势列表，更多的列表）
      request('get', `/api/situation/dashboard/list`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            // this.moreDialog = true
            let result = res.data
            // 更多仪表板显示
            this.situationLists = result
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 点击态势大屏按钮
    clickSituationScreen () {
      this.situationScreenDialog = true
      this.situationUserAction = imgUserAction
      this.situationNetworkAttack = imgNetworkAttack
    },
    // 态势大屏弹窗中点击图片-用户行为
    skipUserAction () {
      const href = this.$store.state.global.routerBase + 'hb-screen-behavior'
      window.open(href)
    },
    // 态势大屏弹窗中点击图片-网络攻击
    skipNetworkAttack () {
      const href = this.$store.state.global.routerBase + 'hb-screen-attack'
      window.open(href)
    },
    // 刷新按钮
    allScreenRefresh () {
      this.refreshLayout(this.checkedTab)
    },
    // 换肤按钮，更换主题
    reSkin () {
      this.themeColor = this.themeColor !== 'theme-white' ? 'theme-white' : 'theme-black'
      this.$store.dispatch('setThemeColor', this.themeColor)
      window.localStorage.setItem('skinInfo', this.themeColor)
      let data = {
        skin: this.themeColor
      }
      request('post', `/api/situation/dashboard/skin/update`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            this.$message({
              showClose: true,
              type: 'info',
              message: res.messages[0]
            })
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 全屏
    useFullScreen () {
      let docElm = document.querySelector('#screen-wrap')
      this.requestFullScreen(docElm)
      // console.log(document.querySelector('#screen-wrap').webkitRequestFullScreen)
    },
    // 进入全屏
    requestFullScreen (element) {
      var requestMethod = element.requestFullScreen || // W3C
        element.webkitRequestFullScreen || // Chrome等
        element.mozRequestFullScreen || // FireFox
        element.msRequestFullScreen // IE11
      if (requestMethod) {
        requestMethod.call(element)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    // 退出全屏
    exitFull () {
      var exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    },

    // 下载为html
    // 主要内容下载html
    downHtml () {
      
    },

    // 时间选择器
    changeTimeStr (time) {
      // console.log('事件懂了', time.pickerVal)
      let that = this
      that.searchTime = time.pickerVal
      // console.log(time, that.searchTime)
      let data = {
        id: that.checkedTab, // 安全态势id
        dataRegion: that.searchTime // 安全态势数据范围
      }
      // 时间一旦改变，立马进行仪表板上图表的更新
      request('post', `/api/situation/dashboard/data-region/update`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            that.$message({
              showClose: true,
              type: 'info',
              message: res.messages[0]
            })
            let currentEcharts = that.echartsLayout.map(i => i.id)
            console.log('拼接后数据，暂时没有数据', currentEcharts)
            currentEcharts.forEach(function (item, index) {
              that.getOneChartData(item, that.searchTime)
            })
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 刷新时间更新
    refreshTimeChange (value) {
      // console.log('开始刷新', value)
      this.refreshInterval = value
      let data = {
        id: this.checkedTab,
        refreshTime: value
      }
      request('post', `/api/situation/dashboard/refresh-time/update`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            this.$message({
              showClose: true,
              type: 'info',
              message: res.messages[0]
            })
            // 清除正在进行定时器
            this.refreshFlag && clearInterval(this.refreshFlag)
            // 启动自动刷新
            this.autoRefresh()
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 时间转为毫秒
    timeMillisecond (time) {
      switch (time) {
        case '30s':
          return 30 * 1000
          break
        case '1m':
          return 1 * 60 * 1000
          break
        case '5m':
          return 5 * 60 * 1000
          break
        case '10m':
          return 10 * 60 * 1000
          break
        case '30m':
          return 30 * 60 * 1000
          break
        case '1h':
          return 1 * 60 * 60 * 1000
          break
        default:
          return 30 * 1000
      }
    },
    // 自动刷新
    autoRefresh () {
      let that = this
      // 清除正在进行定时器
      that.refreshFlag && clearInterval(that.refreshFlag)
      // 启动刷新定时器
      let time = !that.refreshInterval ? '1h' : that.timeMillisecond(that.refreshInterval)
      // console.log(time, that.echartsLayout)
      that.refreshFlag = setInterval(() => {
        // 刷新操作
        that.echartsLayout
          .map(i => i.id)
          .forEach(item => that.refreshEcharts(item))
      }, time)
    },
    // 操作按钮
    operateBtn () {
      // 获取数据来源的下拉列表
      request('get', `/api/resource/common/datasource-info-select`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            this.addEchartsDialog = true
            let result = res.data
            this.echartsClassifyList = result
            this.addEchartsClass = this.echartsClassifyList[0].label
            // 使用默认数据来源请求图表列表
            this.dataSourcesChange(this.echartsClassifyList[0].value)
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 数据来源变化，图表列表变化
    dataSourcesChange (value) {
      // console.log('数据来源', value)
      // 获取全部的图表信息
      // let id = this.checkedTab
      this.echartsSearchForm.classify = value
      let data = {
        fuzzy: { // 模糊查询条件
          fields: ['name'],
          value: this.echartsSearchText // 搜索关键字  无
        },
        cnds: [ // 过滤查询
          {
            field: 'dataSourceId', // 分类
            operation: '=',
            value: value
          }
        ]
      }
      request('post', `/api/resource/common/chart-info-query-custom`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.echartsIconList = JSON.parse(JSON.stringify(result))
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 目前已选中的图表查询
      request('get', `/api/situation/dashboard/checked-charts/${this.checkedTab}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // console.log(!result ? [] : result)
            // 后台返回的选中数组，保存
            let data = !result ? [] : result
            this.getCheckedIds = JSON.parse(JSON.stringify(data))
            // 前端操作的选中数组
            this.checkedEchartIds = JSON.parse(JSON.stringify(data))
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    textChange (value) {
      // console.log('改吧', value)
      this.echartsSearchText = value
    },
    // 操作弹窗,选择一个
    checkedOne (checkedId) {
      // console.log(checkedId)
      // console.log(this.checkedEchartIds, this.getCheckedIds, checkedId)
      let idIndex = this.checkedEchartIds.indexOf(checkedId)
      if (idIndex >= 0) {
        // 如果已经包含就去除
        this.checkedEchartIds.splice(idIndex, 1)
        return false
      } else {
        // 如果没有包含就添加
        this.checkedEchartIds.push(checkedId)
        this.newChartLayout = {
          id: checkedId,
          // 布局信息
          x: 0,
          y: 0,
          w: 24,
          h: 6,
          i: checkedId + this.checkedTab
        }
        // this.getOneChartData(checkedId)
        this.updateEchartsLayout.push(this.newChartLayout)
        // console.log(this.updateEchartsLayout, this.checkedEchartIds, this.getCheckedIds)
      }
    },
    // 图标转换
    iconTranform (id) {
      // 新增图表时，数据来源下面对应的图表数据信息数组
      let dataSourcesForEchartsIconListInfos = this.allEchartsInfos.filter(item => item.id === id)
      let type = dataSourcesForEchartsIconListInfos.length > 0 ? dataSourcesForEchartsIconListInfos[0].type : ''
      let iconClass = chartIcon(type).className
      // console.log(this.allEchartsInfos, id, iconClass)
      return `icon iconfont ${iconClass}`
    },
    // 选择图表后的取消按钮
    addEchartsDeleteBtn (formName) {
      this.addEchartsDialog = false
      this.addEchartsClass = this.echartsClassifyList[0].label
      this.checkedEchartIds = this.getCheckedIds
      // 清除
      this.echartsSearchForm.classify = ''
      this.echartsSearchText = ''
    },
    // 选择图表后的确定按钮
    // 需要将添加的图表直接更新到仪表板中，包括新的仪表板图表以及布局信息
    addEchartsOkBtn () {
      let that = this
      // console.log(that.checkedEchartIds, that.getCheckedIds)
      let flag = situationUtils.equals(that.checkedEchartIds, that.getCheckedIds)
      // 获取全部的图表信息
      if (flag) {
        // 没有新的选中图表
        // 清除
        this.echartsSearchForm.classify = ''
        this.echartsSearchText = ''
        return false
      } else {
        // 发送全部的布局信息
        that.echartsLayout.push.apply(that.echartsLayout, that.updateEchartsLayout)
        // console.log('拼接的布局', that.echartsLayout)
        let data = {
          id: that.checkedTab, // 安全态势id
          dashBoardLayouts: that.echartsLayout
        }
        // console.log(data)
        request('post', `/api/situation/dashboard/layouts/update`, {queryParams: data})
          .then((res) => {
            if (res.statusCode === 200) {
              that.$message({
                showClose: true,
                type: 'info',
                message: res.messages[0]
              })
              // 更新布局信息
              this.refreshLayout(that.checkedTab)
              // console.log('数据', that.echartsLayout)
              that.addEchartsAfterClearRelatedData()
              /*// 清除默认placeholder
              that.addEchartsClass = this.echartsClassifyList[0].label
              // 清除
              this.echartsSearchForm.classify = ''
              this.echartsSearchText = ''
              // 更新data
              that.echartsLayout.map(i => i.id).forEach(item => that.refreshEcharts(item))
              // 清除中介数组
              that.updateEchartsLayout = []*/
            } else {
              that.refreshLayout(that.checkedTab)
              that.addEchartsAfterClearRelatedData()
              /*// 清除默认placeholder
              that.addEchartsClass = this.echartsClassifyList[0].label
              // 清除
              this.echartsSearchForm.classify = ''
              this.echartsSearchText = ''
              // 更新data
              that.echartsLayout.map(i => i.id).forEach(item => that.refreshEcharts(item))
              // 清除中介数组
              that.updateEchartsLayout = []*/
            }
            // 关闭弹窗
            that.addEchartsDialog = false
          })
          .catch((e) => {
            console.log(e)
          })
      }
    },
    addEchartsAfterClearRelatedData () {
      let that = this
      // 清除默认placeholder
      that.addEchartsClass = this.echartsClassifyList[0].label
      // 清除
      that.echartsSearchForm.classify = ''
      that.echartsSearchText = ''
      // 更新data
      that.echartsLayout.map(i => i.id).forEach(item => that.refreshEcharts(item))
      // 清除中介数组
      that.updateEchartsLayout = []
    },
    // 主要图表展示区域方法
    // 请求布局
    refreshLayout (value) {
      let that = this
      that.echartsLayout = []
      // 请求图表的布局信息数据
      request('get', `/api/situation/dashboard/layouts/${value}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // 仪表板中图表的布局信息，仅有布局信息
            // 需要从allEchartsInfos拿出相关配置和其他信息
            // 还需要单个图表进行请求获取对应的数据信息
            let layout = !result.chartsLayout ? [] : result.chartsLayout
            layout.map((item, index) => {
              that.allEchartsInfos.map(function (i, index2) {
                if (i.id === item.id) {
                  item.echartsInfos = JSON.parse(JSON.stringify(i))
                  item.echartsData = {}
                  item.loading = true
                  // 请求data
                  that.getOneChartData(item.id, that.searchTime)
                  console.log(item.echartsInfos)
                } else {
                  return false
                }
              })
            })
            // console.log('当前的标签', that.checkedTab)
            that.echartsLayout = JSON.parse(JSON.stringify(layout))
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 获取单个图表数据
    getOneChartData (id, searchTime) {
      // console.log('走了')
      let that = this
      that.echartsLayout.map((item, index) => {
        if (item.id === id) {
          item.loading = true
          that.$set(that.echartsLayout, index, that.echartsLayout[index])
          return false
        } else {
          return false
        }
      })
      // console.log(that.echartsLayout)
      // 请求每一个图表内的数据信息
      let data = {
        id: id,
        dataRegion: searchTime// 数据时间范围
      }
      // 获取单个图表的数据
      setTimeout(function () {
        request('post', `/api/resource/common/chart-data`, {queryParams: data})
          .then((res) => {
            if (res.statusCode === 200) {
              // console.log('数据成功')
              let result = res.data
              that.echartsLayout.map((item, index) => {
                if (item.id === id) {
                  item.echartsData = JSON.parse(JSON.stringify(result))
                  item.loading = false
                  that.$set(that.echartsLayout, index, that.echartsLayout[index])
                  return false
                } else {
                  return false
                }
              })
              // that.echartsLayout = that.echartsLayout
              // console.log(that.echartsLayout)
              // loading遮罩取消
              // that.doLoading()
            } else {
              this.$message({
                showClose: true,
                message: res.messages[0],
                type: 'error'
              })
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }, 200)
    },
    // 下钻弹窗
    expandClick (value, item) {
      let that = this
      // console.log(value, item.echartsInfos)
      that.drillDownTable = []
      that.formThead = []
      that.drillDownLoading = true
      that.dialogDrillDown = true
      let splTimeDate
      console.log('监视', item.echartsInfos.timeRegionType, that.searchTime)
      switch (item.echartsInfos.timeRegionType) {
        case '1':
          splTimeDate = that.searchTime
          break
        case '2':
          splTimeDate = item.echartsInfos.timeRegion
          break
        case '3':
          splTimeDate = ''
          break
        default:
          splTimeDate = ''
      }
      let data = {
        metaIds: item.echartsInfos.metaIds, // 类型ids
        spl: item.echartsInfos.splExpression, // spl 语句
        splTime: splTimeDate, // 检索时间
        values: [ value ] // 数组格式
      }
      request('post', `/api/resource/common/chart-data-drill-down-custom`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            that.drillDownTable = result.tbody
            that.formThead = result.thead
            that.drillDownLoading = false
          } else {
            that.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },

    // 组件加载
    getBoxheight (h) {
      let height = h * 45 - 71 + 'px'
      return height
    },
    // 图表内的刷新图表
    refreshEcharts (value) {
      let that = this
      // 请求每一个图表内的数据信息
      that.getOneChartData(value, that.searchTime)
      // console.log('点击刷新')
    },
    // 图表内的删除某一个图表
    deleteEcharts (item) {
      let that = this
      that.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log('点击删除', that.echartsLayout, item)
        // 删除点中项
        that.echartsLayout.forEach(function (i, index) {
          if (i == item) {
            that.echartsLayout.splice(index, 1)
          }
        })
        // 将删除的项，竖向补充
        // that.echartsLayout.map(value => value.y - 1)
        // 新的数据传给后台
        let data = {
          id: that.checkedTab, // 安全态势id
          dashBoardLayouts: that.echartsLayout
        }
        request('post', `/api/situation/dashboard/layouts/update`, {queryParams: data})
          .then((res) => {
            if (res.statusCode === 200) {
              that.$message({
                showClose: true,
                type: 'info',
                message: res.messages[0]
              })
            } else {
              this.$message({
                showClose: true,
                message: res.messages[0],
                type: 'error'
              })
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }).catch(() => {
        that.$message({
          showClose: true,
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 调整布局
    layoutUpdatedEvent (newLayout) {
      // console.log('layoutUpdatedEvent: ', newLayout)
    },
    // 调整大小
    resizeEvent: function (index) {
      console.log('拖拽', index, this.$refs.child[index].resizeEvent)
      this.$refs.child[index].resizeEvent()
    },
    // 调整大小完成
    resizedEvent: function (i, newH, newW, newHPx, newWPx) {
      let data = {
        id: this.checkedTab,
        dashBoardLayouts: this.echartsLayout
      }
      request('post', `/api/situation/dashboard/layouts/update`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            // console.log('缩放成功')
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 移动
    moveEvent: function (i, newX, newY) {
      // console.log('moveEvent i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    // 完成移动
    movedEvent: function (i, newX, newY) {
      // console.log('movedEvent i=' + i + ', X=' + newX + ', Y=' + newY)
      let data = {
        id: this.checkedTab,
        dashBoardLayouts: this.echartsLayout
      }
      request('post', `/api/situation/dashboard/layouts/update`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            // console.log('移动成功')
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  filters: {
    /* filterScene: function (value, sceneSearch) {
      // console.log('筛选', sceneSearch, value)
      let arr
       if (!sceneSearch) {
       arr = value
       } else {
       arr = value.filter(item => item.name.indexOf(sceneSearch) >= 0)
       }
       return arr
    }, */
    // 下钻数据格式
    filterFormat (type, value) {
      if (type == 'DATE') {
        return formatDate(value)
      } else {
        return value
      }
    }
    /* filterBy: function (value, text) {
      console.log('筛选', value, text)
      let arr
      if (!text) {
        arr = value
      } else {
        arr = value.filter(item => item.name.indexOf(text) >= 0)
      }
      return arr
    } */
  },
  created () {
    // this.init()
    // console.log('封装的请求', this.$https)
    // 常用仪表板标签组的获取
    this.$https('get', `/api/situation/dashboard/labels/list`, {queryParams: null})
    .then((res) => {
      // console.log('請求回來的~~~~', res)
      if (res.statusCode == 200) {
        this.$message({
          showClose: true,
          message: res.messages[0],
          type: 'success'
        })
        this.resDataOne = res.data
        // console.log(this.checkedTab)
      } else {
        this.$message({
          showClose: true,
          message: res.messages[0],
          type: 'error'
        })
      }
    })
    .catch((e) => {
      console.log(e)
    })

    this.$https('get', `/api/test.action`, {queryParams: null})
    .then((res) => {
      console.log('--------', res)
    })
    .catch((e) => {
      console.log(e)
    })

    let aaaa = 'id1'
    this.$https('post', `/api/situation/dashboard/labels/update`, {queryParams: aaaa})
    .then((res) => {
      // console.log('請求回來的~~~~', res)
      if (res.statusCode == 200) {
        this.$message({
          showClose: true,
          message: res.messages[0],
          type: 'success'
        })
        this.resDataTwo = res.data
        // console.log(this.checkedTab)
      } else {
        this.$message({
          showClose: true,
          message: res.messages[0],
          type: 'error'
        })
      }
    })
    .catch((e) => {
      console.log(e)
    })
    // console.log(this.checkedTab)
    // this.doLoading()
    // console.log('走了credted')
  },
  mounted () {
    this.login()
    // this.doLoading()
    // console.log('走了mounted')
  },
  computed: {},
  components: {
    draggable,
    GridLayout,
    GridItem,
    oPanel
  },
  watch: {
    // 更多的态势筛选
    /* sceneSearch (val) {
      this.$refs.situationTree.filter(val)
    }, */
    checkedTab: function (val) {
      this.refreshLayout(val)
      // 开启刷新
      this.refreshTimeChange(this.refreshInterval)
    },
    echartsSearchText: function (value) {
      let data = {
        fuzzy: { // 模糊查询条件
          fields: ['name'],
          value: value // 搜索关键字  无
        },
        cnds: [ // 过滤查询
          {
            field: 'dataSourceId', // 分类
            operation: '=',
            value: this.echartsSearchForm.classify
          }
        ]
      }
      request('post', `/api/resource/common/chart-info-query-custom`, {queryParams: data})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            this.echartsIconList = JSON.parse(JSON.stringify(result))
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // 目前已选中的图表查询
      request('get', `/api/situation/dashboard/checked-charts/${this.checkedTab}`, {queryParams: null})
        .then((res) => {
          if (res.statusCode === 200) {
            let result = res.data
            // console.log(!result ? [] : result)
            // 后台返回的选中数组，保存
            let data = !result ? [] : result
            this.getCheckedIds = JSON.parse(JSON.stringify(data))
            // 前端操作的选中数组
            this.checkedEchartIds = JSON.parse(JSON.stringify(data))
          } else {
            this.$message({
              showClose: true,
              message: res.messages[0],
              type: 'error'
            })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
