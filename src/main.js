import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'amfe-flexible'
// 按需导入 vant
import { Button, Switch, NavBar, Field, CellGroup, Toast, Tabbar, TabbarItem, Tab, Tabs, List, Cell, Grid, GridItem, Image } from 'vant'

import http from '@/utils/request.js'

Vue.use(Switch)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Field)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(Cell)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Image)
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
