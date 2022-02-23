import { reactive } from "vue"
import moment from "moment"
import { Api } from "../helpers/api"
import { Format } from "../helpers/format"
import { Document } from "../helpers/pdf"
import { ReportCodes } from "../helpers/reportCodes"
import utility from "../helpers/utility"
import apiService from "../services/apiService"
import claimController from "../controllers/claimController"
import formController from "../controllers/formController"
import notify from "../helpers/notification"
import { nanoid } from "nanoid"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

const initStateExpertReportInfoData = {
  oid: null,
  lastUpdated: null,
  oidHsrDosya: null,
  raporNumarasi: null,
  raporTarihi: null,
  dipToplam: 0,
}

let stateExpertReportInfo = reactive({ ...initStateExpertReportInfoData })

const expertReportController = () => {
  const { dataList, displayError, displayMessages, fetch } = apiService()
  const { selectedClaim, claimDetail } = claimController()
  const {
    bottomTotal,
    amountOfInsuredTotal,
    amountOfExpertTotal,
    assetDataSource,
  } = formController()

  const initExpertReportInfo = async () => {
    resetExpertReportInfo()
  }

  const resetExpertReportInfo = (rawData) => {
    Object.assign(
      stateExpertReportInfo,
      rawData ? rawData : initStateExpertReportInfoData
    )
  }

  const saveExpertReport = async (raporTipi) => {
    try {
      console.log(assetDataSource.value)
      const modifiedDocument = await getDocument()
      const pdfDocGenerator = pdfMake.createPdf(modifiedDocument)
      pdfDocGenerator.getBase64(async (data) => {
        //console.log(data.substring(0, 100))
        const dipToplam = bottomTotal.value
          ? Format.Money.toNumber(bottomTotal.value)
          : stateExpertReportInfo.dipToplam
        const kiymetList = assetDataSource.value.map((asset) => ({
          oidHsrDosya: asset.oidHsrDosya,
          oidHsrDosyaEksper: asset.oidHsrDosyaEksper,
          kiymetTipi: asset.kiymetTipi,
          eksikSigorta: Format.Money.toNumber(asset.eksikSigorta),
          sovtaj: Format.Money.toNumber(asset.sovtaj),
          muafiyet: Format.Money.toNumber(asset.muafiyet),
          toplam: Format.Money.toNumber(asset.toplam),
          sovtaj: Format.Money.toNumber(asset.sovtaj),
          dovizCinsiPkodu: claimDetail.value.hasarView.dovizCinsiPkodu,
          dovizKuru: Format.Money.toNumber(claimDetail.value.hasarView.dovizKuru),

        }))
        const bodyData = {
          ekraniKilitle: true,
          oidHsrDosya: selectedClaim.value.oid,
          oidHsrDosyaEksper: selectedClaim.value.islemOid,
          dosyaAdi: modifiedDocument.info.title + ".pdf",
          dosyaData: data,
          evrakKodu:
            raporTipi === "1"
              ? ReportCodes.EKSPER_ON_RAPOR
              : ReportCodes.EKSPER_KESIN_RAPOR,
          raporTipi: raporTipi,
          dipToplam: dipToplam,
          kiymetList: kiymetList,
        }
        await fetch(Api.Claim.SAVE_EXPERT_REPORT_URL, bodyData)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
        const message = raporTipi === '1' ?
          `Ön rapor başarıyla gönderildi` : `Kesin rapor başarıyla gönderildi`
        notify().success(message)
      })
    } catch (e) {
      notify().error(e.message)
    }
  }

  const saveExpertReportInfo = async () => {
    try {
      const message = stateExpertReportInfo.oid ? "güncellendi" : "kaydedildi"
      const modifiedDocument = await getDocument()
      const dipToplam = bottomTotal.value
        ? Format.Money.toNumber(bottomTotal.value)
        : stateExpertReportInfo.dipToplam

      const bodyData = {
        className: Api.Packages.REPORT_INFO,
        oid: stateExpertReportInfo.oid,
        oidHsrDosya: selectedClaim.value.oid,
        oidHsrDosyaEksper: selectedClaim.value.islemOid,
        raporNumarasi: modifiedDocument.info.title,
        raporTarihi: modifiedDocument.raporTarihi,
        dipToplam: dipToplam,
      }

      await fetch(Api.Common.GENERIC_CREATE_OR_UPDATE_URL, bodyData)
      if (displayError.value) throw new Error(displayMessages.value[0].text)
      notify().success(`Rapor bilgisi başarılı bir şekilde ${message}`)
      //let document = pdfMake.createPdf(Document).open()
      pdfMake.createPdf(Document).open()
    } catch (e) {
      console.error(e.message)
      notify().error(e.message)
    }
  }

  const fetchExpertReportInfo = async () => {
    try {
      const bodyData = {
        className: Api.Packages.REPORT_INFO,
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
        Object.assign(stateExpertReportInfo, dataList.value[0])
      }
      if (displayError.value) throw new Error(displayMessages.value[0].text)
    } catch (e) {
      notify().error(e.message)
    }
  }

  const getDocument = async () => {
    Document.info.title = stateExpertReportInfo.raporNumarasi
      ? stateExpertReportInfo.raporNumarasi
      : new Date().getFullYear() + "-" + nanoid()
    const raporTarihi = stateExpertReportInfo.raporTarihi
      ? stateExpertReportInfo.raporTarihi
      : moment().format(Format.Date.REGULAR_WITH_TIME_SEC)
    Document.raporTarihi = raporTarihi
    Document.content[2].table.body[0][2] = selectedClaim.value.dosyaNo
    Document.content[2].table.body[0][5] =
      claimDetail.value.hasarView.dosyaYoneticisi
    Document.content[2].table.body[1][2]["text"] = Document.info.title
    Document.content[2].table.body[1][5] = moment(raporTarihi).format(
      Format.Date.REGULAR_WITH_TIME_LOCAL
    )
    Document.content[6].table.body[0][2]["text"] =
      utility().capitalize(claimDetail.value.policeView.urunAdi, true) +
      " / " +
      utility().capitalize(claimDetail.value.policeView.urunGrubu, true)
    Document.content[6].table.body[1][2]["text"] =
      claimDetail.value.acenteView.acenteNo +
      " / " +
      claimDetail.value.policeView.policeNo
    Document.content[6].table.body[2][2]["text"] =
      claimDetail.value.policeView.baslangicTarihi +
      " - " +
      claimDetail.value.policeView.bitisTarihi +
      " / " +
      claimDetail.value.policeView.tanzimTarihi
    Document.content[6].table.body[3][2]["text"] =
      claimDetail.value.policeView.zeyilNo > 0 ? "Var" : "Yok"
    Document.content[6].table.body[4][2]["text"] =
      claimDetail.value.policeView.tecditNo > 0
        ? `Var (Yenileme ${claimDetail.value.policeView.tecditNo})`
        : "Yok"
    Document.content[6].table.body[5][0] =
      "Sigortalı Adı / " + claimDetail.value.policeView.kisiTipi === "G"
        ? "Kimlik Nu"
        : "Vergi Nu"
    Document.content[6].table.body[5][2]["text"] =
      claimDetail.value.policeView.sigortali +
      " / " +
      claimDetail.value.policeView.tcknYknVkn
    Document.content[6].table.body[6][2]["text"] =
      claimDetail.value.policeView.iban
    Document.content[6].table.body[8][2]["text"] =
      claimDetail.value.policeView.rizikoAdresi

    if (!Document.isPrintedBefore) {
      Document.isPrintedBefore = true
      let kiymetIndex = 12
      assetDataSource.value.forEach((asset, index) => {
        const data = [
          { text: asset.kiymetTipiText, alignment: "right", italics: true },
          "",
          {
            text: Format.Money.toLocale(asset.satirHesapToplam) + " TL",
            alignment: "right",
          },
          { text: "-- TL", alignment: "right" },
        ]
        Document.content[6].table.body = utility().insert(
          Document.content[6].table.body,
          kiymetIndex,
          data
        )
        kiymetIndex++
        Document.content[8].table.body[2][2]["text"] =
          index === assetDataSource.value.length - 1
            ? Document.content[8].table.body[2][2]["text"] +
              asset.kiymetTipiText
            : Document.content[8].table.body[2][2]["text"] +
              asset.kiymetTipiText +
              " - "
      })
    }

    Document.content[8].table.body[0][2]["text"] =
      claimDetail.value.hasarView.hasarTarihi
    Document.content[8].table.body[1][2]["text"] =
      claimDetail.value.hasarView.hasarNedeni
    Document.content[8].table.body[4][2]["text"] =
      amountOfInsuredTotal.value + " TL"
    Document.content[8].table.body[4][3]["text"] =
      amountOfExpertTotal.value + " TL"
    Document.content[8].table.body[5][2]["text"] =
      amountOfExpertTotal.value + " TL"

    return Document
  }

  return {
    initExpertReportInfo,
    resetExpertReportInfo,
    saveExpertReportInfo,
    fetchExpertReportInfo,
    saveExpertReport,
  }
}
export default expertReportController
