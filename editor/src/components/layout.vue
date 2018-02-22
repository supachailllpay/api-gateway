<template>
  <div class='layout'>
    <div class='toolbar'>
      <slot name='toolbar'></slot>
    </div>

    <div class='left-pane'>
      <slot name='left-pane'></slot>
    </div>

    <div class='right-pane'>
      <slot name='right-pane'></slot>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  @import '~@/styles/variables';

  .layout {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .toolbar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    height: 64px;
  }

  .left-pane {
    position: absolute;
    top: 64px;
    right: 50%;
    bottom: 0;
    left: 0;
    overflow-y: auto;
  }

  .right-pane {
    position: absolute;
    top: 64px;
    right: 0;
    bottom: 0;
    left: 50%;
    border-left: 2px solid $color-divider;
    overflow-y: auto;
  }

  @media (max-width: $breakpoint-small) {
    .layout,
    .toolbar,
    .left-pane,
    .right-pane {
      position: initial;
      top: initial;
      right: initial;
      bottom: initial;
      left: initial;
    }

    .right-pane {
      border-top: 2px solid $color-divider;
      border-left: 0;
    }
  }
</style>
