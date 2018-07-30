import template from './index.vue'
import './style.less'
import clickoutside from '../utils/clickoutside'

export default {
  ...template,
  name: 'inputTree',
  data () {
    return {
      // 报表类型
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 默认下拉树不显示
      isShowReportTypeTree: false,
      // 图标样式
      objectClass: {
        'icon': true,
        'iconfont': true,
        'icon-Angle-down': true
      },
      visibleData: '',
      // 当前选中的树元素
      selectTreeKey: []
    }
  },
  props: {
    treeData: {
      type: Array
    }
  },
  methods: {

    // 选择变化时，输入框中数据更新
    handleTreeChange (a, b) {
      // console.log('----', a, b)
      this.visibleData = b.checkedNodes.map(item => item.label).join(' ')
      this.selectTreeKey = b.checkedKeys
      // this.isShowReportTypeTree = false
    },
    // 外部点击事件
    handleClose () {
      this.isShowReportTypeTree = false
      this.$emit('getInputData', this.selectTreeKey)
      // console.log('---', e.target)
    }
  },
  directives: {
    clickoutside
  },
  created () {

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
  }
}
