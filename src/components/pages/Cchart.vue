<template lang="pug">
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="clearfix" slot="header">
              <span>
                <i class="el-icon-date">柱状图-单个</i>
              </span>
              <T-Chartsline :styles='chartBarOptionsSingle.styles' :options='chartBarOptionsSingle.options' :autosize='chartBarOptionsSingle.autosize' />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="clearfix" slot="header">
              <span>
                <i class="el-icon-date">柱状图-多个</i>
              </span>
              <T-Chartsline :styles='chartBarOptions.styles' :options='chartBarOptions.options' :autosize='chartBarOptions.autosize' />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="clearfix" slot="header">
              <span>
                <i class="el-icon-date">线性图</i>
                <T-Chartsline :styles='chartLineptions.styles' :options='chartLineptions.options' :autosize='chartLineptions.autosize' />
              </span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8" v-for="item in 3" :key="item" >
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="clearfix" slot="header">
              <span>
                <i class="el-icon-date">饼状图</i>
              </span>
              <T-Chartpie :styles='chartPieptions.styles' :options='chartPieptions.options' :autosize='chartPieptions.autosize' />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="clearfix" slot="header">
              <span>
                <i class="el-icon-date">柱状图-合并为一根柱子</i>
              </span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8" v-for="item in 3" :key="item" >
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="clearfix" slot="header">
              <span>
                <i class="el-icon-date">水波图</i>
              </span>
              <T-ChartsWater :styles='chartWatertions.styles' :options='chartWatertions.options' :autosize='chartWatertions.autosize' />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TChartsline from '../common/Tchartsline.vue'
import TChartpie from '../common/Tchartpie.vue'
import TChartsWater from '../common/TchartsWater.vue'
import Tcard from '../common/Tcard.vue'
export default {
  components: {
    TChartsline,
    TChartpie,
    TChartsWater,
    Tcard
  },
  data () {
    return {
      chartBarOptionsSingle: {
        styles: { width: '100%', height: '350px' },
        autoSize: true,
        options: {
          color: ['#5971c0'],
          type: 'bar',
          yAxisFormat: '%',
          barWidth: 22,
          legendData: ['场次1'],
          xAxisData: ['2819年第48周', '2019年第43周', '2819年第46周', '2819年第49周', '2019年第52周', '2822年第B2周', '2822年第B5周'],
          seriesData: {
            '场次1': [120, 132, 101, 134, 90, 230, 210]
          }
        }
      },
      chartBarOptions: {
        styles: { width: '100%', height: '350px' },
        autoSize: true,
        options: {
          color: ['#5971c0', '#9ac97e', '#f2c96b', '#de6e6a'],
          type: 'bar',
          yAxisFormat: '%',
          barWidth: 20,
          legendData: ['场次1', '场次2', '场次3', '场次4'],
          xAxisData: ['2819年第48周', '2019年第43周', '2819年第46周', '2819年第49周', '2019年第52周', '2822年第B2周', '2822年第B5周'],
          seriesData: {
            '场次1': [120, 132, 101, 134, 90, 230, 210],
            '场次2': [220, 182, 231, 191, 290, 330, 310],
            '场次3': [150, 232, 151, 201, 190, 330, 410],
            '场次4': [320, 332, 331, 391, 390, 330, 320]
          }
        }
      },
      chartLineptions: {
        styles: { width: '100%', height: '350px' },
        autoSize: true,
        options: {
          color: ['#5971c0', '#9ac97e', '#f2c96b', '#de6e6a'],
          type: 'line',
          yAxisFormat: '%',
          barWidth: 20,
          legendData: ['场次1', '场次2', '场次3', '场次4'],
          xAxisData: ['2819年第48周', '2019年第43周', '2819年第46周', '2819年第49周', '2019年第52周', '2822年第B2周', '2822年第B5周'],
          seriesData: {
            '场次1': [120, 132, 101, 134, 90, 230, 210],
            '场次2': [220, 182, 231, 191, 290, 330, 310],
            '场次3': [150, 232, 151, 201, 190, 330, 410],
            '场次4': [320, 332, 331, 391, 390, 330, 320]
          }
        }
      },
      chartPieptions: {
        styles: { width: '100%', height: '250px' },
        autoSize: true,
        options: {
          color: ['#5971c0', '#9ac97e', '#f2c96b', '#de6e6a'],
          text: '活动报名总人数',
          subText: 130,
          radius: ['70', '100'],
          yAxisFormat: '%',
          seriesItemName: '占比',
          seriesData: [
            {value: 87, name: '0-2年'},
            {value: 49, name: '3-5年'},
            {value: 10, name: '6-10年'},
            {value: 4, name: '10年以上'}
          ]
        }
      },
      chartWatertions: {
        styles: { width: '150px', height: '150px', margin: '10px auto' },
        autoSize: true,
        options: {
          series: [{
            name: 'Liquid Fill',
            type: 'liquidFill',
            backgroundStyle: {
              color: '#f3f7fd'
            },
            color: ['#e0ecfd', '#aad0fd'],
            radius: '90%',
            label: {
              show: true,
              color: '#479bfe',
              fontSize: 30,
              fontWeight: 'normal',
              align: 'center',
              baseline: 'middle',
              position: 'inside'
            },
            data: [0.8, 0.7],
            itemStyle: {
              shadowBlur: 0
            },
            outline: {
              show: false
            }
          }]
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>
.el-card__header {
  i {
    &:before {
      margin-right: 5px;
    }
  }
}
.grid-content {
  margin-bottom: 10px;
}
</style>
