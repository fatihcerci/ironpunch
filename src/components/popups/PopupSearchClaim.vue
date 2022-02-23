<template>
  <q-btn flat dense round aria-label="Menu" icon="arrow_drop_down">
    <q-menu anchor="bottom end" self="top end" class="search-menu">
      <div class="q-pa-md" :style="searchSize">
        <div class="row items-center">
          <div class="col-6">
            <q-input dense v-model="claimNo" label="Dosya Numarası" />
          </div>
          <div class="col-6 q-pl-md">
            <q-input dense v-model="victimNo" label="Mağdur Numarası" />
          </div>
          <div class="col-6">
            <q-input dense v-model="productCode" label="Ürün Kodu" />
          </div>
          <div class="col-6 q-pl-md">
            <q-input dense v-model="productName" label="Ürün Adı" />
          </div>
          <div class="col-6">
            <q-input dense v-model="fileStatus" label="Dosya Durum" />
          </div>
          <div class="col-6 q-pl-md">
            <q-input dense v-model="reportStatus" label="Rapor Durum" />
          </div>
          <div class="col-6">
            <q-select
              :options="city"
              v-model="cityModel"
              label="Hasar İli"
              dense
              borderless
              emit-value
              map-options
              options-dense
            />
          </div>
          <div class="col-6 q-pl-md">
            <q-select
              :options="county"
              v-model="countyModel"
              label="Hasar İlçesi"
              dense
              borderless
              emit-value
              map-options
              options-dense
            />
          </div>
          <div class="col-6">
            <q-input dense v-model="policyInsured" label="Sigortalı Ad/Unvan" />
          </div>
          <div class="col-6 q-pl-md">
            <q-input dense v-model="claimReason" label="Hasar Nedeni" />
          </div>

          <div class="col-12 q-pt-md row justify-end">
            <q-btn
              outline
              dense
              no-caps
              color="grey-8"
              size="md"
              style="min-width: 68px"
              class="q-mr-md"
              @click="clearAllFields"
              label="Temizle"
            />
            <q-btn
              dense
              no-caps
              color="primary"
              size="md"
              style="min-width: 68px"
              @click="searchClaim"
              label="Ara"
              v-close-popup
            />
          </div>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import apiService from "../../services/apiService"
import notify from "../../helpers/notification"
import {Api} from "../../helpers/api"

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const {
      claimDataSource,
      claimList,
      dataList,
      displayError,
      displayMessages,
      fetch,
    } = apiService()
    const claimNo = ref("")
    const victimNo = ref("")
    const productCode = ref("")
    const productName = ref("")
    const katastrof = ref(false)
    const fileStatus = ref("")
    const reportStatus = ref("")
    const cityModel = ref(null)
    const countyModel = ref(null)
    const policyInsured = ref("")
    const claimReason = ref("")

    let city = ref([])

    const searchSize = computed(() => {
      return $q.screen.lt.md ? "width:100%" : "width:400px"
    })

    const county = computed(() => {
      if (!dataList.value || !cityModel.value) return Array()
      const filteredCity = dataList.value.filter(
        (item) => item.oid.indexOf(cityModel.value) > -1
      )
      return filteredCity[0].countyViewList.map((c) => {
        return { value: c.oid, label: c.name }
      })
    })

    const clearAllFields = () => {
      claimNo.value = ""
      victimNo.value = ""
      productCode.value = ""
      reportStatus.value = ""
      fileStatus.value = ""
      policyInsured.value = ""
      claimReason.value = ""
      katastrof.value = false
      cityModel.value = ""
      countyModel.value = ""
    }

    const searchClaim = () => {
      if (
        claimNo.value.length > 0 ||
        victimNo.value.length > 0 ||
        reportStatus.value.length > 0 ||
        fileStatus.value.length > 0 ||
        cityModel.value ||
        countyModel.value
      ) {
        claimDataSource.value = claimList.value.otoDisiDisEksperViewList.filter(
          (item) =>
            (claimNo.value.length > 0 &&
              item.dosyaNo.toString().indexOf(claimNo.value) > -1) ||
            (victimNo.value.length > 0 &&
              item.magdurNo.toString().indexOf(victimNo.value) > -1) ||
            (reportStatus.value.length > 0 &&
              item.ekspertizRaporDurum.indexOf(reportStatus.value) > -1) ||
            (fileStatus.value.length > 0 &&
              item.eksperDosyaDurum.indexOf(fileStatus.value) > -1) ||
            (cityModel.value && item.ilKod === cityModel.value) ||
            (countyModel.value && item.ilceKod === countyModel.value)
            //(productCode.value.length > 0 && item.victimNo.indexOf(productCode.value) > -1) ||
        )
      }
    }

    const loadComboData = async () => {
      try {
        await fetch(Api.Common.LIST_CITY_VIEWS_URL)
        if (dataList.value) {
          city.value = dataList.value.map((c) => {
            return { value: c.oid, label: c.name }
          })
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
        router.replace(`/auth`)
      }
    }

    const showPopup = () => {
      isOpenedPopup.value = !isOpenedPopup.value
    }

    watch(cityModel, (val) => {
      countyModel.value = ""
    })

    onMounted(async () => {
      await loadComboData()
    })

    return {
      claimDataSource,
      claimList,
      dataList,
      displayError,
      displayMessages,
      searchSize,
      claimNo,
      victimNo,
      productCode,
      productName,
      reportStatus,
      fileStatus,
      city,
      county,
      katastrof,
      policyInsured,
      claimReason,
      cityModel,
      countyModel,
      clearAllFields,
      searchClaim,
      fetch,
    }
  },
})
</script>

<style></style>
