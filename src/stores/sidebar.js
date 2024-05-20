import sideBarData from '@/assets/sideBarList';
import { defineStore } from 'pinia'


export const useSideBarStore = defineStore(
  'sidebar',
  () => {
    // 供下拉選單使用
    const selectOption = ref('')
    const sideBarList = reactive([])

    function getSideBarList() {
      let data = JSON.parse(JSON.stringify(sideBarData))

      const result = traverseChild(data)

      // 清空
      for (const key in sideBarList) {
        delete sideBarList[key]
      }

      Object.assign(sideBarList, result)

      // 從 localStorage 取得 sideBar 開啟狀態
      const selectKey = localStorage.getItem('isOpen') || ''
      selectOption.value = selectKey
      setOpen(selectKey, sideBarList)
  
      return result;
    }

    // 為原始資料，增加 isOpen 屬性
    function traverseChild(dataObj) {
      for (let item of dataObj) {
        item.isOpen = false;
        if ('children' in item) traverseChild(item.children)
      }

      return dataObj
    }

    function setOpen(selectKey, dataObj) {
      for (let item of dataObj) {

        switch (true) {
          case item.key === selectKey:
            item.isOpen = true;
            return true;
          case 'children' in item && setOpen(selectKey, item.children):

            item.isOpen = true;
            return true;

          default:
            item.isOpen = false;
            break;
        }
      }
      return false;
    }

    // 處理每一層只能有一個項目被展開
    function toggleOpen(selectKey, selectLayer) {
      for (let item of selectLayer) {
        switch (item.key === selectKey) {
          case true:
            item.isOpen = true
            // 些改下拉選單選項
            selectOption.value = item.key
            localStorage.setItem('isOpen', item.key)
            break;

          case false:
          default:
            item.isOpen = false

            break;
        }
      }
    }

    return { sideBarList, selectOption, getSideBarList, setOpen, toggleOpen }
  })