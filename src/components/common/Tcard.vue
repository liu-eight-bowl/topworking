<template lang="pug">
  div.box-card
    el-card(
    shadow="hover"
    :body-style="{padding: 0}")
      div.top-card
      i(:class="['el-icon-goods', 'top-icon', className]")
      div.icon-text
        div.icon-number {{ number }}
        div.icon-title {{ text }}
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  props: [
    'number',
    'text',
    'className'
  ],
  methods: {}
}
</script>

<style scoped lang=scss>
$mainColor: #409eff;
.top-card {
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.normal-bg {
  background: $mainColor;
}
.success-bg {
  background: #67c23a;
}
.warning-bg {
  background: #e6a23c;
}
.danger-bg {
  background: #f56c6c;
}
.top-icon {
  font-size: 56px;
  color: #fff;
  line-height: 110px;
  width: 110px;
  text-align: center;
}
.icon-text {
  text-align: center;
  flex: 1;
}
.icon-number {
  color: $mainColor;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}
</style>
