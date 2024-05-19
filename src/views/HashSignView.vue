<script setup>
</script>

<template lang="pug">
main.flex.items-center

    //- 九宮格區域
  .hash-sign-area.grid
    .box(v-for="item, in 9" :class="{blink: [3,5, 9].includes(item)}")
    //- 球
    .ball.slide-right(v-for="item in 4" :class="`num-${item}`")
</template>


<style lang="scss" scoped>
main {
  min-width: 390px;
  overflow-x: auto;
  min-height: 100vh;

  position: relative;
  background-color: lightgray;

  padding: 0px 10px;
}

.tool-bar {
  position: absolute;
  top: 10px;
  left: 10px;

  border-radius: 6px;
  padding: 10px;
  background-color: rgba(245, 245, 245, 0.80);

  button {
    padding: 6px;
    border-radius: 4px;
    background-color: DeepSkyBlue;
    color: whitesmoke;

    &:hover {
      background-color: SteelBlue;
    }

    &:disabled {
      background-color: lightgray;
      color: white;
    }

    &:nth-child(n+2) {
      margin-left: 10px;
    }
  }
}

.hash-sign-area {
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);

  position: relative;

  .box {
    border: black solid 2px;
    background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);

    &.blink {
      animation: blink 1.2s infinite ease-in-out;
    }
  }

  @keyframes blink {

    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.6;
    }
  }
}

.ball {
  --slide-time: 1s;

  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #A5F12B;

  position: absolute;
  transform: translate(-50%, -50%);
  top: calc(100%* 1 / 6);
  left: calc(100% * 1 / 6);

  &.slide-right {
    animation: slide-right var(--slide-time) infinite ease-in-out;

    @keyframes slide-right {
      0% {
        transform: translate(-50%, -50%);
      }

      100% {
        transform: translate(calc(100px - 50%), -50%);
      }
    }
  }

  &.num-2 {
    top: calc(1 / 6 * 100%);
    left: calc(5 / 6 * 100%);
  }

  &.num-3 {
    top: calc(5 / 6 * 100%);
    left: calc(1 / 6* 100%);
  }

  &.num-4 {
    top: calc(5 / 6 * 100%);
    left: calc(5 / 6 * 100%);
  }
</style>