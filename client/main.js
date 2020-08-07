import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters/index'
import config from '@/config'

import Element from 'element-ui'
import '@/common/styles/element-variables.scss'
import '@/common/styles/index.scss' // 自定义 css
import httpServer from '@client/service/httpServer'

Vue.use(Element);

Vue.config.productionTip = false

Vue.prototype.$axios = httpServer;

Vue.prototype.$config = config
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
