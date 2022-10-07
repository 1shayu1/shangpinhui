<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="register.name"
          @change="informationName"
        />
        <span class="error-msg" v-show="!information.name"
          >请输入正确的手机号</span
        >
        <span class="error-msg verify" v-show="information.name">正确</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          :value="register.verificationCode"
        />
        <button class="verificationCode" @click.prevent="obtain">
          获取验证码
        </button>
        <span class="error-msg" v-show="!information.verificationCode"
          >请勿修改验证信息</span
        >
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" v-model="register.password" placeholder="请输入你的登录密码" />
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="register.password1"
          @change="password"
        />
        <span class="error-msg" v-show="!information.password"
          >错误提示信息</span
        >
        <span class="error-msg verify" v-show="information.password">正确</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="information.protocol" />
        <span>同意协议并注册《尚品汇用户协议》</span>
      </div>
      <div class="btn">
        <button @click.prevent="finish">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      register: {
        name: "",
        verificationCode: "",
        password: "",
        password1: "",
      },
      information: {
        name: false,
        verificationCode: false,
        password: false,
        protocol: false,
      },

      timi: "",
    };
  },
  methods: {
    regular(res) {
      let phoneNumber =
        /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      return phoneNumber.test(res);
    },
    ...mapActions("login", ["verificationCodes", "registers"]),
    obtain() {
      clearInterval(this.timi);
      this.timi = setTimeout(() => {
        if (this.regular(this.register.name)) {
          this.verificationCodes(this.register.name);
        } else {
          alert("请输入正确的手机号");
        }
      }, 500);
    },
    informationName() {
      if (this.regular(this.register.name)) {
        this.information.name = true;
      } else {
        this.information.name = false;
      }
    },
    password() {
      if (this.register.password == this.register.password1) {
        this.information.password = true;
      } else {
        this.information.password = false;
      }
    },
    finish() {
      if (
        this.information.name &&
        this.information.verificationCode &&
        this.information.password &&
        this.information.protocol
      ) {
        let red = this.registers({
          phone: this.register.name,
          password: this.register.password,
          code: this.register.verificationCode,
        });
        red.then(value=>{
          console.log(value);
          if(value.code == 200){
            alert('注册成功点击跳转到登录页面')
            this.$router.push({
              path:'/login'
            })
          }else if(value.code ==223){
              alert('手机号以被注册')
            }else{
              alert('注册失败请重试')
            }
        })
      } else {
        alert("请完成信息填写");
      }
    },
  },
  computed: {
    ...mapState("login", ["verificationCode"]),
  },
  watch: {
    verificationCode: {
      handler(newValue) {
        this.register.verificationCode = newValue.data;
        this.information.verificationCode = true;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;
    position: relative;

    .verificationCode {
      position: absolute;
      height: 38px;
    }
    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
      .verify {
        color: green;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>