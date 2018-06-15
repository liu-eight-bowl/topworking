<template lang="pug">
  div(:class="{'top': true, 'folding':isActived}")
    header.header
      div(
        :class="{'btn-toggle': true, 'active': isActived}",
        @click="taggleMenu")
        i.icon-toggle
      h2.title 淘璞后台管理系统UI
      div.header-user
        div.rank
          el-tooltip.item(
            effect="dark",
            content="全屏",
            placement="bottom")
            i.el-icon-rank
        div.message
          el-tooltip.item(
            effect="dark",
            content="有3条未处理",
            placement="bottom")
            el-badge.item(is-dot)
              i.el-icon-message
        el-dropdown(trigger="click")
          span.el-dropdown-link admin
            i.el-icon-caret-bottom.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item 个人中心
            el-dropdown-item(divided) 退出登陆
        div.user
          img(src="../../assets/images/user.jpeg")
</template>
<script>
import bus from '../common/bus.js'
export default {
  data () {
    return {
      isActived: false
    }
  },
  methods: {
    taggleMenu () {
      this.isActived = !this.isActived
      bus.$emit('isActived', this.isActived)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>
.btn-toggle {
  width: 60px;
  height: 60px;
}
.icon-toggle {
  display: block;
  border-top: solid 2px #666;
  border-bottom: solid 2px #666;
  width: 20px;
  height: 12px;
  margin: 22px 0 0 20px;
  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 2px;
    background: #666;
    margin-top: 5px;
  }
}
.title {
  position: absolute;
  left: 70px;
  right: 200px;
}
.header-user {
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.user {
  width: 40px;
  height: 40px;
  padding: 0 20px 0 5px;
  img {
    display: block;
    border-radius: 50%;
  }
}
.el-dropdown {
  cursor: pointer;
  line-height: 24px;
  padding: 0 5px 0 20px;
}
.rank,
.message {
  cursor: pointer;
  font-size: 26px;
  display: inline-block;
  padding: 0 7px;
}
.message {
  font-size: 23px;
}
.rank {
  i {
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
.folding {
  left: 80px;
}
</style>
