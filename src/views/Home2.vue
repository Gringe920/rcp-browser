<template>
    <div class="homeall homeall2">
        <Header></Header>
        <div class="homeContent">
            <Search class="search2" v-model="searchContent" @search="handleSearch" :msg='msg'/>
            <!-- 搜索框下面内容 -->
            <div class="home-box" v-if="shouldShowAddressTrade == ''">
                <ul class="main-data">
                    <li>
                        <h4>{{getLedger['ledgerVersion']?getLedger['ledgerVersion']:'-'}}</h4>
                        <p>Current block height</p>
                    </li>
                    <li>
                        <h4>{{fee}}</h4>
                        <p>Service Charge</p>
                    </li>

                    <li>
                        <h4>{{
                            rcpData.issue || '-'
                            }}</h4>
                        <p>RCP General Distribution</p>
                    </li>
                </ul>

                <ul class="main-data">
                    <li>
                        <h4>{{rcpData.miner || '-'}}</h4>
                        <p>Daily RCP Gain </p>
                    </li>
                    <li>
                        <h4>{{rcpData.total_flow || '-'}}</h4>
                        <p>RCP Total Circulation</p>
                    </li>

                    <li>
                        <h4>{{
                            rcpData.destroy || '-'
                            }}</h4>
                        <p>RCP Total Destruction</p>
                    </li>
                </ul>

                <section class="main-block">
                    <h4 class="main-block-title">Recent Ledgers</h4>
                    <ul>
                        <li class="main-block-th">
                            <span>Ledger Index</span>
                            <span>TX Count</span>
                            <!--<span>Total RCP</span>-->
                            <span>Close Time(UTC)</span>
                            <span><em>Ledger Hash</em></span>
                        </li>
                        <li v-for="item in ledgerData" :key="item.ledgerVersion">
                            <span><small>Ledger Index</small><em>{{item.ledgerVersion}}</em></span>
                            <span><small>TX Count</small><em>{{(item.transactionHashes && item.transactionHashes.length) || '0'}}</em></span>
                            <!--<span><small>Total RCP</small><em>{{item.totalDrops / 1000000 - 193 + 52000000}}</em></span>-->
                            <span><small>Close Time(UTC)</small><em>{{item.closeTime}}</em></span>
                            <span><em>{{item.stateHash}}</em></span>
                        </li>
                    </ul>
                </section>
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
    import axios from "axios";
    import { log } from "util";
    export default {
        data() {
            return {
                searchContent: this.$route.query.id || "",
                shouldShowAddressTrade: "",
                fee: "",
                ledgerVersion: "",
                balances: [],
                transactions: [],
                ledgerData: [],
                msg: "",
                active_address_count: 0,
                transaction: "",
                getLedger: {},
                rcpData: {}
            };
        },
        watch: {
            $route() {
                if (this.$route.query.id) {
                    this.handleSearch(this.$route.query.id);
                    this.searchContent =this.$route.query.id
                }
            }
        },
        created() {
            //active_address_count
            this.getRcpData();
            if(this.$route.query.active_address_count){
                this.active_address_count = this.$route.query.active_address_count;
            }else{
                this.getCount();

            }
            if (this.searchContent) {
                this.handleSearch(this.searchContent);
            } else {
                this.initData();
            }
        },
        components: {
            accountsExplorer,
            trade
        },
        methods: {
            getRcpData (){
                axios({
                    url : "https://api.rcproto.org/service/issue_info",
                }).then(res => {
                    if(res.data.error_code == 0){
                        this.rcpData = res.data.data || 0;
                    }else{
                        this.rcpData = {};
                    }

                }).catch(e => {
                    this.rcpData = {};
                })
            },
            async getLedgerData  (){
                try {
                    let ledger = await API.getLedger({
                        includeTransactions : true,
                        // ledgerVersion : 428297
                    });
                    console.log(ledger);
                    let ledgerData = [ledger];
                    for(let i = 1; i <= 20; i ++){
                        // console.log(ledger.ledgerVersion - i);
                        setTimeout(() => {
                            API.getLedger({
                                ledgerVersion : ledger.ledgerVersion - i,
                                includeTransactions : true,
                            }).then(res => {
                                // console.log(res);
                                ledgerData.push(res);
                            }).catch(e => {

                            });
                        }, i * 100)
                    }
                    ledgerData.sort((a, b) => {
                        return b.ledgerVersion - a.ledgerVersion
                    });
                    this.ledgerData = ledgerData;
                }catch (e) {
                    console.log(e);
                }

            },
            getCount (){
                axios({
                    url : "https://api.rcproto.org/service/rcp_info",
                }).then(res => {
                    if(res.data.error_code == 0){
                        this.active_address_count = res.data.data.active_address_count || 0;
                    }else{
                        this.active_address_count = 0;
                    }

                }).catch(e => {
                    this.active_address_count = 0;
                })
            },
            //getFee  getLedgerVersion 内容填充
            async initData() {
                try {
                    if(API.isConnected()){

                    }else{
                        await API.disconnect();
                        await API.connect();
                    }
                    this.fee = await API.getFee();
                    this.ledgerVersion = await API.getLedgerVersion();
                    this.getLedger = await API.getLedger();
                    this.getLedgerData();
                    API.on('ledger', async ledger => {
                        // console.log(ledger);
                        API.getLedger({
                            ledgerVersion : ledger.ledgerVersion,
                            includeTransactions : true,
                        }).then(res => {
                            this.ledgerData.unshift(res);
                            if(this.ledgerData.length >= 25){
                                this.ledgerData = this.ledgerData.slice(0, 24);
                            }
                        });
                        this.fee = await API.getFee();
                        this.ledgerVersion = await API.getLedgerVersion();
                        this.getLedger = await API.getLedger();
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            async handleSearch(ctx) {
                this.msg = "";
                //验证输入内容是地址或者ID
                if (API.isValidAddress(ctx)) {
                    //地址:rGSZEScvDJ6sXwyyq31iVAzmjSncV29TLR
                    // rGii6WxApQAjjndZZQbSzPpY7pmikfnv2Y
                    //  rERuBTMQ9jSKAhbNNkKv95MRCr9GGRmqFicd
                    //  rERuBTMQ9jSKAhbNNkKv95MRCr9GGRmqFi
                    // rPCsx4XtaepmpNUJZTJxQCAawdEvew8czk
                    this.$router.push({ path: "home", query: { id: ctx } });
                    try {
                        this.shouldShowAddressTrade = "address";
                        if(API.isConnected()){

                        }else{
                            await API.disconnect();
                            await API.connect();
                        }
                        this.balances = [];
                        this.transactions = [];
                        this.balances = await API.getBalances(ctx);
                        this.transactions = await API.getTransactions(ctx, {
                            binary : true,
                            excludeFailures : true,
                            limit : 100,
                            // maxLedgerVersion : 3167998,
                            minLedgerVersion : 3164956,
                        });
                    } catch (err) {
                        console.log(err);
                        this.msg = this.$t("a13");
                        this.shouldShowAddressTrade = "";
                    }
                } else if (/^[A-F0-9]{64}$/.test(ctx)) {
                    //大写字母跟数字
                    //交易ID:C93F0E3A1C356BC5326A14726D415D6DDC5F657E51D32F3001EF8BABC10D90B0
                    //DE026CC194F4CD2F499952C2D732F0CFF33D0FDF931637A79465CA4188B7149A
                    this.$router.push({ path: "home", query: { id: ctx } });
                    try {
                        if(API.isConnected()){

                        }else{
                            await API.disconnect();
                            await API.connect();
                        }
                        this.transaction = "";
                        this.transaction = await API.getTransaction(ctx);
                        this.shouldShowAddressTrade = "trade";
                    } catch (err) {
                        this.shouldShowAddressTrade = "";
                        this.msg = this.$t("a14");
                    }
                } else {
                    this.msg = this.$t("a15");
                    this.shouldShowAddressTrade = "";
                    //地址或交易TX有误
                }
            },
            changedate(index) {
                return index;
                var date = new Date(index);
                var m =
                    date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
                var d = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
                var h = date.getHours() > 9 ? date.getDate() : "0" + date.getDate();
                var min =
                    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
                var sec =
                    date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

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
<style lang="scss">
    .homeall2{
        .main-block{
            margin-top: 20px;
            background: #080e23;
            box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.06);
            .main-block-title{
                font-size: 18px;
                padding: 15px;
                color: #fff;
                background: #080e23;
                border-bottom: solid 1px #151d36;
            }
            ul{
                padding: 15px;
                li{
                    border-bottom: solid 1px #151d36;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 8px 0;
                    min-height: 48px;
                    align-items: center;
                    color:#fff;
                    font-size: 14px;
                    background: #080e23;
                    &.main-block-th{
                        /*background:rgba(242,246,250,1);*/
                        min-height: 30px;
                        font-size: 12px;
                        padding: 0 8px;
                    }
                    span{
                        word-wrap:break-word;
                        display: flex;
                        align-items: center;
                        width: 10%;
                        overflow: hidden;
                        em{
                            display: block;
                            width: 100%;
                            font-style: normal;
                            word-wrap:break-word;
                        }
                        small{
                            display: none;
                        }
                        &:nth-child(1){
                            color: #1A63A4;
                        }
                        &:nth-child(3){
                            width: 20%;
                        }
                        &:nth-child(4){
                            width: 60%;
                            justify-content: flex-end;
                            em{
                                text-align: right;
                            }
                        }
                        &:nth-child(5){
                            width: 50%;
                            justify-content: flex-end;
                            em{
                                text-align: right;
                            }
                        }
                    }
                    @media screen and (max-width: 720px){
                        margin-top: 20px;
                        border-bottom: none;
                        box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.06);
                        padding: 15px 10px;
                        &.main-block-th{
                            display: none;
                        }
                        span{
                            width: 100%;
                            justify-content: space-between;
                            margin-top: 8px;
                            &:nth-child(1){
                                em{
                                    font-size: 24px;
                                }
                            }
                            em{
                                display: inline-block;
                                width: auto;
                                font-size: 16px;
                            }
                            &:nth-child(3), &:nth-child(4){
                                width: 100%;
                            }
                            &:nth-child(5){
                                width: 100%;
                                margin-top: 12px;
                                em{
                                    display: block;
                                    width: 100%;
                                }
                            }
                            small{
                                display: inline-block;
                                margin-right: 8px;
                                color: #ccc;
                            }
                        }
                    }
                }
            }

            @media screen and (max-width: 720px){
                width: 96%;
                margin: 0 auto;
                background: none;
                box-shadow: none;
                ul{
                    padding: 0;
                }
            }
        }
        .main-data{
            display: flex;
            justify-content: space-between;
            padding-top: 20px;
            li{
                display: flex;
                width: 32%;
                min-height: 140px;
                background: #080e23;
                box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.06);
                align-items: center;
                align-content: center;
                justify-content: center;
                flex-wrap: wrap;
                h4{
                    color: #1A63A4;
                    font-size: 26px;
                    width: 100%;
                    text-align: center;
                    line-height: 1;
                    padding: 0 5px;
                    word-wrap:break-word;
                }
                p{
                    padding-top: 8px;
                    font-size: 18px;
                    color: #fff;
                }
            }
            @media screen and (max-width: 720px){
                flex-wrap: wrap;
                width: 96%;
                margin: 0 auto;
                li{
                    /*width: 48%;*/
                    margin-bottom: 10px;
                    min-height: 120px;
                    width: 100%;
                    h4{
                        font-size: 24px;
                    }
                    p{
                        font-size: 14px;
                    }
                    &:nth-child(3){
                        width: 100%;
                    }
                }
            }
        }
        .msg{
            width: 100%;
            color: #1A63A4;

        }
        .search2.search {
            @media screen and (max-width: 720px){
                width: 96%;
                margin: 0 auto;
            }
            .msg{
                width: 100%;
                color: #1A63A4;

            }
            .searchbox {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;
                height: 48px;
                position: relative;
                input {
                    display: block;
                    margin-right: 0;
                    height: 100%;
                    width: 100%;
                }
                .go{
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 100%;
                    width: 80px;
                    background: #1A63A4;
                    color: #fff;
                    font-size: 18px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

            }
        }
    }

</style>
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
