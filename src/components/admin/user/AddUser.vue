<template>
  <div style="text-align: left">
    <el-button
        class="addUserBtn"
        @click="dialogFormVisible = true"
        type="success">
      添加用户
    </el-button>
    <el-dialog
        title="添加用户"
        @close="clear"
        :visible.sync="dialogFormVisible">
      <el-form
          :model="loginForm"
          :rules="rules"
          label-position="right"
          style="text-align: right">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.phone" autocomplete="off" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 20%;background: #505458;border: none" v-on:click="register()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      loginForm: {
        username: '',
        password: '',
      },
      formLabelWidth: '80px',
      roles: [],
    }
  },
  methods: {
    clear() {
      this.loginForm = {}
    },
    register() {
      this.$axios.post('/register', {
        username: this.loginForm.username,
        password: this.loginForm.password,
        name: this.loginForm.name,
        phone: this.loginForm.phone,
        email: this.loginForm.email,
      }).then(res => {
        if (res && res.data.code === 200) {
          this.$message.success(res.data.message)
          this.clear()
          this.dialogFormVisible = false
          this.$emit('onSummit')
        } else {
          this.$message.error(res.data.message)
        }
      })

    }
  }
}
</script>

<style scoped>
.addUserBtn{
  margin: 18px 15px;
}
</style>