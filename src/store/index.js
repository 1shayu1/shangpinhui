import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import TypeNav from './TypeNav'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import login from './login'
import trade from './trade'
export default new Vuex.Store({
   modules:{
      TypeNav,
      home,
      search,
      detail,
      shopcart,
      login,
      trade
   }
})