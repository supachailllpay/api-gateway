import select from './select'
import spinner from './spinner'
import toast from './toast'

export default {
  install (Vue, options) {
    let elements = [select, spinner, toast]
    elements.forEach(element => {
      Vue.component(element.name, element)
    })
  }
}
