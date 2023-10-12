/*
 * @Author: liubing 943485115@qq.com
 * @Date: 2023-04-12 14:21:16
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-04-14 17:12:16
 * @FilePath: /topworking/src/components/pages/ctable/column.js
 * @Description: 表格配置列
 */
export const tableColumn = [
  {
    label: '商品名称1',
    prop: 'name',
    width: '200',
    showOverflowTooltip: true,
    fixed: true,
    sortable: true,
    cusromRender: (key, value, row) => {
      return value
    },
    // 自定义表格头
    renderHeader: (h, { column, $index }) => {
      return (
        h('span', [
          h('span', column.label + ' '),
          h('el-tooltip', {
            props: {
              effect: 'dark',
              content: '商品名称',
              placement: 'top'
            }
          }, [
            h('i', {
              class: 'el-icon-question'
            })
          ])
        ])
      )
    }
  },
  {
    label: '商品价格',
    prop: 'price',
    width: '120',
    // slot: 'price',
    cusromRender: (key, value, row) => {
      return `<div class='custom-price'>${value}</div>`
    }
  },
  {
    label: '优惠价',
    prop: 'discountPrice'
  }
]
