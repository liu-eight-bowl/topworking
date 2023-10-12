<template>
  <div ref="myChart" :style="styles"></div>
</template>

<script>
export default {
  data () {
    const fontColor = `#849BC0`
    return {
      myChart: null,
      timer: null,
      optionsConfig: {
        title: {
          left: 'center',
          top: '47%',
          textStyle: {
            color: fontColor,
            fontSize: '14',
            fontWeight: 'normal'
          },
          subtextStyle: {
            color: fontColor,
            fontSize: '14'
          }
        },
        tooltip: {
          trigger: 'item',
          valueFormatter: value => `${value}${this.options.yAxisFormat || ''}`
        },
        legend: {
          top: 'center',
          right: 0,
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 12,
          itemGap: 12,
          textStyle: {
            color: fontColor
          }
        },
        grid: {
          top: 40,
          left: 80,
          right: 40,
          bottom: 30
        },
        series: {
          name: this.options.seriesItemName || '',
          type: 'pie',
          avoidLabelOverlap: false,
          label: {
            show: true,
            color: '#fff',
            fontSize: 13,
            position: 'inside',
            formatter: params => `${params.value}${this.options.yAxisFormat || ''}`
          },
          itemStyle: {
            borderColor: '#fff'
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
    this.$nextTick(() => {
      this.initOption()
      this.autoSize && window.addEventListener('resize', this.resizeDebounce, false)
    })
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
        this.resize()
      }, 100)
    },
    /**
     * text<string>       标题
     * subtext<string>    子标题
     * radius<Array>      饼状图半径
     * seriesData<Array>  X轴维度对应的柱子数据
     */
    getOptions ({text, subtext, radius, seriesData}) {
      const options = {
        title: {
          text: text,
          subtext: subtext,
          ...this.optionsConfig.title
        },
        tooltip: this.optionsConfig.tooltip,
        legend: this.optionsConfig.legend,
        series: [{
          ...this.optionsConfig.series,
          radius: radius,
          center: this.options.seriesCenter || ['50%', '50%'],
          data: seriesData
        }]
      }
      options.legend.right = this.options.right || 0
      if (seriesData.length > 8) {
        options.legend.type = 'scroll'
      }
      return options
    },
    setOptions (options) {
      this.clear()
      this.myChart && this.myChart.setOption(options)
      this.resize()
    },
    resize () {
      this.myChart && this.myChart.resize()
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
