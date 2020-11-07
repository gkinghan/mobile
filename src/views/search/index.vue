<template>
  <div class="search">
    <!-- 搜索组件一级路由   $router.back()返回上一个页面-->
    <van-nav-bar
      left-arrow
      title="搜索中心"
      @click-left="$router.back()">
    </van-nav-bar>

    <van-search
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      @input="getSuggestion"
      v-model.trim="keyword"
    >
      <template #action>
        <div>搜索</div>
      </template>
    </van-search>

    <!-- 联想建议 -->
    <van-cell-group>
      <!-- icon="search"添加了一个小图标 -->
      <van-cell v-for="(item,index) in showSuggestions" :key="index"  icon="search" >
        <div v-html="item"></div>
      </van-cell>

    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { reqGetSuggestion } from '@/api/search.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 搜索关键字
      suggestions: [] // 联想建议
    }
  },
  methods: {
    async getSuggestion () {
      if (this.keyword.trim() === '') {
        this.suggestions = []
        return
      }
      // console.log('获取建议')
      const res = await reqGetSuggestion(this.keyword)
      console.log(res)
      this.suggestions = res.data.data.options
    }

  },
  // 1 提供一个专门用于展示的计算属性
  computed: {
    // 基于返回的suggestion, 动态计算出用于渲染的高亮的showSuggestion
    showSuggestions () {
      const regExp = new RegExp(this.keyword, 'gi')
      const arr = this.suggestions.map(item => {
        const newStr = item.replace(regExp, (match) => {
          return `<span style="color: red;">${match}</span>`
        })
        return newStr
      })
      return arr
    }
  }
  // 2 利用v-html进行渲染
}
</script>

<style lang="scss" scoped>

</style>
