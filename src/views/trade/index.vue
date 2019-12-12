<template>
  <section class="trade-container">
      <div class="transactions-list">
        <div class="title">
          Transactions List
          <div class="next-icon">
            <i class="next-right"></i>
          </div>
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
        <!-- title-tab -->
        <div class="title">
          <span class="d-title" :class="{'active': activeIndex == 0}" @click="activeIndex = 0">
            Description
          </span>
          <span class="d-title" :class="{'active': activeIndex == 1}" @click="activeIndex = 1">
            Raw
          </span>
        </div>
        <!-- description  -->
        <div class="description-content" v-if="activeIndex == 0">
          <div class="status-box box">
            <div class="des-title">STATUS：</div>
            <div class="des-content">This transaction was successful, and validated in ledger <span class="green">51474924</span>  on <span class="blue">November 18, 2019 7:47 AM UTC.</span></div>
          </div>
          <div class="description-box box">
            <div class="des-title">DESCRIPTION：</div>
            <div class="des-content">This is a <span class="green">Payment</span> transaction.</div>
            <div class="des-content">The payment is from  <span class="green">rkrELMpeE7Hqvc5T5Vv7cP3ENruwfpnqG</span> to<span>rfGX54DKEA13fq2oxLz1dM1uAVvfuE7K9u.</span></div>
            <div class="des-content">It was instructed to deliver 0.146284 BTC. rfGX54DKEA13fq2oxLz1dM1uAVvfuE7K9u  by spending up to 0.146284 BTC.rfGX54DKEA13fq2oxLz1dM1uAVvfuE7K9u</div>
            <div class="des-content">The actual amount delivered was 0.146284 BTC.rfGX54DKEA13fq2oxLz1dM1uAVvfuE7K9u</div>
            <div class="des-content">The transaction's sequence number is 12559</div>
          </div>
          <div class="memos-box box">
            <div class="des-title">MEMOS：</div>
            <div class="des-content">The transaction has no memos.</div>
          </div>
          <div class="cost-box box">
            <div class="des-title">TRANSACTION COST：</div>
            <div class="des-content">Sending this transaction consumed 0.007099 XRP.</div>
          </div>
          <div class="flags-box box">
            <div class="des-title">FLAGS：</div>
            <div class="des-content">The transaction specified the following flags:</div>
            <div class="des-content">● tfFullyCanonicalSig</div>
            <div class="des-content">● tfPartialPayment</div>
          </div>
          <div class="affected-box box">
            <div class="des-title">AFFECTED LEDGER NODES：</div>
            <div class="des-content">● It modified the AccountRoot  node of rkrELMpeE7Hqvc5T5Vv7cP3ENruwfpnqG</div>
            <div class="des-content">● Balance reduced by 0.007099 from 12.644348 to 12.637249 XRP</div>
            <div class="des-content">● It modified a BTC RippleState  node between rfGX54DKEA13fq2oxLz1dM1uAVvfuE7K9u  and rkrELMpeE7Hqvc5T5Vv7cP3ENruwfpnqG</div>
            <div class="des-content">● Balance changed by 0.146284 from 0.146282 to 0.292566 BTC</div>
          </div>
          <div class="modified-box box"></div>
        </div>
        <!-- raw  -->
        <div class="raw-content" v-if="activeIndex == 1">
          <div class="object-raw-title">Object</div>
          <div class="raw-item">
            <span>hash：</span>
            <span class="green">"3068712E52970BC4221DDBD06152D174C8427D0612DEC288F7954DAAD31D5EE6"</span>
          </div>
          <div class="raw-item indent">
            <span>tx：</span>
            <span class="green">Object</span>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  created(){
    
  },
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
      position: relative;
      .next-icon{
        width: 38px;
        height: 38px;
        position: absolute;
        right: 0;
        top: 0;
        align-items: center;
        display: flex;
        justify-content: center;
        i{
          display:inline-block;
          width: 14px;
          height: 14px;
          background-image: url('../../assets/images/next_right@2x.png');
          background-size: 100% 100%;
        }
      }
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
    color: #8A8FA0;
    
    span.green{
      color: #00C28F;
    }
    span.blue{
      color: #00CCFF;
    }
    .description-content{
      padding: 20px;
      .box{
        margin-bottom: 20px;
        .des-title{
          font-size: 14px;
          color: #fff;
          margin-bottom: 10px;
        }
        .des-content{
          font-size: 12px;
        }
      }
    }
    .raw-content{
      padding:20px;
      .object-raw-title{
        font-size: 14px;
        color: #fff;
        margin-bottom: 7px;
      }
      .raw-item{
        font-size: 12px;
        margin-bottom: 7px;
        &.indent{
          text-indent:2em;
        }
      }
    }
  }
}

</style>