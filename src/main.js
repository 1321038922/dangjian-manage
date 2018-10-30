// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $axios from './utils'
import store from './store'
import ImgUpload from '@/components/ImgUpload';
import richSnippet from '@/components/richSnippet';
import Title from '@/components/Title';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = $axios 
Vue.component('ImgUpload',ImgUpload)
Vue.component('richSnippet',richSnippet)
Vue.component('Title',Title)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
