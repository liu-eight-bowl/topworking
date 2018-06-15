<template lang="pug">
  aside(:class="{'sidebar': true, 'folding': isActived}")
    div.logo TOP
      span(v-if="!isActived") -Working
    el-menu(
      active-text-color="#20a0ff",
      :default-active="onActive",
      router)
      el-menu-item(
        v-for="item of menuList",
        :key="item.index",
        :index="item.index")
        el-tooltip(effect="dark" :content="item.title" placement="right-start")
          i(:class="item.iconName")
        span(slot="title" v-if="!isActived") {{ item.title }}
</template>

<script>
import bus from '../common/bus.js'
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
      ],
      isActived: false
    }
  },
  created () {
    this.getIsActived()
  },
  methods: {
    getIsActived () {
      bus.$on('isActived', item => {
        this.isActived = item
      })
    }
  },
  computed: {
    onActive () {
      return this.$route.path.substring(1)
    }
  },
  beforeDestroy () {
    bus.$off('isActived')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>
$mainColor: #409eff;
.logo {
  background: $mainColor;
  border-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #ff0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin: 15px 20px;
  overflow: hidden;
  span {
    color: #fff;
  }
}
.el-menu-item {
  background: rgb(73, 80, 96);
  border-left: 3px solid transparent;
  color: rgb(191, 203, 217);
  font-size: 14px;
  font-weight: bold;
  transition: all .2s ease-in;
  span {
    margin-left: 5px;
  }
  i {
    font-size: 20px;
  }
}
.is-active,
.el-menu-item:focus,
.el-menu-item:hover {
  color: $mainColor;
  background: rgb(50, 65, 87);
  border-color: $mainColor;
  padding-left: 20px!important;
}
.el-menu-item:hover {
   .el-icon-picture-outline {
     color: $mainColor;
   }
}
.el-menu-item [class^=el-icon-] {
  margin-right: 0;
}
.el-menu-item,
.el-submenu__title {
  height: 50px;
  line-height: 50px;
}
.folding {
  width: 80px;
  .logo {
    margin: 10px;
  }
  .el-menu-item {
    line-height: 60px;
    height: 60px;
    padding-left: 0!important;
    text-align: center;
    &:hover {
      padding-left: 0!important;
    }
    i {
      font-size: 22px;
    }
  }
}
</style>
