<template>
  <div class="footerall">
    <div class="footerbox">
      <div>COPYRIGHT © 2019 RCP ALL RIGHTS RESERVED</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style  lang="scss">
.footerall {
  background: #080e23;
  width: 100%;
  position: absolute;
  bottom: 0;
  .footerbox {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    max-width: 1200px;
    align-items: center;
    width: 100%;
    height: 100px;
    div{
      text-align: center;
      font-size: 14px;
      color: #ffffff; 
    }
  }

}
</style>