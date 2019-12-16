<template>
<div class="search">
  <div class="searchbox">
    <input type="text" :placeholder="$t('a2')" v-model="serachtext" @input="handleInput"/>
    <div class="go" @click="gotoSearch">{{$t('a3')}}</div>
  </div>
  <div class="msg" v-if="msg">{{msg}}</div>
</div>
</template>
<script>
export default {
  props: ["searchContent", "msg"],
  model: {
    prop: "searchContent",
    event: "change"
  },
  data() {
    return {
      serachtext: this.searchContent
    };
  },
  methods: {
    handleInput(val) {
      this.$emit("change", val);
    },
    gotoSearch() {
      this.$emit("search", this.serachtext);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  .searchbox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 10px 0;
    input {
      margin-right: 10px;
      width: 80%;
      height: 36px;
      border: none;
      padding-left: 10px;
      background: #151d36;
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
  .msg{
     width: calc(80% + 50px);
    color: #00c28f;
    margin: 0 auto 10px auto;
    font-size: 14px;
  }
}
</style>