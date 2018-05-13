<template>
  <aside class="sidebar">
    <div class="logo">
      <span>TOP</span>-Working
    </div>
    <el-menu
      active-text-color="#20a0ff"
      :default-active="onActive"
      router>
      <el-menu-item
        v-for="item of menuList"
        :key="item.index"
        :index="item.index">
        <i :class="item.iconName"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          title: '首页面板',
          index: 'dashboard',
          iconName: 'el-icon-document'
        },
        {
          title: '表格数据',
          index: 'table',
          iconName: 'el-icon-tickets'
        },
        {
          title: '选项卡',
          index: 'tabs',
          iconName: 'el-icon-setting'
        },
        {
          title: '表单提交',
          index: 'form',
          iconName: 'el-icon-date'
        },
        {
          title: '图表展示',
          index: 'chart',
          iconName: 'el-icon-picture-outline'
        },
        {
          title: '列表信息',
          index: 'list',
          iconName: 'el-icon-news'
        }
      ]
    }
  },
  computed: {
    onActive () {
      return this.$route.path.substring(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>
.logo {
  background: rgb(32, 160, 255);
  border-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  line-height: 40px;
  margin: 15px 20px;
  span {
    color: #ff0;
  }
}
.el-menu-item {
  background: rgb(73, 80, 96);
  border-left: 3px solid transparent;
  color: rgb(191, 203, 217);
  font-size: 14px;
  font-weight: bold;
  transition: all .3s ease-in;
}
.is-active,
.el-menu-item:hover{
  color: rgb(32, 160, 255);
  background: rgb(50, 65, 87);
  border-color: rgb(32, 160, 255);
}
.el-menu-item:hover .el-icon-picture-outline {
  color: rgb(32, 160, 255);
}
.el-menu-item [class^=el-icon-] {
  margin-right: 0;
}
.el-menu-item, .el-submenu__title {
  height: 50px;
  line-height: 50px;
}
</style>
