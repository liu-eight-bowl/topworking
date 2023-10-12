<template>
  <div>
    <el-row class="margin-b20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <!-- 标题 -->
            <!-- <div class="clearfix">
              <span>
                <i class="el-icon-date"></i> 带过滤功能的树
              </span>
            </div> -->
            <!-- 树的头部-->
            <div>
              <el-row>
                <!-- 过滤框 -->
                <el-col :span="15">
                  <el-input
                    clearable
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
                  </el-input>
                </el-col>
                <el-col :span="3" style="height:40px;"></el-col>
                <!-- 全选和反选 -->
                <el-col :span="6">
                  <el-checkbox
                    style="margin-top:12px;"
                    v-model="isCheckedAll"
                    @change="checkedChange"
                  >
                    {{ checkBoxText }}
                  </el-checkbox>
                </el-col>
              </el-row>
            </div>
            <!-- 树展示 -->
            <div class="table">
              <el-tree
                :data="cityDealerTreeData"
                show-checkbox
                node-key="code"
                ref="dealerTree"
                :default-expanded-keys="defaultExpandedKeys"
                :default-checked-keys="defaultCheckedKeys"
                :props="cityDealerProps"
                :filter-node-method = "filterTreeByCity"
                @check-change="handleNodeChange"
              >
              </el-tree>
            </div>
          </el-card>
          <!-- 完整功能
          <el-pagination
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            :pager-count=4
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cityDealerTreeData: [],
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      cityDealerProps: {
        children: 'children',
        label: 'name'
      },
      filterText: '',
      isCheckedAll: false,
      checkBoxText: '全选'
    }
  },
  watch: {
    filterText (val) {
      this.$refs.dealerTree.filter(val)
      let tree = this.$refs.dealerTree
      this.setNodeShow(this.cityDealerTreeData, tree, this)
      if (!val) {
        this.setExpandNodesAfterFilter()
      }
    }
  },
  mounted () {
    this.getCityList()
  },
  methods: {
    // 递归设置树的节点显示
    setNodeShow (dataList, tree, self) {
      dataList.map((item) => {
        let node = tree.getNode(item.code)
        node.visible = true
        if (item.children) {
          self.setNodeShow(item.children, tree, self)
        }
      })
    },
    /**
     * 树过滤
     */
    filterTreeByCity (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    /**
     * 全选和反选
     */
    checkedChange () {
      if (this.isCheckedAll) {
        this.checkBoxText = '反选'
        this.$refs.dealerTree.setCheckedNodes(this.cityDealerTreeData)
        return
      }
      this.checkBoxText = '全选'
      this.$refs.dealerTree.setCheckedKeys([])
    },
    /**
     * 树发生变化时
     */
    handleNodeChange () {
      // const nodes = this.$refs.dealerTree.getCheckedNodes(true)
      // const node = this.$refs.dealerTree.getNode(nodes[0])
    },
    /**
     * 过滤后设置展开收缩
     */
    setExpandNodesAfterFilter () {
      // 将所有的一级节点和二级节点折叠
      this.cityDealerTreeData.map(item => {
        const node = this.$refs.dealerTree.getNode(item)
        node.expanded = false
        if (node.childNodes) {
          node.childNodes.map(subNode => {
            subNode.expanded = false
          })
        }
      })
      // 将选中的节点的上级和上上级节点展开
      const checkedNodes = this.$refs.dealerTree.getCheckedNodes(true, false)
      checkedNodes.map(item => {
        const node = this.$refs.dealerTree.getNode(item)
        // node.expanded = true
        const subPrent = node.parent
        if (subPrent) {
          subPrent.expanded = true
        }
        if (subPrent.parent) {
          subPrent.parent.expanded = true
        }
      })
    },
    /**
     * 获取经销商数据
     */
    getCityList () {
      const url = './static/json/cityData.json'
      this.$service.get(url).then(res => {
        console.log(res, 1234)
        const data = res.data
        if (data.statusCode === 200 && data.data) {
          this.cityDealerTreeData = [...res.data.data]
        }
      }).catch(error => {
        console.log(error, 222)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table {
    background: #fff;
    height: 400px;
    overflow-y: auto;
    padding: 10 0;
    width: 60%;
  }
</style>
