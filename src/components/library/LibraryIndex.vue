<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <SideMenu @indexSelect="findAllByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <books class="books-area" ref="booksArea"></books>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from "@/components/library/SideMenu";
import Books from "@/components/library/Books";
export default {
  name: 'AppLibrary',
  components: {Books, SideMenu},
  methods: {
    findAllByCategory() {
      var cid = this.$refs.sideMenu.cid
      var url = 'categories/' + cid + '/books'
      this.$axios.get(url).then( res => {
        if (res && res.status === 200) {
          this.$refs.booksArea.books = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.books-area {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}
</style>

