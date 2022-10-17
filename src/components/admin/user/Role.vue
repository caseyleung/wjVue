<template>
  <div>
    <el-dialog title="修改角色信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectedRole" style="text-align: left">
        <el-form-item label="角色名:" :label-width="formLabelWidth">
          <el-input v-model="selectedRole.name" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" :label-width="formLabelWidth">
          <el-input v-model="selectedRole.nameZh" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="功能配置:" :label-width="formLabelWidth">
          <el-checkbox-group v-model="selectedRolePerms">
            <el-checkbox v-for="(perm, i) in perms" :key="i" :label="perm.id">
              {{perm.desc}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置:" label-width="120px">
          <el-tree
              :data="menus"
              :props="defaultProps"
              show-checkbox
              :default-checked-keys="selectedRoleMenus"
              node-key="id"
              ref="tree"
              @node-click="handleNodeClick">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="summitForm(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0 0 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <add-role @onSubmit="getAllRoles"></add-role>
    <el-card>
      <el-table
        :data="roles">
        <el-table-column
            type="selection">
        </el-table-column>
        <el-table-column
            prop="id"
            sortable
            label="id">
        </el-table-column>
        <el-table-column
            prop="name"
            label="角色">
        </el-table-column>
        <el-table-column
            prop="nameZh"
            label="角色描述">
        </el-table-column>
        <el-table-column
            label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => changeStatus(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template v-slot="scope">
            <el-button
                @click="editRole(scope.row)"
                type="text"
                size="small">
              编辑
            </el-button>
            <el-button
                type="text"
                size="small"
                @click="deleteRole(scope.row)"
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
import AddRole from "@/components/admin/user/AddRole";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Role",
  components: {AddRole},
  data() {
    return {
      roles: [],
      menus: [],
      perms: [],
      selectedRole: [],
      selectedRolePerms: [],
      selectedRoleMenus: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',

      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'nameZh'
      },
    }
  },
  mounted() {
    this.getAllRoles()
    this.getAllMenus()
    this.getAllPerms()
  },
  methods: {
    getAllRoles() {
      this.$axios.get('admin/roles').then(res => {
        this.roles = res.data.object
      })
    },
    getAllMenus() {
      this.$axios.get('admin/roles/menus').then(res => {
        this.menus = res.data.object
      })
    },
    getAllPerms() {
      this.$axios.get('admin/roles/perms').then(res => {
        this.perms = res.data.object
      })
    },
    changeStatus(value, subject) {
      if (subject.name !== 'admin') {
        this.$axios.put('admin/role/changeStatus', {
          enabled: value,
          id: subject.id
        }).then(res => {
          if (res && res.data.code === 200) {
            if (value) {
              this.$message.success('用户'+ subject.nameZh+ '已启用')
            } else {
              this.$message.info('用户'+ subject.nameZh+ '已禁用')
            }
          } else {
            this.$message.warning('failed')
          }
        })
      } else {
        subject.enabled = true
        this.$alert('不能禁用系统管理员角色')
      }
    },
    editRole(subject) {
      console.log(subject)
      // 把数据显示出来
      this.selectedRole = subject
      this.dialogFormVisible = true

      let permsName = []
      for (let i = 0; i < subject.perms.length; i++) {
        permsName.push(subject.perms[i].id)
      }
      this.selectedRolePerms = permsName

      let menusName = []
      for (let i = 0; i < subject.menus.length; i++) {
        menusName.push(subject.menus[i].id)
        // 没有children的
        // for (let j = 0; j < subNode.children[j].length; j++) {
        //   menusName.push(subNode.children[j].id)
        // }
      }
      this.selectedRoleMenus = menusName
      // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(menusName)
      }
    },
    deleteRole(subject) {
      console.log(subject)
      this.$confirm('删除' + subject.nameZh + '角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            this.$axios.delete('/admin/roles/delete/' + subject.id).then(() => {
              this.getAllRoles()
            })
          }
      )
    },

    summitForm(subject) {
      //
      let permsList = []
      for (let i = 0; i < this.selectedRolePerms.length; i++) {
        permsList.push(this.selectedRolePerms[i])
      }
      console.log(permsList)
      let menuList = []
      // 用树组件自带的方法
      menuList = this.$refs.tree.getCheckedKeys();
      console.log(menuList)

      this.$axios.put('admin/roles', {
        id: subject.id,
        name: subject.name,
        nameZh: subject.nameZh,
        menus: menuList,
        perms: permsList,
      }).then(res => {
        if (res && res.data.code === 200) {
          this.getAllRoles()
          this.getAllMenus()
          this.getAllPerms()
          this.dialogFormVisible = false
          this.$message.success('角色信息更新成功')
        }
      })
    },

    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },

    handleNodeClick(data) {
      console.log(data);
    },

    // loadNode(node, resolve) {
    //   if (node.level === 0) {
    //     return resolve([{ name: 'region1' }, { name: 'region2' }]);
    //   }
    //   if (node.level > 3) return resolve([]);
    //
    //   var hasChild;
    //   if (node.data.name === 'region1') {
    //     hasChild = true;
    //   } else if (node.data.name === 'region2') {
    //     hasChild = false;
    //   } else {
    //     hasChild = Math.random() > 0.5;
    //   }
    //
    //   setTimeout(() => {
    //     var data;
    //     if (hasChild) {
    //       data = [{
    //         name: 'zone' + this.count++
    //       }, {
    //         name: 'zone' + this.count++
    //       }];
    //     } else {
    //       data = [];
    //     }
    //
    //     resolve(data);
    //   }, 500);
    // }
  }
}
</script>

<style scoped>

</style>