<template>
    <div class="editor-wrapper">
        <div class="editor-page-edit-wrapper">
            <componentLibs v-if="activeSideBar === 'componentLibs'"/>
        </div>
        <div class="editor-main">
            <editorPanel />
        </div>
        <div class="el-attr-edit-wrapper">
            <el-tabs v-model="activeAttr" stretch>
                <el-tab-pane label="属性" name="属性">
                    <attrEdit></attrEdit>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import componentLibs from './components/component-libs/Index'
import editorPanel from './components/editor-panel/Index'

import attrEdit from './components/attr-configure/attr-edit'

export default {
    components: {
        componentLibs,
        editorPanel,
        attrEdit
    },
    data() {
        return {
            activeAttr: '属性',
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
    .el-attr-edit-wrapper {
      width: 380px;
      padding: 0;
    }
}
</style>
<style lang="scss">
.el-attr-edit-wrapper {
    .el-tabs {
      height: 100%;
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 10px;
    }
    .el-tabs__content {
      height: calc(100% - 55px);
      & > div {
        height: 100%;
      }
      .attr-edit-inner {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
}
</style>