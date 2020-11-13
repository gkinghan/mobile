import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import LayoutIndex from '@/views/layout/index.vue'
import HomeIndex from '@/views/home'
import QuestionIndex from '@/views/question'
import VideoIndex from '@/views/video'
import UserIndex from '@/views/user'

import Search from '@/views/search/index.vue'
import SearchResult from '@/views/search/result.vue'
import Article from '@/views/article'

import UserProfile from '@/views/user/profile.vue'
import store from '@/store'
import UserChat from '@/views/user/chat.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: LayoutIndex,
    children: [
      { path: '/', component: HomeIndex },
      { path: '/question', component: QuestionIndex },
      { path: '/video', component: VideoIndex },
      { path: '/user', component: UserIndex }
    ]
  },
  { path: '/search', component: Search },
  { path: '/searchResult', component: SearchResult },
  { path: '/article/:id', component: Article },
  { path: '/userProfile', component: UserProfile },
  { path: '/userChat', component: UserChat }
]

const router = new VueRouter({
  routes
})

// 如用户中心，购物车 都需要授权
// 有些页面不需要授权即可访问（首页 登录页 文章列表页 搜索页 。。）
// 需要判断 token
const AuthUrls = ['/user', '/cart']

router.beforeEach((to, from, next) => {
  // 判断要去的页面 是否需要授权
  if (AuthUrls.includes(to.path)) {
    // 要授权的页面 判断是否有token
    const token = store.state.tokenInfo.token
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          a: 1,
          b: 2,
          backto: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

//
export default router
