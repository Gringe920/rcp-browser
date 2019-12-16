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
            <div class="text_l">{{$t('a4')}}</div>
            <div class="text_r">{{getLedger['closeTimeResolution']?getLedger['closeTimeResolution']:'-'}}</div>
          </div>
            <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a5')}}</div>
            <div class="text_r">{{getLedger['ledgerVersion']?getLedger['ledgerVersion']:'-'}}</div>
          </div>
          <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a6')}}</div>
            <div class="text_r">{{fee?fee:'-'}}</div>
          </div>
          <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a7')}}</div>
            <div class="text_r">{{getLedger['closeTime']? changedate(getLedger['closeTime']):'-'}}</div>
          </div>
          <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a8')}}</div>
            <div class="text_r">{{getLedger['transactionHash']? changedate(getLedger['transactionHash']):'-'}}</div>
          </div>
          <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a9')}}</div>
            <div class="text_r">{{getLedger['totalDrops']?getLedger['totalDrops']:'-'}}</div>
          </div>
          <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a10')}}</div>
            <div class="text_r">{{getLedger['parentCloseTime']?changedate(getLedger['parentCloseTime']):'-'}}</div>
          </div>
     
          <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a11')}}</div>
            <div class="text_r">{{getLedger['parentLedgerHash']?getLedger['parentLedgerHash']:'-'}}</div>
          </div>
          <div class="homecInfosbox-text">
            <div class="text_l">{{$t('a12')}}</div>
            <div class="text_r">{{getLedger['stateHash']?getLedger['stateHash']:'-'}}</div>
          </div>
        </div>
      </div>
      <accountsExplorer v-if="shouldShowAddressTrade == 'address'" :balances="balances" :history="transactions" />
      <trade v-if="shouldShowAddressTrade == 'trade'" :transaction="transaction"/>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import accountsExplorer from "./accountsExplorer";
import trade from "./trade";
import API from "../plugins/ripple.request";
import { log } from 'util';
export default {
  data() {
    return {
      searchContent: this.$route.query.id ||"",
      shouldShowAddressTrade: "",
      fee: "",
      ledgerVersion: "",
      balances: [],
      transactions: [],
      msg: "",
      transaction: "",
      getLedger: {}
    };
  },
  created() {
    if(this.searchContent){
      this.handleSearch(this.searchContent)
    }else{
      this.initData();
    }
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
        this.getLedger = await API.getLedger();
      } catch (error) {
        // 如果
        console.log(error);
      }
    },
    async handleSearch(ctx) {
      this.msg = "";
      //验证输入内容是地址或者ID
      if (API.isValidAddress(ctx)) {
        //地址:rGSZEScvDJ6sXwyyq31iVAzmjSncV29TLR 
        // rGii6WxApQAjjndZZQbSzPpY7pmikfnv2Y
        //  rERuBTMQ9jSKAhbNNkKv95MRCr9GGRmqFi
        this.$router.push({ path: 'home',query:{id:ctx}});
        try {
          this.shouldShowAddressTrade = "address";
          await API.connect();
          this.balances = [];
          this.transactions = [];
          this.balances = await API.getBalances(ctx);
          this.transactions = await API.getTransactions(ctx);
        } catch (err) {
          this.msg = this.$t("a13");
        }
      } else if (/^[A-F0-9]{64}$/.test(ctx)) {
        //大写字母跟数字
        //交易ID:C93F0E3A1C356BC5326A14726D415D6DDC5F657E51D32F3001EF8BABC10D90B0
        //DE026CC194F4CD2F499952C2D732F0CFF33D0FDF931637A79465CA4188B7149A
        this.$router.push({ path: 'home',query:{id:ctx}});
        try {
          await API.disconnect();
          await API.connect();
          this.transaction = "";
          this.transaction = await API.getTransaction(ctx);
          this.shouldShowAddressTrade = "trade";
        } catch (err) {
          this.msg = this.$t("a14");
        }
      } else {
        this.msg = this.$t("a15");
        this.shouldShowAddressTrade = "";
        //地址或交易TX有误
      }
    },
    changedate(index) {
      var date = new Date(index);
      var m =
        date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
      var d = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      var h = date.getHours() > 9 ? date.getDate() : "0" + date.getDate();
      var min =date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
      var sec =date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

      var c =
        date.getFullYear() +
        "-" +
        m +
        "-" +
        d +
        " " +
        h +
        ":" +
        min +
        ":" +
        sec;
      return c;
    }
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
        min-height: 50px;
        flex-wrap: wrap;
        line-height: 50px;
        justify-content: space-between;
        .text_l {
          color: #8a8fa0;
          line-height: 30px;
        }
        .text_r {
          color: #ffffff;
          line-height: 30px;
          overflow-x: scroll;
        }
        .text_r::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}
</style>
