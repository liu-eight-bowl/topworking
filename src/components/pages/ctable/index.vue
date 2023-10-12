<template>
  <div class="table" v-watermark="watermark">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix" slot="header">
        <el-form :model="searchForm"
          ref="ruleForm"
          label-width="80px"
          class="product-add">
          <el-row :gutter="20">
            <!-- <el-col :span="4">
              <router-link to="/form">
                <el-button type="primary" size="small">
                  <i class="el-icon-plus">添加商品</i>
                </el-button>
              </router-link>
            </el-col> -->
            <!-- <el-col :span="10" class="btn-list-box">
              <el-button type="primary" size="small">
                <i class="el-icon-download">上架商品</i>
              </el-button>
              <el-button type="danger" size="small" @click="deleteData()">
                <i class="el-icon-delete">下架商品</i>
              </el-button>
            </el-col> -->
            <el-col :span="6" v-for="item in 4" :key="item">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="searchForm.name" class="margin-l10" placeholder="请输入内容" size="small" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align: center">
            <el-col :span="24">
              <el-button @click="handleSearch" class="margin-l10" type="primary" size="small">搜索</el-button>
              <el-button class="margin-l10" size="small">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <pro-table
        ref="multipleTable"
        :columns="columns"
        :data="tableData"
        :paggerProps="paggerProps"
        :tableProps="tableProps"
        @export="handleExport"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        stripe
        border
        :default-sort = "{prop: 'name', order: 'descending'}">
        <el-table-column slot="price" prop="price" label="单价2" />
        <template slot="tableToolbar">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" size="mini">
                <i class="el-icon-download">上架商品</i>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteData()">
                <i class="el-icon-delete">下架商品</i>
              </el-button>
              <el-button type="primary" size="mini">
                <i class="el-icon-download">上架商品</i>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteData()">
                <i class="el-icon-delete">下架商品</i>
              </el-button>
              <el-button type="primary" size="mini">
                <i class="el-icon-download">上架商品</i>
              </el-button>
              <el-button type="danger" size="mini" @click="deleteData()">
                <i class="el-icon-delete">下架商品</i>
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template slot="operationList">
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button size="small" @click="editData(scope.$index, scope.row)">
                <i class="el-icon-edit-outline ">编辑</i>
              </el-button>
            </template>
          </el-table-column>
        </template>
      </pro-table>
    </el-card>
  </div>
</template>

<script>
import ProTable from '@/components/common/ProTable/index.vue'
import { tableColumn } from './column.js'
export default {
  components: {
    ProTable
  },
  data () {
    return {
      tableProps: {
        title: 'Element UI 表格封装',
        isShowExport: true,
        isShowSelection: true
      },
      paggerProps: {
        paggerConfig: {
          currentPage: 1,
          pageSizes: [10, 20, 50, 100],
          pageSize: 10,
          layout: 'total, sizes, prev, pager, next, jumper',
          total: 100
        }
      },
      searchForm: {
        name: ''
      },
      rules: {
        name: [
          { required: false, message: '请输入产品名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        price: [
          {required: false, message: '请输入单价', trigger: 'blur'},
          {type: 'number', message: '价格必须为数字'}
        ],
        inventory: [
          {required: false, message: '请输入库存', trigger: 'blur'},
          {type: 'number', message: '库存必须为数字', trigger: 'blur'}
        ]
      },
      columns: tableColumn,
      tableData: [{
        name: '乐高积木1',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木2',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木3',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木4',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木5',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木6',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木7',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木8',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木9',
        price: '¥30.00',
        discountPrice: '¥2.40'
      },
      {
        name: '乐高积木10',
        price: '¥30.00',
        discountPrice: '¥2.40'
      }],
      dialogVisible: false
    }
  },
  computed: {
    watermark () {
      return {
        text: '水印测试/这是一个水印测试',
        time: Date.now(),
        isInterval: true
      }
    }
  },
  methods: {
    editData (index, row) {
      console.log(index, row)
    },
    deleteData () {
      this.dialogVisible = true
    },
    handleCellClick (row, column, cell, event) {
      console.log(row, column, cell, event, 1)
    },
    handleRowClick (row, column, event) {
      console.log(row, column, event, 2)
    },
    handleExport () {
      console.log('1234')
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    // 搜索
    handleSearch () {

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
  /deep/ .custom-price {
    text-decoration: underline;
    color: #f00;
    cursor: pointer;
  }
</style>
