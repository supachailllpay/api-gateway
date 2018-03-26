import util from './util'

const state = {
  info: {},
  routes: [],
  selectedRoute: null
}

const actions = {
  pull (context) {
    return util.fetch('/data')
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
    let init = {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    }
    return util.fetch('/data', init)
  },

  addRoute (context, payload) {
    let route = payload.route
    let routes = context.state.routes
    let newRoutes = routes.concat(route)
    context.commit('setRoutes', newRoutes)
  },

  removeRoute (context, payload) {
    let route = payload.route
    let routes = context.state.routes
    let newRoutes = routes.filter(other => other !== route)
    context.commit('setRoutes', newRoutes)
  },

  moveRoute (context, payload) {
    let fromIndex = payload.fromIndex
    let toIndex = payload.toIndex
    let routes = context.state.routes
    let newRoutes = util.move(routes, fromIndex, toIndex)
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
