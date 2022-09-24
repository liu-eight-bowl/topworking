<template>
<div>
  <div ref="myChart" :style="styles"></div>
</div>
</template>

<script>
export default {
  data () {
    const fontColor = '#849BC0'
    return {
      myChart: null,
      timer: null,
      optionsConfig: {
        tooltip: {
          trigger: 'axis',
          valueFormatter: value => `${value}${this.options.yAxisFormat || ''}`
        },
        legend: {
          padding: [0, 10, 0, 10],
          top: 2,
          right: 30,
          itemHeight: 3,
          itemWidth: 15,
          icon: 'rect',
          textStyle: {
            color: '#989A9C'
          }
        },
        grid: {
          top: 40,
          left: 80,
          right: 40,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: fontColor,
            fontSize: 14,
            margin: 14
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: fontColor,
            fontSize: 14,
            margin: 14,
            formatter: value => `${value}${this.options.yAxisFormat || ''}`
          }
        }
      }
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
        const options = this.getOptions(newV)
        this.setOptions(options)
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
     * legendData<Array> 分类维度名称
     * xAxisData<Array>  X轴展示的数据
     * seriesData<Array> X轴维度对应的柱子数据
     */
    getOptions ({legendData, xAxisData, seriesData}) {
      const series = this.getSeriesData(seriesData)
      return {
        tooltip: this.optionsConfig.tooltip,
        legend: {...this.optionsConfig.legend, data: legendData},
        grid: this.optionsConfig.grid,
        xAxis: {...this.optionsConfig.xAxis, data: xAxisData},
        yAxis: this.optionsConfig.yAxis,
        series: series
      }
    },
    /**
     * 获取series格式化数据
     */
    getSeriesData (seriesData) {
      const emphasis = {itemStyle: {borderWidth: 4}}
      return this.options.legendData.map((legendName, index) => {
        let color = this.options.color || []
        let series = {
          name: legendName,
          type: this.options.type,
          emphasis: emphasis,
          barWidth: this.options.barWidth,
          data: seriesData[legendName]
        }
        if (color[index]) series.color = color[index]
        return series
      })
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
