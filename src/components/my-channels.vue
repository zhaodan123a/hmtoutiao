<template>
  <!-- 频道组件封装 -->

    <el-select placeholder="所有频道" :value='value' @change="changechannel">
      <!-- 循环数组，得到动态数据 -->
      <el-option v-for="item in channelOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
</template>

<script>
export default {
  name: 'my-channels',
  // 可以接收父组件传回的数据，根据父组件传入的id进行频道的选择
  props: ['value'],
  data () {
    return {
      channelOption: []
    }
  },
  created () {
    this.getChannel()
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
    // 改变时子向父传值，change事件中会自己带一个改变后的数据，将其传到父组件中
    changechannel (val) {
      // 子传父（父组件根据子组件传回的数据进行文章列表的改变）
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
