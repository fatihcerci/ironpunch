import { ref, reactive } from "vue"
import cacheUtil from "../helpers/cache"
import { types } from "../helpers/cache"
import apiService from "../services/apiService"
import claimController from "../controllers/claimController"
import {Api} from "../helpers/api"
import notify from "../helpers/notification"

const fileList = ref()
const loadedFileList = ref()
const initStateFileData = {
  evrakDizi: [],
  evrak: null,
}
const slide = ref()
let stateFiles  = reactive({...initStateFileData})

const fileController = () => {

  const {
    dataList,
    displayError,
    displayMessages,
    fetch,
  } = apiService()

  const { selectedClaim } = claimController()

  const initFile = async () => {
    stateFiles.evrakDizi = await cacheUtil().getComboCacheData(types.FILES)
    resetFiles()
  }

  const initFileController = async () => {
    await initFile()
    await listNotLoadedClaimFiles()
    await listLoadedClaimFiles()
    if (loadedFileList.value) {
      if (loadedFileList.value.length > 0)
        slide.value = loadedFileList.value[0].oid
    }
  }

  const resetFiles = (rawData) => {
    const data = {...stateFiles}
    Object.assign(stateFiles, rawData ? rawData : initStateFileData)
    stateFiles.evrakDizi = data.evrakDizi
  }

  const listNotLoadedClaimFiles = async () => {
    try {
      const bodyData = {
        oidHsrDosya:selectedClaim.value.oid,
      }
      dataList.value = null
      await fetch(Api.Claim.LIST_NOT_LOADED_URL, bodyData)

      if (dataList.value) {
        stateFiles.evrakDizi = dataList.value.map((item) => {
          return stateFiles.evrakDizi.find(file => file.value === item.oidTnmEvrak)
        })
      }
      stateFiles.evrakDizi.push({value:'50', label: 'Hasar Fotoğrafı'})
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch(e) {
      notify().error(e.message)
    }
  }

  const listLoadedClaimFiles = async () => {
    try {
      const bodyData = {
        oidHsrDosya:selectedClaim.value.oid,
      }
      dataList.value = null
      await fetch(Api.Claim.LIST_LOADED_URL, bodyData)
      if (dataList.value) {
        loadedFileList.value = [...dataList.value]
      }
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch(e) {
      notify().error(e.message)
    }
  }

  return {
    // PROPERTIES
    fileList,
    loadedFileList,
    stateFiles,
    slide,
    // FUNCTIONS
    initFile,
    initFileController,
    resetFiles,
    listNotLoadedClaimFiles,
    listLoadedClaimFiles,
  }
}
export default fileController
