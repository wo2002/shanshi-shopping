import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/style/common.less'
// import uView from './uview-ui'
// 将vant全部导入
// import Vant from 'vant'
// import 'vant/lib/index.css'

// Vue.use(Vant)
// 载入uView库
// Vue.use(uView)

new Vue({
  router,
  store,
  // uView,
  render: h => h(App)
}).$mount('#app')
