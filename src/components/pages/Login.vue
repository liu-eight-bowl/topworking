<template lang="pug">
  div.login
    el-card.login-form(shadow="hover")
      h2.title 后台管理系统
      el-form(
        label-width="80px",
        :model="formLogin"
        :rules="rules"
        ref="formLogin")
        el-form-item(label="账号：", prop="name")
          el-input(
            v-model="formLogin.name",
            placeholder="请填写账号"
            clearable)
        el-form-item(
          label="密码：",
          prop="password")
          el-input(
            type="password",
            placeholder='请填写密码'
            v-model="formLogin.password"
            clearable)
        div.btn-login
          el-button(type="primary", @click="login") 登录

    div.login-bg
     img(src="../../assets/body_bg.png")
</template>

<script>
export default {
  data () {
    return {
      formLogin: {
        name: 'admin',
        password: 'helloworld'
      },
      rules: {
        name: [{
          required: true, message: '请输入登录账号', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入登录密码', trigger: 'blur'
        }]
      },
      homePath: {
        name: '系统首页',
        path: '/dashboard'
      }
    }
  },
  methods: {
    login () {
      let data = {
        user: this.formLogin,
        time: new Date().getTime()
      }
      localStorage.setItem('userData', JSON.stringify(data))
      this.$store.dispatch('setUserValue', this.formLogin)
      this.formLogin.name &&
      this.formLogin.password &&
      this.$router.push(this.homePath.path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  height: 100%;
  position: relative;
  .title {
    color: #15a4fa;
    font-size: 24px;
    text-align: center;
    margin: 40px 0 40px;
    img {
      width: 70px;
      margin-right: 20px;
      vertical-align: middle;
    }
  }
  .login-form {
    background: rgba(244, 244, 244, .85);
    border-radius: 4px;
    position: absolute;
    width: 380px;
    height: 360px;
    left: 50%;
    top: 40%;
    margin: -170px 0 0 -250px;
    padding: 20px 70px 20px 50px;
    z-index: 11;
    .btn-login {
      margin-left: 28px;
      padding-top: 20px;
      button {
        width: 100%;
      }
    }
  }
  .login-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
