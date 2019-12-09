<template>
  <div class="searchbox">
    <input type="text" placeholder="请输入搜索内容" v-model="serachtext" />
    <div class="go">go</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serachtext: "rAPERVgXZavGgiGv6xBgtiZurirW2yAmY"
    };
  },
};
</script>

<style lang="scss" scoped>
.searchbox {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      input {
        margin-right: 10px;
        width: 80%;
        height: 36px;
        border: none;
        padding-left: 10px;
        background: rgba(0, 0, 0, 0.5);
        color: #ffffff;
      }
      .go {
        width: 50px;
        height: 36px;
        background: rgba(0, 194, 143, 1);
        font-size: 12px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
</style>