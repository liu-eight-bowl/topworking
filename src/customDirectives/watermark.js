/*
 * @Author: liubing 943485115@qq.com
 * @Date: 2023-04-18 14:10:25
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-04-20 10:09:32
 * @FilePath: /topworking/src/custom/index.js
 * @Description:  自定义指令
 */
import dayjs from 'dayjs'
export default {
  install (Vue, Opt) {
    Vue.directive('watermark', (el, binding) => {
      let timer = null
      const addWaterMarker = ({text, time, width, height, rotate, positionX, positionY, opacity, isInterval}, el) => {
        const canvas = document.createElement('canvas')
        canvas.width = width || 400
        canvas.height = height || 200

        const canvasCon = canvas.getContext('2d')
        canvasCon.rotate(rotate || (-26 * Math.PI) / 180) // 旋转弧度
        canvasCon.font = '14px Microsoft JhengHei' // 字体
        canvasCon.fillStyle = `rgba(220, 220, 220, ${opacity || 0.45})` // 字体填充颜色
        canvasCon.textAlign = 'center' // 对齐方式
        canvasCon.textBaseline = 'Middle' // 基线
        canvasCon.fillText(text, positionX || canvas.width / 3, positionY || 180) // 被填充的文本

        const currentTime = isInterval ? Date.now() : time
        if (currentTime) canvasCon.fillText(dayjs(currentTime).format('YYYY-MM-DD HH:mm:ss'), positionX || canvas.width / 3, (positionY + 20) || 200)

        // 被填充的文本
        const watermarkCss =
          ` pointer-events: none;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 9;
            background: url(${canvas.toDataURL('image/png')});
          `

        const watermarkEle = document.createElement('div')
        watermarkEle.setAttribute('id', 'watermark')
        watermarkEle.style.cssText = watermarkCss
        el.style.position = 'relative'

        if (el.querySelector('#watermark')) {
          el.querySelector('#watermark').remove()
        }
        el.append(watermarkEle)
        if (!isInterval) {
          clearInterval(timer)
        }
      }

      const { text, time, width, height, rotate, positionX, positionY, opacity, isInterval } = binding.value
      const isHasWatermark = !!el.querySelector('#watermark')
      if (!isHasWatermark) {
        addWaterMarker({text, time, width, height, rotate, positionX, positionY, opacity, isInterval}, el)
        if (!isInterval) return
        timer = setInterval(() => {
          addWaterMarker({text, time, width, height, rotate, positionX, positionY, opacity, isInterval}, el)
        }, 1000)
      }
    })
  }
}
