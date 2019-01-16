/**
 * Created by lifang01
 * 2018/11/20
 * 分页混入
 */
export default {
  data () {
    return {
      // 分页信息
      // 总的条目数
      total: 100,
      // 每页显示的信息个数
      pageSize: 10,
      // 当前显示的是第几页的数据
      pageNum: 1
    }
  },
  methods: {
    // 以下都是分页内容
    // 当前页显示信息数变化，就是选择当前页显示条数的时候触发
    handleSizeChange (val) {
      this.pageSize = val
      this.getMainData()
      // console.log('每页显示多少条', `每页 ${val} 条`)
    },
    // 当前页发生变动了，就是点击不同页的时候触发
    handleCurrentChange (val) {
      this.pageNum = val
      this.getMainData()
      console.log(`当前页: ${val}`)
    }
  }
}
