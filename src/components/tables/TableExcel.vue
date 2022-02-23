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
          color="primary"
          table-header-class="text-white"
          rows-per-page-label="Satır Sayısı"
          no-data-label="Kayıt bulunamadı"
          no-results-label="Eşleşen kayıt bulunamadı"
          title="Excel Test"
          title-class="text-white text-bold"
        >
          <template v-slot:top-right="props">
            <q-input
              standout
              dense
              debounce="300"
              v-model="filter"
              placeholder="Hızlı Ara"
            >
              <template v-slot:append>
                <q-icon name="search" color="grey-3"/>
              </template>
            </q-input>

            <q-btn
              flat
              dense
              color="white"
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'"
              v-close-popup="!$q.platform.is.mobile"
            >
              <q-tooltip :disable="$q.platform.is.mobile"
                >{{ props.inFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran" }}
              </q-tooltip>
            </q-btn>
            <q-btn
              flat
              dense
              color="white"
              icon="add_box"
              @click="addRow"
            >
              <q-tooltip> Satır Ekle
              </q-tooltip>
            </q-btn>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name">
                  <q-input v-model="props.row.name" dense autofocus counter />
                </q-popup-edit>
              </q-td>
              <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit v-model.number="props.row.calories" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
              <q-td key="fat" :props="props">
                <div class="text-pre-wrap">{{ props.row.fat }}</div>
                <q-popup-edit v-model="props.row.fat">
                  <q-input
                    type="textarea"
                    v-model="props.row.fat"
                    dense
                    autofocus
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="carbs" :props="props">
                {{ props.row.carbs }}
                <q-popup-edit
                  v-model="props.row.carbs"
                  title="Update carbs"
                  buttons
                  persistent
                >
                  <q-input
                    type="number"
                    v-model="props.row.carbs"
                    dense
                    autofocus
                    hint="Use buttons to close"
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
              <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
              <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
              <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
            </q-tr>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                icon="add"
                color="green-3"
                size="sm"
                flat
                dense
                @click="insert(props.row)"
              />
              <q-btn
                icon="delete"
                color="red-3"
                size="sm"
                class="q-ml-sm"
                flat
                dense
                @click="cancel(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
]



export default {
  setup() {
    let rows = ref([])
    const getPaginationLabel = (
      firstRowIndex,
      endRowIndex,
      totalRowsNumber
    ) => {
      return firstRowIndex + " - " + endRowIndex + " / " + totalRowsNumber
    }

    const addRow = () => {
      rows.value.push({
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%",
      })
    }
    return {
      columns,
      rows,
      mode: ref("list"),
      filter: ref(''),
      getPaginationLabel,
      addRow,
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
