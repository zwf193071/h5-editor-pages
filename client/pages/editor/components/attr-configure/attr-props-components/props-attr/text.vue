<template>
  <el-form-item label="文本内容：">
    <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入文本内容"
        v-model="tempText">
    </el-input>
  </el-form-item>
</template>

<script>
	export default {
		name: "attr-he-text",
		props: {
			text: String
		},
		data() {
			return {
				tempText: ''
			}
		},
		mounted() {
			this.tempText = this.text;
		},
		watch: {
			text() {
				this.tempText = this.text;
			},
			tempText() {
				console.log(1111)
				this.$emit('update:text', this.tempText)
			}
		}
	}
</script>

<style scoped>

</style>
