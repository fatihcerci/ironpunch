import { ref } from "vue"

let claimDetail = ref()
let selectedClaim = ref()
let offerList = ref()
let infoList = ref()
let generalAnswerList = ref()

const claimController = () => {

  const resetSelectedClaim = () => {
    selectedClaim.value = null
  }

  return {
    // PROPERTIES
    claimDetail,
    selectedClaim,
    offerList,
    infoList,
    generalAnswerList,
    //FUNCTIONS
    resetSelectedClaim,
  }
}
export default claimController
