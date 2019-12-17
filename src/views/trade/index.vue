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
            {{$t('a23')}}
          </span>
          <span class="d-title" :class="{'active': activeIndex == 1}" @click="activeIndex = 1">
              {{$t('a24')}}
          </span>
        </div>
        <!-- description  -->
        <div class="description-content" v-if="activeIndex == 0 && transaction">
          <div class="status-box box">
            <div class="des-title">   {{$t('a25' )}}：</div>
            <div class="des-content">   {{$t('a26')}} <span class="green">{{transaction.outcome.ledgerVersion}}</span>     {{$t('a27')}} <span class="blue">{{new Date(transaction.outcome.timestamp).toGMTString()}}.</span></div>
          </div>
          <div class="description-box box">
            <div class="des-title">   {{$t('a28')}}</div>
            <div class="des-content">{{$t('a29')}} <span class="green">{{transaction.type}}</span>  {{$t('a30')}}</div>
            <div class="des-content"> {{$t('a31')}} <span class="white">{{transaction.specification.destination.address}} </span>  {{$t('a32')}} <span class="white">{{transaction.specification.destination.address}}.</span></div>
            <div class="des-content"> {{$t('a33')}} {{transaction.outcome.deliveredAmount.value}} {{changeXRP(transaction.outcome.deliveredAmount.currency)}}. <span class="white">{{transaction.specification.destination.address}}</span>   {{$t('a34')}}{{transaction.outcome.deliveredAmount.value}} </div>
            <div class="des-content">{{changeXRP(transaction.outcome.deliveredAmount.currency)}}.<span class="white">{{transaction.address}}</span></div>
            <div class="des-content"> {{$t('a35')}} {{transaction.outcome.deliveredAmount.value}} {{changeXRP(transaction.outcome.deliveredAmount.currency)}}.<span class="white">{{transaction.address}}</span></div>
            <div class="des-content"> {{$t('a36')}} {{transaction.sequence}}</div>
          </div>
          <div class="memos-box box">
            <div class="des-title"> {{$t('a37')}}</div>
            <div class="des-content"> {{$t('a38')}}<span v-for="(item, index) in transaction.specification.memos" :key="index"> {{item.data}}</span> {{$t('a39')}}</div>
          </div>
          <div class="cost-box box">
            <div class="des-title"> {{$t('a40')}}</div>
            <div class="des-content"> {{$t('a41')}} {{transaction.outcome.deliveredAmount.value}} {{changeXRP(transaction.outcome.deliveredAmount.currency)}}.</div>
          </div>
          <div class="flags-box box">
            <div class="des-title"> {{$t('a42')}}：</div>
            <div class="des-content">T {{$t('a43')}}</div>
            <div class="des-content"><span class="green">●  {{$t('a44')}}</span></div>
            <div class="des-content"><span class="green">●  {{$t('a45')}}</span></div>
          </div>
          <div class="affected-box box">
            <div class="des-title"> {{$t('a46')}}</div>
            <div class="des-content">{{$t('a81')}}</div>
          </div>
            <!-- <div class="des-content"><span class="green">●  {{$t('a3')}} {{changeXRP(transaction.outcome.deliveredAmount.currency)}}</span></div> -->
          <div class="modified-box box">
            <div class="des-title"> {{$t('a82')}}</div>
            <div class="des-content">●  {{$t('a48')}} <span class="red"> {{$t('a47')}}</span> {{$t('a49')}} {{transaction.specification.destination.address}}</div>
            <div class="des-content"><span class="green">● {{$t('a50')}} {{transaction.outcome.fee}} {{$t('a83')}} {{transaction.outcome.balanceChanges[transaction.address][0].value}} {{$t('a32')}} {{transaction.outcome.balanceChanges[transaction.specification.destination.address][0].value}} {{changeXRP(transaction.outcome.deliveredAmount.currency)}}</span></div>
            <div class="des-content">●  {{$t('a51')}} {{changeXRP(transaction.outcome.deliveredAmount.currency)}} <span class="red">{{$t('a79')}}</span>  {{$t('a80')}} <span class="white">{{transaction.address}}</span> {{$t('a52')}}  <span class="white">{{transaction.specification.destination.address}}</span>  </div>
            <div class="des-content"><span class="green">●  {{$t('a53')}} {{transaction.outcome.fee}} from {{transaction.outcome.balanceChanges[transaction.address][0].value}} to {{transaction.outcome.balanceChanges[transaction.specification.destination.address][0].value}}</span></div>
          </div>
        </div>
        <!-- raw  -->
        <!-- <div class="raw-content" v-if="activeIndex == 1">
          <div class="object-raw-title">{{$t('a54')}}</div>
          <div class="raw-item">
            <span>{{$t('a55')}}</span>
            <span class="green">"{{transaction.id}}"</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a56')}}</span>
            <span class="red">{{transaction.outcome.ledgerVersion}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a57')}}</span>
            <span class="red">{{new Date(transaction.outcome.timestamp).toGMTString()}}</span>
          </div>
          <div class="raw-item indent"><span>{{$t('a58')}}</span>
            <span>{{$t('a54')}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a60')}}</span>
            <span class="green">{{transaction.type}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a61')}}</span>
            <span class="red">{{transaction.type}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a62')}}</span>
            <span class="red">{{transaction.sequence}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a63')}}：</span>
            <span class="red">{{transaction.outcome.indexInLedger}}</span>
          </div>
          <div class="raw-item indent">
            <span>{{$t('a64')}}：</span>
            <span class="white">{{$t('a54')}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a65')}}</span>
            <span class="green">{{transaction.outcome.deliveredAmount.value}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a66')}}</span>
            <span class="green">{{changeXRP(transaction.outcome.deliveredAmount.currency)}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a67')}}：</span>
            <span class="green">{{transaction.address}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a68')}}</span>
            <span class="green">{{transaction.id}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a69')}}</span>
            <span class="green">{{transaction.id}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a70')}}</span>
            <span class="green">{{transaction.address}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a71')}}</span>
            <span class="green">{{transaction.specification.destination.address}}</span>
          </div>
          <div class="raw-item indent">
            <span>{{$t('a72')}}：</span>
            <span class="white">{{$t('a54')}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a73')}}</span>
            <span class="red">37</span>
          </div>
          <div class="raw-item indent">
            <span>{{$t('a74')}}</span>
            <span class="white">Array[2]</span>
          </div>
          <div class="raw-item indent">
            <span>{{$t('a75')}}</span>
            <span class="white">{{$t('a59')}}</span>
          </div>
          <div class="raw-item indent">
            <span>{{$t('a76')}}</span>
            <span class="white">{{$t('a59')}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a77')}}</span>
            <span class="green">{{transaction.outcome.result}}</span>
          </div>
          <div class="raw-item indent">
            <span>{{$t('a78')}}</span>
            <span class="white">{{$t('a59')}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a65')}}</span>
            <span class="white">{{transaction.outcome.deliveredAmount.value}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a66')}}</span>
            <span class="white">{{changeXRP(transaction.outcome.deliveredAmount.currency)}}</span>
          </div>
          <div class="raw-item">
            <span>{{$t('a67')}}</span>
            <span class="white">{{transaction.address}}</span>
          </div>
        </div> -->
        <div class="raw-content" v-if="activeIndex == 1">
          <pre>{{JSON.stringify(transaction, null, 4)}}</pre>
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
  },
  methods:{
      changeXRP(coin) {
      if (coin == "XRP" || coin == "xrp") {
        var coin = this.$t('zhuCoin');
      }
      return coin;
    },
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
      color: #fff;
      font-size: 12px;
      .object-raw-title{
        font-size: 14px;
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