<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <div class="row q-pb-md q-col-gutter-md">
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="adSoyad"
            label="Acente Adı"
            input-class="ellipsis"
            disable
            dark
          />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="cepTelefon"
            label="Acente Cep Telefonu"
            disable
            dark
          />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="eposta"
            type="email"
            label="Acente E-Posta"
            disable
            dark
          />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="kanalSegment"
            label="Acente Segmenti"
            disable
            dark
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, reactive, defineComponent } from "vue"
import claimController from "../../controllers/claimController"

export default defineComponent({
  name: "CardAgentInfo",

  setup() {
    const { claimDetail } = claimController()
    const state = reactive({
      adSoyad: claimDetail.value.acenteView.adSoyad,
      cepTelefon: claimDetail.value.acenteView.cepTelefon,
      eposta: claimDetail.value.acenteView.eposta,
      kanalSegment: claimDetail.value.acenteView.kanalSegment
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

