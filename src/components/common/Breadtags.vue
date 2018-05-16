<template lang="pug">
  div.breadtags(v-if="isShowTags")
    div.tags-list
      el-tag(
        v-for="(item, index) of tagsList"
        :key="index"
        :class="{'is-active': isActived(item.path)}"
        :disable-transitions="false"
        :type="setType(item.path)"
        @close="closeTag(index)"
        size="medium"
        :closable="item.path !== '/dashboard'")
        router-link.tags-li-title( :to="item.path") {{ item.name }}
    div.close-tags(v-if="isShowDashboard")
      el-dropdown(@command="handleBreadTags")
        el-button(type="primary",size="mini") 更多选项
          i.el-icon-arrow-down.el-icon--right
        el-dropdown-menu(slot="dropdown" size="mini")
          el-dropdown-item(command="other") 关闭其他
          el-dropdown-item(command="all") 关闭所有
</template>

<script>
export default {
  data () {
    return {
      tagsList: [],
      homePath: {
        name: '系统首页',
        path: '/dashboard'
      }
    }
  },
  created () {
    this.setBreadtags(this.$route)
  },
  methods: {
    isActived (name) {
      return name === this.$route.path
    },
    setType (name) {
      return name === this.$route.path ? '' : 'info'
    },
    setBreadtags (route) {
      if (!this.isShowTags) {
        this.tagsList.unshift(this.homePath)
      }
      const hasTag = this.hasTag(route)
      if (!hasTag) {
        route.path !== '/' && this.tagsList.push({
          name: route.meta.title,
          path: route.path
        })
      }
    },
    hasTag (route) {
      return this.tagsList.some(item =>
        item.path === route.path
      )
    },
    closeTag (index) {
      const oldTag = this.tagsList.splice(index, 1)[0]
      const newTag = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1]
      if (newTag) {
        oldTag.path === this.$route.path && this.$router.push(newTag.path)
      } else {
        this.$router.push('/')
      }
    },
    setRoute (path) {
      this.$route.path = path
    },
    closeOther () {
      const nowTag = this.tagsList.filter(item =>
        item.path === this.$route.path || item.path === this.homePath.path
      )
      this.tagsList = nowTag
    },
    closeAll () {
      this.tagsList = this.tagsList.filter(item =>
        item.path === this.homePath.path
      )
      this.$router.push(this.tagsList[0].path)
    },
    handleBreadTags (command) {
      command === 'all'
        ? this.closeAll()
        : this.closeOther()
    }
  },
  computed: {
    isShowTags () {
      return this.tagsList.length > 0
    },
    isShowDashboard () {
      return this.tagsList.length > 1
    }
  },
  watch: {
    $route (newRoute) {
      this.setBreadtags(newRoute)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=scss>
$wthie: #fff;
.breadtags {
  background: $wthie;
  border-radius: 4px;
  height: 28px;
  overflow: hidden;
  padding: 5px;
  margin: 5px;
  position: relative;
}
.tags-list {
  margin-right: 100px;
}
.el-tag {
  margin-right: 5px;
  margin-bottom: 10px;
  &:not(.is-active) {
    background: none;
  }
  transition: all 200ms ease-in;
}
.is-active {
  background: #409eff;
  a {
    color: $wthie;
  }
}
.close-tags {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
