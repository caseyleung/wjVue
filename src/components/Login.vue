<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox
        v-model="rememberMe">
      <span>
        记住我
      </span>
    </el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123',
      },
      rememberMe: false,
    }
  },
  methods: {
    login() {
      console.log('store')
      this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password,
            rememberMe: this.rememberMe,
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              var path = this.$route.query.redirect
              this.$store.commit('login', res.data)
              this.$router.replace({path: path === '/index'|| path === undefined ? '/index' : path })
            } else {
              this.$message.error(res.data.message)
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
    }
  }
}
</script>

<style>
#poster {
  background: url("../assets/login.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>

