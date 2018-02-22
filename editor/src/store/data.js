const state = {
  info: {},
  routes: [],
  selectedRoute: {}
}

const actions = {
  pull (context) {
    window.state = state
    return window.fetch('/data')
      .then(response => response.json())
      .then(data => {
        context.commit('setInfo', data.info || {})
        context.commit('setRoutes', data.routes || [])
      })
  },

  push (context) {
    let info = context.state.info
    let routes = context.state.routes
    let data = { info, routes }
    return window.fetch('/data', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    })
  },

  setRoutes (context, routes) {
    context.commit('setRoutes', routes)
  },

  selectRoute (context, route) {
    context.commit('setSelectedRoute', route)
  }
}

const mutations = {
  setInfo (state, info) {
    state.info = info
  },

  setRoutes (state, routes) {
    state.routes = routes
  },

  setSelectedRoute (state, route) {
    state.selectedRoute = route
  }
}

export default {
  state,
  actions,
  mutations
}
