<template>
  <div id="app">
    <router-view class="sub-page"/>
  </div>
</template>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.sub-page{
  position: relative;
  height: 100%;
}
</style>
