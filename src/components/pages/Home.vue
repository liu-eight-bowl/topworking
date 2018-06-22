<template lang="pug">
  div.main
    Theader
    Tsidebar
    main(:class="{'main-content':true, 'folding': isActived}")
      Tbreadtags
      div.container
        transition(name="slide-fade")
          keep-alive
            router-view
</template>

<script>
import Theader from '../common/Header.vue'
import Tsidebar from '../common/Sidebar.vue'
import Tbreadtags from '../common/Breadtags.vue'
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
    Theader,
    Tsidebar,
    Tbreadtags
  },
  beforeDestroy () {
    bus.$off('isActived')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>
.main-content.folding {
  left: 80px;
}
</style>
