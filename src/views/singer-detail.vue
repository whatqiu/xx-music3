<template>
<div class='singer-detail'>
</div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'

export default {
// import引入的组件需要注入到对象中才能使用
	name: 'singer-detail',
	props: {
		singer: Object
	},
	async created() {
		// console.log(this.singer)
		const result = await getSingerDetail(this.singer)
		console.log(result)
	},
	data() {
	// 这里存放数据
	return {}
	}
}
</script>

<style lang='scss' scoped>
// @import url(); 引入公共css类
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
