<template>
  <div class="table">
    表单
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route.meta.title)
  },
  computed: {
    onActive () {
      return this.$route
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
