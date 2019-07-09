import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'

// 引入登录页面
import login from '../pages/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login }
  ]
})
export default router
