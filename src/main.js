import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'amfe-flexible'
// 按需导入 vant
import { Button, Switch, NavBar, Field, CellGroup, Toast } from 'vant'

import http from '@/utils/request.js'

Vue.use(Switch)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Field)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
