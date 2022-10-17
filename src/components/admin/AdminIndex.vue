<template>
  <el-container id="admin-body">
    <el-header style="z-index: 1; height: 100px; margin-left: -50px">
      <Header style="position: absolute; width: 100%; margin-left: 20px; height: 75px"></Header>
    </el-header>
    <!--<el-row style="height: 100%;">-->
    <el-container>
      <el-aside style="height: 120%; margin-top: -60px; width: 220px">
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/admin/Header";
import AdminMenu from "@/components/admin/AdminMenu";
export default {
  name: "AdminIndex",
  components: {AdminMenu, Header},
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {
    // this.$router.replace('/admin/dashboard')
  }
}
</script>

<style scoped>
#admin-body {
  height: 95vh;
}
</style>