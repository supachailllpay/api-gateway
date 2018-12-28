<template>
  <div class='toolbar'>
    <div class='tle'>
      <a href='/'>{{ info.name || 'api-gateway' }}</a>
      <span>v{{ info.version || '0.2.1' }}</span>
    </div>

    <div class='icn' @click='save'>save</div>
  </div>
</template>

<script>
  export default {
    computed: {
      info () {
        return this.$store.state.info
      }
    },

    methods: {
      save () {
        this.$emit('save')
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/styles/variables';
  @import '~@/styles/mixins';

  .toolbar {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 24px;
    color: $color-white;
    background-color: $color-primary;
  }

  .tle {
    flex-grow: 1;
    font-size: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .icn {
    @include icon;
    color: $color-white;
    cursor: pointer;
  }
</style>
