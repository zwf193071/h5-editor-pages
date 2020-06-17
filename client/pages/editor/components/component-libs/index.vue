<template>
    <div class="components-libs-wrapper">
        <p class="page-title text-center">组件库</p>
        <el-scrollbar style="height: 100%;">
            <ul>
                <li v-for="(item, index) in componentsList" :key="index" class="clearfix paddingB30">
                    <div class="components-libs-title">
                        <p>{{item.title}}</p>
                    </div>
                    <div v-if="item.components && item.components.length">
                        <div
                            class="components-lib-item"
                            v-for="(element,i) in item.components"
                            :key="i"
                            @click="handleClick(element)"
                        >
                            <div class="lib-item-img"><i :class="[element.icon]"></i></div>
                            <p class="lib-item-title">{{element.title}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>
<script>
    import {camelCase} from 'lodash'
    import eleConfig from '../../ele-config';
    import {_he_register_components_object} from '@client/plugins/index'
    window._he_register_components_object=_he_register_components_object;
    export default {
        name: "component-libs",
        data() {
			return {
				componentsList: eleConfig
			}
        },
        methods: {
            handleClick(item) {
                let props = this.getComponentProps(item.elName);
				this.$store.dispatch('addElement', {...item, needProps: props})
            },
            /**
			 * 根据elname获取组件默认props数据
			 * @param elName
			 */
			getComponentProps(elName) {
                let elComponentData
				for (let key in _he_register_components_object) {
					if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
						elComponentData = _he_register_components_object[key];
						break;
					}
                }
				if (!elComponentData) return {}
				let props = {}
				for (let key in elComponentData.props) {
					props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
				}
				return props;
			}
        },
    }
</script>
<style lang="scss" scoped>
    .components-libs-wrapper {
        user-select: none;
        height: 100%;
        padding-top: 60px;
        position: relative;
        & ul {
            padding: 10px;
        }
    }
    .components-libs-title {
        margin-bottom: 16px;
        text-align: left;
    }

    .components-lib-item {
        color: #424242;
        text-align: center;
        background: #f4f4f4;
        width: 80px;
        float: left;
        padding: 6px 0;
        margin: 5px;
        border: 1px solid #dddddd;
        font-size: 12px;
        cursor: pointer;
        transition: All 0.3s ease-in-out;
        &:hover {
            background: #fff;
            border: 1px solid $primary;
            color: $primary;
        }
    }
</style>