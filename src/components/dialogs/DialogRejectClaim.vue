<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-bar class="bg-primary text-white">
        <q-icon name="info" />
        <div>Dosya Ret İşlemi</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <q-select clearable v-model="rejectReason" :options="options" label="Ret Nedeni"
        :rules="[ val => val !== null || 'Lütfen bir ret nedeni seçin' ]">
        </q-select>
        <q-input v-model="description" label="Açıklama" type="textarea" />
      </q-card-section>

      <q-card-section class="q-pt-none float-right">
        <q-btn
        unelevated
        size="md"
        color="primary"
        class="text-white text-capitalize"
        label="Reddet"
        @click="rejectClaim"
      />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue"
import apiService from "../../services/apiService"
import claimController from "../../controllers/claimController"
import notify from "../../helpers/notification"
import {Api} from "../../helpers/api"

export default defineComponent({
  name: "DialogRejectClaim",
  props: ["open"],
  emits: [
    'update:open'
  ],
  setup(props, { emit }) {
    const { displayError, displayMessages, fetch } = apiService()
    const { selectedClaim } = claimController()
    const dialog = ref(null)
    const rejectReason = ref(null)
    const description = ref(null)

    const rejectClaim = async () => {
      try {
        const bodyData = {
          oidHsrDosya: selectedClaim.value.oid,
          oidHsrDosyaEksper: selectedClaim.value.islemOid,
          otoDisiAkisRetNedeniPkodu: rejectReason.value.value,
          aciklama: description.value
        }

        await fetch(Api.Claim.REJECT_CLAIM, bodyData)

        if (displayError.value) {
          throw new Error(displayMessages.value[0].text)
        } else {
          resetDialog()
          hide()
          notify().success(`Dosya başarılı bir şekilde reddedildi`)
        }
      } catch (e) {
        notify().error(e.message)
      }
    }

    const hide = () => {
      emit("update:open",false)
    }

    const resetDialog = () => {
      rejectReason.value = null
      description.value = null
    }

    return {
      dialog,
      rejectReason,
      description,
      selectedClaim,
      options: [
        {
          label: "İş yoğunluğu",
          value: "1",
        },
        {
          label: "Bölgesi uygun değil",
          value: "2",
        },
        {
          label: "Hasar branşı uygun değil",
          value: "3",
        },
        {
          label: "Sağlık sorunu",
          value: "4",
        },
        {
          label: "Eksper şehir dışında",
          value: "5",
        },
        {
          label: "Diğer",
          value: "99",
        },
      ],
      rejectClaim,
      resetDialog,
      hide,
    }
  },

  computed: {
    openDialog: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit("update:open", val)
      },
    },
  },
})
</script>
