<template>
  <q-table
  bordered flat
    :hide-header="mode"
    :grid="true"
    :filter="filter"
    :rows="answers ? answers : []"
    :columns="columns"
    :pagination-label="getPaginationLabel"
    :rows-per-page-options="[5]"
    row-key="oid"
    rows-per-page-label="Satır Sayısı"
    no-data-label="Kayıt bulunamadı"
    no-results-label="Eşleşen kayıt bulunamadı"
    title="Soru-Cevaplar"
    title-class="font-20"
  >

    <template v-slot:item="props" v-if="!mode">
      <div class="q-pl-sm q-pr-sm q-pt-sm col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <q-card bordered flat>
          <q-list>
            <q-item v-for="col in props.cols.filter(col => col.name !== 'servisBilgileri')" :key="col.name">
              <q-item-section>
                <q-item-label caption>{{ col.label }} </q-item-label>
                <q-item-label>{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        
      </div>
    </template>
  </q-table>

    

</template>

<script>
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import claimController from "../../controllers/claimController"

const columns = [
  {
    name: "istekTarihiStr",
    label: "Tarih",
    field: "istekTarihiStr",
    sortable: false,
    align: "left",
    headerStyle: 'font-size:14px'
  },
  {
    name: "soru",
    label: "Soru",
    field: "soru",
    sortable: false,
    align: "left",
    headerStyle: 'font-size:14px',
    style: "white-space: normal !important; width:1000px"
  },
  {
    name: "cevap",
    label: "Cevap",
    field: "cevap",
    sortable: false,
    align: "left",
    headerStyle: 'font-size:14px',
    style: "white-space: normal !important;"
  },
]

export default {
  name: "TableGeneralAnswers",
  components: {
  },
  setup() {
    const $q = useQuasar()
    const { generalAnswerList } = claimController()
    let filter = ref("")
    //let mode = ref("list")

    let mode = computed(() => {
      return !$q.screen.gt.xs
    })

    const answers = computed(() => {
      return generalAnswerList.value && generalAnswerList.value.length > 0
        ? generalAnswerList.value.map((item) => ({
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
      generalAnswerList,
      answers,
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
.grid-masonry {
  flex-direction: row;
  height: 700px;
}
.q-table__grid-item .col-lg-3 {
  width: 100% !important;
}

.q-table__grid-item.col-xs-12.col-sm-6.col-md-4.col-lg-3 {
  width: 100% !important;
}
</style>
