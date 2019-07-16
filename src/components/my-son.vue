<template>
<!-- 这里是子传父的例子 -->
<!-- 具体使用可在article中查看 -->
<!-- 可以去hmtoutiao仓库中article分支中查看 -->
    <div>
        <button @click="a()">点击子组件传值给父组件</button>
    </div>
</template>

<script>
export default {
  name: 'my-son',
  data () {
    return {
      message: '这是子组件数据aaa'
    }
  },
  methods: {
    a () {
      // xx是父组件中自定义事件名
      this.$emit('xx', this.message)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
