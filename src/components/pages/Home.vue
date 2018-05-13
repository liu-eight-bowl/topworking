<template>
  <div class="main">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <main class="main-content">
      <v-beadtags></v-beadtags>
      <div class="container">
        <transition name="slide-fade">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </div>
    </main>
  </div>
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
