import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)

export default function useSlider(wrapperRef) {
	const slider = ref(null)
	const currentPageIndex = ref(0)
	onMounted(() => {
	const sliderVal =	slider.value = new BScroll(wrapperRef.value, {
			slide: true,
			click: true,
			scrollX: true,
			scrollY: false,
			momentum: false,
			bounce: false,
			probeType: 2
		})
		sliderVal.on('slideWillChange', (page) => {
			currentPageIndex.value = page.pageX
			// console.log(currentPageIndex.value)
		})
	})
	onUnmounted(() => {
		slider.value.destory()
	})

	return {
		slider,
		currentPageIndex
	}
}