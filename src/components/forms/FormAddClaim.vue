<template>
  <div class="row q-pb-md q-col-gutter-md">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-select
        :options="kiymetTipiDizi"
        v-model="kiymetTipi"
        label="Kıymet Tipi"
        dark
        color="white"
        dense
        borderless
        emit-value
        map-options
        options-dense
      />
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-input
        v-model="hasarKiymetler"
        label="Hasar Kıymetler"
        label-color="grey-3"
        color="white"
        dark
      />
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-select
        :options="oidAlacakliDizi"
        v-model="oidAlacakli"
        label="Alacaklı"
        dark
        color="white"
        dense
        borderless
        emit-value
        map-options
        options-dense
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-select
        :options="olcuBirimDizi"
        v-model="olcuBirim"
        label="Birim"
        dark
        color="white"
        dense
        borderless
        emit-value
        map-options
        options-dense
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-input
        v-model="sigortaliTalepMiktari"
        label="Sigortalı Talep Miktarı"
        label-color="grey-3"
        color="white"
        suffix="TL"
        mask="###.###.###.###,##"
        :rules="[
          (val) =>
            val === '' ||
            val.length <= 18 ||
            'Lütfen azami 14 karakter kullanın',
        ]"
        reverse-fill-mask
        dark
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-input
        v-model="eksperTespitMiktari"
        label="Eksper Tespit Miktarı"
        label-color="grey-3"
        color="white"
        suffix="TL"
        mask="###.###.###.###,##"
        :rules="[
          (val) =>
            val === '' ||
            val.length <= 18 ||
            'Lütfen azami 14 karakter kullanın',
        ]"
        reverse-fill-mask
        dark
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-input
        v-model="sigortaliTalepBirim"
        label="Sigortalı Talep Birim"
        label-color="grey-3"
        color="white"
        type="number"
        dark
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-input
        v-model="eksperTespitBirim"
        label="Eksper Tespit Birim"
        label-color="grey-3"
        color="white"
        type="number"
        dark
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-input
        v-model="iskonto"
        label="İskonto"
        label-color="grey-3"
        color="white"
        type="number"
        prefix="%"
        mask="###.##"
        reverse-fill-mask
        dark
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-input
        v-model="eskiYeniFarkTenzili"
        label="Eski Yeni Fark Tenzili"
        label-color="grey-3"
        color="white"
        type="number"
        prefix="%"
        mask="###.##"
        reverse-fill-mask
        dark
      />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <q-input
        v-model="teknolojiKiymetKazanmaTenzili"
        label="Teknoloji Kıymet Kazanma Tenzili"
        label-color="grey-3"
        color="white"
        type="number"
        prefix="%"
        mask="###.##"
        reverse-fill-mask
        dark
      />
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-input
        v-model="teklifAlinanYer"
        label="Teklif Alınan Yer"
        label-color="grey-3"
        color="white"
        dark
      />
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-input
        v-model="teminatDisiHasar"
        label="Teminat Dışı Hasar"
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
        @click="resetFormAddClaim()"
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
      <q-btn
        unelevated
        size="md"
        color="primary"
        class="text-white text-capitalize"
        label="Kaydet"
        @click="saveAssetDetail()"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs } from "vue"
import formController from "../../controllers/formController"

export default defineComponent({
  name: "FormAddClaim",
  setup() {
    const { stateAddClaim, initFormAddClaim, resetFormAddClaim , saveAssetDetail} =
      formController()
    onMounted(async () => {
      await initFormAddClaim()
    })

    return {
      //PROPERTIES
      ...toRefs(stateAddClaim),

      resetFormAddClaim,
      //FUNCTIONS
      initFormAddClaim,
      saveAssetDetail,
    }
  },
})
</script>
