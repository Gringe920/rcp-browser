<template>
  <div class="homeall">
    <Header></Header>
    <div class="homeContent">
      <Search />
      <!-- 搜索框下面内容 -->
      <div class="homecInfos">
        <div class="title">XRP Ledger Stats</div>
        <div class="homecInfosbox">
          <div class="homecInfosbox-text">
            <div class="text_l">Total XRP</div>
            <div class="text_r">99,991,234,998.56</div>
          </div>
            <div class="homecInfosbox-text">
            <div class="text_l">Total XRP</div>
            <div class="text_r">99,991,234,998.56</div>
          </div>

        </div>

      </div>
      <accountsExplorer />
      <trade v-if="false" />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import accountsExplorer from "./accountsExplorer";
import trade from "./trade";
export default {
  data() {
    return {};
  },
  components: {
    accountsExplorer,
    trade
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
  }
  .homecInfos {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px;
    .title {
      padding: 0 10px ;
      margin-top: 30px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .homecInfosbox {
      margin: 15px 0 60px 0;
      padding: 0 10px;
      background: #151d36;
      font-size: 16px;
      .homecInfosbox-text {
        display: flex;

        border-bottom: 1px solid #0c132f;
        align-items: center;
        height: 50px;
        justify-content: space-between;
        .text_l {
          color: #8a8fa0;
        }
        .text_r {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
