<script setup>
// component
import sideBarRecursive from '@/components/header/sideBarRecursive.vue';

const props = defineProps({
  list: {
    type: [Array, Object]
  },
  class: {
    type: [String, Object],
  }
})

const listData = reactive([])


onBeforeMount(() => {
  fetchList(listData)
})

function fetchList(dataRef) {
  let data = JSON.parse(JSON.stringify(props.list))

  const result = traverseChild(data)

  // 清空
  for (const key in dataRef) {
    delete dataRef[key]
  }

  Object.assign(dataRef, result)
  return result;
}

function traverseChild(dataObj) {
  for (let item of dataObj) {
    item.isOpen = false;
    if ('children' in item) traverseChild(item.children)
  }

  return dataObj
}

function toggleOpen(selectId, selectList) {
  for (let item of selectList) {
    item.key === selectId ? (item.isOpen = true) : (item.isOpen = false)
  }
}

</script>

<template lang="pug">
.side-bar-item.px-1.m-1(v-for="(item,index) in listData", :key="item.key" :class="props.class,{select: item.isOpen}")
  .dot
  button.py-2(@click="toggleOpen(item.key,listData)") {{ item.text }}

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