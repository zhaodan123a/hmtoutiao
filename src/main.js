import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入路由
// @表示从src触发之前的路径，不用写index.js，因为默认索引，即：会自动执行index.js
import router from '@/router'

// 为了使得main.js只做引入资源用，将axios放到api的index.js中
// // 注册全局axios
// import axios from 'axios'
// // 全局配置路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// // 配置请求头
// axios.defaults.headers = {
//   // JSON.parse()是将json字符串转成js对象
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm')).token
// }

// 引入封装好的axios
import axios from '@/api/axios.js'
// 全局引入插槽
import components from '@/components'

Vue.use(components)

Vue.prototype.$http = axios
// 注册全局
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
