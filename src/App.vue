<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <router-view></router-view>
  
    <Player></Player>
  </div>
</template>

<script>
import MHeader from './components/M-header/M-header'
import Tab from './components/tab/Tab'
import Player from './components/player/Player'
export default {
  components:{
     MHeader,
     Tab,
     Player
  }
}
</script>
<style lang="stylus">

</style>
