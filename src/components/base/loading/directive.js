import { createApp } from 'vue'
import Loading from './loading'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

const loadingDirective = {
	mounted(el, binding) {
		const app = createApp(Loading)
		const instance = app.mount(document.createElement('div'))
		el.instance = instance

		if (binding.value) {
			append(el)
		}
	},
	updated(el, binding) {
		// const title = binding.arg
		// if (typeof title !== 'undefined') {
		// 	el.instance.setTitle(title)
		// }
		if (binding.value !== binding.oldValue) {
			binding.value ? append(el) : remove(el)
		}
	}
}

function append(el) {
	const style = getComputedStyle(el)
	if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
		addClass(el, relativeCls)
	}
	el.appendChild(el.instance.$el)
}

function remove(el) {
	removeClass(el, relativeCls)
	el.removeChild(el.instance.$el)
	// console.log(el.instance.$el)
}

export default loadingDirective
