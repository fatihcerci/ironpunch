<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <div class="row q-pb-md q-col-gutter-md">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-select
            :options="eksperDosyaDurumlariDizi"
            v-model="eksperDosyaDurumu"
            label="Eksper Dosya Durumu"
            dark
            color="white"
            dense
            borderless
            emit-value
            map-options
            options-dense
          />
        </div>
        <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <q-btn
            unelevated
            size="md"
            color="primary"
            class="text-white text-capitalize"
            label="Güncelle"
            @click="updateClaimExpertStatus()"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue"
import { Api } from "../../helpers/api"
import notify from "../../helpers/notification"
import apiService from "../../services/apiService"
import claimController from "../../controllers/claimController"

export default defineComponent({
  name: "CardChangeExpertStatus",
  setup() {
    const { displayError, displayMessages, fetch } = apiService()

    const { selectedClaim } = claimController()

    const eksperDosyaDurumlariDizi = ref([
      { label: "Eksiklik Bekleyen Dosya", value: "4" },
      { label: "Bilgi Bekleyen Dosya", value: "5" },
      { label: "Belge Bekleyen Dosya", value: "6" },
    ])
    const eksperDosyaDurumu = ref(null)

    const updateClaimExpertStatus = async () => {
      try {
        const bodyData = {
          className: Api.Packages.CLAIM_EXPERT,
          oid: selectedClaim.value.islemOid,
          otoDisiEksperDosyaDurumlari: eksperDosyaDurumu.value,
          copyAll: false,
        }
        await fetch(Api.Common.GENERIC_CREATE_OR_UPDATE_URL, bodyData)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
        eksperDosyaDurumu.value = null
        notify().success(`Eksper dosya durumu başarılı bir şekilde güncellendi`)
      } catch (e) {
        notify().error("saveAsset:: " + e.message)
      }
    }

    return {
      eksperDosyaDurumlariDizi,
      eksperDosyaDurumu,
      updateClaimExpertStatus,
    }
  },
})
</script>

<style></style>
