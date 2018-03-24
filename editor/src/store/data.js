const state = {
  info: {},
  routes: []
}

const actions = {
  pull (context) {
    return window.fetch('/data')
      .then(response => response.json())
      .then(body => {
        let data = body.data
        context.commit('setInfo', data.info || {})
        context.commit('setRoutes', data.routes || [])
      })
  },

  push (context) {
    let info = context.state.info
    let routes = context.state.routes
    let data = { info, routes }
    return window.fetch('/data', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    })
  },

  addRoute (context, payload) {
    let route = payload.route
    let routes = context.state.routes
    let newRoutes = routes.concat(route)
    context.commit('setRoutes', newRoutes)
  },

  moveRoute (context, payload) {
    let fromIndex = payload.fromIndex
    let toIndex = payload.toIndex
    let routes = context.state.routes
    let newRoutes = routes.slice()
    let route = newRoutes.splice(fromIndex, 1)[0]
    newRoutes.splice(toIndex, 0, route)
    context.commit('setRoutes', newRoutes)
  },

  selectRoute (context, payload) {
    let route = payload.route
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
