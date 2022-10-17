<template>
  <el-card class="admin-header">
    <a href="/index">
      <img src="../../assets/fish.png" alt="" width="55px" style="float: left; margin-top:-5px;margin-left: 20px">
    </a>
    <span style="font-size:32px; font-weight: bold; position: absolute;  margin-left: -40px">后台管理</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size:40px; float: right"></i>
  </el-card>
</template>

<script>
// import {createRouter} from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/index')
          // 清空路由，防止路由重复加载
          // const newRouter = createRouter()
          // _this.$router.matcher = newRouter.matcher
        }
      }).catch(failResponse => {
        console.log(failResponse)
      })
    }
  }
}
</script>

<style scoped>

</style>