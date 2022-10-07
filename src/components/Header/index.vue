<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span v-if="!login">请</span>
            <router-link to="/login" v-show="!login">登录</router-link>
            <router-link to="/register" v-show="!login" class="register"
              >免费注册</router-link
            >
            <a href="###" v-show="login">{{ login }}</a>
            <a href="###" v-show="login" class="register" @click.prevent="quit">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- a class="logo" title="尚品汇" href="###" target="_blank">
                        <img src="./img/logo.png" alt="">
                    </a> -->
        <router-link to="Home" class="logo">
          <img src="./img/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="jump"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapActions, mapState } from "vuex";
export default {
  name: "MyHeader",
  data() {
    return {
      keyword: "",
      login: sessionStorage.getItem("userId"),
    };
  },
  methods: {
    ...mapActions('login',['quitLogins']),
    jump() {
      //点击搜索给路由添加params参数跳转到search组件发送请求
      this.$router.push({
        name: "search",
        query: this.$route.query,
        params: { keyword: this.keyword },
      });
    },  
    quit(){
    this.quitLogins()
    }
  },
  computed: {
    ...mapState("login", ["id"]),
  },
  mounted() {
    this.$bus.$on("move", () => {
      this.keyword = "";
    });
  },
  watch: {
    id: {
      handler(newValue) {
        this.login = sessionStorage.getItem("userId");
      },
    },
  },
};
</script>

<style scoped>
.header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .top .container .loginList {
  float: left;
}
.header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.header > .top .container .typeList {
  float: right;
}
.header > .top .container .typeList a {
  padding: 0 10px;
}
.header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .bottom .logoArea {
  float: left;
}
.header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>