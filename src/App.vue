<template>
  <div id="app">
    <div>
      <MyHeader></MyHeader>
      <router-view></router-view>
      <MyFooter v-show="$route.meta.show"></MyFooter>
    </div>
  </div>
</template>

<script>
import MyHeader from "./components/Header/";
import MyFooter from "./components/Footer";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
  },
  methods: {
    //,"reqFloorList"
    ...mapActions('TypeNav',["categoryList"]),
    ...mapActions('home',["reqFloorList"]),
    ...mapActions('login',['automaticLogins'])
  },
  mounted() {
    this.categoryList()
    this.reqFloorList()
    if(localStorage.getItem('TOKEN')){
    this.automaticLogins()
    }
  },
};
</script>

<style>
</style>
