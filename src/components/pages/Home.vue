<!--
 * @Author: liubing 943485115@qq.com
 * @Date: 2022-09-24 16:37:23
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-08-25 10:29:34
 * @FilePath: /topworking/src/components/pages/Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
  computed: {
    watermark () {
      return {
        text: '11111',
        time: Date.now(),
        isInterval: false
      }
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
