<script setup>
import { useSideBarStore } from '@/stores/sidebar.js';
// component
import sideBarRecursive from '@/components/header/sideBarRecursive.vue';

// store 實例化
const sideBarStore = useSideBarStore()

const props = defineProps({
  list: {
    type: [Array, Object]
  },
  class: {
    type: [String, Object],
  }
})

</script>

<template lang="pug">
.side-bar-item.px-1.m-1(v-for="(item,index) in props.list", :key="item.key" :class="props.class,{select: item.isOpen}")
  .dot
  button.py-2(@click="sideBarStore.toggleOpen(item.key,props.list)") {{ item.text }}

  template(v-if="item.isOpen &&'children' in item")
    side-bar-recursive.ml-4.my-1(:list="item.children")/


</template>

<style lang="scss" scoped>
.side-bar-item {
  transition: background-color 0.45s ease-in;

  button {
    transition: color 0.3s ease-out;

    &:hover {
      color: silver;
    }
  }

  &.select {
    background-color: dimgray;

    &>button {
      color: yellow;
    }
  }
}
</style>