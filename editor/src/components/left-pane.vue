<template>
  <div class='left-pane'>
    <div class='inf'>
      <input class='inf-t' type='text' placeholder='Name' v-model='info.name'>
      <input class='inf-v' type='text' placeholder='Version' v-model='info.version'>
    </div>

    <div class='rot'>
      <div class='rot-i'
        v-for='route in routes'
        :moving='route === movingRoute'
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
      <div class='rot-a'>
        <div class='rot-x' @click='addRoute'>add_circle_outline</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      movingRoute: null
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
        this.movingRoute = route
      },
      handleDragEnter (route) {
        let fromIndex = this.routes.indexOf(this.movingRoute)
        let toIndex = this.routes.indexOf(route)
        this.$store.dispatch('moveRoute', { fromIndex, toIndex })
      },
      handleDragEnd () {
        this.movingRoute = null
      },
      handleDragOver (event) {
        event.preventDefault()
      },
      toggleDraggable (event, value) {
        let element = event.target.parentElement
        element.setAttribute('draggable', value)
      },
      addRoute () {
        let route = {}
        this.$store.dispatch('addRoute', { route })
      },
      removeRoute (route) {
        this.$store.dispatch('removeRoute', { route })
        this.$store.dispatch('selectRoute', {})
      },
      selectRoute (route) {
        this.$store.dispatch('selectRoute', { route })
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

    &[moving] {
      background-color: rgba($color-black, 0.05);
    }
  }

  .rot-c {
    @include icon;
    cursor: move;
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
  }

  .rot-a {
    display: flex;
    justify-content: flex-end;
    padding: 16px;

    &:not(:first-child) {
      border-top: 1px dashed $color-divider;
    }
  }

  .rot-x {
    @include icon;
    cursor: pointer;
  }
</style>
