import BScroll from '@better-scroll/core'
import { onMounted, onUnmounted, ref } from 'vue'
// import ObserveDOM from '@better-scroll/observe-dom'

// BScroll.use(ObserveDOM)

export default function useScroll (wrapperRef, options) {
	const scroll = ref(null)

	onMounted(() => {
		scroll.value = new BScroll(wrapperRef.value, {
			ObserveDOM: true,
			...options
		})
	})

	onUnmounted(() => {
		scroll.value.destroy()
	})
}
