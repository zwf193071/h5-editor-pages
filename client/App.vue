<template>
  <div id="app">
    <div class="page-header-wrapper">
      <page-header></page-header>
    </div>
    <router-view class="sub-page"/>
  </div>
</template>
<script>
	import PageHeader from '@/components/page-header'
	export default {
		components: {
			[PageHeader.name]: PageHeader
		},
	}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 100%;
  padding-top: 48px;
  .page-header-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
}
.sub-page{
  position: relative;
  height: 100%;
}
</style>
