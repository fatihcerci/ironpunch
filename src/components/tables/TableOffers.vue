<template>
        <q-table
          card-class=""
          :hide-header="mode === 'grid'"
          :grid="mode === 'grid'"
          :filter="filter"
          :rows="offers ? offers : []"
          :columns="columns"
          :pagination-label="getPaginationLabel"
          :rows-per-page-options="[5]"
          row-key="oid"
          rows-per-page-label="Satır Sayısı"
          no-data-label="Kayıt bulunamadı"
          no-results-label="Eşleşen kayıt bulunamadı"
          title="Önceki Teklifleriniz"
          title-class="font-20"
        />
          
</template>

<script>
import { ref, computed } from "vue"
import claimController from "../../controllers/claimController"

const columns = [
  {
    name: "teklifNo",
    label: "No",
    field: "teklifNo",
    sortable: true,
    align: "left",
    headerStyle: 'font-size:14px'
  },
  {
    name: "teklifTarihiStr",
    label: "Tarih",
    field: "teklifTarihiStr",
    sortable: false,
    align: "left",
    headerStyle: 'font-size:14px'
  },
  {
    name: "teklifTutariFormatted",
    label: "Tutar (₺)",
    field: "teklifTutariFormatted",
    sortable: false,
    align: "left",
    mask: "###.###.###",
    headerStyle: 'font-size:14px'
  },
]

export default {
  name: "TableOffers",
  components: {
  },
  setup() {
    const { offerList } = claimController()
    let filter = ref("")
    let mode = ref("list")

    const offers = computed(() => {
      return offerList.value && offerList.value.length > 0
        ? offerList.value.map((item) => ({
            ...item,
          }))
        : []
    })

    const getPaginationLabel = (
      firstRowIndex,
      endRowIndex,
      totalRowsNumber
    ) => {
      return firstRowIndex + " - " + endRowIndex + " / " + totalRowsNumber
    }

    return {
      getPaginationLabel,
      columns,
      offerList,
      offers,
      filter,
      mode
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
