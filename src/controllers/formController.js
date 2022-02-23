import { ref, reactive, computed } from "vue"
import cacheUtil from "../helpers/cache"
import { types } from "../helpers/cache"
import { Api } from "../helpers/api"
import apiService from "../services/apiService"
import claimController from "../controllers/claimController"
import notify from "../helpers/notification"
import utility from "../helpers/utility"
import { Format } from "../helpers/format"
import { Input } from "../helpers/input"

let assetDataSource = ref()
let assetDetailDataSource = ref()
let stateControl = reactive({ data: [] })
const formList = ref()
const isDisableSaveAsset = ref(true)
const initStateAddClaimData = {
  kiymetTipiDizi: [],
  kiymetTipi: null,
  olcuBirimDizi: [],
  olcuBirim: null,
  hasarKiymetler: "",
  oidAlacakliDizi: [],
  oidAlacakli: null,
  sigortaliTalepMiktari: 0,
  eksperTespitMiktari: 0,
  sigortaliTalepBirim: 0,
  eksperTespitBirim: 0,
  iskonto: 0,
  teklifAlinanYer: null,
  teminatDisiHasar: null,
  eskiYeniFarkTenzili: 0,
  teknolojiKiymetKazanmaTenzili: 0,
  eksikSigorta: 0,
  sovtaj: 0,
  muafiyet: 0,
  toplam: 0,
}
let stateAddClaim = reactive({ ...initStateAddClaimData })

const bottomTotal = computed(() => {
  if (assetDataSource.value) {
    const total = assetDataSource.value
      .map((item) => Format.Money.toNumber(item.toplam))
      .reduce((prev, next) => {
        return prev + next
      }, 0)
    return Format.Money.toLocale(total)
  } else {
    return 0
  }
})

const amountOfInsuredTotal = computed(() => {
  if (assetDataSource.value) {
    const total = assetDataSource.value
      .map((item) => item.sigortaliTalepMiktariToplam)
      .reduce((prev, next) => {
        return prev + next
      }, 0)
    return Format.Money.toLocale(total)
  } else {
    return 0
  }
})

const amountOfExpertTotal = computed(() => {
  if (assetDataSource.value) {
    const total = assetDataSource.value
      .map((item) => item.eksperTespitMiktariToplam)
      .reduce((prev, next) => {
        return prev + next
      }, 0)
    return Format.Money.toLocale(total)
  } else {
    return 0
  }
})


const formController = () => {
  const { dataList, displayError, displayMessages, fetch } = apiService()

  const { selectedClaim, claimDetail } = claimController()

  const initFormAddClaim = async () => {
    await listOutstandingIndemnitee()
    if (claimDetail.value) {
      if (claimDetail.value.policeView.policeTeminatView) {
        stateAddClaim.kiymetTipiDizi =
          claimDetail.value.policeView.policeTeminatView
            .filter((item) => item.teminatBedeli > 0)
            .map((item) => {
              return { value: item.oid, label: item.teminatAdi }
            })
      }
    }
    stateAddClaim.olcuBirimDizi = await cacheUtil().getComboCacheData(
      types.UNIT_OF_MEASURE
    )
    resetFormAddClaim()
  }

  const resetFormAddClaim = (rawData) => {
    const data = { ...stateAddClaim }
    Object.assign(stateAddClaim, rawData ? rawData : initStateAddClaimData)
    stateAddClaim.kiymetTipiDizi = data.kiymetTipiDizi
    stateAddClaim.olcuBirimDizi = data.olcuBirimDizi
    stateAddClaim.oidAlacakliDizi = data.oidAlacakliDizi
  }

  const saveAsset = async (row, isNew, hasNotify) => {
    try {
      const bodyData = {
        ...row,
        className: Api.Packages.CLAIM_ASSET,
        oid: isNew ? null : row.oid,
        oidHsrDosyaEksper: selectedClaim.value.islemOid,
        eksikSigorta: Format.Money.toNumber(row.eksikSigorta),
        sovtaj: Format.Money.toNumber(row.sovtaj),
        muafiyet: Format.Money.toNumber(row.muafiyet),
        toplam: Format.Money.toNumber(row.toplam),
        copyAll: false,
      }
      await fetch(Api.Common.GENERIC_CREATE_OR_UPDATE_URL, bodyData)
      if (displayError.value) throw new Error(displayMessages.value[0].text)
      //TODO buna benzer mesajlari const ifadelere almak gerek
      if (hasNotify) {
        const message = isNew ? "kaydedildi" : "güncellendi"
        notify().success(`Kıymet başarılı bir şekilde ${message}`)
      }

      isDisableSaveAsset.value = true
      return dataList.value
    } catch (e) {
      notify().error("saveAsset:: " + e.message)
    }
  }

  const saveAssetDetail = async () => {
    try {
      let oidHsrDosyaOtoDisiDisEksperKiymet = null
      let isNew = true
      let asset = assetDataSource.value
        ? assetDataSource.value.find(
            (item) => item.kiymetTipi === stateAddClaim.kiymetTipi
          )
        : null

      if (!asset) {
        asset = {
          eksikSigorta: 0,
          sovtaj: 0,
          muafiyet: 0,
          toplam: 0,
          oidHsrDosya: selectedClaim.value.oid,
          kiymetTipi: stateAddClaim.kiymetTipi,
        }
        oidHsrDosyaOtoDisiDisEksperKiymet = await saveAsset(asset, isNew)
      } else {
        isNew = false
        oidHsrDosyaOtoDisiDisEksperKiymet = asset.oid
      }

      let bodyData = Object.assign({}, stateAddClaim)
      bodyData = {
        ...bodyData,
        oidHsrDosyaOtoDisiDisEksperKiymet: oidHsrDosyaOtoDisiDisEksperKiymet,
        className: Api.Packages.CLAIM_ASSET_DETAIL,
        sigortaliTalepMiktari: Format.Money.toNumber(
          bodyData.sigortaliTalepMiktari
        ),
        eksperTespitMiktari: Format.Money.toNumber(
          bodyData.eksperTespitMiktari
        ),
      }
      await fetch(Api.Common.GENERIC_CREATE_OR_UPDATE_URL, bodyData)
      utility().sleep(50)
      await fetchAssetData()
      if (!isNew) notify().success(`Kıymet başarılı bir şekilde kaydedildi`)

      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error("saveAssetDetail:: " + e.message)
    }
  }

  const fetchAssetData = async () => {
    try {
      const bodyData = {
        className: Api.Packages.CLAIM_ASSET,
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
      if (dataList.value && dataList.value.length > 0) {
        const calcDetailData = dataList.value.map((asset) => ({
          ...asset,
          kiymetTipiText: stateAddClaim.kiymetTipiDizi.filter(
            (item) => item.value === asset.kiymetTipi
          )[0].label,
          eksikSigorta: Format.Money.toLocale(asset.eksikSigorta),
          sovtaj: Format.Money.toLocale(asset.sovtaj),
          muafiyet: Format.Money.toLocale(asset.muafiyet),
          kiymetDetayListesi: [
            ...asset.kiymetDetayListesi.map((assetDetail) => ({
              ...assetDetail,
              satirHesap: assetDetailRowCalculate(assetDetail),
            })),
          ],
        }))

        const calcData = calcDetailData.map((asset) => ({
          ...asset,
          satirHesapToplam: asset.kiymetDetayListesi
            .map((item) => item.satirHesap)
            .reduce((prev, next) => {
              return prev + next
            }, 0),
          sigortaliTalepMiktariToplam: asset.kiymetDetayListesi
            .map((item) => item.sigortaliTalepMiktari)
            .reduce((prev, next) => {
              return prev + next
            }, 0),
          eksperTespitMiktariToplam: asset.kiymetDetayListesi
            .map((item) => item.eksperTespitMiktari)
            .reduce((prev, next) => {
              return prev + next
            }, 0),
        }))

        assetDataSource.value = calcData.map((asset) => ({
          ...asset,
          toplam: assetCalculateTotal(asset),
        }))
      }
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error("fetchAssetData:: " + e.message)
    }
  }

  const listOutstandingIndemnitee = async () => {
    try {
      const bodyData = {
        oidHasarDosya: selectedClaim.value.oid,
        alacakliTipiPkodu: "10",
      }
      dataList.value = null
      await fetch(Api.Claim.LIST_OUTSTANDING_INDEMNITEE_URL, bodyData)
      if (dataList.value) {
        stateAddClaim.oidAlacakliDizi = dataList.value.map((item) => {
          return { value: item[0], label: item[1] }
        })
      }
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error(e.message)
    }
  }

  const assetDetailRowCalculate = (assetDetail) => {
    let total = assetDetail.eksperTespitMiktari * assetDetail.eksperTespitBirim
    total = total - utility().percentage(assetDetail.iskonto, total)
    total = total - utility().percentage(assetDetail.eskiYeniFarkTenzili, total)
    total =
      total -
      utility().percentage(assetDetail.teknolojiKiymetKazanmaTenzili, total)
    return total
  }

  const assetCalculateTotal = (asset) => {
    const total =
      asset.satirHesapToplam -
      Format.Money.toNumber(asset.eksikSigorta) -
      Format.Money.toNumber(asset.sovtaj) -
      Format.Money.toNumber(asset.muafiyet)
    if (!total) return 0
    return total < 0 ? 0 : Format.Money.toLocale(total)
  }

  const getFormControlBodyData = (kontrolList) => {
    let bodyData = { data: [] }
    for (const kontrolData of kontrolList) {
      const _kontrolData = { ...kontrolData }
      let found = stateControl.data
        ? stateControl.data.find((item) => item.oidUiForm === _kontrolData.oid)
        : null
      if (_kontrolData.uiFormDegerListesi) {
        for (const altKontrol of _kontrolData.uiFormDegerListesi) {
          found = stateControl.data.find(
            (item) => item.oidUiFormDeger === altKontrol.oid
          )
          const altKontrolData = { ...altKontrol }
          altKontrolData.oidUiFormDeger = altKontrolData.oid
          altKontrolData.oidUiForm = _kontrolData.oid
          altKontrolData.oid = found ? found.oid : null
          altKontrolData.oidUiFormTip = _kontrolData.oidUiFormTip
          altKontrolData.kontrolTipi = _kontrolData.kontrolTipi
          altKontrolData.oidHsrDosya = selectedClaim.value.oid
          altKontrolData.oidHsrDosyaEksper = selectedClaim.value.islemOid
          altKontrolData.modelDeger =
            _kontrolData.uiFormTip.tip === Input.CHECKBOX
              ? altKontrol.modelCheckBox
                ? "1"
                : 0
              : Input.TEXT
              ? altKontrol.modelText
              : null
          bodyData.data.push(altKontrolData)
        }
      } else {
        _kontrolData.oidUiForm = _kontrolData.oid
        _kontrolData.oid = found ? found.oid : null
        _kontrolData.oidHsrDosya = selectedClaim.value.oid
        _kontrolData.oidHsrDosyaEksper = selectedClaim.value.islemOid
        _kontrolData.oidUiFormDeger = null
        _kontrolData.modelDeger =
          _kontrolData.uiFormTip.tip === Input.CHECKBOX
            ? _kontrolData.modelCheckBox
              ? "1"
              : 0
            : Input.TEXT
            ? _kontrolData.modelText
            : null
        bodyData.data.push(_kontrolData)
      }
    }
    return bodyData
  }

  const saveFormControl = async (kontrolList) => {
    try {
      const message =
        stateControl.data && stateControl.data.length > 0
          ? "güncellendi"
          : "kaydedildi"
      const bodyData = getFormControlBodyData(kontrolList)

      await fetch(Api.Claim.SAVE_FORM_CONTROL_URL, bodyData)
      //await fetchControl(false)
      notify().success(`Kontroller başarılı bir şekilde ${message}`)
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error("saveFormControl:: " + e.message)
    }
  }

  const fetchControl = async () => {
    try {
      const bodyData = {
        className: Api.Packages.CONTROL,
        equalityParameters: [
          {
            propertyName: "oidHsrDosya",
            propertyValue: selectedClaim.value ? selectedClaim.value.oid : null,
          },
          {
            propertyName: "oidHsrDosyaEksper",
            propertyValue: selectedClaim.value
              ? selectedClaim.value.islemOid
              : null,
          },
        ],
      }
      await fetch(Api.Common.GENERIC_LIST_URL, bodyData)
      if (dataList.value) {
        Object.assign(stateControl.data, dataList.value)
        if (stateControl.data) {
          for (const control of stateControl.data) {
            const found = formList.value.find(
              (item) => item.oid === control.oidUiForm
            )
            if (!found) continue
            if (found) {
              if (
                found.uiFormDegerListesi &&
                found.uiFormDegerListesi.length > 0
              ) {
                for (const subControl of found.uiFormDegerListesi) {
                  if (subControl.oid === control.oidUiFormDeger) {
                    setControlValues(found, subControl, control)
                  }
                }
              }
              if (!found.uiFormDegerListesi)
                setControlValues(found, null, control)
            }
          }
        }
      }
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error("fetchControl:: " + e.message)
    }
  }

  const setControlValues = (found, subFound, control) => {
    if (found.uiFormTip.tip === Input.CHECKBOX) {
      if (subFound) {
        subFound.modelCheckBox = control.modelDeger === "1"
      } else {
        found.modelCheckBox = control.modelDeger === "1"
      }
    } else if (found.uiFormTip.tip === Input.TEXT) {
      if (subFound) {
        subFound.modelText = control.modelDeger
      } else {
        found.modelText = control.modelDeger
      }
    }
  }

  return {
    // PROPERTIES
    isDisableSaveAsset,
    formList,
    assetDataSource,
    assetDetailDataSource,
    stateAddClaim,
    stateControl,
    bottomTotal,
    amountOfInsuredTotal,
    amountOfExpertTotal,
    // FUNCTIONS
    initFormAddClaim,
    resetFormAddClaim,
    saveAsset,
    saveAssetDetail,
    fetchAssetData,
    assetCalculateTotal,
    assetDetailRowCalculate,
    saveFormControl,
    fetchControl,
  }
}
export default formController
