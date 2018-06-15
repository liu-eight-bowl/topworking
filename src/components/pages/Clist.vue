<template lang="pug">
  div.table 学习目标
    <div style="margin: 15px 0;"></div>
    el-checkbox-group(v-model="checkedCities")
      el-checkbox(v-for="(item, index) in technologyList" :label="item" :key="index") {{item}}
    div
</template>

<script>
export default {
  data () {
    return {
      checkedCities: [],
      technologyList: [
        'Array.some',
        'Array.map',
        'Array.reduce',
        'Array.filter',
        'css grid',
        'flexBox',
        'webpack文档',
        'npm update lock.json',
        'vue原理',
        'http2',
        'TDD',
        'docker'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
