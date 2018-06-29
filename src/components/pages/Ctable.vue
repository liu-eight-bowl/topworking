<template lang="pug">
  div.table
    el-card.box-card(shadow="hover")
      div.clearfix(slot="header")
        el-row(:gutter="10")
          el-col(:span="4")
            router-link(to="/form")
              el-button(type="primary",size="small")
                i.el-icon-plus 添加商品
          el-col(:span="8")
            el-input.margin-l10(
              placeholder="请输入内容",
              size="small",
              clearable)
          el-col(:span="2")
            el-button.margin-l10(type="primary",size="small") 搜索

          el-col(:span="10" class="btn-list-box")

            el-button(type="primary" size="small")
              i.el-icon-download 上架商品

            el-button(type="danger", size="small", @click="deleteData()")
              i.el-icon-delete 下架商品

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
          label="商品名称",
          width="200")
          template(slot-scope="scope") {{ scope.row.name }}

        el-table-column(
          prop="price",
          label="商品价格",
          width="120")

        el-table-column(
          prop="discountPrice",
          label="优惠价",
          show-overflow-tooltip)

        el-table-column(
          label="操作",
          width="90")
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
            :total="100")

    el-dialog(
      title="提示",
      center,
      :visible.sync="dialogVisible",
      width="340px")
      div.delete-title 确认下架
      span.dialog-footer(slot="footer")
        el-button(@click="dialogVisible = false") 取 消
        el-button(type="primary" @click="dialogVisible = false") 确 定

</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木',
        price: '¥30.00',
        discountPrice: '¥2.40'
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
.el-checkbox {
  display: block;
}
</style>
