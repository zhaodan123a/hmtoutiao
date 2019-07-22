import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'

// 引入登录页面
import login from '../pages/login'

// 引入后台首页,欢迎页，内容管理，文章管理，素材管理,发布文章,评论管理,个人设置，粉丝管理
import Home from '../pages/home'
import Welcome from '../pages/welcom'
import Article from '../pages/article'
import Image from '../pages/image'
import Publish from '../pages/publish'
import Comment from '../pages/comment'
import Setting from '../pages/setting'
import Fans from '../pages/fans'

// 引入测试非父子传值
// import Comab from '../components/comab.vue'

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

    path: '/',
    component: Home,
    children: [{
      name: 'welcom',
      path: '/',
      component: Welcome
    },
    { name: 'article', path: '/article', component: Article },
    { name: 'image', path: '/image', component: Image },
    { name: 'publish', path: '/publish', component: Publish },
    { name: 'comment', path: '/comment', component: Comment },
    { name: 'setting', path: '/setting', component: Setting },
    { name: 'fans', path: '/fans', component: Fans }
    ]
  },
  // 测试非父子之间传值
  // { name: 'ab', path: '/ab', component: Comab },

  // 404页面（放到路由规则的最后），当出现没有匹配的路由时，将会跳转到404页面
  { name: 'NotFound', path: '*', component: NotFound }
  ]
})
// 登录拦截,没有登录将会强制跳转到登录页
// 使用vue-router中的导航守卫（前置）
router.beforeEach((to, from, next) => {
  // to表示即将进入那个路由，from表示从哪个路由离开的，next表示执行的操作
  // 简写：
  // 获取token
  const user = window.sessionStorage.getItem('hm')
  // 如果不在登录页且没有token，说明没有登录，强制跳到登录页
  if (to.path !== '/login' && !user) { return next('/login') }
  next() // 相当于中间件，如果没有将会停在这里出不去

  // 复杂写法：
  // 如果在登录页，直接进行下一步操作，放行不拦截
  // if (to.path === '/login') {
  //   return next()
  // }
  // const user = window.sessionStorage.getItem('hm')
  // // 如果有token说明已经登录，不拦截。否则强制跳到登录页
  // if (user) {
  //   next()
  // } else {
  //   next('/login')
  // }
})

export default router
