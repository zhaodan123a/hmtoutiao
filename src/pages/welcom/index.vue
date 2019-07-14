<template>
    <div id="my-welcome">
        <div class="msg">
            <h3>欢迎来到黑马头条</h3>
            <img src="../../assets/images/welcome.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
  // 测试响应拦截器（api的index.js中），会拦截then，即：token失效时，将会跳到登录页
  // created () {
  //   this.$http.get('articles').then((res) => {
  //     console.log(res.data)
  //   })
  // }
}
</script>

<style lang="less" scoped>
.msg{
    text-align: center
}
</style>
