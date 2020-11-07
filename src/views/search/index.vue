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
        <div @click="clickSearch">搜索</div>
      </template>
    </van-search>

    <!-- 联想建议 -->
    <van-cell-group v-if="keyword.trim() !== ''">
      <!-- icon="search"添加了一个小图标 -->
      <van-cell @click="clickSuggestion(index)" v-for="(item,index) in showSuggestions" :key="index"  icon="search" >
        <div v-html="item"></div>
      </van-cell>

    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group v-else>
      <van-cell v-if="history.length > 0" title="历史记录">
      </van-cell>
      <van-cell v-for="(item,index) in history" :key="index" :title="item">
        <van-icon @click="delHistory(index)" name="close" />
      </van-cell>

    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { reqGetSuggestion } from '@/api/search.js'
import { getHistory, setHistory } from '@/utils/storage.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 搜索关键字
      suggestions: [], // 联想建议
      history: getHistory()
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
    },
    // 点击搜索  (搜索关键字)
    clickSearch () {
      // 添加历史记录
      this.addHistory(this.keyword)
    },
    // 点击推荐建议  (追加的是 suggestion中对应项)
    clickSuggestion (index) {
      // 添加历史记录
      this.addHistory(this.suggestions[index])
    },
    // 封装一个  添加历史的方法  unshift
    // 删除重复的
    addHistory (words) {
      console.log('添加历史', words)
      // 判断重复项
      const index = this.history.findIndex(item => item === words)
      if (index !== -1) {
        // 存在相同的
        // arr.splice(从哪开始，几个，替换项1....)
        this.history.splice(index, 1)
      }
      this.history.unshift(words)
      setHistory(this.history)
    },
    delHistory (index) {
      this.history.splice(index, 1)
      setHistory(this.history)
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
