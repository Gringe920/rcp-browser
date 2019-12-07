<template>
 <div class="homeall">
  <Header></Header>
  <div class="homeContent">
      <div class="searchbox">
    <input type="text" placeholder="" v-model="serachtext">
    <div class="go">go</div>
  </div>
  <accountsExplorer></accountsExplorer>
  </div>

   <Footer></Footer>
 </div>
</template>

<script>
import accountsExplorer from "./accountsExplorer";
export default {
  name: "HelloWorld",
  data() {
    return {
      serachtext: "rAPERVgXZavGgiGv6xBgtiZurirW2yAmY"
    };
  },
  components: {
    accountsExplorer
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.homeall {
  padding-top: 60px;
  padding-bottom: 120px;
  position: relative;
  height: auto;
  min-height: 100%;
  width: 100%;
  .homeContent {
    max-width: 1200px;
    margin: 0 auto;
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
  }
}
</style>
