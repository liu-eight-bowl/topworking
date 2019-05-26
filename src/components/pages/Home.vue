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
<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateZ(10px);
  opacity: 0;
}
</style>
