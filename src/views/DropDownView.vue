<script setup>
import { useSideBarStore } from '@/stores/sideBar.js';

// store 實例化
const sideBarStore = useSideBarStore()

const sideBarOption = reactive([])

onMounted(() => {
  getSideBarOption()
})

function getSideBarOption() {
  sideBarStore.getSideBarList()
  
  const option = flattenList(sideBarStore.sideBarList)
  Object.assign(sideBarOption, option);
}

function flattenList(dataObj, parentText) {
  let flattenArr = []
  for (let item of dataObj) {
    let currentText = parentText ? `${parentText} > ${item.text}` : item.text;
    
    flattenArr.push({
      text: currentText,
      key: item.key
    });
    
    if ('children' in item) flattenArr = flattenArr.concat(flattenList(item.children, currentText));
    
  }
  
  return flattenArr;
}

function saveOption(event) {
  const selectKey = event.target.value
  localStorage.setItem('isOpen', selectKey)
  // 修改 side bar 開啟狀態
  sideBarStore.setOpen(selectKey, sideBarStore.sideBarList)
}
</script>


<template lang="pug">
main
  select.sideBar-option(v-model="sideBarStore.selectOption",@change="saveOption")
    option(value="" selected, disabled) 請選擇項目
    option( v-for="(item, index) in sideBarOption", :key="item.key" :value="item.key") {{ item.text }}
</template>

<style lang="scss" scoped>
main {
  min-width: 390px;
  overflow-x: auto;
  min-height: 100vh;

  background-color: lightgray;
  padding: 0px 10px;

  text-align: center;
}

select.sideBar-option {
  margin-top: 1rem;
  height: 2.5rem;
  min-width: 50%;
  border-radius: 4px;
  padding: 6px;
}
</style>