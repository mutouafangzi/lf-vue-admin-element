/**
 * Created by lifang01
 * 2018/5/16.
 */

import template from './index.vue'
import './style.less'

export default {
  ...template,
  name: 'inputTree',
  data () {
    return {
      sourceData: [],
      targetData: [],
      multipleSourceSelection: [],
      multipleTargetSelection: []
    }
  },
  props: {
    sourceTableData: {
      type: Array,
      required: true
    },
    targetTableData: {
      type: Array,
      required: true
    },
    focusType: {
      type: Object,
      required: false
    }
  },
  methods: {

    init () {
      var that = this
      that.sourceData = that.$props.sourceTableData
      that.targetData = that.$props.targetTableData
      this.$emit('getCheckedData', this.targetData)
    },
    /* 根据选择的人员的全部信息，判断人员对应的联系方式，返回没有相应联系方式的名字组成的数组
     checkedUser是当前选中的人员数据组成数组
     checkedContactType是当前选中的联系方式Obj值：邮件/短信 */
    isHaveContactType (checkedUser, checkedContactType) {
      return checkedUser.filter(item => item.notifyType === checkedContactType.notifyTypeKey)
    },
    // 穿梭框左边选中的时候
    handleSourceSelectionChange (val) {
      this.multipleSourceSelection = val
    },
    // 穿梭框右边选中的时候
    handleTargetSelectionChange (val) {
      this.multipleTargetSelection = val
    },
    // 往右的按钮操作
    addToTarget () {
      if (!this.focusType) {
        this.sourceData = this.deleteSelected(this.sourceData, this.multipleSourceSelection)
        this.targetData = this.targetData.concat(this.multipleSourceSelection)
        console.log('右',this.sourceData,this.targetData)
        this.$emit('getCheckedData', this.targetData)
      } else {
        // 没有指定方式的通知人员组成的数组
        let nullContactWay = this.isHaveContactType(this.multipleSourceSelection, this.focusType)

        if (nullContactWay.length === 0) {
          this.sourceData = this.deleteSelected(this.sourceData, this.multipleSourceSelection)
          this.targetData = this.targetData.concat(this.multipleSourceSelection)
          this.$emit('getCheckedData', this.targetData)
        } else {
          // console.log('筛选出来的', this.focusType.notifyTypeText)
          let arr = nullContactWay.map(item => item.name)
          const h = this.$createElement
          this.$msgbox({
            title: '温馨提示',
            message: h('div', null, [
              h('div', null, [
                h('span', null, '以下人员没有发送'),
                h('i', {style: 'color: red'}, this.focusType.notifyTypeText),
                h('span', null, '的方式')]
              ),
              h('ul', [Array.apply(null, { length: arr.length }).map(function (item, index) {
                return h('li', {style: 'color: teal'}, arr[index])
              })])
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                done()
              } else {
                done()
              }
            }
          })
          this.$emit('getCheckedData', this.targetData)
        }
      }
    },
    // 往左的按钮操作
    addToSource () {
      this.targetData = this.deleteSelected(this.targetData, this.multipleTargetSelection)
      this.sourceData = this.sourceData.concat(this.multipleTargetSelection)
      console.log('zuo', this.sourceData, this.targetData)
      this.$emit('getCheckedData', this.targetData)
    },
    // 删除穿梭框当前的选中项
    deleteSelected (curList, multipleSelection) {
      let resultList = []
      curList.forEach(function (itemC, indexC) {
        let resultFlag = multipleSelection.every(function (itemM, indexM) {
          return itemM.id != itemC.id
        })
        if (resultFlag) resultList.push(itemC)
      })
      return resultList
    }
  },
  created () {
    this.init()
  },
  mounted () { },
  computed: { },
  watch: {
    sourceTableData: function () {
      this.init()
      // console.log(this.sourceData)
    },
    targetTableData: function () {
      this.init()
    }
  }
}
