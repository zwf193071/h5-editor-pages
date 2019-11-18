<template>
    <div class="components-libs-wrapper scrollbar-wrapper">
        <p class="page-title text-center">组件库</p>
    </div>
</template>
<script>
    import eleConfig from '../../ele-config';
    export default {
        name: "component-libs",
        data() {
			return {
				componentsList: eleConfig
			}
		}
    }
</script>
<style lang="scss" scoped>
    .components-libs-wrapper {
        user-select: none;
        height: 100%;
        padding-top: 60px;
        position: relative;
    }
</style>