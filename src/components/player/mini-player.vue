<template>
<transition name="mini">
  <div class="mini-player"  v-show="!fullScreen" @click="showNormalPlayer">
    <div class="cd-wrapper">
      <div ref="cdRef" class="cd">
        <img
        ref="cdImgRef"
        width="40"
        height="40"
        :class="cdCls"
        :src="currentSong.pic" />
      </div>
    </div>
     <div
    ref="sliderWrapperRef"
    class="slider-wrapper"
    >
        <div class="slider-group">
          <div
          class="slider-page"
          v-for="song in playlist"
          :key="song.id"
          >
            <h2 class="name">{{ song.name }}</h2>
            <span class="desc">{{ song.singer }}</span>
          </div>
        </div>
      </div>
      <div class="control">
        <progress-circle
          :radius="32"
          :progress="progress"
        >
          <i
            class="icon-mini"
            :class="miniPlayerIcon"
            @click.stop="tooglePlay"
            ></i>
        </progress-circle>
      </div>
      <div class="control" @click.stop="showPlaylist">
        <i class="icon-playlist"></i>
      </div>
      <playlist ref="playlistRef"></playlist>
  </div>
  </transition>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import useCd from './use-cd'
import ProgressCircle from './progress-circle'
import useMiniSlider from './use-mini-slider'
import Playlist from './playlist'

export default {
  name: 'mini-player',
  components: {
    ProgressCircle,
    Playlist
  },
  props: {
    progress: {
      type: Number,
      default: 0
    },
    tooglePlay: Function
  },
  setup() {
    const playlistRef = ref(null)
    const store = useStore()
    const playing = computed(() => store.state.playing)
    const playlist = computed(() => store.state.playlist)
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)

    const { cdCls, cdRef, cdImgRef } = useCd()
    const { sliderWrapperRef } = useMiniSlider()

    const miniPlayerIcon = computed(() => {
      return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
    })

    function showNormalPlayer() {
      store.commit('setFullScreen', true)
    }
    function showPlaylist() {
      playlistRef.value.show()
    }

    return {
      fullScreen,
      playlist,
      currentSong,
      showNormalPlayer,
      playing,
      miniPlayerIcon,
      // cd
      cdCls,
      cdRef,
      cdImgRef,
      sliderWrapperRef,
      playlistRef,
      showPlaylist
    }
  }
}
</script>

<style lang='scss' scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
          max-width: 180px;
          overflow: hidden;
          display:-webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme-d;
    }
    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
