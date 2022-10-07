<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all" @mouseenter="enterShow" @mouseleave="leaveShow">
        商品分类导航
      </h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!--开始 进来enter-active-class 结束 离开leave-active-class-->
<!--       <transition
        name="animate__animated animate__bounce"
        enter-active-class=""
        leave-active-class=""
      > -->
        <div
          class="sort"
          v-show="show"
          @mouseenter="enterShow"
          @mouseleave="leaveShow"
        >
          <div class="all-sort-list2" @click="goSearch">
            <div class="item bo" v-for="c1 in num" :key="c1.categoryId">
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
  <!--     </transition> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
/* import "animate.css"; */
export default {
  name: "TypeNav",
  data() {
    return {
      show: true,
    };
  },
  methods: {
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      if (this.$route.path != "/Home" && this.$route.path != "/home") {
        this.show = false;
      }
    },
    /* ...mapActions(['categoryList']), */
    goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
      //获取dom上的自定义属性
        element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = {};
        let params = {};
        //categoryxid 商品分类 categoryname 商品详情 
        //查看接口文档2
        if (category1id) {
          query.category1Id = category1id;
          query.categoryname = categoryname;
        } else if (category2id) {
          query.category2Id = category2id;
          query.categoryname = categoryname;
        } else {
          query.category3Id = category3id;
          query.categoryname = categoryname;
        }

        if (this.$route.params.keyword) {
          params.keyword = this.$route.params.keyword;
        }
        location.query = query;
        location.params = params;
        this.$router.push(location);
      }
    },
  },
  computed: {
    ...mapState({
      num: (state) => {
        return state.TypeNav.num;
      },
    }),
  },
  mounted() {
    /* 
    this.categoryList() */
    if (this.$route.path != "/Home" && this.$route.path != "/home") {
      this.show = false;
    }
    /* this.$store.dispatch('categoryList') */
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            overflow: hidden;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          background: skyblue;
        }
      }
    }
    /* .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    } */
  }
}
</style>
