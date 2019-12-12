<template>
  <div class="headerall">
    <div class="headerbox">
      <div class="header_l">
        <img src="../assets/images/logo.png" alt="" srcset="">
      </div>  
      <div class="header_r" @click="show =!show">
        <div class="div1">{{languange}}</div>
        <img  v-if='!show' src="../assets/images/triangle_gray@2x.png" alt="" srcset="">
          <img  v-else  src="../assets/images/triangle_gray_upper@2x.png" alt="" srcset="">
        <div class="change" v-if="show" >
          <div @click="selectLang(item)"  :class="item.name == languange? 'active':''" v-for="(item,index) in langList" :key='index'>{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      show: false,
      languange: "English",
      languangetype: ["中文简体", "English", "русский язык"],
      localeOption: "",
      langList: [
        {
          name: "中文简体",
          icon: "china",
          isSelect: true,
          locale: "zh"
        },
        {
          name: "English",
          icon: "usa",
          isSelect: false,
          locale: "en"
        },
        {
          name: "русский язык",
          icon: "russia",
          isSelect: false,
          locale: "ru"
        }
      ]
    };
  },
  created() {
    const localeOption = window.localStorage.getItem("localeOption");
    console.log(localeOption, "localeOption");
    if(localeOption) this.setLangList(JSON.parse(localeOption))
  },
  methods: {
      setLangList(option) {
      // if (option.name == "zh" || option.name == "zhCN") {
      //   this.$store.commit("adAddress", this.rcp_info.ad_cn_address);
      // } else if (option.name == "en") {
      //   this.$store.commit("adAddress", this.rcp_info.ad_en_address);
      // } else {
      //   this.$store.commit("adAddress", this.rcp_info.ad_ru_address);
      // }
      this.langList = this.langList.map(item => {
        item.isSelect = false;
        if (item.name == option.name) {
          item.isSelect = true;
          this.languange = item.name
          }
        return item;
      });
    },
    selectLang(option) {
      this.setLangList(option);
      window.localStorage.setItem("localeOption", JSON.stringify(option));
      this.$i18n.locale = option.locale;
      console.log(this.$i18n);
    }
  }
};
</script>

<style lang="scss">
.headerall {
  background: #080e23;
  width: 100%;
  position: fixed;
  top: 0;

  .headerbox {
    padding: 0 5px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    max-width: 1200px;
    align-items: center;
    width: 100%;
    height: 60px;

    .header_l {
      img {
        width: 100px;
        height: 35px;
      }
    }
    .header_r {
      display: flex;
      align-items: center;
      position: relative;

      .change {
        width: auto;
        position: absolute;
        top: 40px;
        padding: 10px 0;
        background: #ffffff;
        right: -10px;
        min-width: 110px;
        div {
          padding: 10px;
          height: 32px;
          display: flex;
          align-items: center;

          color: #8a8fa0;
          font-size: 12px;
        }
        div:hover {
          color: #00c28f;
          background: rgba(0, 194, 143, 0.2);
        }
        .active {
          color: #00c28f;
          background: rgba(0, 194, 143, 0.2);
        }
      }
      .div1 {
        color: #8a8fa0;
        font-size: 16px;
      }
      img {
        width: 8px;
        height: 8px;
        margin-left: 10px;
      }
    }
  }
}
</style>