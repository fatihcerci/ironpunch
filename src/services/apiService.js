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

const faceitPlayerSearch = ref()
const faceitPlayer = ref()
const faceitPlayerStats = ref()
const faceitPlayerMapStats = ref()

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
      const response = bodyData ? await api.request({url: url,method: "POST", data: bodyData}) : await api.request({url: url,method: "POST"})
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

  const searchPlayer = async (faceitNick) => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'orange',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'
    })

    const url = `https://open.faceit.com/data/v4/search/players?nickname=${faceitNick}&offset=0&limit=20`

    try {
      const response = await api.request({
        url: url,
        method: "GET"
      })

      const { data } = response

      faceitPlayerSearch.value = data.items[0]
    } catch (error) {
      throw error
    } finally {
      Loading.hide()
    }

  }

  const getPlayer = async (playerId) => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'orange',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'
    })

    const url = `https://open.faceit.com/data/v4/players/${playerId}`

    try {
      const response = await api.request({
        url: url,
        method: "GET"
      })

      const { data } = response

      debugger
      faceitPlayer.value = data
    } catch (error) {
      throw error
    } finally {
      Loading.hide()
    }

  }



  const getPlayerStats = async (playerId) => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'orange',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'

    })

    const url = `https://open.faceit.com/data/v4/players/${playerId}/stats/csgo`

    try {
      const response = await api.request({
        url: url,
        method: "GET"
      })

      const { data } = response

      faceitPlayerStats.value = data.lifetime

      debugger
      let mapStats = []
      data.segments.forEach(element => {
        if(element.mode == "5v5") {
          mapStats.push({
            imgMap : element.img_small,
            map : element.label,
            matches : element.stats["Matches"],
            winRate : element.stats["Win Rate %"],
            avgKills : element.stats["Average Kills"],
            avgDeaths : element.stats["Average Deaths"],
            avgKdRatio : element.stats["Average K/D Ratio"],
            avgHs : element.stats["Average Headshots %"],
            avgTripleKills : element.stats["Average Triple Kills"],
            avgQuadroKills : element.stats["Average Quadro Kills"],
            avgPentaKills : element.stats["Average Penta Kills"],
          })
        }
      })

      faceitPlayerMapStats.value = mapStats

    } catch (error) {
      throw error
    } finally {
      Loading.hide()
    }

  }


  return {
    // PROPERTIES
    route,
    faceitPlayerSearch,
    faceitPlayer,
    faceitPlayerStats,
    faceitPlayerMapStats,
    dataList,
    claimList,
    claimDataSource,
    displayError,
    displayMessages,
    // FUNCTIONS
    fetch,
    searchPlayer,
    getPlayer,
    getPlayerStats,
    setCacheParameter,
  }
}
export default apiService
