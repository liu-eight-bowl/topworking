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
      this.setOptions(this.options)
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
