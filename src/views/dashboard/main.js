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
  methods: { },
  filters: { },
  created () { },
  mounted () { },
  computed: {},
  components: {
    draggable,
    GridLayout,
    GridItem,
    oPanel
  },
  watch: {
    
  }
}
