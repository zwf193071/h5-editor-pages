<template>
    <div class="editor-wrapper">
        <div class="editor-page-edit-wrapper">
            <componentLibs v-if="activeSideBar === 'componentLibs'"/>
        </div>
        <!--页面编辑区域-->
        <div class="editor-main">
            <div class="control-bar-wrapper">
                <controlBar
                    :scale.sync="canvasConfig.scale"
                    @showPreview="showPreviewFn"
                />
            </div>
            <editorPanel :scale.sync="canvasConfig.scale"/>
        </div>
        <div class="el-attr-edit-wrapper">
            <el-tabs v-model="activeAttr" stretch>
                <el-tab-pane label="属性" name="属性">
                    <attrEdit></attrEdit>
                </el-tab-pane>
                <el-tab-pane label="事件" name="事件">
                    <eventEdit></eventEdit>
                </el-tab-pane>
                <el-tab-pane label="JS脚本" name="脚本">
                    <scriptEdit></scriptEdit>
                </el-tab-pane>
            </el-tabs>
        </div>
        <previewPage
            v-if="showPreview"
            :pageData="projectData"
            :pageId="id"
            @closePreview="showPreview = false"></previewPage>
    </div>
</template>
<script>
import componentLibs from './components/component-libs/Index'
import editorPanel from './components/editor-panel/Index'

import attrEdit from './components/attr-configure/attr-edit'
import eventEdit from './components/attr-configure/event-edit'
import scriptEdit from './components/attr-configure/script-edit'
import controlBar from './components/control-bar'

import previewPage from './components/preview'

import {mapState} from 'vuex'

export default {
    components: {
        componentLibs,
        editorPanel,
        attrEdit,
        eventEdit,
        scriptEdit,
        controlBar,
        previewPage
    },
    data() {
        return {
            id: '5f2d0abcc83a2e42e7f2c86c', // 当前页面id
            activeAttr: '属性',
            activeSideBar: 'componentLibs',
            showPreview: false,
            canvasConfig: {
                scale: 1
            }
        }
    },
    computed: {
        ...mapState({
            projectData: state => state.editor.projectData
        })
    },
    created() {
        this.$store.dispatch('setPrjectData')
    },
    methods: {
        async showPreviewFn() {
            this.$axios.post('/page/update/' + this.id, this.projectData).then(() => {
                this.showPreview = true
            })
        },
    },
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
.control-bar-wrapper {
    position: absolute;
    top: -44px;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1000;
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