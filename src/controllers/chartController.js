import { ref } from "vue"

const isRefreshedReportStatusesChart = ref(false)
const isRefreshedFileStatusesChart = ref(false)

const chartController = () => {
  return {
    // PROPERTIES
    isRefreshedReportStatusesChart,
    isRefreshedFileStatusesChart,
  }
}
export default chartController
