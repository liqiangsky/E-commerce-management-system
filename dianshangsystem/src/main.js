import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//全局样式
import './assets/css/gloabl.css'

Vue.prototype.$http = axios;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;
//全局api基准路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/';
//响应拦截
axios.interceptors.response.use((response) => {
  return response.data;
}, (reject) => {
  console.log(reject)
})
//请求拦截
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.token;
  return config;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
