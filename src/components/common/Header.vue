<template>
  <div class="top">
    <header class="header">
      <div
        :class="{'btn-toggle': true, 'active': isActived}"
        @click="taggleMenu">
        <i class="icon-toggle"></i>
      </div>
      <h2 class="title">淘璞后台管理系统UI</h2>
      <div class="header-user">
        <div class="rank">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <div class="message">
          <el-tooltip class="item" effect="dark" content="有3条未处理" placement="bottom">
            <el-badge is-dot class="item"><i class="el-icon-message"></i></el-badge>
          </el-tooltip>
        </div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            admin<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
          <img src="../../assets/images/user.jpeg" alt="">
        </div>
      </div>
    </header>
  </div>
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
</style>
