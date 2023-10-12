<!--
 * @Author: liubing 943485115@qq.com
 * @Date: 2023-04-11 14:48:23
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-04-14 17:53:08
 * @FilePath: /topworking/src/components/pages/ctable/ProTable/index.vue
 * @Description: 表格主组件
-->
<template>
  <div class="custom-table-component">
    <div class="custom-table-toolbar">
      <div class="toolbar-left">
        <div v-if="tableTitle" class="table-title">{{ tableTitle }}</div>
        <div class="toolbar"><slot name="tableToolbar"></slot></div>
      </div>
      <div v-if="isShowExport || isExportSlots" class="export">
        <template v-if="isExportSlots">
          <slot name="exportName"></slot>
        </template>
        <template v-else>
          <el-button @click="handleExport" :type="exportType" :icon="exportIcon">导出</el-button>
        </template>
      </div>
    </div>

    <el-table v-on="$listeners"
      v-bind="$attrs"
      :data="data">

      <el-table-column v-if="isShowSelection"
        fixed
        align="center"
        type="selection"
        width="50"/>

      <el-table-column v-if="isShowIndex"
        fixed
        align="center"
        label="序号"
        type="index"
        width="50" >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <template v-for="(column, index) in columns">
        <template v-if="column.slot">
          <slot :name="column.slot"></slot>
        </template>
        <el-table-column
          v-else
          v-bind="column"
          :key="index">
          <template slot-scope="scope">
            <div v-if="column.cusromRender"
              v-html="column.cusromRender(column.prop, scope.row[column.prop], scope.row)">
            </div>
            <div v-else> {{ scope.row[column.prop] }} </div>
          </template>
        </el-table-column>
      </template>
      <slot name="operationList"></slot>
    </el-table>

    <div v-if="isShowPagination" :class="'pagger margin-t20 ' + position">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="pagger.currentPage"
        :page-sizes="pagger.pageSizes"
        :page-size="pagger.pageSize"
        :layout="pagger.layout"
        :total="pagger.total"
        :pager-count="pagger.pagerCount"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableProps: {
      type: Object,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    paggerProps: {
      type: Object,
      default: () => {
        return {
          isShowPagination: false,
          position: 'left',
          paggerConfig: {
            currentPage: 1,
            pageSizes: [10, 20, 50, 100],
            pageSize: 10,
            total: 0,
            layout: 'total, sizes, prev, pager, next, jumper'
          }
        }
      }
    }
  },
  data () {
    return {
      pagger: {
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper',
        pagerCount: 7
      }
    }
  },
  watch: {
    paggerProps: {
      handler (val) {
        const keys = Object.keys(val.paggerConfig)
        keys.map(key => {
          this.pagger[key] = val.paggerConfig[key]
        })
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    isShowSelection () {
      return this.tableProps.isShowSelection
    },
    isShowIndex () {
      return this.tableProps.isShowIndex || true
    },
    tableTitle () {
      return this.tableProps.title || ''
    },
    exportType () {
      return this.tableProps.exportType || 'text'
    },
    exportIcon () {
      return this.tableProps.exportIcon || 'el-icon-download'
    },
    isExportSlots () {
      return !!this.tableProps.isExportSlots
    },
    isShowExport () {
      return !!this.tableProps.isShowExport || ''
    },
    isShowPagination () {
      return !!this.paggerProps.isShowPagination || true
    },
    position () {
      return this.paggerProps.position || ''
    }
  },
  mounted () {

  },
  methods: {
    // 当前页改变时
    handleCurrentChange (currentPage) {
      this.pagger.currentPage = currentPage
      this.$emit('currentChange', currentPage)
    },
    // 分页展示的数改变时
    handleSizeChange (pageSize) {
      this.pagger.pageSize = pageSize
      this.pagger.currentPage = 1
      this.$emit('sizeChange', pageSize)
    },
    handleExport () {
      this.$emit('export')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .custom-table-toolbar {
    height: 18px;
    margin-bottom: 13px;
    display: flex;
    justify-content: space-between;
    .toolbar-left {
      display: flex;
      min-width: 1000px;
    }
    .toolbar{
      // min-width: 500px;
    }
    .export,
    .toolbar {
      padding: 0 10px;
      transform: translateY(-6px);
    }
    .table-title {
      line-height: 18px;
      font-weight: bold;
    }
  }
  .custom-action {
    display: flex;
    justify-content: center;
  }
  .pagger.middle {
    text-align: center;
  }
  .pagger.right {
    text-align: right;
  }
</style>
