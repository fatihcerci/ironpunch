import { reactive } from "vue"
import cacheUtil from "../helpers/cache"
import { types } from "../helpers/cache"
import { Api } from "../helpers/api"
import apiService from "../services/apiService"
import claimController from "../controllers/claimController"
import notify from "../helpers/notification"

const initFormComplexData = {
  oid: null,
  otoDisiKompleksTurDizi: [],
  otoDisiKompleksTur: null,
  aciklama: "",
  basilsinMi: true
}

let stateFormComplex = reactive({ ...initFormComplexData })

const formComplexController = () => {
  const { dataList, displayError, displayMessages, fetch } = apiService()

  const { selectedClaim } = claimController()


  const initFormComplex = async () => {
    stateFormComplex.otoDisiKompleksTurDizi =
      await cacheUtil().getComboCacheData(types.COMPLEX_TYPE)
    resetFormComplex()
  }

  const resetFormComplex = (rawData) => {
    const data = { ...stateFormComplex }
    Object.assign(stateFormComplex, rawData ? rawData : initFormComplexData)
    stateFormComplex.otoDisiKompleksTurDizi = data.otoDisiKompleksTurDizi
    stateFormComplex.otoDisiKompleksTur = data.otoDisiKompleksTur
  }

  const saveFormComplex = async () => {
    try {
      const message = stateFormComplex.oid ? 'güncellendi' : 'kaydedildi'
      const bodyData = {
        className: Api.Packages.COMPLEX,
        oid: stateFormComplex.oid,
        oidHsrDosya:selectedClaim.value.oid,
        oidHsrDosyaEksper:selectedClaim.value.islemOid,
        otoDisiKompleksTur: stateFormComplex.otoDisiKompleksTur,
        aciklama: stateFormComplex.aciklama,
        basilsinMi: stateFormComplex.basilsinMi ? 1 : 0
      }
      await fetch(Api.Common.GENERIC_CREATE_OR_UPDATE_URL, bodyData)
      if (displayError.value) throw new Error(displayMessages.value[0].text)
      notify().success(`Kompleks türü başarılı bir şekilde ${message}`)
    } catch (e) {
      notify().error(e.message)
    }
  }

  const fetchFormComplex = async (complexType) => {
    try {
      const bodyData = {
        className: Api.Packages.COMPLEX,
        equalityParameters: [
          {
            propertyName: "oidHsrDosya",
            propertyValue: selectedClaim.value.oid,
          },
          {
            propertyName: "oidHsrDosyaEksper",
            propertyValue: selectedClaim.value.islemOid,
          },
          {
            propertyName: "otoDisiKompleksTur",
            propertyValue: complexType,
          },
        ],
      }
      await fetch(Api.Common.GENERIC_LIST_URL, bodyData)
      await initFormComplex()
      if (dataList.value) {
        Object.assign(stateFormComplex, dataList.value[0])
        stateFormComplex.basilsinMi = stateFormComplex.basilsinMi === 1
      }
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error(e.message)
    }
  }

  return {
    // PROPERTIES
    stateFormComplex,
    initFormComplexData,
    // FUNCTIONS
    initFormComplex,
    resetFormComplex,
    saveFormComplex,
    fetchFormComplex,
  }
}
export default formComplexController
