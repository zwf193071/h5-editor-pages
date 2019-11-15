<template>
    <div class="editor-page-edit-wrapper">
        <componentLibs v-if="activeSideBar === 'componentLibs'"/>
    </div>
</template>
<script>
import componentLibs from './components/component-libs/Index'
export default {
    components: {
        componentLibs
    },
    data() {
        return {
            activeSideBar: 'componentLibs'
        }
    },
}
</script>
<style lang="scss" scoped>
.editor-page-edit-wrapper {
    width: 210px;
    padding: 0 1px;
}
</style>