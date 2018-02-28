<template>
  <div class='container'>
    <div class='info'>
      <input class='info-title' placeholder='Project Name' v-model='info.title'>
      <input class='info-version' placeholder='Version' v-model='info.version'>
    </div>

    <div class='routes'>
      <div class='routes-item'
        v-for='route in routes'
        :class='{ selected: route === draggingRoute }'
        @dragover='allowDrop'
        @dragstart='handleDragStart(route)'
        @dragenter='handleDragEnter(route)'
        @dragend='handleDragEnd'
        @click='selectRoute(route)'>
        <div class='routes-item-icon'
          @mouseenter='toggleDraggable($event, true)'
          @mouseleave='toggleDraggable($event, false)'>reorder</div>
        <div class='routes-item-path'>
          {{ route.path  }}
          <span class='routes-item-path-placeholder' v-show='!route.path'>t(-_-t)</span>
        </div>
        <div class='routes-item-icon' @click='removeRoute(route)'>delete</div>
      </div>
      <div class='routes-new' @click='addRoute'>
        <span class='routes-new-icon'>add</span>
        <span class='routes-new-text'>Add new route</span>
      </div>
    </div>
  </div>
</template>

<script>
  const move = function (array, fromIndex, toIndex) {
    let newArray = array.slice()
    let element = newArray.splice(fromIndex, 1)[0]
    newArray.splice(toIndex, 0, element)
    return newArray
  }

  export default {
    computed: {
      info () {
        return this.$store.state.info
      },
      routes () {
        return this.$store.state.routes
      }
    },

    data: () => ({
      draggingRoute: null
    }),

    methods: {
      allowDrop (event) {
        event.preventDefault()
      },
      handleDragStart (route) {
        this.draggingRoute = route
      },
      handleDragEnter (route) {
        let routes = this.routes
        let fromIndex = routes.indexOf(this.draggingRoute)
        let toIndex = routes.indexOf(route)
        if (fromIndex === toIndex) return
        let newRoutes = move(routes, fromIndex, toIndex)
        this.$store.dispatch('setRoutes', newRoutes)
      },
      handleDragEnd (event) {
        this.draggingRoute = null
      },
      toggleDraggable (event, value) {
        let element = event.target.parentElement
        element.setAttribute('draggable', value)
      },
      selectRoute (route) {
        this.$store.dispatch('selectRoute', route)
      },
      addRoute () {
        let route = {}
        let newRoutes = this.routes.concat(route)
        this.$store.dispatch('setRoutes', newRoutes)
        this.selectRoute(route)
      },
      removeRoute (route) {
        let removingRoute = route
        let newRoutes = this.routes.filter(route => route !== removingRoute)
        this.$store.dispatch('setRoutes', newRoutes)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/styles/variables';
  @import '~@/styles/mixins';

  .container {
    padding: 24px;
  }

  .info {
    @include card;
    display: flex;
  }

  .info-title {
    flex-grow: 1;
    min-width: 0;
    padding: 0;
  }

  .info-version {
    width: 60px;
    min-width: 0;
    padding: 0;
    margin-left: 16px;
    text-align: right;
  }

  .routes {
    @include card;
    padding: 0;
    margin-top: 24px;
  }

  .routes-item {
    display: flex;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      color: $color-primary;
    }

    &.selected {
      background-color: $color-background;
    }
  }

  .routes-item-icon {
    @include icon;
    transition: opacity 0.2s ease-in-out;
    cursor: move;
    opacity: 0.1;
    user-select: none;

    &:hover {
      opacity: 1;
    }
  }

  .routes-item-path {
    flex-grow: 1;
    margin-left: 16px;
  }

  .routes-item-path-placeholder {
    color: $color-secondary-text;
  }

  .routes-new {
    display: flex;
    padding: 16px;
    border-top: 1px dashed $color-divider;
    cursor: pointer;
  }

  .routes-new-icon {
    @include icon;
    margin-right: 16px;
  }

  .routes-new-text {
    color: $color-secondary-text;
  }
</style>
