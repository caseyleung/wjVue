<template>
  <div>
    <nav-menu/>
    <router-view/>
  </div>
</template>

<script>
import NavMenu from "@/components/common/NavMenu";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {NavMenu}
}
</script>

<style scoped>

</style>