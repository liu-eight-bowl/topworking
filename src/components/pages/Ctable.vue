<template lang="pug">
  div.table
    el-card.box-card(shadow="hover")
      div.clearfix(slot="header")

        el-row(:gutter="10")
          el-col(:span="8")
            el-input.margin-l10(
              placeholder="请输入内容",
              size="small",
              clearable)
          el-col(:span="2")
            el-button.margin-l10(type="primary" size="small") 搜索

          el-col(:span="14" class="btn-list-box")
            el-button(type="primary",size="small")
              i.el-icon-plus 创建活动

            el-button(type="primary" size="small")
              i.el-icon-download 导出Excel

            el-button(type="danger", size="small", @click="deleteData()")
              i.el-icon-delete 删除

      el-table(
        ref="multipleTable",
        :data="tableData",
        border,
        tooltip-effect="dark",
        stripe,
        style="width: 100%")

        el-table-column(
          type="selection",
          width="55")

        el-table-column(
          label="日期",
          width="120")
          template(slot-scope="scope") {{ scope.row.date }}

        el-table-column(
          prop="name",
          label="姓名",
          width="120")

        el-table-column(
          prop="address",
          label="地址",
          show-overflow-tooltip)

        el-table-column(
          label="操作",
          width="100")
          template(slot-scope="scope")
            el-button(size="small", @click="editData(scope.$index, scope.row)")
              i.el-icon-edit-outline 编辑

      div.page.margin-t20
         el-pagination(
            background,
            :current-page="1",
            :page-sizes="[10, 20, 50, 100]",
            :page-size="10",
            layout="total, sizes, prev, pager, next, jumper",
            :total="400")

    el-dialog(
      title="提示",
      center,
      :visible.sync="dialogVisible",
      width="340px")
      div.delete-title 确认删除
      span.dialog-footer(slot="footer")
        el-button(@click="dialogVisible = false") 取 消
        el-button(type="primary" @click="dialogVisible = false") 确 定

</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogVisible: false
    }
  },
  methods: {
    editData (index, row) {
      console.log(index, row)
    },
    deleteData () {
      this.dialogVisible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.delete-title {
  font-size: 18px;
  text-align: center;
}
.el-pagination {
  padding-left: 0;
}
.btn-list-box {
  text-align: right;
}
</style>
