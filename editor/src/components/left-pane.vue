<template>
  <div class='left-pane'>
    <div class='inf'>
      <input class='inf-t' placeholder='Name' v-model='info.name'>
      <input class='inf-v' placeholder='Version' v-model='info.version'>
    </div>

    <div class='rot'>
      <div class='rot-i'
        v-for='route in routes'
        :dragged='route === draggingRoute'
        @dragstart='handleDragStart(route)'
        @dragenter='handleDragEnter(route)'
        @dragend='handleDragEnd'
        @dragover='handleDragOver'>
        <div class='rot-c'
          @mouseenter='toggleDraggable($event, true)'
          @mouseleave='toggleDraggable($event, false)'>
          reorder
        </div>
        <div class='rot-p' @click='selectRoute(route)'>
          <span>{{ route.path }}</span>
          <span v-show='!route.path'>~</span>
        </div>
        <div class='rot-d' @click='removeRoute(route)'>remove_circle_outline</div>
      </div>
      <div class='rot-a' @click='addRoute'>
        <span class='rot-x'>add_circle_outline</span>
        <span class='rot-f'>Add new route</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      draggingRoute: null
    }),

    computed: {
      info () {
        return this.$store.state.info
      },
      routes () {
        return this.$store.state.routes
      }
    },

    methods: {
      handleDragStart (route) {
        this.draggingRoute = route
      },
      handleDragEnter (route) {
        let fromIndex = this.routes.indexOf(this.draggingRoute)
        let toIndex = this.routes.indexOf(route)
        this.$store.dispatch('moveRoute', { fromIndex, toIndex })
      },
      handleDragEnd () {
        this.draggingRoute = null
      },
      handleDragOver (event) {
        event.preventDefault()
      },
      toggleDraggable (event, value) {
        let element = event.target.parentElement
        element.setAttribute('draggable', value)
      },
      selectRoute (route) {
        this.$store.dispatch('selectRoute', { route })
      },
      addRoute () {
        let route = {}
        this.$store.dispatch('addRoute', { route })
      },
      removeRoute (route) {
        this.$store.dispatch('removeRoute', { route })
        this.$store.dispatch('selectRoute', {})
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/styles/variables';
  @import '~@/styles/mixins';

  .left-pane {
    padding: 24px;
  }

  .inf {
    display: flex;
    padding: 16px;
    background-color: $color-white;
    border-radius: 4px;
  }

  .inf-t {
    flex-grow: 1;
    min-width: 0;
    padding: 0;
  }

  .inf-v {
    width: 60px;
    min-width: 0;
    padding: 0;
    margin-left: 16px;
    text-align: right;
  }

  .rot {
    margin-top: 24px;
    background-color: $color-white;
    border-radius: 4px;
  }

  .rot-i {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 4px;
    user-select: none;

    &[dragged] {
      background-color: rgba($color-black, 0.05);
    }
  }

  .rot-c {
    @include icon;
    cursor: move;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .rot-p {
    flex-grow: 1;
    margin-left: 16px;
    cursor: pointer;

    &:hover {
      color: $color-primary;
    }
  }

  .rot-d {
    @include icon;
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .rot-a {
    display: flex;
    padding: 16px;
    border-top: 1px dashed $color-divider;
    cursor: pointer;

    &:first-child {
      border-top: 0;
    }
  }

  .rot-x {
    @include icon;
  }

  .rot-f {
    margin-left: 16px;
    color: $color-secondary-text;
  }
</style>
