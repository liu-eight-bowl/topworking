<template lang="pug">
  div.tabs
    el-card.box-card(shadow="hover")
      div.clearfix(slot="header") Tabs选项卡
      el-tabs(v-model="activeName", @tab-click="handleClick")
        el-tab-pane(label="用户管理", name="first") 用户管理
        el-tab-pane(label="配置管理", name="second") 配置管理
        el-tab-pane(label="角色管理", name="third") 角色管理
        el-tab-pane(label="定时任务补偿", name="fourth") 定时任务补偿
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
