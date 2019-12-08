<template>
  <section class="trade-container">
      <div class="transactions-list">
        <div class="title">
          Transactions List
        </div>
        <div class="transaction-content">
          <div class="transaction-box">
            <div class="box-button">
              Payment
            </div>
            <div class="box-info">
              <p class="box-key">rxQBwm8spKziiJscBhuFisGVAFBgTEE4z</p>
              <p class="box-detail">0.146284 BTC sent to rfGX54DKEA13f</p>
            </div>
          </div>
          <div class="transaction-box">
            <div class="box-button">
              Payment
            </div>
            <div class="box-info">
              <p class="box-key">rxQBwm8spKziiJscBhuFisGVAFBgTEE4z</p>
              <p class="box-detail">0.146284 BTC sent to rfGX54DKEA13f</p>
            </div>
          </div>
          <div class="transaction-box">
            <div class="box-button">
              Payment
            </div>
            <div class="box-info">
              <p class="box-key">rxQBwm8spKziiJscBhuFisGVAFBgTEE4z</p>
              <p class="box-detail">0.146284 BTC sent to rfGX54DKEA13f</p>
            </div>
          </div>
          <div class="transaction-box">
            <div class="box-button">
              Payment
            </div>
            <div class="box-info">
              <p class="box-key">rxQBwm8spKziiJscBhuFisGVAFBgTEE4z</p>
              <p class="box-detail">0.146284 BTC sent to rfGX54DKEA13f</p>
            </div>
          </div>
        </div>
      </div>
      <div class="description-raw">
        <div class="title">
          <span class="d-title" :class="{'active': activeIndex == 0}" @click="activeIndex = 0">
            Description
          </span>
          <span class="d-title" :class="{'active': activeIndex == 1}" @click="activeIndex = 1">
            Raw
          </span>
        </div>
        <div class="description-content">
          <div class="status-box box"></div>
          <div class="description-box box"></div>
          <div class="memos-box box"></div>
          <div class="cost-box box"></div>
          <div class="flags-box box"></div>
          <div class="affected-box box"></div>
          <div class="modified-box box"></div>
        </div>
        <div class="raw-content"></div>
      </div>
  </section>
</template>

<script>
export default {
  data() {
    return{
      activeIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.trade-container{
  display: flex;
  justify-content:space-between;
  .transactions-list, .description-raw{
    background-color: #151d36;
    .title{
      font-size: 14px;
      color: #fff;
      padding: 12px 10px;
      border-bottom: 1px solid #0C132F;
      .d-title{
        display: inline-block;
        margin-right: 30px;
        &.active{
          color: #00C28F;
          position: relative;
          &::after{
            content: '';
            display: inline-block;
            height: 1px;
            background-color: #00c28f;
            width: 100%;
            position: absolute;
            left: 0;
            bottom: -10px;
          }
        }
      }
    }
  }
  .transactions-list{
    width: 29.1%;
    .transaction-box{
      display: flex;
      padding: 10px;
      justify-content: space-between;
      font-size:12px;
      margin-bottom: 10px;
      .box-button{
        padding: 9px 16px;
        color: #fff;
        background-color: #00C28F;
      }
      .box-info{
        overflow: hidden;
        .box-key{
          color: #00C28F;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .box-detail{
          color: #8A8FA0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .description-raw{
    width: 70%;
  }
}

</style>