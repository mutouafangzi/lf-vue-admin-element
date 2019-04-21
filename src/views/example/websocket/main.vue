<!--  -->
<template>
  <div>
    <svg >

    </svg>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    run(){
      let size = dv.rows.length
      dv.transform({
          type: 'map',
          callback: (row, i) => {
              row.value = row.value.split('%')[0] / 100
              row.percent = row.value * 100 + '%'
              row.display = row.name + ',' + row.percent
              row.bg = {
                  value: 1,
                  itemStyle: {
                      color: 'rgba(27,36,62,0.5)'
                  }
              }
              return row
          }
      })
      dv.transform({ type: 'sort', callback: function (a, b) { return a.value - b.value } })
      let colors = ['#90BCDE', '#A451F1', '#635BC1', '#2B62B1', '#3B478D']
      dv.transform({
          type: 'map',
          callback: (row, i) => {
              row.itemStyle = {
                  color: colors[i%size]
              }
              return row
          }
      })

      let maxValue = dv.rows[size - 1].value
      let margin = 1 - maxValue
      let options = {
          angleAxis: {
              max: maxValue / (1 - margin),
              axisLine: {
                  show: false,
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  show: false
              },
              splitLine: {
                  show: false
              },
              splitArea: {
                  show: false
              }
          },
          radiusAxis: {
              type: 'category',
              data: dv.getColumnData('display'),
              z: 10,
              axisLine: {
                  show: false,
              },
              axisTick: {
                  length: 290,
                  alignWithLabel: true,
                  lineStyle: {
                      type: 'solid'
                  }
              },
              axisLabel: {
                  show: true,
                  showMinLabel: true,
                  showMaxLabel: true,
                  interval: 0,
                  align: 'center',
                  margin: 400,
                  padding: 4,
                  width: 100,
                  fontSize: 15,
                  borderWidth: 1,
                  formatter: (value)=>{
                    const v = value.split(',')
                    return '{c|' + v[1] + '} {b|' + v[0] + '}{r|}{a|}'
                  },
                  rich: {
                    a: {
                      width: 9,
                      height: 10,
                      backgroundColor: '#1F3E79',
                      border: 1
                    },
                    r: {
                      width: 1,
                      height: 10,
                      backgroundColor: '#1F3E79'
                    },
                    b: {
                      color: '#58B7DE',
                      borderColor: '#1F3E79',
                      borderWidth: 1,
                      width: 160,
                      height: 40,
                      lineHeight: 20,
                      align: 'center',
                      fontSize: 20,
                      fontFamily: 'Microsoft Yahei'
                    },
                    c: {
                      color: '#97ADBA',
                      fontSize: 32,
                      verticalAlign: 'bottom',
                      fontFamily: 'VUI-Digital'
                    }
                  },
              },
              splitLine: {
                  show: false,
                  interval: 0,
              },
              splitArea: {
                  show: false,
                  alignWithLabel: true,
                  interval: 0,
                  areaStyle: {
                      color: ['rgba(0,0,0,0.3)', 'rgba(255,255,255,0.3)'],
                  },
              },
          },
          polar: {
              center: ['70%', '50%']
          },
          series: [
              {
                  type: 'bar',
                  name: 'bg',
                  barCategoryGap:'50%',
                  animation: false,
                  data: dv.getColumnData('bg'),
                  coordinateSystem: 'polar',
                  slient: true,
                  center: ['70%', '50%']
              },
              {
                  type: 'bar',
                  name: 'value',
                  barGap: '-100%',
                  barCategoryGap:'50%',
                  data: dv.rows,
                  coordinateSystem: 'polar',
                  slient: true,
                  center: ['70%', '50%']
              }
          ]
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>