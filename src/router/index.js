import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'

// 引入登录页面
import login from '../pages/login'

// 引入后台首页
import Home from '../pages/home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: login },
    { name: 'home', path: '/', component: Home }
  ]
})
export default router
