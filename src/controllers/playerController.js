import { ref } from "vue"

let playerInfo = ref()
let player = ref()
let playerStats = ref()
let playerMapStats = ref()

const playerController = () => {
  return {
    // PROPERTIES
    playerInfo,
    player,
    playerStats,
    playerMapStats
  }
}
export default playerController
