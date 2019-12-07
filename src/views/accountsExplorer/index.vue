<template>
<!-- 帐户资源信息 -->
  <div class="accountsExplorer">
    <div class="balances">
      <div class="text2">balance</div>
          <div class="infosBox" v-for=" (item,index) in 12" :key="item">
        <div class="infostext">
            <div class="l2">
          <div class="yuan" :class="index %2 == 0?'lv':'lan'"></div>
          <div class="coin">RCP</div>
          <div class="num">7,578.66676708345965</div>
        </div>
        <div class="r2">
            <img  v-if="!show "   @click="show = !show ,theindex = item" src="../../assets/images/triangle_gray@2x.png" alt="" srcset="" >
            <img  v-else @click="show = !show,theindex = item" src="../../assets/images/triangle_gray_upper@2x.png" alt="" srcset="">
        </div>
        </div>
      
        <div class="infodetails" v-if="show &&  theindex == item">
          <div class="text">
            <div class="l">Available</div>
            <div class="r">40</div>
          </div>
             <div class="text">
            <div class="l">In Escrow</div>
            <div class="r">0.02</div>
          </div>
             <div class="text">
            <div class="l">adress:</div>
          </div>
             <div class="text">
            <div class="l">rw2ciyaNshpHe7bCHo4bRWq6pqqynnWKQg</div>
            </div>
        </div>
      </div>
    </div> 
    <div class="history">
      <div class="text2">History</div>
      <div class="hisbox" v-for="(item,index) in 12" :key='index'>
        <div class="his_l">
          <img src="../../assets/images/next_step@2x.png" alt="" srcset="">
          <div class="text">
            <span>34.52090</span>&nbsp;RCP&nbsp;  a few seconds ago
          </div>
        </div>
        <div class="his_r">
          rU2mEJSLqBRkYLVTv55rFkLTnT6mA
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "accountsExplorer",
  data(){
    return{
      show:false,
      theindex:0,
    }
  }
};
</script>
<style lang="scss" scoped>

.accountsExplorer {
  min-height: 60vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;

  .balances {
    width: 50%;
    height: 100%;
    min-width: 375px;
    padding-bottom: 20px;
    border-right: 1px solid #323645;
    .text2 {
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      border-bottom: 1px solid #323645;
    }
    .infosBox {
        
      padding: 10px 20px;

      .infostext {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        .l2 {
          display: flex;
          font-size: 14px;
          font-weight: 500;
          .yuan {
            width: 14px;
            height: 14px;
            background: #00c28f;
            border-radius: 100%;
            margin-right: 20px;
          }
          .lv{
                   background: #00c28f;
          }
          .lan{
            background: #00CCFF;
          }
          .coin {
            color: rgba(138, 143, 160, 1);
            margin-right: 30px;
          }
          .num {
            color: #ffffff;
          }
        }
        .r2 {
          color: #ffffff;
          img {
            width: 10px;
            height: 1 0px;
          }
        }
      }
      .infodetails{
         padding: 20px 20px 20px 34px;
        .text{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          padding: 5px 0;
          .l{
            color: #8A8FA0;
          }
          .r{
            color: #ffffff;
          }
        }

      }
    }
  }
  .history {
    height: 100%;
    width: 50%;
     min-width: 375px;
      .text2 {
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      border-bottom: 1px solid #323645;
    }
    .hisbox{
      display: flex;
      padding:  10px 20px;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      flex-wrap: wrap;
      .his_l{
        height: 30px;
        display: flex;
        align-items: center;
        padding: 10px 0;
        img{
          width: 14px;
          height: 14px;
          margin-right: 20px;
        }
        .text{
          color:#8A8FA0;
          span{
            color:#ffffff;
          }
        }
      }
      .his_r{
        color: #00C28F;
      }

    }
  }
}

</style>
