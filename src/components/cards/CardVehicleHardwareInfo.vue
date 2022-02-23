<template>
  <q-card class="bg-transparent">
      <q-table
        dense
        hide-bottom
        card-class="bg-secondary text-white"
        :rows="rows"
        :columns="columns"
        :rows-per-page-options="[20, 30, 50, 100]"
        row-key="oid"
        table-class=""
        color="primary"
        table-header-class="text-bold"
      />
  </q-card>
</template>

<script>
import { toRefs, reactive, defineComponent, defineAsyncComponent } from "vue"
import claimController from "../../controllers/claimController"


const columns = [
  {
    name: "donanim",
    label: "Donanım",
    field: "donanim",
    align: "left",
    style: "width: 250px"
  },
  {
    name: "varYok",
    label: "Durum",
    field: "varYok",
    align: "left",
    style: "width: 150px"
  },
  {
    name: "aciklama",
    label: "Açıklama",
    field: "aciklama",
    align: "left",
  }
  
]

export default defineComponent({
  name: "CardVehicleHardwareInfo",
  components: {
    
  },

  
  setup() {
    const { claimDetail } = claimController()

    const rows = claimDetail.value.donanimBilgileri

    const state = reactive({
      donanimBilgileri : claimDetail.value.donanimBilgileri
    })

    return {
      ...toRefs(state),
      columns,
      rows
    }
  },
})
</script>
<style lang="scss" scoped>
/*.q-field__control-container::v-deep .q-field__label {
    font-size:30px;
  }*/
</style>
