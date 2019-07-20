<template>
<!-- 测试非父子传值 -->
    <div>
        <!-- a向b传值，使用在setting中使用 -->
        <button @click='dian()'>点击传值到b</button>
    </div>
</template>

<script>
// 引入数据总线
import eventBus from './eventBus'
export default {
  name: 'coma',
  data () {
    return {
      adata: '这是a数据'
    }
  },
  methods: {
    dian () {
      eventBus.$emit('athing', this.adata)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
