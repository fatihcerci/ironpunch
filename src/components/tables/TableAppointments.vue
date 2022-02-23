<template>
  <div class="row q-col-gutter-sm q-pa-md">
    <div class="col-12">
      <q-card class="bg-secondary">
        <q-table
          card-class="bg-secondary text-white"
          :hide-header="mode === 'grid'"
          :grid="mode === 'grid'"
          :filter="filter"
          :rows="appointmentDataSource ? appointmentDataSource : []"
          :columns="columns"
          :pagination-label="getPaginationLabel"
          row-key="oid"
          rows-per-page-label="Satır Sayısı"
          no-data-label="Kayıt bulunamadı"
          no-results-label="Eşleşen kayıt bulunamadı"
          title="Randevular"
          title-class="text-bold"
          table-class="text-white"
          color="primary"
          table-header-class="text-white"
        >
          <template v-slot:body-cell-onay="props">
            <q-td :props="props" class="text-center">
              <q-chip
                :color="
                  props.row.onay === 2
                    ? 'blue-3'
                    : props.row.onay === 1
                    ? 'red-3'
                    : 'orange-3'
                "
                :text-color="
                  props.row.onay === 2
                    ? 'black'
                    : props.row.onay === 1
                    ? 'white'
                    : 'black'
                "
                dense
                class="text-weight-bolder text-center"
                square
                style="width: 100px"
                ><span
                  class="full-width inline-block flex flex-center text-center"
                  >{{
                    props.row.onay === 2
                      ? "Onaylandı"
                      : props.row.onay === 1
                      ? "Süresi doldu"
                      : "Onay Bekliyor"
                  }}</span
                >
              </q-chip>
            </q-td>
          </template>
          <template v-slot:top-right="">
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
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                :disable="props.row.onay === 2 || props.row.onay === 1"
                icon="edit"
                color="green-3"
                size="sm"
                flat
                dense
                @click="editAppointment(props.row)"
              >
              <q-tooltip class="bg-info text-secondary">Güncelle</q-tooltip>
              </q-btn>
              <q-btn
                :disable="props.row.onay === 2 || props.row.onay === 1"
                icon="delete"
                color="red-3"
                size="sm"
                class="q-ml-sm"
                flat
                dense
                @click="deleteAppointment(props.row)"
              >
              <q-tooltip class="bg-info text-secondary">Sil</q-tooltip>
              </q-btn>
              <q-btn
                :disable="props.row.onay === 2 || props.row.onay === 1"
                icon="check_circle"
                color="blue-3"
                size="sm"
                class="q-ml-sm"
                flat
                dense
                @click="confirmAppointment(props.row)"
              >
              <q-tooltip class="bg-info text-secondary">Onayla</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, onMounted } from "vue"
import apiService from "../../services/apiService"
import claimController from "../../controllers/claimController"
import appointmentController from "../../controllers/appointmentController"
import notify from "../../helpers/notification"
import { Api } from "../../helpers/api"
const columns = [
  {
    name: "action",
    label: "",
    field: "action",
    sortable: false,
    align: "center",
    style: "width: 100px",
  },
  {
    name: "randevuTarihi",
    label: "Randevu Tarihi",
    field: "randevuTarihi",
    sortable: true,
    align: "right",
  },
  {
    name: "ekspertizdeGorusulecekKisiAdSoyad",
    label: "Müşteri Ad Soyad",
    field: "ekspertizdeGorusulecekKisiAdSoyad",
    sortable: true,
    align: "left",
  },
  {
    name: "ekspertizdeGorusulecekKisiGsm",
    label: "Müşteri Cep Telefonu",
    field: "ekspertizdeGorusulecekKisiGsm",
    sortable: true,
    align: "left",
  },
  {
    name: "sorumluEksperAdSoyad",
    label: "Eksper Ad Soyad",
    field: "sorumluEksperAdSoyad",
    sortable: true,
    align: "left",
  },
  {
    name: "sorumluEksperGsm",
    label: "Eksper Cep Telefonu",
    field: "sorumluEksperGsm",
    sortable: true,
    align: "left",
  },
  {
    name: "onay",
    label: "Onay",
    field: "onay",
    sortable: true,
    align: "center",
  },
]

export default {
  setup() {
    const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"))
    const { dataList, displayError, displayMessages, fetch } = apiService()
    const { selectedClaim } = claimController()
    const { appointmentDataSource, state, resetAppointment } =
      appointmentController()
    let filter = ref("")
    let mode = ref("list")

    const getPaginationLabel = (
      firstRowIndex,
      endRowIndex,
      totalRowsNumber
    ) => {
      return firstRowIndex + " - " + endRowIndex + " / " + totalRowsNumber
    }

    const editAppointment = async (row) => {
      state.oid = row.oid
      state.userId = row.kullaniciOid
      state.oidClaim = row.oidHsrDosya
      state.appointmentDate = row.randevuTarihi
      state.customerNameSurname = row.ekspertizdeGorusulecekKisiAdSoyad
      state.customerGsm = row.ekspertizdeGorusulecekKisiGsm
      state.expertNameSurname = row.sorumluEksperAdSoyad
      state.expertGsm = row.sorumluEksperGsm
    }

    const deleteAppointment = async (row) => {
      try {
        const bodyData = {
          oid: row.oid,
          kullaniciOid: sessionInfo.userId,
          oidHsrDosya: selectedClaim.value.oid,
          oidHsrDosyaEksper: selectedClaim.value.islemOid,
        }
        await fetch(Api.Appointment.DELETE_APPOINTMENT_URL, bodyData)
        if (dataList.value) {
          appointmentDataSource.value = dataList.value.map((appointment) => ({
            ...appointment,
          }))
          resetAppointment()
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    const confirmAppointment = async (row) => {
      try {
        const bodyData = {
            onay: 2,
            copyAll: false,
            oid: row.oid,
            oidHsrDosyaEksper: selectedClaim.value.islemOid
        }
        await fetch(Api.Appointment.EXECUTE_APPOINTMENT_CONFIRM_URL, bodyData)
        if (dataList.value) {
          appointmentDataSource.value = dataList.value.map((appointment) => ({
            ...appointment,
          }))
          resetAppointment()
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch(e) {
        notify().error(e.message)
      }
    }

    const fetchAppointmentData = async () => {
      try {
        const bodyData = {
          kullaniciOid: sessionInfo.userId,
          oidHsrDosya: selectedClaim.value.oid,
          oidHsrDosyaEksper: selectedClaim.value.islemOid,
        }
        await fetch(Api.Appointment.LIST_APPOINTMENT_URL, bodyData)
        if (dataList.value) {
          appointmentDataSource.value = dataList.value.map((appointment) => ({
            ...appointment,
          }))
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    onMounted(() => {
      fetchAppointmentData()
    })

    return {
      getPaginationLabel,
      columns,
      dataList,
      selectedClaim,
      appointmentDataSource,
      ...toRefs(state),
      displayError,
      displayMessages,
      filter,
      mode,
      editAppointment,
      deleteAppointment,
      confirmAppointment,
      resetAppointment,
      fetch,
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
