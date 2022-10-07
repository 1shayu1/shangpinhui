<template>
  <div class="pagination">
    <button @click="frontPage">首页</button>
    <button @click="lastPage">上一页</button>
    <button v-show="beforeAndAfter.start != 1">···</button>

    <button
      v-for="(pagination, index) in beforeAndAfter.end"
      :key="index"
      v-show="pagination >= beforeAndAfter.start"
      @click="match(pagination)"
      :class="{active:index == pageNo-1}"
    >
      {{ pagination }}
    </button>
    <button v-show="beforeAndAfter.end != Math.ceil(total / pageSize)">
      ···
    </button>
    <button @click="nextPage">下一页</button>

    <button style="margin-left: 30px" @click="theLastPage">尾页</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 当前页数，每页数量，总数量，多少页一起显示
  props: ["pageNo", "pageSize", "total", "pageConnect"],
  computed: {
    beforeAndAfter() {
      let { pageNo, pageSize, total, pageConnect } = this;
      let start, end;
      if (pageNo - Math.floor(pageConnect / 2) < 1) {
        start = 1;
        //当前页数 - 连续页数一半 < 1时
        end = pageConnect;
      } else {
        start = pageNo - Math.floor(pageConnect / 2);
        if (
          // 前页数 + 连续页数一半 > 总页数时
          pageNo + Math.floor(pageConnect / 2) >
          Math.ceil(total / pageSize)
        ) {
          end = Math.ceil(total / pageSize);
          start = end - pageConnect;
        } else {
          end = pageNo + Math.floor(pageConnect / 2);
        }
      }
      return { start, end };
    },
  },
  methods: {
    match(pagination) {
      //点击的时候跳转到指定分页
      this.$emit("pagination", pagination);
    },
    //下一页
    nextPage() {
      this.$emit("nextPage");
    },
    //上一页
    lastPage() {
      this.$emit("lastPage");
    },
    //尾页
    theLastPage() {
      this.$emit("theLastPage");
    },
    //首页
    frontPage() {
      this.$emit("frontPage");
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>