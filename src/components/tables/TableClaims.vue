<template>
  <div class="row q-col-gutter-sm q-pl-md q-pa-md q-pb-md">
    <div class="col-12">
      <q-card class="bg-secondary text-white" bordered>
        <q-table
          card-class="bg-secondary text-white"
          :hide-header="mode"
          :grid="mode"
          :filter="filter"
          :rows="claims ? claims : []"
          :columns="columns"
          :pagination-label="getPaginationLabel"
          :rows-per-page-options="[20, 30, 50, 100]"
          row-key="oid"
          table-class=""
          color="primary"
          table-header-class="text-bold"
          rows-per-page-label="Satır Sayısı"
          no-data-label="Kayıt bulunamadı"
          no-results-label="Eşleşen kayıt bulunamadı"
          title="İhalesi Devam Eden Araçlar"
          title-class="text-bold"
        >

          <template v-slot:item="props" v-if="mode">

            <div class="q-pa-none col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <q-card class="bg-secondary text-white">
                <q-card-section>
                  <img
                  :src="props.row.onizlemeOrj"
                  :width="imageSize()"
                  class="q-mr-sm q-pl-sm cursor-pointer"
                  @click="showVehicleDetail(props.row)"
                />
                </q-card-section>
                <q-card-section class="row justify-center items-center q-pa-none">
                  <q-btn
                    style="width:39vw;font-size: 0.7rem;"
                    size="sm"
                    padding="sm"
                    color="primary"
                    icon="search"
                    label="Görüntüle"
                    @click="showVehicleDetail(props.row)"
                  />
                  &nbsp;&nbsp;&nbsp;
                  <q-btn
                    style="width:39vw;font-size: 0.7rem;"
                    size="sm"
                    padding="sm"
                    color="primary"
                    icon="help"
                    label="Soru Sor"
                    @click="openDialogRequestInfo(props.row)"
                  />
                </q-card-section>
                <q-list dense class="text-white">
                  <q-item v-for="col in props.cols.filter(col => col.name !== 'servisBilgileri')" :key="col.name">
                    <q-item-section class="text-white">
                      <q-item-label class="text-white">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side class="text-white">
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>


            </div>
          </template>


          <template v-slot:top-right="props">
            <q-input
              standout
              dense
              debounce="300"
              v-model="filter"
              placeholder="Hızlı Ara"
            >
              <template v-slot:append>
                <q-icon name="search" color="white" />
              </template>
            </q-input>

            <q-btn
              flat
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="!mode"
              v-close-popup="!$q.platform.is.mobile"
            >
              <q-tooltip :disable="$q.platform.is.mobile"
                >{{ props.inFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran" }}
              </q-tooltip>
            </q-btn>
          </template>

          <template v-slot:body-cell-preview="props">
            <q-td :props="props">
              <img
                :src="props.row.onizleme"
                width="170"
                class="q-mr-sm q-pl-sm cursor-pointer"
                @click="showVehicleDetail(props.row)"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-detail="props">
            <q-td :props="props">
              <q-btn
                round
                size="sm"
                padding="sm"
                color="primary"
                icon="search"
                @click="showVehicleDetail(props.row)"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-requestinfo="props">
            <q-td :props="props">
              <q-btn
                round
                size="sm"
                padding="sm"
                color="primary"
                icon="help"
                @click="openDialogRequestInfo(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>


  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Uyarı</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="font-16">İlgili ihale hakkında soru sorabilmeniz için kullanıcı girişi yapmanız gerekmektedir.</div>
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="font-16">Kullanıcı hesabınız bulunmuyorsa Yeni Başvuru sayfasından kullanıcı başvurusu yapabilirsiniz.</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Giriş Yap" color="primary" @click="goLoginPage()" />
        <q-btn label="Yeni Başvuru" color="primary" @click="goAppealPage()"  />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <q-dialog v-model="prompt">

    <q-card style="min-width: 30vw;">

      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">İhale Hakkında Soru Sor</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="row items-center q-pb-none" v-if="info.referansNo">
        <div class="font-16">{{ info.referansNo }} </div>
      </q-card-section>



      <q-separator class="q-mt-md" />

      <q-card-section style="max-height: 50vh" class="scroll" v-if="info.mesajlar">
        <table-infos />
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <q-input
          autogrow
          outlined
          autofocus
          clearable
          v-model="soru"
          maxlength="1024"
          label="Soru" stack-label
          :rules="[(val) => !!val || 'Lütfen sorunuzu giriniz']"  />
      </q-card-section>

      <q-card-actions class="q-pt-none q-pl-md q-pr-md justify-center no-wrap">
        <q-btn
          style="width: 50%"
          color="primary"
          label="Soru Sor"
          @click="requestInfo()" />

          <q-btn
          style="width: 50%"
          label="Temizle"
          color="secondary"
          @click="soru = ''" />
      </q-card-actions>


    </q-card>
  </q-dialog>

</template>

<script>
import { defineAsyncComponent, ref, computed, toRefs, reactive, watch } from "vue"
import { exportFile, useQuasar } from "quasar"
import { useRouter } from "vue-router"
import apiService from "../../services/apiService"
import usersService from "../../services/usersService"
import claimController from "../../controllers/claimController"
import messageController from "../../controllers/messageController"
import notify from "../../helpers/notification"
import { Api } from "../../helpers/api"
import { Format } from "../../helpers/format"

const columns = [
  {
    name: "preview",
    label: "",
    field: "preview",
    sortable: false,
    align: "center",
    style: "width: 80px"
  },
  {
    name: "ihaleNo",
    label: "İhale Numarası",
    field: "ihaleNo",
    sortable: true,
    align: "left",
    headerStyle: 'font-size:16px'
  },
  {
    name: "aracStatuPkodu",
    label: "Araç Statü",
    field: "aracStatuPkodu",
    align: "left",
    headerStyle: 'font-size:16px'
  },
  {
    name: "ihaleBaslangicTarihiStr",
    label: "İhale Başlangıç Tarihi",
    field: "ihaleBaslangicTarihiStr",
    align: "left",
    sortable: true,
    headerStyle: 'font-size:16px'
  },
  {
    name: "ihaleBitisTarihiStr",
    label: "İhale Bitiş Tarihi",
    field: "ihaleBitisTarihiStr",
    sortable: true,
    align: "left",
    headerStyle: 'font-size:16px'
  },
  {
    name: "ihaleninBitmesineKalanSure",
    label: "Kalan Süre",
    field: "ihaleninBitmesineKalanSure",
    align: "left",
    headerStyle: 'font-size:16px; min-width: 235px',
  },
  /*{
    name: "ihaleSonTeklifTutari",
    label: "Son Teklif Tutarı (₺)",
    field: "ihaleSonTeklifTutari",
    align: "left",
    headerStyle: 'font-size:16px;'
  },
  */
  {
    name: "yil",
    label: "Yıl",
    field: "yil",
    sortable: true,
    align: "left",
    headerStyle: 'font-size:16px'
  },
  {
    name: "marka",
    label: "Marka",
    field: "marka",
    align: "left",
    headerStyle: 'font-size:16px'
  },
  {
    name: "model",
    label: "Model",
    field: "model",
    align: "left",
    headerStyle: 'font-size:16px'
  },
  /*{
    name: "servisBilgileri",
    label: "Servis Bilgileri",
    field: "servisBilgileri",
    align: "left",
    headerStyle: 'font-size:16px; width: 250px',
    style: "white-space: normal !important;"
  },*/
  {
    name: "brans",
    label: "Branş",
    field: "brans",
    align: "left",
    headerStyle: 'font-size:16px; width: 30px'
  },
  {
    name: "detail",
    label: "",
    field: "detail",
    sortable: false,
    align: "center",
    style: "width: 20px"
  },
  {
    name: "requestinfo",
    label: "",
    field: "requestinfo",
    sortable: false,
    align: "center",
    style: "width: 20px"
  },
]

export default {
  name: "TableClaims",
  components: {
    TableInfos: defineAsyncComponent(() =>
      import("src/components/tables/TableInfos.vue")
    )
  },
  setup(props, { emit }) {
    const { dataList, claimDataSource, displayError, displayMessages, fetch } =
      apiService()
    const router = useRouter()
    const $q = useQuasar()
    const { claimDetail, infoList, selectedClaim } = claimController()
    let filter = ref("")
    let mode = computed(() => {
      return !$q.screen.gt.sm
    })

    const hasUser = usersService().hasUser()

    if(hasUser) {
      columns[6] =
      {
        name: "sonTeklifTutariStr",
        label: "Son Teklif Tutarı (₺)",
        field: "sonTeklifTutariStr",
        align: "left",
        headerStyle: 'font-size:16px;',
      }
    }

    const state = reactive({
      confirm : false,
      prompt : false,
      soru : "",
      oidPert : "",
      oidHsrDosya : "",
    })

    const claims = computed(() => {
      return claimDataSource.value && claimDataSource.value.length > 0
        ? claimDataSource.value.map((item) => ({
            ...item,
          }))
        : []
    })

    const info = computed(() => {
      return infoList.value ? infoList.value : null
    })



    watch(claims, () => {
      updateTimer()
    })

    const updateTimer = () => {
      if (claimDataSource.value) {
        const intervalId = setInterval(() => {
          for (const item of claimDataSource.value) {
            var _second = 1000
            var _minute = _second * 60
            var _hour = _minute * 60
            var _day = _hour * 24

            var end = new Date(item.ihaleBitisTarihi)
            var now = new Date()
            var distance = end - now
            if (distance <= 0) {
                item.ihaleninBitmesineKalanSure = "SÜRESİ GEÇTİ"
                clearInterval(intervalId)
            } else if(distance > 0) {
              var days = Math.floor(distance / _day)
              var hours = Math.floor((distance % _day) / _hour)
              var minutes = Math.floor((distance % _hour) / _minute)
              var seconds = Math.floor((distance % _minute) / _second)

              var kalanTitle = ""
              if(days > 0) {
                  kalanTitle = kalanTitle + days + " GÜN "
              }
              if(hours > 0) {
                  kalanTitle = kalanTitle + hours + " SAAT "
              }
              if(minutes > 0) {
                  kalanTitle = kalanTitle + minutes + " DAKİKA "
              }
              if(seconds > 0) {
                  kalanTitle = kalanTitle + seconds + " SANİYE"
              }
              item.ihaleninBitmesineKalanSure = kalanTitle
            }
          }
        }, Format.Time.ONE_SECOND)
      }

    }

    const getPaginationLabel = (
      firstRowIndex,
      endRowIndex,
      totalRowsNumber
    ) => {
      return firstRowIndex + " - " + endRowIndex + " / " + totalRowsNumber
    }

    const wrapCsvValue = (val, formatFn) => {
      let formatted = formatFn !== void 0 ? formatFn(val) : val
      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted)
      formatted = formatted.split('"').join('""')
      return `"${formatted}"`
    }

    const exportTable = () => {
      // naive encoding to csv format
      const content = [columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          claimDataSource.value.map((row) =>
            columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n")
      const status = exportFile("claims.csv", content, "text/csv")
      if (status !== true) {
        notify().error("Tarayıcınız dosya indirmeyi engelledi")
      }
    }

    let imageSize = () => {
      return (window.screen.width - 70).toString()
    }

    const showVehicleDetail = async (row) => {
      await getVehicleDetail(row)
      if (dataList.value) claimDetail.value = dataList.value
      router.push(`/detail`)
      //router.replace(`/detail`)
    }

    const getVehicleDetail = async (row) => {
      try {
        const bodyData = {
          oidPertIhale : `${row.oid}`,
          oidPert : `${row.oidPert}`,
          oidHasarDosya : `${row.oidHasarDosya}`,
          oidTnmEksper : `${row.oidTnmEksper}`,
          ihaleNo : `${row.ihaleNo}`,
          oidDosyaServis : `${row.oidDosyaServis}`,
          serviceUrl : Api.Base.ServiceURL
        }
        selectedClaim.value = { ...row }
        await fetch(Api.Tender.GET_VEHICLE_DETAIL, bodyData)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    const showClaimDetail = async (row) => {
      console.log(row)
      //await getClaimDetail(row)
      //if (dataList.value) claimDetail.value = dataList.value
      //console.log(claimDetail.value)
      //const claimNoVictimNo = `${row.dosyaNo}/${row.magdurNo}`
      router.push("/detail")
      //router.replace(`/detail`)
    }

    const getClaimDetail = async (row) => {

      try {
        const bodyData = {
          oid: `${row.oid}`,
          policeOid: `${row.policeOid}`,
          acenteOid: `${row.acenteOid}`,
          ekspertizYeriOid: `${row.ekspertizYeriOid}`,
          tnmEksperOid: `${row.tnmEksperOid}`,
          islemOid: `${row.islemOid}`,
          dosyaNo: `${row.dosyaNo}`,
          magdurNo: `${row.magdurNo}`,
          policeNo: `${row.policeNo}`,
        }
        selectedClaim.value = { ...row }
        await fetch(Api.Claim.GET_CLAIM_DETAIL, bodyData)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
        router.replace("/auth")
      }
    }

    const openDialogRequestInfo = async (row) => {
      state.oidPert = row.oidPert
      state.oidHsrDosya = row.oidHasarDosya
      state.soru = ""
      if(!hasUser) {
        state.confirm = true
      } else {
        await getInfoList()
        state.prompt = true

        checkAsSeen()
      }
    }

    const { unreadMessageCount } = messageController()

    const checkAsSeen = async () => {
      try {
        const bodyData = {
          oidPertBilgiTalep : null,
          oidHsrDosya : state.oidHsrDosya,
          ihaleHakkinda : true,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.CHECK_AS_SEEN, bodyData, false)
        if (displayError.value) throw new Error(displayMessages.value[0].text)

        if(!info.value.goruldu && info.value.cevaplandi) {
          unreadMessageCount.value--
        }
      } catch (e) {
        notify().error(e.message)
      }
    }

    const requestInfo = async (row) => {
      if(state.soru) {
        try {
          const bodyData = {
            oidPertBilgiTalep : null,
            oidHsrDosya : state.oidHsrDosya,
            ihaleHakkinda : true,
            soru : state.soru,
            serviceUrl : Api.Base.ServiceURL
          }
          await fetch(Api.Message.SEND_MESSAGE, bodyData)
          if (displayError.value) throw new Error(displayMessages.value[0].text)
          notify().success("Sorunuz gönderilmiştir")
          getInfoList()
          state.soru = ""
        } catch (e) {
          notify().error(e.message)
        }
      }
    }

    const getInfoList = async (row) => {
      try {
        const bodyData = {
          oidHsrDosya : state.oidHsrDosya,
          ihaleHakkinda : true,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.LIST_MESSAGES, bodyData, true)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
        infoList.value = dataList.value && dataList.value[0] ? dataList.value[0] : []
      } catch (e) {
        notify().error(e.message)
      }
    }

    const goLoginPage = () => {
      router.replace("/auth")
    }

    const goAppealPage = () => {
      window.open(
        Api.Base.AppealURL,
        '_blank'
      )
    }

    return {
      getPaginationLabel,
      columns,
      dataList,
      claimDataSource,
      displayError,
      displayMessages,
      filter,
      mode,
      claims,
      info,
      hasUser,
      ...toRefs(state),
      imageSize,
      wrapCsvValue,
      exportTable,
      showVehicleDetail,
      getVehicleDetail,
      showClaimDetail,
      getClaimDetail,
      fetch,
      openDialogRequestInfo,
      checkAsSeen,
      requestInfo,
      goLoginPage,
      goAppealPage,
    }
  },
}
</script>

<style lang="scss" scoped>
.q-table__bottom-item {
  color: white;
}
:deep(.q-table__control .q-field__control-container .q-field__native) {
  color: white;
}
:deep(.q-select__dropdown-icon) {
  color: white;
}
.q-item__label--caption {
  color: white !important
}

.q-card::-webkit-scrollbar{
  width:0px;
}


</style>
