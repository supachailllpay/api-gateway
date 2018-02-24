<template>
  <div class='spinner'>
    <div class='circle'></div>
  </div>
</template>

<style lang='scss' scoped>
  @import '~@/styles/variables';

  .spinner {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 56px;
    height: 56px;
    margin: auto;
  }

  .circle {
    width: 100%;
    height: 100%;
    border: 8px solid $color-primary;
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation: rotate 0.8s linear infinite;
    border-radius: 100%;
    box-sizing: border-box;
  }

  @keyframes rotate {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
