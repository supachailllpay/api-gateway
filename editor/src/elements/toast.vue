<template>
  <div class='toast' :visible='visible'>{{ message }}</div>
</template>

<script>
  export default {
    name: 'element-toast',

    props: {
      duration: Number
    },

    data: () => ({
      message: '',
      visible: false
    }),

    methods: {
      setTimer (callback) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(callback, this.duration)
      },
      show (message) {
        this.message = message
        this.visible = true
        this.setTimer(() => {
          this.visible = false
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/styles/variables';

  .toast {
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 600;
    display: none;
    max-width: 320px;
    padding: 16px;
    color: $color-white;
    background-color: rgba($color-black, 0.9);
    border-radius: 4px;

    &[visible] {
      display: block;
    }
  }

  @media (max-width: $breakpoint-small) {
    .toast {
      right: 24px;
      max-width: none;
    }
  }
</style>
