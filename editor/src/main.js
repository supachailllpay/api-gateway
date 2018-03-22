import Vue from 'vue'
import App from './app'
import store from './store'
import elements from './elements'

Vue.use(elements)

void new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
