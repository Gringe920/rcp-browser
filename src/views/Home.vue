<template>
  <div class="homeall">
    <Header></Header>
    <div class="homeContent">
      <Search v-model="searchContent" @search="handleSearch" :msg='msg'/>
      <!-- 搜索框下面内容 -->
      <div class="homecInfos" v-if="shouldShowAddressTrade == ''">
        <div class="title">{{$t('a1')}}</div>
        <div class="homecInfosbox">
          <div class="homecInfosbox-text">
            <div class="text_l">交易费用</div>
            <div class="text_r">{{fee?fee:'暂不显示'}}</div>
          </div>
            <div class="homecInfosbox-text">
            <div class="text_l">分类账</div>
            <div class="text_r">{{ledgerVersion?ledgerVersion:'暂不显示'}}</div>
          </div>
        </div>
      </div>
      <accountsExplorer v-if="shouldShowAddressTrade == 'address'" :balances="balances" :history="transactions"/>
      <trade v-if="shouldShowAddressTrade == 'trade'" :transaction="transaction"/>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import accountsExplorer from "./accountsExplorer";
import trade from "./trade";
import API from "../plugins/ripple.request";
export default {
  data() {
    return {
      searchContent: "",
      shouldShowAddressTrade: "",
      fee: "",
      ledgerVersion: "",
      balances: [],
      transactions: [],
      msg: "",
      transaction: ""
    };
  },
  created() {
    this.initData();
  },
  components: {
    accountsExplorer,
    trade
  },
  methods: {
    //getFee  getLedgerVersion 内容填充
    async initData() {
      try {
        await API.connect();
        this.fee = await API.getFee();
        this.ledgerVersion = await API.getLedgerVersion();
      } catch (error) {
        // 如果
        console.log(error);
      }
    },
    async handleSearch(ctx) {
      this.msg = ''
      //验证输入内容是地址或者ID
      console.log(API.isValidAddress(ctx),)
      if (API.isValidAddress(ctx)) {
        console.log("isadress", "----------------");
        //地址:rGSZEScvDJ6sXwyyq31iVAzmjSncV29TLR
        // rGii6WxApQAjjndZZQbSzPpY7pmikfnv2Y
        this.shouldShowAddressTrade = "address";
        try {
          await API.connect();
          this.balances = [];
          this.transactions = [];
          this.balances = await API.getBalances(ctx);
          this.transactions = await API.getTransactions(ctx);
          console.log(this.transactions)
        } catch (err) {
          console.log("未查询到结果");
           this.msg = '该地址尚未查询到结果'
          console.log(err);
        }
      } else if (/^[A-F0-9]{64}$/.test(ctx)) {
        //大写字母跟数字
        //交易ID:C93F0E3A1C356BC5326A14726D415D6DDC5F657E51D32F3001EF8BABC10D90B0
        try {
          await API.connect();
          this.transaction = await API.getTransaction(ctx);
          this.shouldShowAddressTrade = "trade";
          console.log(this.transaction)
        } catch (err) {
          console.log(err)
          this.msg = "尚未查询到相关交易记录"
        }
      } else {
        this.msg = "地址或交易ID输入格式有误！";
        this.shouldShowAddressTrade = "";
        //地址或交易TX有误
      }
    },
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
      padding: 0 10px;
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
