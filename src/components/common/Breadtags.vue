<template>
  <div class="breadtags" v-if="isShow">
    <div class="tags-list">
      <el-tag
        v-for="(item, index) of tagsList"
        :key="index"
        :class="{'is-active': isActived(item.path)}"
        :disable-transitions="false"
        :type="setType(item.path)"
        @close="closeTag(index)"
        size="medium"
        closable>
        <router-link :to="item.path" class="tags-li-title">
          {{ item.name }}
        </router-link>
      </el-tag>
    </div>
    <div class="close-tags">
      <el-dropdown @command="handleBreadTags">
        <el-button type="primary" size="mini">
          更多选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" size="mini">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tagsList: []
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
        item.path === this.$route.path
      )
      this.tagsList = nowTag
    },
    closeAll () {
      this.tagsList.splice(0, this.tagsList.length)
    },
    handleBreadTags (command) {
      command === 'all'
        ? this.closeAll()
        : this.closeOther()
    }
  },
  computed: {
    isShow () {
      return this.tagsList.length > 0
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
