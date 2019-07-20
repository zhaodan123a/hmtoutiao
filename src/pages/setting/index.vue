<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 分栏布局 -->
      <el-row :gutter="20">
        <!-- 左侧 -->
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!-- 表单 -->
            <el-form :model="settingData" label-width="100px">
              <el-form-item label="编号：">{{settingData.id}}</el-form-item>
              <el-form-item label="手机：">{{settingData.mobile}}</el-form-item>
              <el-form-item label="邮箱：">
                <el-input v-model="settingData.email"></el-input>
              </el-form-item>
              <el-form-item label="媒体名称：">
                <el-input v-model="settingData.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍：">
                <el-input v-model="settingData.intro" type="textarea" :row="3"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="tenc()">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <!-- 右侧 -->
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :http-request='newrequest'
            >
              <img v-if="settingData.photo" :src="settingData.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center">编辑头像</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 引入eventBus解决顶部信息同步修改问题
import eventBus from '../../components/eventBus'
export default {
  data () {
    return {
      settingData: {
        id: null,
        mobile: null,
        name: null,
        intro: null,
        email: null,
        photo: null
      }
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    // 获取用户信息、头像
    async getuser () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      console.log(data)
      this.settingData = data
      // 头像
      this.settingData.photo = data.photo
    },
    // 修改用户信息
    async tenc () {
      const res = await this.$http.patch('user/profile', {
        name: this.settingData.name,
        intro: this.settingData.intro,
        email: this.settingData.email
      })
      console.log(res)
      this.$message.success('修改信息成功')
      // 将顶部的个人信息也修改
      eventBus.$emit('updateHeaderName', res.data.data.name)
      // 结局页面刷新后顶部个人信息仍是原来的名字的问题（将sessionStorage中保存的信息进行修改再保存）
      // 获取sessionStorage
      const news = JSON.parse(window.sessionStorage.getItem('hm'))
      //   console.log(news)
      // 设置里面的用户信息
      news.name = res.data.data.name
      // 保存sessionStorage
      window.sessionStorage.setItem('hm', JSON.stringify(news))
    },
    // 编辑头像,因为后台需要使用patch方式接收，而上传组件默认使用post发送，
    // 所以需要自己手动请求（覆盖默认的请求）
    newrequest (res) {
      console.log(res)
      // 因为不能直接接收图片的地址，所以使用formData来接收
      const formData = new FormData()
      // res.file表示的是选中的图片
      formData.append('photo', res.file)
      this.$http.patch('user/photo', formData).then((a) => {
        // 将图片地址返回
        // console.log(a)
        this.settingData.photo = a.data.data.photo
        // 将图片反映到顶部头像位置(非父子之间传值)
        eventBus.$emit('getHeaderimage', a.data.data.photo)

        // 解决刷新后顶部头像依旧是之前没有改变的头像问题（获取token，修改token中头像信息，保存token）
        const image = JSON.parse(window.sessionStorage.getItem('hm'))
        // console.log(image)
        image.photo = a.data.data.photo
        window.sessionStorage.setItem('hm', JSON.stringify(image))
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
