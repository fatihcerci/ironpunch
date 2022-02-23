import { ref, reactive } from "vue"

let appointmentDataSource = ref([])
const initState = {
  oid: null,
  userId: null,
  oidClaim: null,
  appointmentDate: null,
  customerNameSurname: null,
  customerGsm: null,
  expertNameSurname: null,
  expertGsm: null,
}
let state = reactive({ ...initState })

const appointmentController = () => {
  const resetAppointment = () => {
    Object.assign(state, initState)
  }

  return {
    // PROPERTIES
    initState,
    appointmentDataSource,
    state,
    //FUNCTIONS
    resetAppointment,
  }
}
export default appointmentController
