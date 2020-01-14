<template>
    <!-- 帐户资源信息 -->
    <div class="accountsExplorer">
        <div class="balances">
            <div class="text2" >{{$t('a18')}}</div>
            <load v-if="balances.length <= 0 && !show"></load>
            <Empty v-if="balances.length <= 0 && show"></Empty>
            <div v-else class="infosBox" v-for=" (item,index) in balances"  :key="index">
                <div class="infostext">
                    <div class="l2">
                        <div class="yuan" :class="index %2 == 0?'lv':'lan'"></div>
                        <div class="coin">{{item['currency'] ? changeXRP(item['currency']):"-"}}</div>
                        <div class="num">{{item['value'] ? item['value']:"-"}}</div>
                    </div>
                    <div class="r2">
                        <img  v-if="theindex != index"   @click="changindex(index)" src="../../assets/images/triangle_gray@2x.png" alt="" srcset="" >
                        <img  v-else  @click="theindex = 1000" src="../../assets/images/triangle_gray_upper@2x.png" alt="" srcset="">
                    </div>
                </div>
                <div class="infodetails" v-if="theindex == index">
                    <div class="text">
                        <div class="l">{{$t('a19')}}</div>
                        <div class="r">{{item['currency'] ? changeXRP(item['currency']):"-"}}</div>
                    </div>
                    <div class="text">
                        <div class="l">{{$t('a20')}}</div>
                        <div class="r">{{item['value'] ? item['value']:"-"}}</div>
                    </div>
                    <div class="text" v-if="item['counterparty']">
                        <div class="l">{{$t('a21')}}:</div>
                    </div>
                    <div class="text text3" v-if="item['counterparty']">
                        <div class="l">{{item['counterparty'] ? item['counterparty']:"-"}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="history">
            <div class="text2">{{$t('a22')}}</div>
            <load v-if="history.length <= 0 && !show2 "></load>
            <Empty v-if="history.length <= 0 && show2 "></Empty>
            <div class="hisbox" @click="toID(item.id)" v-else v-for="(item,index) in history" :key='index'>
                <div class="his_l">
                    <div class="text">
                        <span v-if="item['type'] == 'payment'"
                              :class="item.specification && item.specification.source.address == $route.query.id ?'hon': 'hon2'">
                            {{item['type'] ? item['type']:"-"}}
                            {{item.specification.source.address == $route.query.id ? '-' : '+'}}
                        </span>&nbsp;
                        <span v-else> {{item['type'] ? item['type']:"-"}} </span>&nbsp;
                        <span v-if="item['type'] == 'payment'" :class="item.specification && item.specification.source && item.specification.source.address == $route.query.id ?'hon': 'hon2'">
                            {{ item.specification.source.maxAmount.value }} {{ changeXRP(item.specification.source.maxAmount.currency)}}
                        </span>
                    </div>
                </div>
                <div class="his_r" v-if="item['type'] == 'payment'">
                    {{item.specification.source.address == $route.query.id ? item.specification.destination.address : item.specification.source.address}}
                </div>
                <div class="his_r" v-else>
                    {{item['address']?item['address']:'-'}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "accountsExplorer",
        data() {
            return {
                theindex: 9999,
                show: false,
                show2: false
            };
        },
        watch: {
            balances(n, o) {
                var _self = this;
                _self.show = false;
                this.theindex = 9999;
                setTimeout(() => {
                    _self.show = true;
                }, 2000);
            },
            history() {
                var _self = this;
                _self.show2 = false;
                this.theindex = 9999;
                setTimeout(() => {
                    _self.show2 = true;
                }, 2000);
            }
        },
        props: {
            balances: {
                type: Array
            },
            history: {
                type: Array
            }
        },
        mouned() {},
        methods: {
            toID(ctx) {
                this.$router.push({ path: "home", query: { id: ctx } });
            },
            changeXRP(coin) {
                if (coin == "XRP" || coin == "xrp") {
                    var coin = 'RCP';
                }
                if (coin == "UST" || coin == "ust") {
                    var coin = 'USDT';
                }
                return coin;
            },
            changindex(index) {
                this.theindex = index;
            },
            changedate(index) {
                var date = new Date(index);
                var m = date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
                var d = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
                var h = date.getHours() > 9 ? date.getDate() : "0" + date.getDate();
                var min =
                    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
                var sec =
                    date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
                var c = date.getFullYear() + "-" + m + "-" + d;
                return c;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .accountsExplorer {
        min-height: 60vh;
        background: #151d36;
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        .balances {
            width: 50%;
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
                        .lv {
                            background: #00c28f;
                        }
                        .lan {
                            background: #00ccff;
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
                .infodetails {
                    background: rgba(216, 216, 216, 0.05);
                    padding: 20px 20px 20px 34px;

                    .text {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 12px;
                        padding: 5px 0;
                        .l {
                            color: #8a8fa0;
                        }
                        .r {
                            color: #ffffff;
                        }
                    }
                    .text3 {
                        .l {
                            color: #00ccff !important;
                        }
                    }
                }
            }
        }
        .history {
            padding-bottom: 20px;
            height: 100%;
            width: 50%;
            .text2 {
                padding: 12px 20px;
                font-size: 14px;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                border-bottom: 1px solid #323645;
            }
            .hisbox {
                display: flex;
                padding: 10px 20px;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                flex-wrap: wrap;
                .his_l {
                    height: 30px;
                    display: flex;
                    align-items: center;
                    padding: 10px 0;
                    img {
                        width: 14px;
                        height: 14px;
                        margin-right: 0px;
                    }
                    .text {
                        .lvc {
                            // text-transform: uppercase;
                            color: #00c28f;
                        }
                        .hon {
                            color: red;
                        }
                        .hon2 {
                            color: #00c28f;
                        }
                        color: #8a8fa0;
                        span {
                            color: #ffffff;
                        }
                    }
                }
                .his_r {
                    max-width: 100%;
                    overflow-x: scroll;
                    color: #00c28f;
                }
                .his_r::-webkit-scrollbar {
                    display: none;
                }
            }
        }
    }
    @media screen and (max-width: 700px) {
        .balances,
        .history {
            width: 100% !important;
            border: none !important;
        }
        .accountsExplorer {
            margin: 0 10px;
            min-height: 50vh !important;
        }
        .hisbox {
            border-bottom: 1px solid #323645;
        }
        .infodetails {
            padding: 10px !important;
        }
    }
</style>
