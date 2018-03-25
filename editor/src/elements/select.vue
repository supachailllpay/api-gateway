<template>
  <div class='select'>
    <input class='input' type='text' readonly
      :placeholder='label'
      :value='text'
      @focus='toggle'
      @blur='toggle'>
    <div class='menu' :visible='visible'>
      <div class='item'
        v-for='option in options'
        @mousedown='select(option)'>
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'element-select',

    props: {
      label: String,
      value: String,
      options: Array
    },

    data: () => ({
      visible: false
    }),

    computed: {
      text () {
        return this.options.reduce((text, option) => (
          option.value === this.value ? option.label : text
        ), '')
      }
    },

    methods: {
      toggle () {
        this.visible = !this.visible
      },
      select (option) {
        this.$emit('input', option.value)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/styles/variables';

  .select {
    position: relative;
  }

  .input {
    width: 100%;
    padding: 0;

    .select[right] & {
      text-align: right;
    }
  }

  .menu {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 800;
    display: none;
    padding: 8px 0;
    background-color: $color-white;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 $color-divider;
    overflow-y: auto;

    .select[right] & {
      left: initial;
      right: 0;
    }

    &[visible] {
      display: block;
    }
  }

  .item {
    padding: 16px;
    cursor: pointer;

    &:hover {
      background-color: rgba($color-black, 0.05);
    }
  }
</style>
