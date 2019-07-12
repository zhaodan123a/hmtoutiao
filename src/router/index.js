import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'

// 引入登录页面
import login from '../pages/login'

// 引入后台首页
import Home from '../pages/home'
import Welcome from '../pages/welcom'

// 引入404页面
import NotFound from '../pages/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'welcom',
      path: '/',
      component: Welcome
    }]
  },
  // 404页面（放到路由规则的最后），当出现没有匹配的路由时，将会跳转到404页面
  { name: 'NotFound', path: '*', component: NotFound }
  ]
})
export default router
