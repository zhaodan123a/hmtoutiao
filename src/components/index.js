import MyBread from './my-bread.vue'
// 这是测试子传父的
// import MySon from './my-son.vue'

// 频道组件
import MyChannels from './my-channels.vue'
// 封面组件
import MyPublish from './my-publish.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    // Vue.component(MySon.name, MySon)
    Vue.component(MyChannels.name, MyChannels)
    Vue.component(MyPublish.name, MyPublish)
  }
}
