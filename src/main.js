import Vue from 'vue'
import App from './App.vue'
import vueRouter from './router'
import ElementUI from 'element-ui';
import '@/assets/themecss/index.css';
import i18n from './i18n'
import {vuexStore} from '@/vuex/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  // 2.引入实例
  i18n,
  // 引入vuex
  store: vuexStore,
  router: vueRouter,
  render: h => h(App)
}).$mount('#app')
