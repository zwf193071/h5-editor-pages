<template>
    <div class="editor-pane" @click="handleClickCanvas" @keyup.esc="handleKeyup">
        <div class="editor-pane-inner">
            <div class="editor-main" :style="{transform: 'scale('+scale+')', width: projectData.width + 'px', height: projectData.height + 'px'}">
                <div class="page-preview-wrapper" ref="canvas-panel" id="canvas-panel">
                    <!--页面组件列表展示-->
                    <edit-shape
                        v-for="item in activePage.elements"
                        :key="item.uuid"
                        :uuid="item.uuid"
                        :defaultStyle="item.commonStyle"
                        :style="getCommonStyle(item.commonStyle)"
                        @handleElementClick="handleElementClick(item.uuid)"
                        @resize="handleElementResize"
                        :active="item.uuid === activeElementUUID">
                        <component :is="item.elName" class="element-on-edit-pane" v-bind="{...item.propsValue, value: item.value}"/>
                    </edit-shape>
                </div>
                <div class="page-wrapper-menu-operation menu-item-on-edit-panel" :class="{active: activeElementUUID}">
                    <el-tooltip
                        v-for="(item, index) in menuOptions"
                        :key="index"
                        effect="dark"
                        :content="item.title"
                        placement="right"
                    >
                        <div class="menu-item menu-item-on-edit-panel" @click="handleElementCommand(item.value)">
                        <i class="menu-item-on-edit-panel" :class="[item.icon]"></i>
                        </div>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {_he_register_components_object} from '@client/plugins/index'
import editShape from '@/components/edit-shape'
import editorProjectConfig from '@client/pages/editor/DataModel'
import {mapState, mapGetters} from 'vuex'
window._he_register_components_object = _he_register_components_object
export default {
    props: {
        // canvas画板缩放
        scale: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            getCommonStyle: editorProjectConfig.getCommonStyle,
            menuOptions: [{
					title: '复制',
					icon: 'iconfont iconfuzhi',
					value: 'copy'
				}, {
					title: '删除',
					icon: 'iconfont iconshanchu',
					value: 'delete'
				}, {
					title: '字体放大',
					icon: 'iconfont iconzitifangda',
					value: 'fontA+'
				}, {
					title: '字体缩小',
					icon: 'iconfont iconzitisuoxiao',
					value: 'fontA-'
				}, {
					title: '字体加粗',
					icon: 'iconfont iconzitijiacu',
					value: 'fontB'
				}]
        }
    },
    components: {
        // 批量注册qk组件
        ..._he_register_components_object,
        // 画板组件
		[editShape.name]: editShape
    },
    computed: {
			...mapState({
				projectData: state => state.editor.projectData,
                activePageUUID: state => state.editor.activePageUUID,
                activeElementUUID: state => state.editor.activeElementUUID
            }),
			...mapGetters([
				'currentPageIndex',
				'activeElementIndex',
				'activeElement',
                'activePage'
			])
    },
    methods: {
        /**
         * 元素被点击
         * @param uuid
         */
        handleElementClick(uuid) {
            this.$store.dispatch('setActiveElementUUID', uuid);
        },
        handleClickCanvas(e) {
            if (!e.target.classList.contains('element-on-edit-pane') && !e.target.classList.contains('menu-item-on-edit-panel')) {
                this.$store.dispatch('setActiveElementUUID', '');
            }
        },
        /**
         * 对元素进行操作命令
         */
        handleElementCommand(command) {
            this.$store.dispatch('elementCommand', command)
        },
        handleElementResize(pos) {
            if (!pos) {
                // this.$store.dispatch('addHistoryCache')
                return;
            }
            this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle.left = pos.left
            // 更新元素commonStyle
            this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle = {
                ...pos
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.editor-pane {
    height: 100%;
    width: 100%;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0), linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 13px 13px;
    background-size: 26px 26px;
    display: flex;
    justify-content: center;
}
.editor-pane-inner {
    height: 100%;
    width: 100%;
    overflow: auto;
    padding: 20px;
}
.editor-main {
    border-radius: 3px;
    box-shadow: 0 3px 10px #dcdcdc;
    margin: 25px auto;
    position: relative;
    background: white;
    transform-origin: center top;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");
}
.page-preview-wrapper {
    height: 100%;
    position: relative;
}
.element-on-edit-pane {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.page-wrapper-menu-operation {
    position: absolute;
    right: -80px;
    top: 0;
    width: 0;
    background: white;
    color: #333;
    text-align: center;
    z-index: 1002;
    border-radius: 4px;
    display: none;
    transition: all 0.28s;
    opacity: 0;
    .menu-item {
        padding: 10px;
        cursor: pointer;
        &.i {
            font-size: 24px;
            line-height: 30px;
        }
        &:hover {
            background: rgba(37, 165, 137, 0.09);
            color: $primary;
            &.i {
                font-weight: bold;
                font-size: 26px;
            }
        }
    }
    &.active {
        display: block;
        width: 60px;
        opacity: 1;
    }
}
</style>