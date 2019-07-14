<template>
  <div id="contenier">
    <!-- 第一个卡片 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
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
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" size="small">
          <div class="block">
            <el-date-picker
              v-model="Stime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        // null表示不给后台发数据，''表示给后台发一个空字符
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOption: [{ name: '频道一', id: 1 }],
      Stime: []
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
