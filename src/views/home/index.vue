<template>
  <div class="home">
    <van-tabs>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>

    </van-tabs>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/channels.js'
export default {
  name: 'HomeIndex',
  data () {
    return {
      channels: [] // 当前用户的频道列表
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const result = await reqGetChannels()
      this.channels = result.data.data.channels
    }
  }
}
</script>

<style>

</style>
