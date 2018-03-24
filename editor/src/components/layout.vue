<template>
  <div class='layout'>
    <div class='tbr'>
      <slot name='toolbar'></slot>
    </div>

    <div class='lfp'>
      <slot name='left-pane'></slot>
    </div>

    <div class='rhp'>
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

  .tbr {
    @extend .layout;
    z-index: 1;
    height: 64px;
  }

  .lfp {
    @extend .layout;
    top: 64px;
    right: 50%;
    overflow-y: auto;
  }

  .rhp {
    @extend .layout;
    top: 64px;
    left: 50%;
    border-left: 2px solid $color-divider;
    overflow-y: auto;
  }

  @media (max-width: $breakpoint-small) {
    .layout {
      position: initial;
      top: initial;
      right: initial;
      bottom: initial;
      left: initial;
    }

    .rhp {
      border-top: 2px solid $color-divider;
      border-left: 0;
    }
  }
</style>
