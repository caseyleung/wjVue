<template>
  <div>
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectedUser" style="text-align: left">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <label>{{selectedUser.username}}</label>
        </el-form-item>
        <el-form-item label="真实姓名:" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-button type="primary" @click="resetPwd(selectedUser.username)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色分配:" :label-width="formLabelWidth">
          <el-checkbox-group v-model="selectedUserRoles">
            <el-checkbox v-for="(role, i) in roles" :key="i" :label="role.name">
              {{role.nameZh}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="summitForm(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0 0 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <add-user @onSummit="getAllUsers()"></add-user>
    <el-card>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            type="selection">
        </el-table-column>
        <el-table-column
            prop="id"
            sortable
            label="id"
            width="60px">
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名">
        </el-table-column>
        <el-table-column
            prop="name"
            label="真实名字">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话">
        </el-table-column>
        <el-table-column
            prop="email"
            width="180px"
            label="邮箱">
        </el-table-column>
        <el-table-column
            label="状态">
          <!-- 1.怎么在这里显示呢 -->
          <template v-slot="scope">
            <el-switch
                v-model="scope.row.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="(value) => changeUserStatus(value, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template v-slot="scope">
            <el-button
                @click="editUser(scope.row)"
                type="text"
                size="small">
              编辑
            </el-button>
            <el-button
                type="text"
                size="small"
                @click="deleteUser(scope.row)"
                style="color: red">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import AddUser from "@/components/admin/user/AddUser";
export default {
  name: "UserProfile",
  components: {AddUser},
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      selectedUser: {},
      roles: [],
      selectedUserRoles: [],
      formLabelWidth: '120px'
      // enabled: true
    }
  },
  mounted() {
    this.getAllUsers()
    this.getAllRoles()
  },
  methods: {
    getAllUsers() {
      this.$axios.get('/admin/user').then(res => {
        if (res) {
          this.tableData = res.data.object
        }
      })
    },
    getAllRoles() {
      this.$axios.get('admin/roles').then(res =>{
        this.roles = res.data.object
      })
    },
    changeUserStatus(value, user) {
      // 1.put
      if (user.username !== 'admin') {
        this.$axios.put('admin/user/changeUserStatus', {
          enabled: value,
          username: user.username
        }).then(res => {
          if (res && res.data.code === 200) {
            if (value) {
              this.$message.success('用户'+ user.username+ '已启用')
            } else {
              this.$message.info('用户'+ user.username+ '已禁用')
            }
          } else {
            this.$message.warning('failed')
          }
        })
      } else {
        user.enabled = true
        this.$alert('不能禁用管理员账户')
      }
    },
    editUser(user) {
      this.dialogFormVisible = true
      this.selectedUser = user
      let roleIds = []
      for (let i = 0; i < user.roles.length; i++) {
        roleIds.push(user.roles[i])
      }
      this.selectedUserRoles = roleIds
    },
    summitForm(user) {
      // 根据视图绑定的角色 id 向后端传送角色信息
      this.$axios.post('admin/user', {
        username: user.username,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roles: this.selectedUserRoles
      }).then(res => {
        if (res && res.data.code !== 200) {
          this.getAllUsers()
          this.getAllRoles()
          this.dialogFormVisible = false
          this.$message.success('更新用户成功')
        }
      })
    },
    deleteUser(user) {
      this.$confirm('永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            this.$axios.delete('/admin/user/delete/' + user.id).then(() => {
                this.getAllUsers()
            })
          }
      )
    },
    resetPwd(username) {
      this.$axios.put('/admin/user/resetPwd',{
        username: username
      }).then(res => {
        if (res && res.data.code === 200) {
          this.$message.success(res.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>