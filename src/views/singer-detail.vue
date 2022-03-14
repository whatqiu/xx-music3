<template>
<div class='singer-detail'>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getSingerDetail } from '@/service/singer'

export default {
// import引入的组件需要注入到对象中才能使用
	name: 'singer-detail',
	props: {
		singer: Object
	},
	async created() {
		const result = await getSingerDetail(this.singer)
		console.log(result)
	},
	components: {},
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
