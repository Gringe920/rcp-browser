<template>
  <div class="headerall">
    <div class="headerbox">
      <div class="header_l">
        <img src="../assets/images/logo.png" alt="" srcset="">
      </div>  
      <div class="header_r" @click="show =!show">
        <div class="div1" >English</div>
        <img  v-if='!show' src="../assets/images/triangle_gray@2x.png" alt="" srcset="">
          <img  v-else  src="../assets/images/triangle_gray_upper@2x.png" alt="" srcset="">
        <div class="change" v-if="show">
          <div  v-for="item in languangetype" :key='item'>{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"",
  data(){
    return{
      show:false,
      languange:"English",
      languangetype:['中文简体','English','русский язык']
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

      .change{
        width: auto;
        position: absolute;
        top:40px;
        padding: 10px 0;
        background: #ffffff;
        right: -10px;
        min-width: 110px;
        div{
          padding: 10px;
          height:32px;
          display: flex;
          align-items: center;
       
          color:#8A8FA0;
          font-size: 12px;
        }
        div:hover{
            color: #00C28F;
          background:rgba(0,194,143,0.2);
        }
        .active{
          color: #00C28F;
          background:rgba(0,194,143,0.2);
        }
      }
      .div1 {
        color: #8A8FA0;
        font-size: 16px;
      }
      img{
        width: 8px;
        height: 8px;
        margin-left: 10px;
      }
    }
  }
}
</style>