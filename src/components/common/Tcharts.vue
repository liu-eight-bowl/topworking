<template lang="pug">
  div
    div#main(:style="styles")
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: [
    'styles',
    'color',
    'xAxisData',
    'series'
  ],
  mounted () {
    this.setEcharts()
  },
  methods: {
    setEcharts () {
      let myChart = this.$echarts.init(document.getElementById('main'))
      myChart.setOption({
        legend: {
          left: 0
        },
        color: this.color,
        tooltip: {
        },
        xAxis: {
          data: this.xAxisData
        },
        yAxis: {},
        series: this.series
      })
    }
  }
}
</script>

<style scoped lang=scss>

</style>
