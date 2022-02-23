<template>
  <div class="row q-pb-md q-col-gutter-md">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-select
        :options="otoDisiKompleksTurDizi"
        v-model="otoDisiKompleksTur"
        label="Tür"
        dark
        color="white"
        dense
        borderless
        emit-value
        map-options
        options-dense
        lazy-rules
        :rules="[$rules.required('Lütfen bir tür seçimi yapın')]"
        @update:model-value="fetchFormComplex(otoDisiKompleksTur)"
      />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-toggle
        v-model="basilsinMi"
        label="Basılsın mı?"
        left-label
      />
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-input
        autogrow
        v-model="aciklama"
        label="Açıklama"
        label-color="grey-3"
        color="white"
        dark
        counter
        maxlength="1024"
        lazy-rules
        :rules="[
          $rules.required('Açıklama zorunlu alandır'),
          $rules.minLength(5, 'Lütfen asgari 5 karakter girin'),
          $rules.maxLength(1024, 'Lütfen azami 1024 karakter girin'),
        ]"
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
        @click="saveFormComplex()"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, toRefs } from "vue"
import formComplexController from "../../controllers/formComplexController"

export default defineComponent({
  name: "FormComplex",
  setup() {
    const {
      initFormComplex,
      stateFormComplex,
      saveFormComplex,
      fetchFormComplex,
    } = formComplexController()

    onMounted(async () => {
      await initFormComplex()
      await fetchFormComplex('1')
    })

    return {
      //PROPERTIES
      ...toRefs(stateFormComplex),
      //FUNCTIONS
      initFormComplex,
      saveFormComplex,
      fetchFormComplex,
    }
  },
})
</script>
