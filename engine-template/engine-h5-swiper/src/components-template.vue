<template>
  <div class="quark-element-wrapper" @click="handleClick">
    <component :is="element.elName" class="quark-element" v-bind="element.propsValue"/>
  </div>
</template>

<script>
	import {_qk_register_components_object} from '@client/plugins/index'

	export default {
		name: "components-template",
		components: {
			// 批量注册qk组件
			..._qk_register_components_object,
		},
		props: {
			element: {
				type: Object,
				require: true
			}
		},
		methods: {
			async handleClick() {
				this.$emit('handleElementClick', this.element.events, this.element)
			}
		}
	}
</script>
