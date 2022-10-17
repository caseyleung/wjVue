<template>
  <div>
    <h2>
      Welcome, {{ username }} !
    </h2>
  </div>
</template>

<script>
export default {
  name: "AppIndex",
  data() {
    return {
      username: this.$store.state.username,
    }
  }
}
</script>

<style scoped>

</style>