import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store/index'
import Pagination from './components/Pagination'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name,Pagination)
import '@/mock/index'
Vue.config.productionTip = false
import 'swiper/css/swiper.css'
new Vue({
  render: h => h(App),
  store,
  router: router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')