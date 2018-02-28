<template>
  <div>
    <layout>
      <toolbar slot='toolbar' @save='save'></toolbar>
      <left-pane slot='left-pane'></left-pane>
      <right-pane slot='right-pane'></right-pane>
    </layout>

    <spinner :hidden='!loading'></spinner>
  </div>
</template>

<script>
  import Spinner from '@/components/spinner'
  import Layout from '@/components/layout'
  import Toolbar from '@/components/toolbar'
  import LeftPane from '@/components/left-pane'
  import RightPane from '@/components/right-pane'

  export default {
    components: {
      'spinner': Spinner,
      'layout': Layout,
      'toolbar': Toolbar,
      'left-pane': LeftPane,
      'right-pane': RightPane
    },

    data: () => ({
      loading: false
    }),

    methods: {
      request (action) {
        this.loading = true
        action().then(() => {
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
      },
      save () {
        this.request(() => (
          this.$store.dispatch('push')
        ))
      }
    },

    mounted () {
      this.request(() => (
        this.$store.dispatch('pull')
      ))
    }
  }
</script>

<style lang='scss'>
  @import '~@/styles/variables';
  @import '~@/styles/base';
</style>
