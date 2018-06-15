<template lang="pug">
  div.main
    v-header
    v-sidebar
    main(:class="{'main-content':true, 'folding': isActived}")
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
import bus from '../common/bus.js'
export default {
  name: 'Home',
  data () {
    return {
      isActived: false
    }
  },
  created () {
    this.getIsActived()
  },
  methods: {
    getIsActived (item) {
      bus.$on('isActived', item => {
        this.isActived = item
        console.log(item)
      })
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
.main-content.folding {
  left: 80px;
}
</style>
