<template>
  <div class="components-page-header">
    <div class="logo-wrapper cursor-pointer" @click="$router.push('/')">
      <img src="../common/images/logo.png" alt="">
      <span>仿H5</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "page-header",
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
  .components-page-header {
    height: 48px;
    line-height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(195, 195, 195, 0.6);
  }


  .logo-wrapper {
    font-size: 18px;
    font-family: Yuanti SC;
    color: rgba(0, 0, 0, 1);
    line-height: 44px;
    display: inline-block;
    img {
      position: relative;
      top: 6px;
      width: 26px;
      height: 28px;
      display: inline-block;
      margin-right: 8px;
    }
  }
</style>
