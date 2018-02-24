<template>
  <div class='toolbar'>
    <div class='title'>
      <a href='/'>{{ info.title || 'Project Name' }}</a>
      <span>v{{ info.version || '0.0.0' }}</span>
    </div>

    <div class='icon' @click='save'>save</div>
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

  .title {
    flex-grow: 1;
    font-size: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .icon {
    @include icon;
    color: $color-white;
    cursor: pointer;
  }
</style>
