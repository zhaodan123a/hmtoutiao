<template>
    <div class="contenier">
        <p>组件头部</p>
        <!-- 默认插槽，备用内容是指使用时标签内没有内容将会显示 -->
        <!-- <p> <slot>备用内容</slot> </p> -->

        <!-- 具名插槽 -->
        <!-- 解决多个插槽时的使用问题 -->
        <!-- <p> 111<slot name="cc">备用内容</slot> </p>
        <p > <slot name="dd">第二个插槽</slot> </p> -->

        <!-- 作用域插槽 -->
        <!-- 为了使得使用该插槽组件的组件能够使用插槽组件中的数据 -->
        <p> <slot name='cc' :abc='olddata'></slot> </p>
        <p> <slot name='dd' :xyz='twodata'></slot> </p>
        <p>组件底部</p>
    </div>
    <!-- 此处是在article中使用进行测试 -->
    <!-- 此文件是用来挖坑（插槽的）,插槽用法可以看github上hmtoutiao仓库中article分支中查看 -->
</template>

<script>
export default {
  data () {
    return {
      olddata: '123',
      twodata: '456'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
