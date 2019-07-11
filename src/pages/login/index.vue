<template>
  <!-- 全局容器 -->
  <div class="contenier">
    <!-- 卡片 -->
    <el-card class="kp-contenier">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <!-- status-icon表示错误时会有小图标显示 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" style="width: 70%;" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox name="type" v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>和
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-button type="primary" style="width:100%"  @click="login()">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 正则表达式，手机号第一位必为一，第二位是3-9之间的数字，其余九位是数字即可
      if (/^1[3-9]\d{9}$/.test(value)) {
        // 校验成功是callback（）
        callback()
      } else {
        // 校验失败返回信息
        callback(new Error('请输入正确的手机号！'))
      }
    }
    return {
      checked: true,
      loginForm: {
        mobile: '',
        code: ''
      },
      // 校验规则
      loginRules: {
        mobile: [
          // trigger:blur表示失去焦点时校验
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          // 自定义校验
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '必须是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 整体校验，value返回的是布尔值
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 校验成功
          // console.log('aaa')
          // 发送请求
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations',this.loginForm)
            .then((res)=>{
              // 请求成功
              this.$router.push('/')
            }).catch(()=>{
              // 错误提示
              this.$message.error('用户名或密码错误');
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.contenier {
  width: 100%;
  height: 100%;
  //   cover表示将图片等比例缩放到完全覆盖容器（图片可能会超出容器）
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
    .el-checkbox {
      margin-right: 10px;
    }
  }
}
</style>
