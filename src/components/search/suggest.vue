<template>
  <div
    ref="rootRef"
    class="suggest"
    v-no-result:[noResultText]="noResult"
    v-loading:[loadingText]="loading">
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
    </ul>
    <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
import usePullupLoad from './use-pull-up-load'

export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const singer = ref(null)
    const songs = ref([])
    const hasMore = ref(false)
    const page = ref(1)
    const loadingText = ref('')
		const noResultText = ref('抱歉，暂无搜索结果')

    const { isPullUpLoad, rootRef } = usePullupLoad(searchMore)

    const loading = computed(() => {
      return !singer.value && !songs.value.length
    })

		const noResult = computed(() => {
      return !singer.value && !songs.value.length && !hasMore.value
    })

    const pullUpLoading = computed(() => {
        return isPullUpLoad.value && hasMore.value
        // return true
      })

    watch(() => props.query, async (newQuery) => {
        if (!newQuery) {
          return
        }
        await searchFirst()
      }
    )

    async function searchFirst() {
      if (!props.query) {
        return
      }
      page.value = 1
      songs.value = []
      singer.value = null
      hasMore.value = true

      const result = await search(props.query, page.value, props.showSinger)
      songs.value = await processSongs(result.songs)
      singer.value = result.singer
      hasMore.value = result.hasMore
    }

    async function searchMore() {
      console.log('searchmore')
      if (!hasMore.value) {
        return
      }
      page.value++
      const result = search(props.query, page.value, props.showSinger)
      songs.value = songs.value.concat(await processSongs(result.songs))
      hasMore.value = result.hasMore
    }

    return {
      singer,
      songs,
      hasMore,
      // pullup
      rootRef,
      pullUpLoading,
      // suggest
      loading,
      loadingText,
			noResultText,
      noResult
    }
  }
}
</script>

<style lang='scss' scoped>
.suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
	.g-relative {
		position: inherit;
	}
</style>
