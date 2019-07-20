<template>
  <div class="image-conteniner">
    <div class="msg" @click="changepublish()">
        <!-- 将默认图片换成动态数据 -->
        <!-- 父组件传入图片就使用父组件传入的，如果没有则显示默认图片 -->
      <img :src="value || defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- tab切换 -->
      <el-tabs type="card" v-model="activeimage">
        <el-tab-pane label="素材库" name="image">
          <!-- 素材库内容 -->
          <!-- 单选框 -->
          <div>
            <el-radio-group
              v-model="publishData.collect"
              @change="changeshou"
              style="margin-bottom:10px"
            >
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片内容 -->
          <div v-loading="loading">
            <!-- 将图片地址传入事件，然后将图片地址与数组中地址比较，就可以得出到底选中了那张图片 -->
            <div
              class="all"
              v-for="item in images"
              :key="item.id"
              :class="{select:imageSelectUrl===item.url}"
              @click="selected(item.url)"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页器 -->
          <el-pagination
            v-if="total>this.publishData.per_page"
            background
            layout="prev, pager, next"
            :current-page="publishData.page"
            :total="total"
            :page-size="publishData.per_page"
            @current-change="changepage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片内容 -->
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success='onSuccess'
            :headers="headers"
            name="image"
          >
            <!-- imageUrl是显示图片的地址 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="completes()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入默认图片
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-publish',
  // 接收父组件传入的地址
  props: ['value'],
  data () {
    return {
      // 因为webpack打包时不识别本地的资源地址，所以需要将默认图片导入
    //   value: defaultImage,
    // 声明默认图片
      defaultImage,
      dialogVisible: false,
      // 确认选中素材库还是上传图片
      activeimage: 'image',
      // 请求参数
      publishData: {
        // 是否收藏
        collect: false,
        page: 1,
        per_page: 8
      },
      // 总条数
      total: 0,
      // 图片数组
      images: [],
      // 上传图片的地址
      imageUrl: null,
      // 选中图片的地址（因为上传需要地址）
      imageSelectUrl: null,
      // token
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm')).token
      },
      loading: false
    }
  },
  methods: {
    // 点击出现对话框事件
    changepublish () {
      this.dialogVisible = true
      this.getpublish()
    },
    // 渲染素材列表
    async getpublish () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.publishData })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },
    // 分页器页码改变事件
    changepage (newPage) {
      this.publishData.page = newPage
      this.getpublish()
    },
    // 切换收藏
    changeshou () {
      this.publishData.page = 1
      this.getpublish()
    },
    // 图片选中事件
    selected (url) {
      this.imageSelectUrl = url
    },
    // 上传成功后的事件
    onSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
    },
    // 确定事件，有两种情况：根据tab的选择来确定是上传的还是在素材库中选择的
    completes () {
      if (this.activeimage === 'image') {
        // 在素材库中选择的
        if (!this.imageSelectUrl) return this.$message.info('请选择图片！')
        // this.value = this.imageSelectUrl
        // 需要在此处通知父组件要改变数据了
        this.$emit('input', this.imageSelectUrl)
      } else {
        // 上传的
        if (!this.imageUrl) return this.$message.info('请上传图片！')
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
//为了使以后调用此（多个）组件时在一行，将其转成行内块
.image-conteniner{
    display: inline-block;
    margin-right: 10px;
}
.msg {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.all {
  width: 150px;
  height: 120px;
  display: inline-block;
  border: 1px dashed #ddd;
  margin-right: 10px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    display: block;
    //图片等比例放入容器
    object-fit: contain;
  }
  &.select {
    //交集选择器
    &::before {
      //前伪元素
      content: ""; //容器和父元素大小一致
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba(0, 0, 0, 0.2) url("../assets/images/selected.png")
        no-repeat center / 60px;
    }
  }
}
</style>
