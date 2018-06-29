<template lang="pug">
  div.notfound
    div.code
      span.first 4
      span.second 0
      span.third 4
    div.message  ^_^ 哇哦，您访问的页面不存在 ^_^
    div.btn-list
     el-button(type="danger", class="backhome", @click="backPage('/')") 返回首页
     el-button(type="danger", @click="backPage") 返回上页
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    backPage (param) {
      param === '/'
        ? this.$router.push('/')
        : this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>
.notfound {
  text-align: center;
  width: 470px;
  height: 350px;
  position: absolute;
  top: 15%;
  left: 50%;
  margin: 0 0 0 -235px;
}
.code {
  font-size: 220px;
  font-weight: bold;
  color: #f04f7b;
  .second {
    margin: 0 20px;
  }
}
.message {
  color: #f04f7b;
  font-size: 30px;
  margin: 20px 0 40px;
}
.btn-list {
  text-align: center;
  .backhome {
    margin-right: 100px;
  }
}
</style>
