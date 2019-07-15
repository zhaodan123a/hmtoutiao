<template>
  <div id="contenier">
    <!-- 第一个卡片 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 内容 -->
      <el-form :model="articleForm">
        <el-form-item label="状态">
          <el-radio-group v-model="articleForm.status">
            <el-radio :label="null">全选</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核成功</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" size="small">
          <el-select placeholder="所有频道" v-model="articleForm.channel_id">
            <!-- 循环数组，得到动态数据 -->
            <el-option
              v-for="item in channelOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" size="small">
          <!-- 日期选择器 -->
          <div class="block">
            <!-- 绑定change事件，选定时间后触发 -->
            <!-- value-format表示将日期换成指定格式，满足后台要求 -->
            <el-date-picker
              v-model="Stime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" @click="selectArticle()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
      </div>
      <!-- 内容 -->
      <el-table :data="tableData">
        <!-- prop用来板顶对象中的key，如果有别的内容必须使用插槽完成 -->
        <!-- 因为图片放在cover中，cover是一个对象，所以不能使用prop -->
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width: 80px; height: 80px">
              <!-- 处理有些图片加载失败的问题 -->
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt style="width: 100px; height: 100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <!-- row代表行，一行中根据返回的状态码进行判断显示那个 -->
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- 不是key值，使用作用域插槽 -->
          <template slot-scope="scope">
            <!-- plain表示朴素按钮，将背景颜色变淡 -->
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- current-page表示当前所在页数 -->
      <!-- page-size表示每页显示多少条数据 -->
      <!-- total表示总条数 -->
      <!-- current-change表示点击页码触发事件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :total="total"
        :page-size="articleForm.per_pag"
        :current-page="articleForm.page"
      ></el-pagination>

      <!-- 此处使用插槽进行测试插槽 -->
      <!-- 默认插槽，新内容将会覆盖备用内容 -->
      <!-- <chacao >新内容</chacao> -->

      <!-- 具名插槽 -->
      <!-- 只会插到名字叫cc的插槽内,如果插槽想使用dd，可以再写一个template标签 -->
      <!-- <chacao > <template slot="cc">新内容</template>  </chacao> -->

      <!-- 作用域插槽 -->
      <!-- 使用chacao组件中的数据 -->
      <!-- scope后面的数据是插槽组件中的自定义属性名 -->
      <!-- <chacao> <template slot="cc" slot-scope='scope'> {{ scope.abc }} </template> </chacao> -->
      <!-- 上面的是vue2.6.0之前的写法，之后推出了新的写法：使用v-slot；cc='abc'代替slot和slot-scope -->
      <!-- <chacao> <template v-slot:cc="scope"> {{scope.abc}} </template>
      </chacao>-->
    </el-card>
  </div>
</template>

<script>
// 引入插槽的组件
// import chacao from '../../components/chacao.vue'
// 引入面包屑插槽(因为局部引入不方便，所以将插槽作为插件在component index.js中全局引入)
// import MyBread from '../../components/my-bread.vue'
export default {
  //   局部注册
  //   components: {
  //     // chacao
  //     MyBread
  //   },
  data () {
    return {
      articleForm: {
        // 默认显示第几页
        page: 1,
        // 一页显示几条数据
        per_pag: 10,
        // null表示不给后台发数据，''表示给后台发一个空字符
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOption: [],
      Stime: [],
      // 表格数据
      tableData: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取频道
    this.getChannel()
    // 获取文章列表
    this.getArticles()
  },
  methods: {
    // 获取频道
    async getChannel () {
      // 解构赋值，因为数据放在res.data.data中所以使用结构赋值
      const {
        data: { data }
      } = await this.$http.get('channels')
      // console.log(res)
      // 将数据放入数组中
      this.channelOption = data.channels
    },
    // 文章表格渲染
    async getArticles () {
      // 解构赋值，得到数据
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.articleForm })
      console.log(data)
      // 将结果赋值
      this.tableData = data.results
      // 将总条数赋值
      this.total = data.total_count
    },
    // 时间触发,values是选定的时间数组
    changeDate (values) {
      this.begin_pubdate = values[0]
      this.end_pubdate = values[1]
      // 因为得到的时间格式与文档中要求的格式不符，所以在标签中修改格式
      console.log(values)
    },
    // 筛选
    selectArticle () {
      // 重新获取文章列表
      this.getArticles()
      // 将分页器定位到第一页
      this.articleForm.page = 1
    },
    // 点击页码渲染文章列表,该函数会自动返回新的页码
    changePage (newPage) {
      // 将dang页码赋值给默认页码
      this.articleForm.page = newPage
      // 重新渲染文章列表
      this.getArticles()
    },
    // 编辑
    edit (id) {
      // 跳转到有参数的路由的两种方法
      // 第一种
      this.$router.push('/publish/?id=' + id)
      // 第二种方法（因为使用？传的，所以使用query接收）
      // this.$router.push({ path: 'publish', query: { id } })
    },
    // 删除
    del (id) {
      // 弹窗
      this.$confirm('您确定要删除该文件吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确认要做的操作
          // 发送删除请求
          await this.$http.delete(`articles/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          // 点击取消
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.el-table {
  margin-bottom: 20px;
}
.el-pagination {
  text-align: center;
}
</style>
