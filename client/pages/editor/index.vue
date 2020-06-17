<template>
    <div class="editor-wrapper">
        <div class="editor-page-edit-wrapper">
            <componentLibs v-if="activeSideBar === 'componentLibs'"/>
        </div>
        <div class="editor-main">
            <editorPanel />
        </div>
    </div>
</template>
<script>
import componentLibs from './components/component-libs/Index'
import editorPanel from './components/editor-panel/Index'

export default {
    components: {
        componentLibs,
        editorPanel
    },
    data() {
        return {
            activeSideBar: 'componentLibs'
        }
    },
    created() {
        this.$store.dispatch('setPrjectData')
    }
}
</script>
<style lang="scss" scoped>
.editor-wrapper {
    display: flex;
    height: 100%;
    position: relative;
    .editor-page-edit-wrapper {
        width: 210px;
        padding: 0 1px;
    }
    .editor-main {
        flex: 1;
        background: #f0f2f5;
        position: relative;
    }
}
</style>