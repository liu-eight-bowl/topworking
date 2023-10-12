<template>
  <div>
    <div ref="myChart" :style="styles"></div>
  </div>
</template>

<script>
export default {
  name: 'TChartsline',
  data () {
    const fontColor = '#849BC0'
    const xAxis = {
      type: 'category',
      axisLabel: {
        color: fontColor,
        fontSize: 14,
        margin: 14
      }
    }
    const yAxis = {
      type: 'value',
      axisLabel: {
        color: fontColor,
        fontSize: 14,
        margin: 14,
        formatter: (value) => `${value}${this.options.yAxisFormat || ''}`
      }
    }

    return {
      myChart: null,
      timer: null,
      optionsConfig: {
        tooltip: {
          trigger: 'axis',
          valueFormatter: (value) =>
            `${value}${this.options.yAxisFormat || ''}`
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
          left: this.options.gridLeft || 80,
          right: 40,
          bottom: 30
        },
        xAxis: this.options.isBarHorizontal ? yAxis : xAxis,
        yAxis: this.options.isBarHorizontal ? xAxis : yAxis
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
      this.autoSize &&
        window.addEventListener('resize', this.resizeDebounce, false)
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
     * legendData<Array> 分类维度名称
     * xAxisData<Array>  X轴展示的数据
     * seriesData<Array> X轴维度对应的柱子数据
     */
    getOptions ({ legendData, xAxisData, seriesData, tooltip }) {
      const series = this.getSeriesData(seriesData)
      const newTooltip = tooltip
      const options = {
        tooltip: newTooltip ? tooltip : this.optionsConfig.tooltip,
        legend: { ...this.optionsConfig.legend, data: legendData },
        grid: this.optionsConfig.grid,
        xAxis: this.options.isBarHorizontal ? this.optionsConfig.xAxis : { ...this.optionsConfig.xAxis, data: xAxisData },
        yAxis: this.options.isBarHorizontal
          ? { ...this.optionsConfig.yAxis, data: xAxisData }
          : this.optionsConfig.yAxis,
        series: series,
        itemStyle: this.options.itemStyle
      }
      // 单条柱子不需要legend时
      if (this.options.hasNoLegend) {
        delete options['legend']
      }
      // X轴文字旋转度
      options.xAxis.axisLabel.rotate = this.options.rotate || 0
      // X轴文字是否全部显示
      if (this.options.isShowAllXData) {
        options.xAxis.axisLabel.interval = 0
      }
      // X轴文字显示格式-例如竖着显示或者其他样式(可自定义)
      if (this.options.isXaxisTextvertical) {
        options.xAxis.axisLabel.formatter = value => value.split('').join('\n')
      }
      // grid底部距离
      if (this.options.gridBottom) {
        options.grid.bottom = this.options.gridBottom
      }
      return options
    },
    /**
     * 获取series格式化数据
     */
    getSeriesData (seriesData) {
      const emphasis = { itemStyle: { borderWidth: 4 } }
      // Array.from(new Set( this.options.legendData)).filter(item=>{ return item!==''})
      return this.options.legendData.map((legendName, index) => {
        let color = this.options.color || []
        let series = {
          name: legendName,
          type: this.options.type,
          emphasis: emphasis,
          barWidth: this.options.barWidth,
          data: seriesData[legendName] || []
        }
        if (color[index]) series.color = color[index]
        if (this.options.seriesLabelShow) {
          series['label'] = {
            show: true,
            formatter: (params) => {
              if (params.value >= 10000) {
                params.value = (params.value % 10000) !== 0
                  ? `${(params.value / 10000).toFixed(2)}W`
                  : `${params.value / 10000}W`
              }
              return `${params.value}${this.options.yAxisFormat || ''}`
            }
          }
          // 设置图形的label显示位置
          if (this.options.seriesLabelShow.position) {
            series['label'].position = this.options.seriesLabelShow.position
          }
        }

        if (seriesData.seriesLabelShow) {
          if (seriesData.seriesLabelShow[index] === 'top') {
            series['label'] = {
              show: true,
              position: 'top',
              formatter: (params) => {
                return seriesData.num[seriesData.name[index]][0] + '%'
              }
            }
          }
        }
        if (this.options.stack) series['stack'] = this.options.stack
        if (seriesData.stack) series['stack'] = seriesData.stack[index]
        return series
      })
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
