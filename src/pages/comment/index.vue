<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="commentData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="360px"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 事件需要传输id和状态，所以直接传scope.row即可 -->
            <el-button
              type="success"
              v-if="!scope.row.comment_status"
              size="mini"
              @click="triggle(scope.row)"
            >打开评论</el-button>
            <el-button type="danger" v-else size="mini" @click="triggle(scope.row)">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="requestData.page"
        :page-size="requestData.per_page"
        @current-change="changepage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格数据
      commentData: [],
      requestData: {
        // 表示是评论管理的请求参数
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    // 获取评论列表
    async getComment () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.requestData })
      console.log(data)
      // 返回的评论
      this.commentData = data.results
      this.total = data.total_count
    },
    // 分页器页码事件
    changepage (newpage) {
      this.requestData.page = newpage
      this.getComment()
    },
    // 操作关闭/打开评论事件
    triggle (data) {
      const use1 = '关闭评论后将不能再次评论，确定要关闭吗？'
      const use2 = '确定要打开评论吗?'
      this.$confirm(data.comment_status ? use1 : use2, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 传入id和状态
          await this.$http.put('comments/status?article_id=' + data.id, {
            allow_comment: !data.comment_status
          })
          this.$message.success('修改状态成功！')
          this.getComment()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
