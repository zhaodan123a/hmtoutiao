import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入路由
// @表示从src触发之前的路径，不用写index.js，因为默认索引，即：会自动执行index.js
import router from '@/router'
// 注册全局
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
