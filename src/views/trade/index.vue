<template>
  <section class="trade-container">
      <!-- <div class="transactions-list">
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
      </div> -->
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
            <div class="des-content">This transaction was successful, and validated in ledger <span class="green">{{transaction.outcome.ledgerVersion}}</span>  on <span class="blue">{{new Date(transaction.outcome.timestamp).toGMTString()}}.</span></div>
          </div>
          <div class="description-box box">
            <div class="des-title">DESCRIPTION：</div>
            <div class="des-content">This is a <span class="green">{{transaction.type}}</span> transaction.</div>
            <div class="des-content">The payment is from  <span class="white">{{transaction.specification.destination.address}}</span> to <span class="white">{{transaction.address}}.</span></div>
            <div class="des-content">It was instructed to deliver {{transaction.outcome.deliveredAmount.value}} {{transaction.outcome.deliveredAmount.currency}}. <span class="white">{{transaction.address}}</span>  by spending up to {{transaction.outcome.deliveredAmount.value}} </div>
            <div class="des-content">{{transaction.outcome.deliveredAmount.currency}}.<span class="white">{{transaction.address}}</span></div>
            <div class="des-content">The actual amount delivered was {{transaction.outcome.deliveredAmount.value}} {{transaction.outcome.deliveredAmount.currency}}.<span class="white">{{transaction.address}}</span></div>
            <div class="des-content">The transaction's sequence number is {{transaction.sequence}}</div>
          </div>
          <div class="memos-box box">
            <div class="des-title">MEMOS：</div>
            <div class="des-content">The transaction has {{transaction.specification.memos.length > 0 && transaction.specification.memos[0].data}} memos.</div>
          </div>
          <div class="cost-box box">
            <div class="des-title">TRANSACTION COST：</div>
            <div class="des-content">Sending this transaction consumed {{transaction.outcome.deliveredAmount.value}} {{transaction.outcome.deliveredAmount.currency}}.</div>
          </div>
          <div class="flags-box box">
            <div class="des-title">FLAGS：</div>
            <div class="des-content">The transaction specified the following flags:</div>
            <div class="des-content"><span class="green">● tfFullyCanonicalSig</span></div>
            <div class="des-content"><span class="green">● tfPartialPayment</span></div>
          </div>
          <div class="affected-box box">
            <div class="des-title">AFFECTED LEDGER NODES：</div>
            <div class="des-content">● It modified the <span class="red">AccountRoot</span>  node of {{transaction.address}}</div>
            <div class="des-content"><span class="green">● Balance reduced by 0.007099 from 12.644348 to 12.637249 {{transaction.outcome.deliveredAmount.currency}}</span></div>
            <div class="des-content">● It modified a {{transaction.outcome.deliveredAmount.currency}} <span class="red">RippleState</span>  node between <span class="white">{{transaction.specification.destination.address}}</span>  and <span class="white">{{transaction.address}}</span></div>
            <div class="des-content"><span class="green">● Balance changed by 0.146284 from 0.146282 to 0.292566 {{transaction.outcome.deliveredAmount.currency}}</span></div>
          </div>
          <div class="modified-box box"></div>
        </div>
        <!-- raw  -->
        <div class="raw-content" v-if="activeIndex == 1">
          <div class="object-raw-title">Object</div>
          <div class="raw-item">
            <span>hash：</span>
            <span class="green">"{{transaction.id}}"</span>
          </div>
          <div class="raw-item">
            <span>ledger_index：</span>
            <span class="red">{{transaction.outcome.ledgerVersion}}</span>
          </div>
          <div class="raw-item">
            <span>date：</span>
            <span class="red">{{new Date(transaction.outcome.timestamp).toGMTString()}}</span>
          </div>
          <div class="raw-item indent">
            <span>tx：</span>
            <span>Object</span>
          </div>
          <div class="raw-item">
            <span>TransactionType：</span>
            <span class="green">{{transaction.type}}</span>
          </div>
          <div class="raw-item">
            <span>Flags：</span>
            <span class="red">{{transaction.type}}</span>
          </div>
          <div class="raw-item">
            <span>Sequence：</span>
            <span class="red">{{transaction.sequence}}</span>
          </div>
          <div class="raw-item">
            <span>LastLedgerSequence：</span>
            <span class="red">{{transaction.outcome.indexInLedger}}</span>
          </div>
          <div class="raw-item indent">
            <span>Amount：</span>
            <span class="white">Object</span>
          </div>
          <div class="raw-item">
            <span>value：</span>
            <span class="green">{{transaction.outcome.deliveredAmount.value}}</span>
          </div>
          <div class="raw-item">
            <span>currency：</span>
            <span class="green">{{transaction.outcome.deliveredAmount.currency}}</span>
          </div>
          <div class="raw-item">
            <span>issuer：</span>
            <span class="green">{{transaction.address}}</span>
          </div>
          <div class="raw-item">
            <span>SigningPubkey：</span>
            <span class="green">{{transaction.id}}</span>
          </div>
          <div class="raw-item">
            <span>TxnSignature：</span>
            <span class="green">{{transaction.id}}</span>
          </div>
          <div class="raw-item">
            <span>Account：</span>
            <span class="green">{{transaction.address}}</span>
          </div>
          <div class="raw-item">
            <span>Destination：</span>
            <span class="green">{{transaction.specification.destination.address}}</span>
          </div>
          <div class="raw-item indent">
            <span>meta：</span>
            <span class="white">Object</span>
          </div>
          <div class="raw-item">
            <span>TransactionIndex：</span>
            <span class="red">37</span>
          </div>
          <div class="raw-item indent">
            <span>AffectedNotes：</span>
            <span class="white">Array[2]</span>
          </div>
          <div class="raw-item indent">
            <span>0：</span>
            <span class="white">Object</span>
          </div>
          <div class="raw-item indent">
            <span>1：</span>
            <span class="white">Object</span>
          </div>
          <div class="raw-item">
            <span>TransactionResult：</span>
            <span class="green">{{transaction.outcome.result}}</span>
          </div>
          <div class="raw-item indent">
            <span>delivered_amount：</span>
            <span class="white">Object</span>
          </div>
          <div class="raw-item">
            <span>value：</span>
            <span class="white">{{transaction.outcome.deliveredAmount.value}}</span>
          </div>
          <div class="raw-item">
            <span>currency：</span>
            <span class="white">{{transaction.outcome.deliveredAmount.currency}}</span>
          </div>
          <div class="raw-item">
            <span>issuer：</span>
            <span class="white">{{transaction.address}}</span>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  props: ["transaction"],
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
  justify-content:center;
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
    width: 85%;
    color: #8A8FA0;
    overflow: hidden;
    span.red{
      color: #d50707;
    }
    span.green{
      color: #00C28F;
    }
    span.blue{
      color: #00CCFF;
    }
    span.white{
      color: #fff;
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
          margin-bottom: 5px;
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