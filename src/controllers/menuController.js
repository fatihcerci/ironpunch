import { ref } from "vue"


let menuNotificationList = ref([])
const showSearchInput = ref(true)
const menuList = ref()
menuList.value = [{ icon: "home", text: "Ana Sayfa", to: "/" }]

const menuController = () => {

  const resetMenu = () => {
    menuList.value = [{ icon: "home", text: "Ana Sayfa", to: "/" }]
  }

  return {
    // PROPERTIES
    menuList,
    menuNotificationList,
    showSearchInput,
    resetMenu,
  }
}
export default menuController
