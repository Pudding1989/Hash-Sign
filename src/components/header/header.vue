<script setup>
import { useSideBarStore } from '@/stores/sideBar.js';

// component
import sideBarRecursive from '@/components/header/sideBarRecursive.vue';

// store 實例化
const sideBarStore = useSideBarStore()

// 取得 sideBar dom 元素
const sideBarRef = ref()
const sideBarOpen = ref(false)

// 開啟 side bar 後監聽點擊事件
watch(
  () => sideBarOpen.value,
  () => {
    if (sideBarOpen.value) document.addEventListener('click', closeSideBar)
  })

onMounted(() => {
  sideBarStore.getSideBarList()
})

// 檢查點擊元素是否包還在 sideＢar 當中
function closeSideBar(event) {
  if (sideBarRef.value.contains(event.target)) return

  sideBarOpen.value = false
  // 關閉 side bar後，清除監聽器
  document.removeEventListener('click', closeSideBar)
}
</script>

<template lang="pug">
header.flex.justify-between()
  .link-list
    router-link(:to="{name: 'home'}") 井字動畫
    router-link(:to="{name: 'drop-down'}") 下拉選單
  button.hamburger.flex(@click.stop="sideBarOpen = !sideBarOpen")
    .bar(v-for="item in 3")

  transition(name="slide")
    nav.flex(v-if="sideBarOpen",ref="sideBarRef")
      side-bar-recursive.pr-2(:list="sideBarStore.sideBarList")/
</template>

<style lang="scss" scoped>
header {
  position: relative;
  padding: 8px;
}

.link-list {
  a {
    &:nth-child(n+2) {
      margin-left: 8px;
    }

    &.router-link-exact-active {
      color: SteelBlue;

    }
  }
}

.hamburger {
  width: 2rem;
  height: 1.8rem;
  border-radius: 4px;
  padding: 0.5rem;

  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  background-color: Gainsboro;

  .bar {
    height: 2px;
    width: 100%;
    border-radius: 10px;
    background-color: Gray;
  }
}

nav {
  z-index: 10;
  position: fixed;
  top: 0%;
  right: 0%;

  min-width: 12rem;
  height: 100vh;
  overflow-x: scroll;
  padding: 8px 4px;

  flex-direction: column;

  background-color: rgb(0, 0, 0, 0.85);
  font-size: 16px;
  color: whitesmoke;

  // vue transition
  &.slide-leave-active,
  &.slide-enter-active {
    transition: right 0.35s ease-out;
  }

  &.slide-enter-from,
  &.slide-leave-to {
    right: -100%;
  }

  &.slide-enter-to,
  &.slide-leave-from {
    right: 0%;
  }
}
</style>