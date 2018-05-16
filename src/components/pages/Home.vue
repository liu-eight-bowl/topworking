<template lang="pug">
  div.main
    v-header
    v-sidebar
    main.main-content
      v-beadtags
      div.container
        transition(name="slide-fade")
          keep-alive
            router-view
</template>

<script>
import vHeader from '../common/Header.vue'
import vSidebar from '../common/Sidebar.vue'
import vBeadtags from '../common/Breadtags.vue'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to My system'
    }
  },
  components: {
    vHeader,
    vSidebar,
    vBeadtags
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>

</style>
