import MOCk from 'mockjs'
const baseUrl = '/getCityData'

MOCk.mock(baseUrl, 'get', () => {
  return {name: '111', age: '33'}
})

MOCk.setup({
  timeout: 400
})
