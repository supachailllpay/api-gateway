import Vue from 'vue'
import App from './app'
import store from './store'

void new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
