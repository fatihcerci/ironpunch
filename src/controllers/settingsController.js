import { ref } from "vue"

let playerInfo = ref()

const settingsController = () => {
  return {
    // PROPERTIES
    playerInfo,
  }
}
export default settingsController
