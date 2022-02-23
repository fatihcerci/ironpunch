<template>
  <div class="row q-pb-md q-col-gutter-md">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-input
        autogrow
        v-model="aciklama"
        label="Açıklama"
        label-color="grey-3"
        color="white"
        dark
        counter maxlength="1024"
        :rules="[
          (val) =>
            val === '' ||
            val.length <= 1024 ||
            'Lütfen azami 1024 karakter kullanın',
        ]"
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-select
        :options="raporKapatmaNedeniDizi"
        v-model="raporKapatmaNedeni"
        label="Rapor Kapatma Nedeni"
        dark
        color="white"
        dense
        borderless
        emit-value
        map-options
        options-dense
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-toggle
        v-model="kanaat"
        label="Olumsuz / Olumlu"
        left-label
      />
    </div>
  </div>
  <div class="row q-pb-md q-col-gutter-md">
    <div class="col-lg-12 col-md-12 col-sm-6 col-xs-6 text-center">
      <q-btn
        unelevated
        size="md"
        color="primary"
        class="text-white text-capitalize"
        label="Kaydet"
        @click="saveReportResult()"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs } from "vue"
import formReportController from "../../controllers/formReportController"

export default defineComponent({
  name: "FormReportResult",
  setup() {

    const {
      initFormReportResult,
      stateReportResult,
      saveReportResult,
      fetchReportResult
    } = formReportController()

    onMounted(async () => {
      await initFormReportResult()
      await fetchReportResult()
    })

    return {
      //PROPERTIES
      ...toRefs(stateReportResult),
      //FUNCTIONS
      initFormReportResult,
      saveReportResult,
      fetchReportResult,
    }
  },
})
</script>
