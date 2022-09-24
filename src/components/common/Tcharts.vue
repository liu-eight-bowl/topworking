<template>
<div>
  <div ref="myChart" :style="styles"></div>
</div>
</template>

<script>
export default {
  data () {
    return {
      myChart: null,
      timer: null
    }
  },
  /**
   * style chart的样式
   * options chart图的配置项
   * autoSize 是否自动适应
   */
  props: ['styles', 'options', 'autoSize'],
  watch: {
    options: {
      deep: true,
      handler (newV) {
        this.setOptions(newV)
      }
    }
  },
  mounted () {
    this.initOption()
    this.autoSize && window.addEventListener('resize', this.resizeDebounce, false)
  },
  methods: {
    initOption () {
      this.myChart = this.$echarts.init(this.$refs.myChart)
      const options = this.getOptions(this.options)
      this.setOptions(options)
    },
    /**
     * chart resize 防抖
     */
    resizeDebounce () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.myChart && this.myChart.resize()
      }, 100)
    },
    /**
     * color<string>      柱子颜色 如 #3398DB
     * barWidth<number>   柱子宽度，默认为20
     * legendName<string> 分类维度名称
     * xAxisData<Array>   X轴展示的数据
     * seriesData<Array>  X轴维度对应的柱子数据
     */
    getOptions ({color, barWidth = 20, legendName, xAxisData, seriesData}) {
      const fontColor = '#849BC0'
      return {
        legend: {
          top: 0,
          right: 5,
          itemHeight: 3,
          itemWidth: 15,
          data: [legendName]
        },
        color: color,
        tooltip: {},
        xAxis: {
          axisLabel: {
            color: fontColor,
            fontSize: 14,
            margin: 14
          },
          data: xAxisData
        },
        grid: {
          top: legendName ? 40 : 10,
          left: 50,
          right: 10,
          bottom: 30
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: fontColor,
            fontSize: 14,
            margin: 14,
            formatter (value) {
              return value >= 10000 ? `${value / 10000}万` : value
            }
          }
        },
        series: [{
          name: legendName,
          type: 'bar',
          barWidth: barWidth,
          data: seriesData
        }]
      }
    },
    setOptions (options) {
      this.clear()
      this.myChart && this.myChart.setOption(options)
    },
    clear () {
      this.myChart && this.myChart.clear()
    }
  },
  beforeDestroy () {
    if (this.myChart) {
      this.myChart.dispose()
      this.myChart = null
    }
    this.autoSize && window.removeEventListener('resize', this.resizeDebounce, false)
  }
}
</script>
