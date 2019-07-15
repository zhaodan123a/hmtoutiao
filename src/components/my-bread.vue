<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item> <slot></slot> </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'my-bread' // 在全局引入时会用到,是标签名的格式，需要使用-连接
}
</script>

<style lang="less" scoped>
</style>
