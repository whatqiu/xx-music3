<template>
<div class='singer' v-loading="!singers.length">
	<index-list
		:data="singers"
		@select="selectSinger"
	>
	</index-list>
	<router-view :singer="selectedSinger"></router-view>
</div>
</template>

<script>
	import { getSingerList } from '@/service/singer'
	import IndexList from '@/components/index-list/index-list'

export default {
// import引入的组件需要注入到对象中才能使用
	name: 'singer',
	async created() {
		const result = await getSingerList()
		this.singers = result.singers
	},
	methods: {
		selectSinger(singer) {
			this.selectedSinger = singer
			this.$router.push({
				path: `/singer/${singer.mid}`
			})
		}
	},
	components: {
		IndexList
	},
	data() {
	// 这里存放数据
	return {
		singers: [],
		selectedSinger: null
	}
	}
}
</script>

<style lang='scss' scoped>
// @import url(); 引入公共css类
.singer{
	position: fixed;
	width: 100%;
	top: 80px;
	bottom: 0;
}
</style>
