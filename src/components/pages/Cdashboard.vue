<template lang="pug">
  div.dashboard
    el-row.margin-b20(:gutter="20")
      el-col(
        :span="6",
        v-for="(item, index) in cardData",
        :key="index")
        div.grid-content.bg-purple
          tcard(
            :number="item.number",
            :text="item.text",
            :className="item.className")

    el-row(:gutter="20")
      el-col(:span="12")
        div.grid-content.bg-purple
          el-card.box-card(shadow="hover")
            div.clearfix(slot="header")
              span
                i.el-icon-date 今年订单状况
            tcharts(
              :styles="styles"
              :color="color"
              :xAxisData="xAxisData"
              :series="series")

      el-col(:span="12")
        div.grid-content.bg-purple
          el-card.box-card(shadow="hover")
            div.clearfix(slot="header")
              span
                i.el-icon-date 待处理事项
            el-table(
              ref="singleTable",
              :data="tableData",
              :show-header="false",
              highlight-current-row,
              style="width: 100%")
              el-table-column(
                property="address"
                label="地址")
</template>

<script>
import Tcharts from '../common/Tcharts.vue'
import Tcard from '../common/Tcard.vue'
export default {
  data () {
    return {
      styles: { width: '100%', height: '250px' },
      color: ['#3398DB'],
      xAxisData: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月'
      ],
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [55, 200, 136, 210, 180]
        }
      ],
      tableData: [{
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        address: '上海市普陀区金沙江路 1515 弄'
      }],
      cardData: [
        {
          number: '120',
          text: '订单量',
          className: 'normal-bg'
        },
        {
          number: '120',
          text: '已处理订单',
          className: 'warning-bg'
        },
        {
          number: '120',
          text: '待处理订单',
          className: 'success-bg'
        },
        {
          number: '120',
          text: '已退货',
          className: 'danger-bg'
        }
      ]
    }
  },
  components: {
    Tcharts,
    Tcard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>

</style>
