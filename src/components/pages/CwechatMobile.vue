<!--
 * @Author: liubing 943485115@qq.com
 * @Date: 2022-09-24 16:37:23
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-09-05 10:02:28
 * @FilePath: /topworking/src/components/pages/Cchart.vue
 * @Description: 加密处理
-->
<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div class="wechart-box">
          <div class="wechart-header">
            <!-- 顶部时间和电池 -->
            <div class="toolbar">
              <div class="time" v-if="currentTime">{{ currentTime }}</div>
              <div class="battery-box">
                <div class="battery-content">
                  <div class="battery-subcontent"></div>
                </div>
                <div class="count">{{ battery }}</div>
              </div>
            </div>
            <!-- 返回，标题和用户 -->
            <div class="menu-box">
              <el-button type="text" icon="el-icon-arrow-left"></el-button>
              <div class="menu">菜单配置</div>
              <div class="custom-user-icon">
                <div class="user-header"></div>
                <div class="user-body"></div>
              </div>
            </div>
          </div>
          <el-scrollbar>
            <div class="wechart-body">
              <div class="content-item-box">
                <div class="content-item" v-for="(item) in 3" :key="item">
                  <div class="img"></div>
                  <div class="list-item">
                    <div class="item-title">这是菜单配置机模</div>
                  </div>
                  <div class="list-item">
                    <div class="item-title">这是菜单配置机模</div>
                  </div>
                  <div class="list-item">
                    <div class="item-title">这是菜单配置机模</div>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
          <div class="wechart-footer">
            <div class="footer-left">
              <div class="icon-box">
                <el-button type="text" icon="el-icon-more"></el-button>
                <el-button type="text" icon="el-icon-more"></el-button>
              </div>
            </div>
            <!-- // 菜单内容 -->
            <!-- <div class="footer-menu"> -->
              <draggable v-model="menuDataList" class="footer-menu" animation=200 filter=".disableItem">
                <div
                  class="menu-item"
                  v-for="(item, index) in menuDataList"
                  :ref="'parentMenu' + index"
                  :key="item.name">
                  <div class="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="menu-title" :title="item.name" @click="handleSHowChild(index)">
                    {{ item.name }}
                  </div>
                  <template v-if="item.children.length > 0">
                    <div class="sub-menu-box" v-show="item.isShowChild === true">
                      <draggable v-model="item.children" animation=200 filter=".disableItem">
                        <div
                          class="sub-menu-item"
                          v-for="(subItem) in item.children"
                          :key="subItem.name"
                          @click="handleChildClick">
                          {{ subItem.name }}
                        </div>
                        <div class="sub-menu-item disableItem" v-if="item.children.length < 5">
                          <el-button class="submenu-add-button" type="text" icon="el-icon-plus"></el-button>
                        </div>
                      </draggable>
                    </div>
                  </template>
                </div>
                <div class="menu-item disableItem" v-if="menuDataList.length < 3">
                  <el-button class="menu-add-button" type="text" icon="el-icon-plus"></el-button>
                </div>
              </draggable>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        {{ menuDataList }}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :preview-src-list="srcList">
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data () {
    return {
      url: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQG78DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyeWNFWWtXTTlmSkcxMDAwME0wN0kAAgRuBfBkAwQAAAAA',
      srcList: [
        'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQG78DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyeWNFWWtXTTlmSkcxMDAwME0wN0kAAgRuBfBkAwQAAAAA'
      ],
      menuDataList: [
        {
          name: '一级菜单1',
          isShowChild: false,
          children: [{
            name: '1-子菜单1'
          }, {
            name: '1-子菜单2'
          }, {
            name: '1-子菜单3'
          }]
        }, {
          name: '一级菜单2',
          isShowChild: false,
          children: [{
            name: '2-子菜单1'
          }, {
            name: '2-子菜单2'
          }, {
            name: '2-子菜单3'
          }, {
            name: '2-子菜单4'
          }, {
            name: '2-子菜单5'
          }]
        }
      ],
      list: [{
        name: 'a',
        children: [
          {name: 'a-1'},
          {name: 'a-2'}
        ]
      }, {
        name: 'b',
        children: [
          {name: 'b-1'},
          {name: 'b-2'}
        ]
      }],
      timer: null,
      currentTime: ''
    }
  },
  computed: {
    battery () {
      const value = Math.ceil(Math.random() * 10) * 10
      return value === 100 ? '99%' : `${value}%`
    }
  },
  mounted () {
    this.setCurrentTime()
    this.timer = setInterval(() => {
      this.setCurrentTime()
    }, 1000)
    this.bindDocumentClosePopup()
  },
  beforeDestroy () {
    this.timer = null
  },
  methods: {
    dragBUg (currentElement) {
      const currentIndex = currentElement.newIndex
      this.$refs[`parentMenu${currentIndex}`][0].$data.visible = false
      this.$refs[`parentMenu${currentIndex}`][0].$children[1].$data.showPopper = false
    },
    setCurrentTime () {
      const DATE = new Date()
      const hours = this.getDoubleNumber(DATE.getHours())
      const minutes = this.getDoubleNumber(DATE.getMinutes())
      this.currentTime = `${hours} : ${minutes}`
    },
    getDoubleNumber (value) {
      return value < 10 ? `0${value}` : value
    },
    handleSHowChild (currentIndex) {
      this.menuDataList.map((item, index) => {
        if (currentIndex !== index) {
          item.isShowChild = false
        }
      })
      this.menuDataList[currentIndex].isShowChild = !this.menuDataList[currentIndex].isShowChild
      const event = window.event
      event.stopPropagation()
    },
    handleChildClick () {
      const event = window.event
      event.stopPropagation()
    },
    bindDocumentClosePopup () {
      document.onclick = () => {
        this.menuDataList.map((item, index) => {
          item.isShowChild = false
        })
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.container {
  width: 1400px;
}
.menu-list {
  border: solid 1px #444;
  margin-top: -1px;
  background: #f00;
  color: #fff;
  line-height: 28px;
}
.sub-menu-list {
  padding-left: 15px;
  border: solid 1px #444;
  margin-left: -1px;
  margin-top: -1px;
}
.el-dropdown {
  border: solid 1px #333;
}

.parent-menu-item {
  background: #fff;
  margin-left: -1px;
  text-align: center;
  .el-button {
    width: 100px;
  }
}
/****************微信页面模拟***************/
.wechart-box {
  background: #ededed;
  width: 330px;
  height: 570px;
  margin: 0 auto;
  border-radius: 26px;
  border: solid 5px #2f3133;
  border-bottom-width: 7px;
  position: relative;
}
// 时间和电池
.wechart-header {
  color: #1b1b1b;
  .time {
    line-height: 20px;
    font-size: 12px;
  }
  .menu {
    line-height: 42px;
    font-weight: bold;
    text-align: center;
  }
}
.menu-box, .toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  /deep/ .el-icon-arrow-left:before {
    font-size: 16px;
    color: #1b1b1b;
  }
}
.menu-box {
  border-bottom: solid 1px #e1e1e1;
}
.toolbar {
  padding: 0 15px 0 10px;
  margin: 5px 0 0 0;
}
.custom-user-icon {
  width: 14px;
  cursor: pointer;
  .user-header {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #1b1b1b;
    margin: 0 auto;
  }
  .user-body {
    width: 14px;
    height: 7px;
    background: #1b1b1b;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 1px;
  }
}
// 电池
.battery-box {
  position: relative;
  width: 50px;
  font-size: 12px;
  .battery-content {
    width: 20px;
    padding: 1px;
    border: 1px #1b1b1b solid;
    border-radius: 3px;
    position: relative;
    .battery-subcontent {
      width: 80%;
      height: 8px;
      background: #1b1b1b;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &::after {
      display: block;
      content: '';
      width: 2px;
      height: 6px;
      background: #1b1b1b;
      position: absolute;
      top: 2px;
      right: -4px;
    }
  }
  .count {
    position: absolute;
    top: 0;
    right: -5px;
  }
}
// 滚动的内容
.wechart-body {
  height: 480px;
}
.content-item-box {
  margin: 0 20px;
  padding-bottom: 20px;
  .content-item {
    margin: 0 0 30px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
  .img {
    height: 80px;
    background: #e5e5e5;
  }
  .list-item {
    background: #fff;
    line-height: 40px;
    padding: 0 10px;
  }
  .item-title {
    border-bottom: solid 1px #F8F8F8;
  }
}
// 底部菜单
.wechart-footer {
  background: #f7f7f7;
  height: 40px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px #e1e1e1;
  .footer-left {
    width: 30px;
    .icon-box {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: solid 1px #2f3133;
      margin: 8px 0 0 8px;
      /deep/ .el-button {
        padding: 0;
        margin: 0 0 0 4px;
        display: block;
        height: 6px;
        &:first-child {
          margin-top: 2px;
        }
      }
      /deep/ .el-icon-more:before {
        color: #1b1b1b;
      }
    }
  }
  .footer-menu {
    width: 290px;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
    margin: 5px 0;
    .menu-item {
      width: 33.33%;
      height: 30px;
      text-align: center;
      border-right: solid 1px #f0efef;
      display: flex;
      justify-content: flex-start;
      padding-left: 10px;
      cursor: pointer;
      &:last-child {
        border: none;
      }
      .menu-title {
        width: 70px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      // 子菜单
      .sub-menu-box {
        position: absolute;
        background: #fff;
        min-width: 96px;
        bottom: 41px;
        margin-left: -10px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1);
        .sub-menu-item {
          padding: 0 13px 0 10px;
          line-height: 40px;
          text-align: left;
          border-bottom: solid 1px #F8F8F8;
          &:hover {
            background: #f2f1f1;
          }
        }
        .disableItem {
          text-align: center;
        }
      }
    }
    .menu-icon {
      margin: 9px 5px 0 0;
      span {
        display: block;
        width: 8px;
        height: 1px;
        background: #b1b1b1;
        margin-top: 2px;
      }
    }
    .menu-add-button, .submenu-add-button {
      margin: 0 auto;
      transform: translate(-5px, -3px);
      /deep/ .el-icon-plus::before {
        color: #1b1b1b;
      }
    }
    .submenu-add-button {
      transform: translate(0, 0);
    }
  }
}
</style>
