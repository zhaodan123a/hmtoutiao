<template>
  <el-container id="home-contenier">
    <!-- 侧边 -->
    <el-aside class="my-side" :width='isCollapse?"64px":"200px"'>
        <div class='msg' :class="{top:isCollapse}" ></div>
      <el-col >
           <!-- default-active表示默认选中哪一项 -->
           <!-- :collapse='isCollapse'表示折叠/展开，true默认折叠，false默认展开 -->
           <!-- :collapse-transition表示是否开启折叠动画，false表示不开启 -->
        <el-menu
          :default-active="$route.path"
          background-color="#002233"
          text-color="#fff"
          style="border-right:none"
          active-text-color="#ffd04b"
          :collapse='isCollapse'
          :collapse-transition='false'
          router
        >
          <el-menu-item index="/" >
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article" >
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image" >
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish" >
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment" >
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans" >
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting" >
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="home-header">
        <!-- 图标 -->
        <i class="el-icon-s-fold" @click="changeMenu"></i>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <div style="float:right">

          <el-dropdown>
            <span class="el-dropdown-link">
               <img :src="photo" alt />
              <b>{{ name }}</b>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- native表示触发原生事件，因为此处是组件标签不一定有@click这个用法 -->
              <el-dropdown-item @click.native="setting()"><i class="el-icon-setting"></i>个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="go()"> <i class='el-icon-unlock'></i> 退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main style="width=100%">
          <!-- 盛放二级路由，欢迎内容 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 解决非父子传值
import eventBus from '../../components/eventBus.js'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 获取sessionStorage中的信息，并赋值给data中的数据
    const user = window.sessionStorage.getItem('hm')
    this.name = JSON.parse(user).name
    this.photo = JSON.parse(user).photo
    // 将修改后的用户名同步至此
    eventBus.$on('updateHeaderName', (name) => {
      this.name = name
    })
    // 同步修改后的头像
    eventBus.$on('getHeaderimage', (image) => {
      this.photo = image
    })
  },
  methods: {
    changeMenu () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      // 跳到设置页面
      this.$router.push('/setting')
    },
    go () {
      // 删除保存的token
      window.sessionStorage.removeItem('hm')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
#home-contenier {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-side{
      background-color: #002233;
      .msg{
          height: 60px;
          // /后边是设置的背景图片的大小
          background: #002840 url('../../assets/images/logo_admin.png') no-repeat center /140px auto;
      }
      .top{
          background-image: url('../../assets/images/logo_admin_01.png');
          background-size: 36px auto ;
      }
  }
  .home-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
      margin-right: 16px;
    }
    .text {
      vertical-align: middle;
    }
    img {
      width: 28px;
      margin-right: 4px;
      vertical-align: middle;
    }
  }
}
</style>
