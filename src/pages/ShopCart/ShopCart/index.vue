<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-if="cartInfoList">
        <ul class="cart-list" v-for="(list, index) in cartInfoList.cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="list.isChecked == 1" @click="state(list.skuId, index)" />
          </li>
          <li class="cart-list-con2">
            <img :src="list.imgUrl" />
            <div class="item-msg">{{ list.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ list.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="revise('reduce', -1, list)">-</a>
            <input autocomplete="off" type="text" :value="list.skuNum" minnum="1" class="itxt"
              @change="revise('revise', $event.target.value * 1, list)" />
            <a href="javascript:void(0)" class="plus" @click="revise('add', +1, list)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ list.cartPrice * list.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deletes(list.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="selectLists" @click="selectAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCarts">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ quantity }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ price }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoLists: true,
      flag: true,
      selectLists: false
    };
  },
  methods: {
    ...mapActions("shopcart", ["getShoppingCartInformations"]),
    ...mapActions("detail", [
      "addToShoppingCart",
      "deleteAShoppingCarts",
      "deleteAllCheckedCart",
      "selects",
      'selectList'
    ]),
    //type 功能   disNum 数量   skuId 商品对象
    revise(type, disNum, skuId) {
      if (this.flag) {
        if (type === "add") {
          this.flag = false;
          let add = this.addToShoppingCart({
            skuId: skuId.skuId,
            skuNum: disNum,
          });
          add.then((value) => {
            if (value.code == 200) {
              this.getShoppingCartInformations();
            }
          });
        } else if (type === "revise") {
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
            let add = this.addToShoppingCart({
              skuId: skuId.skuId,
              skuNum: disNum,
            });
            add.then((value) => {
              if (value.code == 200) {
                this.getShoppingCartInformations();
              }
            });
          } else {
            this.flag = false;
            //商品数量
            disNum = parseInt(disNum) - skuId.skuNum;
            let add = this.addToShoppingCart({
              skuId: skuId.skuId,
              skuNum: disNum,
            });
            add.then((value) => {
              if (value.code == 200) {
                this.getShoppingCartInformations();
              }
            });
          }
        } else if (type === "reduce") {
          if (skuId.skuNum < 2) {
            disNum = 0;
          }
          let add = this.addToShoppingCart({
            skuId: skuId.skuId,
            skuNum: disNum,
          });
          add.then((value) => {
            if (value.code == 200) {
              this.getShoppingCartInformations();
            }
          });
        }
      }
    },
    deletes(list) {
      if (this.flag) {
        this.flag = false;
        let deletes = this.deleteAShoppingCarts(list);
        deletes.then((value) => {
          if (value.code == 200) {
            this.getShoppingCartInformations();
          }
        });
      }
    },
    //删除选中商品
    deleteAllCheckedCarts() {
      if (this.cartInfoList.length !== 0) {
        let add = this.deleteAllCheckedCart();
        add.then((value) => {
          if (value[0]) {
            let flag = [];
            //遍历promise.All返回的数组
            value.forEach((item) => {
              if (item.code == 200) {
                flag.push(1);
              } else {
                flag.push(0);
              }
            });
            if (flag.every((item) => item == 1)) {
              this.getShoppingCartInformations();
            }
          }
        });
      }
    },
    state(skuId, index) {
      if (this.flag) {
        this.flag = false;
        if (this.cartInfoList.cartInfoList[index].isChecked == 1) {
          let list = this.selects({ skuId, isChecked: 0 });
          list.then((value) => {
            if (value.code == 200) {
              this.getShoppingCartInformations();
            }
          });

          /* this.cartInfoList.cartInfoList[index].isChecked = 0; */
          return;
        } else if (this.cartInfoList.cartInfoList[index].isChecked == 0) {
          let list = this.selects({ skuId, isChecked: 1 });
          list.then((value) => {
            if (value.code == 200) {
              this.getShoppingCartInformations();
            }
          });
          /* this.cartInfoList.cartInfoList[index].isChecked = 1; */
        }
      }
    },
    //全选或非全选
    selectAll() {
      this.flag = false;
      let select = this.selectList(!this.selectLists)
      select.then((value) => {
        if (value[0]) {
          let flag = [];
          //遍历promise.All返回的数组
          value.forEach((item) => {
            if (item.code == 200) {
              flag.push(1);
            } else {
              flag.push(0);
            }
          });
          if (flag.every((item) => item == 1)) {
            this.getShoppingCartInformations();
          }
        } else {
          alert('请添加商品')
        }
      });
    },
  },
  computed: {
    ...mapGetters("shopcart", ["cartInfoList"]),
    price() {
      let add = 0;
      if (this.cartInfoList.cartInfoList) {
        this.cartInfoList.cartInfoList.forEach((item) => {
          if (item.isChecked == 1) {
            add += item.cartPrice * item.skuNum;
          }
        });
      }
      return add || 0;
    },
    quantity() {
      let add = 0;
      if (this.cartInfoList.cartInfoList) {
        this.cartInfoList.cartInfoList.forEach((item) => {
          if (item.isChecked == 1) {
            add += item.skuNum;
          }
        });
      }

      return add || 0;
    },

  },
  mounted() {
    this.getShoppingCartInformations();
  },
  watch: {
    cartInfoList: {
      deep: true,
      handler(newValue) {
        this.flag = true;
        if (newValue.cartInfoList) {
          this.selectLists = newValue.cartInfoList.every(
            (item) => item.isChecked == 1
          );
        }

      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>