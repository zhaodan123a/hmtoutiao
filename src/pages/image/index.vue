<template>
<!-- loading表示加载效果 -->
  <div id="contennier"  v-loading="loading">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group v-model="imageData.collect" size="small" @change="changebtn()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绑定对话框事件 -->
        <el-button
          type="success"
          @click="dialogFormVisible = true"
          size="small"
          style="float:right"
        >添加素材</el-button>
      </div>
      <ul class="fot">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- 当点击收藏时，将下方的小框隐藏 -->
          <div class="btn" v-if="!imageData.collect">
            <!-- 此处的item保存的是id和是否是收藏 -->
            <span class="el-icon-star-off" @click="shou(item)" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete" @click="del(item.id)"></span>
          </div>
        </li>
      </ul>
      <!-- v-if表示当总条数大于每页显示条数时，分页器再显示 -->
      <el-pagination
        v-if="total>imageData.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="imageData.page"
        :page-size="imageData.per_page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogFormVisible" width="300px">
      <!-- 一个上传组件 -->
      <!-- on-success表示上传成功要做什么
      action表示图片上传的地址
      headers表示：因为请求是el-upload发起的，不是axios（已经配置了token），
      所以需要在请求头中携带token
      name表示图片的名字，必须和后端要求的名字一致-->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="dosuccess"
        :headers="headers"
        name="image"
      >
        <!-- imageUrl是显示图片的地址 -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageData: {
        page: 1,
        per_page: 10,
        // 收藏与否
        collect: false
      },
      // 图片
      images: [],
      // 总条数
      total: 0,
      // 对话框所需数据
      dialogFormVisible: false,
      // 上传图片
      imageUrl: null,
      // token
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm')).token
      },
      // 加载状态
      loading: false
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    // 获取素材
    async getImage () {
      // 加载状态开启
      this.loading = true
      // 解构赋值
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.imageData })
      console.log(data)
      // 获取素材数组
      this.images = data.results
      // 获取总条数
      this.total = data.total_count
      // 完成加载状态
      this.loading = false
    },
    // 点击收藏按钮
    changebtn () {
      // 修改默认页码
      this.imageData.page = 1
      this.getImage()
    },
    // 点击页码切换
    pager (newPage) {
      this.imageData.page = newPage
      this.getImage()
    },
    // 图片上传成功的事件
    dosuccess (res) {
      // 查看上传成功后返回的数据，并去除地址
      //   console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('上传成功！')
      // 定时器，1.5s后将对话框关闭
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogFormVisible = false
        // 更新列表
        this.getImage()
        // 清空图片地址
        this.imageUrl = null
      }, 1500)
    },
    // 收藏，取消收藏
    async shou (item) {
      // 传入id和是否是收藏
      const { data: { data } } = await this.$http.put('user/images/' + item.id, { collect: !item.is_collected })
      console.log(data)
      this.$message.success('操作成功！')
      item.is_collected = data.collect
    },
    // 删除
    del (id) {
      // 弹窗
      this.$confirm('确定要删除该素材吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.$message.success('删除成功！')
        this.getImage()
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.fot {
  list-style: none;
  margin: 0;
  padding: 0;
  //清浮动
  overflow: hidden;
  li {
    width: 180px;
    height: 180px;
    border: 1px dashed #ccc;
    margin-bottom: 20px;
    margin-right: 20px;
    float: left;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .btn {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      left: 0;
      bottom: 0;
      text-align: center;
      position: absolute;
      span {
        margin: 0 20px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
