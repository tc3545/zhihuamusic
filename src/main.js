import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import router from './router/index'
import store from './store/store'

import './common/stylus/index.styl'
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueLazyload,{
  loading:require('./common/image/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
