<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>{{article_id?'修改文章':'发布文章'}}</my-bread>
      </div>
      <!-- 表单内容 -->
      <el-form :model="ImageData" label-width="80px" size="small">
        <el-form-item label="标题：">
          <el-input v-model="ImageData.title" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <quill-editor
            v-model="ImageData.content"
            ref="myQuillEditor"
            :options="Option"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="ImageData.cover.type" @change="changeImage">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 使用封面组件 -->
          <!-- 传数据到封面组件，将第一张图传入 -->
          <div v-if='ImageData.cover.type===1'>
            <my-publish v-model='ImageData.cover.images[0]'></my-publish>
          </div>
          <div v-if='ImageData.cover.type===3'>
            <my-publish v-model='ImageData.cover.images[0]'></my-publish>
            <my-publish v-model='ImageData.cover.images[1]'></my-publish>
            <my-publish v-model='ImageData.cover.images[2]'></my-publish>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channels v-model="ImageData.channel_id"></my-channels>
        </el-form-item>
        <!-- 当页面没有id时，说明是发布页面 -->
        <el-form-item v-if='!article_id'>
          <el-button type="primary" @click="complete(false)">发表</el-button>
          <el-button @click="complete(true)">保存到草稿</el-button>
        </el-form-item>
        <!-- 否则说明在修改页面 -->
         <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">修改到草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本组件和样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      ImageData: {
        title: '',
        // 内容
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 文章id，用于修改页面
      article_id: null,
      // 富文本配置
      Option: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }]

          ]
        }

      }
    }
  },
  created () {
    // 获取修改页面id
    this.article_id = this.$route.query.id
    // 调用显示数据函数(id存在时将渲染修改页面)
    this.article_id && this.getArticle(this.article_id)
  },
  // 侦听器，当数据改变时触发
  // 解决当前已经在修改页面，再次点击发布文章菜单，只有路由变化而组件不变化的问题
  // 即：解决页面修改不变成发布的内容
  watch: {
    $route () {
      // 获取页面id
      this.article_id = this.$route.query.id
      // 当页面id改变时，说明点击了发布文章菜单，将请求数据初始化
      this.ImageData = {
        title: '',
        // 内容
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 切换图片时触发的事件
    changeImage () {
      // 重置图片数组,防止在进行单图和三图切换时互相影响
      this.ImageData.cover.images = []
    },
    // 发表
    async complete (draft) {
      const res = await this.$http.post('articles?draft=' + draft, this.ImageData)
      console.log(res)
      this.$message.success(draft ? '存入草稿成功！' : '发表成功！')
      this.$router.push('/article')
    },
    // 修改页面显示对应id的数据
    async getArticle (id) {
      const { data: { data } } = await this.$http.get('articles/' + id)
      // console.log(data)
      this.ImageData = data
    },
    // 修改发表
    async edit (draft) {
      await this.$http.put(`articles/${this.article_id}?draft=` + draft, this.ImageData)
      // console.log(res)
      this.$message.success(draft ? '修改存入草稿成功！' : '修改成功！')
      // 跳转到内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
