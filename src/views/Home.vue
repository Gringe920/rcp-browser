<template>
  <div class="homeall">
    <Header></Header>
    <div class="homeContent">
      <Search v-model="searchContent" @search="handleSearch"/>
      <!-- 搜索框下面内容 -->
      <div class="homecInfos" v-if="shouldShowAddressTrade == ''">
        <div class="title">XRP Ledger Stats</div>
        <div class="homecInfosbox">
          <div class="homecInfosbox-text">
            <div class="text_l">Total XRP</div>
            <div class="text_r">{{fee}}</div>
          </div>
            <div class="homecInfosbox-text">
            <div class="text_l">Total XRP</div>
            <div class="text_r">{{ledgerVersion}}</div>
          </div>
        </div>
      </div>
      <accountsExplorer v-if="shouldShowAddressTrade == 'address'" :balances="balances" :history="transactions"/>
      <trade v-if="shouldShowAddressTrade == 'trade'" />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import accountsExplorer from "./accountsExplorer";
import trade from "./trade";
import API from '../plugins/ripple.request'
export default {
  data() {
    return {
      searchContent: '',
      shouldShowAddressTrade: '',
      fee: '',
      ledgerVersion: '',
      balances: '',
      transactions: ''
    };
  },
  created(){
    this.initData()
  },
  components: {
    accountsExplorer,trade
  },
  methods: {
    //getFee  getLedgerVersion 内容填充
    async initData(){
      try{
        await API.connect();
        this.fee = await API.getFee()
        this.ledgerVersion = await API.getLedgerVersion()
      }catch (error) {
        // 如果
        console.log(error)
      }
    },
    async handleSearch(ctx){
      //验证输入内容是地址或者ID
      if(API.isValidAddress(ctx)){
        //地址:rGSZEScvDJ6sXwyyq31iVAzmjSncV29TLR
        this.shouldShowAddressTrade = 'address'
        try{
          await API.connect();
          this.balances = await API.getBalances(ctx);
          this.transactions =  await API.getTransactions(ctx);
        }catch(err){
          console.log(err)
        }
      }else if(/^[A-Z\d]+$/.test(ctx)){ //大写字母跟数字
        //交易ID:99404A34E8170319521223A6C604AF48B9F1E3000C377E6141F9A1BF60B0B865
        this.shouldShowAddressTrade = 'trade'
        try{
          await API.connect();
          const transaction = await API.getTransaction(ctx)
          console.log(transaction)
        }catch(err){
          console.log(err)
        }
      }else{
        //地址或交易TX有误
      }
    },
    getBalancesData(){
      
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
