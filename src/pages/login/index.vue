<template>
  <!-- 全局容器 -->
  <div class="contenier">
    <!-- 卡片 -->
    <el-card class="kp-contenier">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入手机号" style="width: 70%;"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox  name="type" v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>和
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-button type="primary" @click="onSubmit" style="width:100%">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style lang="less" scoped>
.contenier {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
  .kp-contenier {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 30px;
    }
    .el-checkbox{
        margin-right: 10px;
    }
  }
}
</style>
