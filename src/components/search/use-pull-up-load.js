import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted } from 'vue'

BScroll.use(Pullup)
BScroll.use(ObserveDOM)

export default function usePullupLoad(requestData) {
	const scroll = ref(null)
	const rootRef = ref(null)
	const isPullUpLoad = ref(false)
	onMounted(() => {
		const scrollVal = scroll.value = new BScroll(rootRef.value, {
			pullUpLoad: true,
			ObserveDOM: true,
			click: true
		})

		scrollVal.on('pullingUp', pullingUpHandler)
		console.log(scrollVal)

		async function pullingUpHandler() {
			isPullUpLoad.value = true
			console.log(11)
			await requestData()
			scrollVal.finishPullUp()
			scrollVal.refresh()
			isPullUpLoad.value = false
		}
	})
	onUnmounted(() => {
		scroll.value.destroy()
	})

	return {
		scroll,
		isPullUpLoad,
		rootRef
	}
}
