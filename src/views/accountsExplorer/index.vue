<template>
<!-- 帐户资源信息 -->
  <div class="accountsExplorer">
    <div class="balances">
      <div class="text">balance</div>
      <div class="infosBox" v-for=" item in 17" :key="item">
        <div class="l">
          <img src="../../assets/images/logo.png" alt="" >
          <div class="yuan"></div>
          <div class="coin">RCP</div>
          <div class="num">7,578.66676708345965</div>
        </div>
        <div class="r">
              <img src="../../assets/images/logo.png" alt="" srcset="">
          <img src="../../assets/images/logo.png" alt="" >
            <img src="../../assets/images/triangle_gray@2x.png" alt="" srcset="">
            <img v-if="false" src="../../assets/images/triangle_gray_upper@2x.png" alt="" srcset="">
        </div>
      </div>
    </div>
    <div class="history">
      <div class="text">History</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "accountsExplorer"
};
</script>
<style lang="scss" scoped>
.accountsExplorer {
  min-height: 60vh;
  width: 100%;
  background: rgba(0,0,0,0.5);
  border: 1px solid red;
  display: flex;
  .balances {
    width: 50%;
    height: 100%;
    border: 1px solid pink;
    .text{
      padding: 12px 10px;
      font-size:14px;
      font-weight:500;
      color:rgba(255,255,255,1);
      border-bottom: 1px solid #323645;
    }
    .infosBox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid red;
      padding: 15px 10px;
      .l{
        display: flex;
        font-size:14px;
          font-weight:500;
        .yuan{
          width: 14px;
          height: 14px;
          background: #00C28F;
          border-radius: 100%;
          margin-right: 20px;
        }
        .coin{
          
          color:rgba(138,143,160,1);
          margin-right: 30px;
        }
        .num{
          color: #ffffff;
        }
      }
      .r{
        color: #ffffff;
        img{
          width: 120px;
          height: 120px;;
        }

      }
    }
  }
  .history {
    height: 100%;
    border: 1px solid pink;
    width: 50%;
  }
}
</style>
