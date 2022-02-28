<template>
<div class='loading'>
	<div class="loading-content">
		<img width="24" height="24" src="./loading.gif">
		<p class="desc"> {{title}}</p>
	</div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
	name: 'loading',
	components: {},
	data() {
	// 这里存放数据
	return {
		title: '正在载入...'
	}
	},
	methods: {
		setTitle(title) {
			this.title = title
		}
	}
}
</script>

<style lang='scss' scoped>
// @import url(); 引入公共css类
  .loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
		.loading-content {
			text-align: center;
			.desc {
				line-height: 20px;
				font-size: $font-size-small;
				color: $color-text-l;
			}
		}
}
</style>
