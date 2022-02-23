<template>
  <div class="row q-col-gutter-sm q-pl-md q-pr-md q-pb-md">
    <div class="col-12">
      <q-card class="bg-secondary">
        <q-table
          card-class="bg-secondary text-white"
          :hide-header="mode === 'grid'"
          :grid="mode === 'grid'"
          :filter="filter"
          :rows="rows"
          :columns="columns"
          :pagination-label="getPaginationLabel"
          row-key="oid"
          table-class="text-white"
          color="white"
          table-header-class="text-white"
          rows-per-page-label="Satır Sayısı"
          no-data-label="Kayıt bulunamadı"
          no-results-label="Eşleşen kayıt bulunamadı"
          title="Geçmiş Hasar Bilgileri"
          title-class="text-white text-bold"
        >

        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import notify from "../../helpers/notification"
import {Api} from "../../helpers/api"
import claimController from "../../controllers/claimController"
import apiService from "../../services/apiService"

const columns = [
  {
    name: "sigortaliAdi",
    label: "Sigortalı",
    align: "left",
    field: "sigortaliAdi",
    sortable: true,
  },
  {
    name: "dosyaNo",
    align: "left",
    label: "Dosya Numarası",
    field: "dosyaNo",
    sortable: true,
  },
  {
    name: "hasarTarihi",
    align: "left",
    label: "Hasar Tarihi",
    field: "hasarTarihi",
    sortable: true,
  },
  {
    name: "hasarNedeniTxt",
    align: "left",
    label: "Hasar Nedeni",
    field: "hasarNedeniTxt",
    sortable: true,
  },

]

export default {

  setup() {
    const { displayError, displayMessages, fetch, dataList } = apiService()
    const { selectedClaim } = claimController()
    let rows = ref([])
    const getPaginationLabel = (
      firstRowIndex,
      endRowIndex,
      totalRowsNumber
    ) => {
      return firstRowIndex + " - " + endRowIndex + " / " + totalRowsNumber
    }

    //list previous claims
    const listPreviousClaims = async () => {
      try {
        const bodyData = {
          policeNo: selectedClaim.value.policeNo,
          hasarTarihi: null,
          pv: null,
        }
        await fetch(Api.Claim.LIST_PREVIOUS_CLAIM_URL, bodyData)
        if (dataList.value) {
          rows.value = dataList.value
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    onMounted(async() => {
      await listPreviousClaims()
    })

    return {
      columns,
      rows,
      mode: ref("list"),
      filter: ref(''),
      getPaginationLabel,

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
</style>
