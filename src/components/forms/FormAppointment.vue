<template>
  <q-form
    class="q-gutter-md full-width"
    @submit="saveAppointment()"
    @reset="resetAppointment()"
    greedy
    ref="formAppointment"
  >
    <div class="row q-pb-md q-col-gutter-md">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-input
          v-model="appointmentDate"
          label="Randevu Tarihi ve Saati"
          dark
          label-color="grey-3"
          color="white"
          lazy-rules
          :rules="[$rules.required('Randevu Tarihi ve Saati alanı zorunludur')]"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="appointmentDate" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Kapat" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time
                  v-model="appointmentDate"
                  mask="YYYY-MM-DD HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Kapat" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-input
          v-model="customerNameSurname"
          label="Müşteri Ad Soyad"
          lazy-rules
          :rules="[$rules.required('Müşteri Ad Soyad alanı zorunludur')]"
          counter
          maxlength="64"
          label-color="grey-3"
          color="white"
          dark
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-input
          v-model="customerGsm"
          label="Müşteri Cep Telefonu"
          mask="(###)###-##-##"
          lazy-rules
          :rules="[$rules.required('Müşteri Cep Telefonu alanı zorunludur')]"
          counter
          maxlength="14"
          label-color="grey-3"
          color="white"
          dark
        />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-input
          v-model="expertNameSurname"
          label="Eksper Ad Soyad"
          lazy-rules
          :rules="[$rules.required('Eksper Ad Soyad alanı zorunludur')]"
          counter
          maxlength="64"
          label-color="grey-3"
          color="white"
          dark
        />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-input
          v-model="expertGsm"
          label="Eksper Cep Telefonu"
          mask="(###)###-##-##"
          lazy-rules
          :rules="[$rules.required('Eksper Cep Telefonu alanı zorunludur')]"
          counter
          maxlength="14"
          label-color="grey-3"
          color="white"
          dark
        />
      </div>
    </div>
    <div class="row q-pb-md q-col-gutter-md">
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
        <q-btn
          unelevated
          size="md"
          color="primary"
          class="text-white text-capitalize"
          label="Temizle"
          type="reset"
        />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
        <q-btn
          unelevated
          size="md"
          color="primary"
          class="text-white text-capitalize"
          label="Kaydet"
          type="submit"
        />
      </div>
    </div>
  </q-form>
</template>
<script>
import { toRefs, defineComponent, onMounted, ref } from "vue"
//import { useQuasar } from "quasar"
import apiService from "../../services/apiService"
import claimController from "../../controllers/claimController"
import appointmentController from "../../controllers/appointmentController"
import notify from "../../helpers/notification"
import utility from "../../helpers/utility"
import { Api } from "../../helpers/api"

export default defineComponent({
  name: "FormAppointment",
  setup() {
    const formAppointment = ref(null)
    const { dataList, displayError, displayMessages, fetch } = apiService()
    const { selectedClaim } = claimController()
    const { appointmentDataSource, state, resetAppointment } =
      appointmentController()

    const saveAppointment = async () => {
      try {
        const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"))
        const oidHsrDosya = state.oidClaim
          ? state.oidClaim
          : selectedClaim.value.oid
        const bodyData = {
          oid: state.oid ? state.oid : null,
          kullaniciOid: state.userId ? state.userId : sessionInfo.userId,
          oidHsrDosya: oidHsrDosya,
          oidHsrDosyaEksper: selectedClaim.value.islemOid,
          oidTnmEksper: selectedClaim.value.tnmEksperOid,
          dosyaNo: selectedClaim.value.dosyaNo,
          randevuTarihi: state.appointmentDate,
          ekspertizdeGorusulecekKisiAdSoyad: utility().capitalize(
            state.customerNameSurname,
            true
          ),
          ekspertizdeGorusulecekKisiGsm: state.customerGsm.replace(
            /[^\w\s]/gi,
            ""
          ),
          sorumluEksperAdSoyad: utility().capitalize(
            state.expertNameSurname,
            true
          ),
          sorumluEksperGsm: state.expertGsm.replace(/[^\w\s]/gi, ""),
        }

        await fetch(Api.Appointment.SAVE_APPOINTMENT_URL, bodyData)

        if (dataList.value) {
          appointmentDataSource.value = dataList.value.map((appointment) => ({
            ...appointment,
          }))
          resetAppointment()
          formAppointment.value.resetValidation()

        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    onMounted(() => {
      resetAppointment()
    })

    return {
      formAppointment,
      ...toRefs(state),
      dataList,
      displayError,
      displayMessages,
      resetAppointment,
      saveAppointment,
      fetch,
    }
  },
})
</script>
