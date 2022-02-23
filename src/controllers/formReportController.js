import { reactive } from "vue"
import cacheUtil from "../helpers/cache"
import { types } from "../helpers/cache"
import { Api } from "../helpers/api"
import apiService from "../services/apiService"
import claimController from "../controllers/claimController"
import notify from "../helpers/notification"

const initStateReportData = {
  oid: null,
  raporKapatmaNedeniDizi: [],
  raporKapatmaNedeni: null,
  aciklama: "",
  kanaat: false,
}
let stateReportResult = reactive({ ...initStateReportData })

const formReportController = () => {
  const { dataList, displayError, displayMessages, fetch } = apiService()

  const { selectedClaim } = claimController()

  const initFormReportResult = async () => {
    stateReportResult.raporKapatmaNedeniDizi =
      await cacheUtil().getComboCacheData(types.REASON_FOR_CLOSING_REPORT)
    resetFormReport()
  }

  const resetFormReport = (rawData) => {
    const data = { ...stateReportResult }
    Object.assign(stateReportResult, rawData ? rawData : initStateReportData)
    stateReportResult.raporKapatmaNedeniDizi = data.raporKapatmaNedeniDizi
  }

  const saveReportResult = async () => {
    try {
      const message = stateReportResult.oid ? 'güncellendi' : 'kaydedildi'
      const bodyData = {
        className: Api.Packages.OPINION_REPORT,
        oid: stateReportResult.oid,
        oidHsrDosya:selectedClaim.value.oid,
        oidHsrDosyaEksper:selectedClaim.value.islemOid,
        aciklama: stateReportResult.aciklama,
        raporKapatmaNedeni: stateReportResult.raporKapatmaNedeni,
        kanaat: stateReportResult.kanaat ? 1 : 0
      }
      await fetch(Api.Common.GENERIC_CREATE_OR_UPDATE_URL, bodyData)
      if (displayError.value) throw new Error(displayMessages.value[0].text)
      notify().success(`Rapor sonucu başarılı bir şekilde ${message}`)
    } catch (e) {
      notify().error(e.message)
    }
  }

  const fetchReportResult = async () => {
    try {
      const bodyData = {
        className: Api.Packages.OPINION_REPORT,
        equalityParameters: [
          {
            propertyName: "oidHsrDosya",
            propertyValue: selectedClaim.value.oid,
          },
          {
            propertyName: "oidHsrDosyaEksper",
            propertyValue: selectedClaim.value.islemOid,
          },
        ],
      }
      await fetch(Api.Common.GENERIC_LIST_URL, bodyData)
      if (dataList.value) {
        Object.assign(stateReportResult, dataList.value[0])
        stateReportResult.kanaat = stateReportResult.kanaat === 1
      }
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error(e.message)
    }
  }

  return {
    // PROPERTIES
    stateReportResult,
    initStateReportData,
    // FUNCTIONS
    initFormReportResult,
    resetFormReport,
    saveReportResult,
    fetchReportResult,
  }
}
export default formReportController
