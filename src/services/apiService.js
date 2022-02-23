import { ref, onBeforeUnmount } from "vue"
import { api } from "boot/axios"
import { store } from "boot/store"
import { CacheTypes } from "../helpers/cache"
import cache from "../helpers/cache"
import { Api } from "../helpers/api"
import { Messages } from "../helpers/messages"
import { Loading, QSpinnerFacebook, useQuasar } from "quasar"
import { useRouter } from "vue-router"


import chartController from "src/controllers/chartController"
import router from "src/router"


const dataList = ref()
//const cacheList = ref()
const claimList = ref()
const claimDataSource = ref()
const displayError = ref()
const displayMessages = ref()

/**
 * THIS CONNECTS TO ICAP
 */
const apiService = () => {
  const route = useRouter()

  let timer
  const $q = useQuasar()

  onBeforeUnmount(() => {
    if (timer !== void 0) {
      clearTimeout(timer)
      $q.loading.hide()
    }
  })

  const {isRefreshedReportStatusesChart, isRefreshedFileStatusesChart} = chartController()
  const {setCacheParameter} = cache()
  const fetch = async (cmd, bodyData, showProgress) => {
    if(showProgress) {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'red',
        spinnerSize: 150,
        backgroundColor: 'black',
        message: Messages.progress,
        messageColor: 'white',
        boxClass: 'font-19'
      })
    }

    try {
      const url = bodyData ? `/dispatch?cmd=${cmd}&jsonBody=true` : `/dispatch?cmd=${cmd}`
      const response = bodyData ?
      await api.request({url: url,method: "POST", data: bodyData}) :
      await api.request({url: url,method: "POST"})
      const { data, error, messages } = response.data
      dataList.value = data
      displayError.value = error
      displayMessages.value = messages

      if(messages && messages[0].text.includes("Oturum bulunamadı")) {
        timer = setTimeout(() => {
          timer = void 0
          localStorage.clear()
          document.location.reload()
        }, 3500)
        
      }
    } catch (error) {
      if(error.message.includes("Network Error")) {
          throw new Error("Sunucuya erişilemiyor. Lütfen daha sonra tekrar deneyiniz")
        }
    } finally {
      Loading.hide()
    }
  }

  

  /*const loadClaimData = async (expertCode) => {
    const url = `/dispatch?cmd=listOtoDisiDisEksperDurumlari&jp={'eksperKodu':${expertCode}}`
    const response = await api.request({
      url: url,
      method: "POST",
    })

    const { data, error, messages } = response.data
    claimList.value = data
    claimDataSource.value = data ? data.otoDisiDisEksperViewList
      .filter(item => item.akisAktif === 1 || !item.akisAktif) : []
    displayError.value = error
    displayMessages.value = messages
  }
  */

  const loadClaimData = async (expertCode) => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'red',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'

    })

    const url = `/dispatch?cmd=listIhalesiDevamEdenAraclar&jsonBody=true`
    const bodyData = {
      ihaleNo : null,
      serviceUrl : Api.Base.ServiceURL
    }

    try {
      const response = await api.request({
        url: url,
        method: "POST",
        data: bodyData
      })

      const { data, error, messages } = response.data
      claimList.value = data
      claimDataSource.value = data ? data : []
      displayError.value = error
      displayMessages.value = messages
    } catch (error) {
      throw error
    } finally {
      Loading.hide()
    }
    

    

    
  }

  const fetchExpertClaimData = async () => {
    const expertCode = localStorage.getItem("expertCode")
    //Get claim data
    await loadClaimData()
    //Get cacheable data
    await loadCacheData()
    isRefreshedReportStatusesChart.value = false
    isRefreshedFileStatusesChart.value = false
  }

  const loadCacheData = async () => {
    const parameters = await store.getItem('parameters')
    if (!parameters) {
      await fetch(Api.Common.LIST_CACHE_URL, CacheTypes)
      if (dataList.value) {
        const cacheData = JSON.parse(JSON.stringify(dataList.value))
        await store.setItem('parameters', cacheData)
        setCacheParameter()
      }
    }
  }

  return {
    // PROPERTIES
    route,
    dataList,
    claimList,
    claimDataSource,
    displayError,
    displayMessages,
    // FUNCTIONS
    fetch,
    loadClaimData,
    fetchExpertClaimData,
    loadCacheData,
    setCacheParameter,
  }
}
export default apiService
