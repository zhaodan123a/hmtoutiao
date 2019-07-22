<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tab切换 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="fanslist">
          <!-- 列表 -->
          <div class="tu" v-for="item in fans" :key="item.name">
            <img :src="item.photo" alt />
            <p>{{item.name}}</p>
            <el-button type="primary" plain size="small">关注</el-button>
          </div>
          <!-- 分页器 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="reqData.page"
            :page-size='reqData.per_page'
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansimage">
          <!-- 柱状图 -->
          <div ref="zhu" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 引入echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'fanslist',
      // 请求参数
      reqData: {
        page: 1,
        per_page: 12
      },
      // 粉丝列表
      fans: [],
      total: 0
    }
  },
  created () {
    this.getfans()
  },
  mounted () {
    // 因为在mounted时，页面才会解析完DOM对象
    //   柱状图初始化
    const myecharts = echarts.init(this.$refs.zhu)
    // 配置
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 使用实例
    myecharts.setOption(option)
  },
  methods: {
    // 获取粉丝列表
    async getfans () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqData })
      console.log(data)
      this.fans = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.tu {
  float: left;
  border: 1px dashed #ccc;
  width: 146px;
  height: 180px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding-top: 20px;
  text-align: center;
  img {
    display: inline-block;
    width: 70px;
    height: 70px;
    border-radius: 100%;
  }
}
</style>
