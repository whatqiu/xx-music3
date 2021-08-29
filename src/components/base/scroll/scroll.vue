<template>
<div >
<slot></slot>
</div>
</template>

<script>
	import UseScroll from './use-scroll'
	import { ref } from 'vue'

	export default {

	name: 'scroll',
	props: {
		click: {
			type: Boolean,
			default: true
		}
	},
	components: {},
	setup(props) {
		const rootRef = ref(null)
		const scroll = UseScroll(rootRef, props)

		return {
			rootRef,
			scroll
	}
		}
	}

</script>

<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
