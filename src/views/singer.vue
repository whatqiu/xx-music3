<template>
<div class='singer' v-loading="!singers.length">
	<index-list
		:data="singers"
		@select="selectSinger"
	>
	</index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view>
</div>
</template>

<script>
	import { getSingerList } from '@/service/singer'
	import IndexList from '@/components/index-list/index-list'
	import storage from 'good-storage'
	import { SINGER_KEY } from '@/assets/js/constant'

export default {
	name: 'singer',
	async created() {
		const result = await getSingerList()
		this.singers = result.singers
	},
	methods: {
		selectSinger(singer) {
			this.selectedSinger = singer
			this.cacheSinger(singer)
			this.$router.push({
				path: `/singer/${singer.mid}`
			})
		},
		cacheSinger(singer) {
			storage.session.get(SINGER_KEY, singer)
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
.singer{
	position: fixed;
	width: 100%;
	top: 80px;
	bottom: 0;
}
</style>
