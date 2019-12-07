<template>
  <div class="headerall">
    <div class="headerbox">
      <div class="header_l">
        <img src="../assets/images/logo.png" alt="" srcset="">
      </div>  
      <div class="header_r">
        <div>English</div>
        <img src="../assets/images/triangle_gray@2x.png" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
      div {
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