// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueX from 'vuex'
import store from 'store'
import Qs from 'qs'
import * as echarts from 'echarts';

import VueParticles from 'vue-particles'
// import listermusic from './components/listermusic'
Vue.use(VueParticles)
// 简单配置axios
// import server from '@/api'
// Vue.prototype.$http = server
import SIdentify from './components/identify' //注意引入路径
Vue.use(SIdentify)

Vue.prototype.$echarts = echarts
Vue.use(vueX)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.Qs=Qs



Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
