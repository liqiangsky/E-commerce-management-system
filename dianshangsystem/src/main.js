import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css';
//全局样式
import './assets/css/gloabl.css'
//富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$http = axios;
Vue.use(VueQuillEditor)
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
//全局过滤器，格式化时间
Vue.filter('FormatDate', originval => {
  const time = new Date(originval * 1000);
  const year = time.getFullYear();
  const month = (time.getMonth() + 1 + '').padStart(2, '0');
  const day = (time.getDate() + '').padStart(2, '0');
  const hour = (time.getHours() + '').padStart(2, '0');
  const minute = (time.getMinutes() + '').padStart(2, '0');
  const second = (time.getSeconds() + '').padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
