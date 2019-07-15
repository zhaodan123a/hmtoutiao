// 由于axios的操作过多，不便放在main.js中，所以在此处封装
// 注册全局axios
import axios from 'axios'

// 引入json-bigint包，处理axios自带JSON.parse转换（可能超出自达安全数）不精确问题
import JsonBigint from 'json-bigint'

// 新建一个axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // 请求头是在页面初始化时获取token，此时可能没有token导致无法显示页面
  // 所以需要在请求后台数据时再去获取token，所以选择在发送axios之前获取
  // 因此在下面使用请求拦截器
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm')).token
  //   }

  // 自己转换json字符串
  transformRequest: [function (data, headers) {
    // 可能会出现没有数据的情况，有数据再转换（例：可能此时没有传入id那么就不需要转换）
    // 可能因为接口问题导致没有数据，没有数据就跳过这个处理
    if (data) {
      return JsonBigint.parse(data)
    }
    return data
  }]
})

// 请求拦截器,在axios实例上
instance.interceptors.request.use((config) => {
  // 在发送请求做什么
  // 修改请求对象config
  // 获取token
  const user = window.sessionStorage.getItem('hm')
  // token存在则设置请求头
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, (error) => {
  // 出现错误做什么
  return Promise.reject(error)
})

// 因为token有时效，超过两个小时token会失效，此时会报401（未认证）错误
// 此时需要拦截到登录页重新登录

// 设置响应拦截器
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  // 出错后该做的事情
  //   error.response.status是获取状态码
  // 严谨处理 有error.response再进行拦截（可能有些接口不返回状态码）
  if (error.response && error.response.status === 401) {
    // 状态码是401，拦截到登录页
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
// 导出axios实例
export default instance
