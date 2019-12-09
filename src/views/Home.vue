<template>
  <div class="homeall">
    <Header></Header>
    <div class="homeContent">
      <Search />
      <accountsExplorer v-if="false"/>
      <trade />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import accountsExplorer from './accountsExplorer'
import trade from './trade'
export default {
  data() {
    return {};
  },
  components: {
    accountsExplorer,trade
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}
</style>
