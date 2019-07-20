<template>
<!-- 测试非父子传值 -->
    <div>B----{{bdata}}</div>
</template>

<script>
// 将数据总线引入
import eventBus from './eventBus'
export default {
  name: 'comb',
  data () {
    return {
      bdata: ''
    }
  },
  created () {
    // 得到a中的数据
    eventBus.$on('athing', (name) => {
      this.bdata = name
    })
  }
}
</script>

<style lang="less" scoped>
</style>
