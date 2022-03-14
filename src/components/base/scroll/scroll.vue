<template>
<div ref="rootRef">
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
		},
		probeType: {
			type: Number,
			default: 0
		}
	},
	emits: ['scroll'],
	setup(props, { emit }) {
		const rootRef = ref(null)
		const scroll = UseScroll(rootRef, props, emit)

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
