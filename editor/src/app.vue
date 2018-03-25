<template>
  <div>
    <layout>
      <toolbar slot='toolbar' @save='save'></toolbar>
      <left-pane slot='left-pane'></left-pane>
      <right-pane slot='right-pane'></right-pane>
    </layout>

    <element-toast ref='toast'
      :duration='5000'>
    </element-toast>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Elements from '@/elements'
  import Layout from '@/components/layout'
  import Toolbar from '@/components/toolbar'
  import LeftPane from '@/components/left-pane'
  import RightPane from '@/components/right-pane'

  Elements.forEach(Element => {
    Vue.component(Element.name, Element)
  })

  export default {
    components: {
      'layout': Layout,
      'toolbar': Toolbar,
      'left-pane': LeftPane,
      'right-pane': RightPane
    },

    methods: {
      save () {
        this.$store.dispatch('push').then(() => {
          this.$refs.toast.show('Data has been saved successfully')
        }).catch(body => {
          this.$refs.toast.show(body.message)
        })
      }
    },

    mounted () {
      this.$store.dispatch('pull').catch(body => {
        this.$refs.toast.show(body.message)
      })
    }
  }
</script>

<style lang='scss'>
  @import '~@/styles/variables';
  @import '~@/styles/base';
</style>
