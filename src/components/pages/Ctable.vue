<template>
  <div class="table">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-button type="danger" size="small"><i class="el-icon-delete"></i>批量删除</el-button>
        <el-button type="primary" size="small"><i class="el-icon-plus"></i>创建活动</el-button>
        <el-button type="primary" size="small"><i class="el-icon-download"></i>导出Excel</el-button>
        <el-input
          :style="{width: '350px'}"
          placeholder="请输入内容"
          size="small"
          clearable>
        </el-input>
        <el-button type="primary" size="small">搜索</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="editData(scope.$index, scope.row)">
              <i class="el-icon-edit-outline"></i> 编辑
            </el-button>
            <el-button size="small" type="danger" @click="deleteData(scope.$index, scope.row)">
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page margin-t20">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      center
      :visible.sync="dialogVisible"
      width="340px">
      <div class="delete-title">确认删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
    deleteData (index, row) {
      console.log(index, row)
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
</style>
